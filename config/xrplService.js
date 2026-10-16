// logic/xrplService.js - Serviço de Interação com a XRPL Testnet

import { XRPL_CONFIG } from '../config/xrpl.config.js';

export const XRPLService = {
    client: null,

    getConfig() {
        return (typeof window !== 'undefined' && window.XRPL_CONFIG) ? window.XRPL_CONFIG : XRPL_CONFIG;
    },

    async connect() {
        try {
            if (typeof xrpl === 'undefined') {
                throw new Error("SDK XRPL não carregado no ambiente de execução.");
            }
            const config = this.getConfig();
            if (!this.client) {
                this.client = new xrpl.Client(config.WSS_ENDPOINT, {
                    timeout: config.CONNECTION_TIMEOUT
                });
            }
            if (!this.client.isConnected()) {
                console.log(`Conectando ao nó XRPL Testnet (${config.WSS_ENDPOINT})...`);
                await this.client.connect();
                console.log("Conexão WebSocket estabelecida com sucesso.");
            }
            return this.client;
        } catch (error) {
            console.error("Falha na conexão com nó XRPL:", error);
            throw error;
        }
    },

    async disconnect() {
        if (this.client && this.client.isConnected()) {
            await this.client.disconnect();
            console.log("Desconectado do nó XRPL.");
        }
    },

    // Função auxiliar para aguardar a propagação da rede (retry delay)
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    async getAccountInfo(address, retries = 3, delay = 2000) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const client = await this.connect();
                const response = await client.request({
                    command: "account_info",
                    account: address,
                    ledger_index: "validated"
                });
                return response.result.account_data;
            } catch (error) {
                console.warn(`Tentativa ${attempt}/${retries} - Erro ao consultar account_info para ${address}:`, error.message || error);
                if (attempt < retries) {
                    await this.sleep(delay);
                } else {
                    console.error(`Falha definitiva ao consultar account_info para ${address} após ${retries} tentativas.`);
                    throw error;
                }
            }
        }
    },

    async getAccountLines(address) {
        try {
            const client = await this.connect();
            const response = await client.request({
                command: "account_lines",
                account: address,
                ledger_index: "validated"
            });
            return response.result.lines || [];
        } catch (error) {
            console.error(`Erro ao consultar account_lines para ${address}:`, error);
            return [];
        }
    },

    async setTrustline(wallet, issuerAddress, currencyCode = "RLUSD", limit = "1000000000") {
        try {
            const client = await this.connect();
            const tx = {
                TransactionType: "TrustSet",
                Account: wallet.address,
                LimitAmount: {
                    currency: currencyCode,
                    issuer: issuerAddress,
                    value: limit
                }
            };

            const prepared = await client.autofill(tx);
            const signed = wallet.sign(prepared);
            console.log(`Submetendo transação TrustSet para ${currencyCode} na Testnet...`);
            const result = await client.submitAndWait(signed.tx_blob);

            return {
                hash: signed.hash,
                result: result
            };
        } catch (error) {
            console.error("Erro na execução de setTrustline:", error);
            throw error;
        }
    },

    async sendPayment(senderWallet, destinationAddress, amount, currency = "XRP", issuerAddress = null, retries = 3, delay = 2500) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const client = await this.connect();

                let amountValue;
                if (currency === "XRP") {
                    amountValue = xrpl.xrpToDrops(String(amount));
                } else {
                    const config = this.getConfig();
                    const issuer = issuerAddress || config.RLUSD_ISSUER_TESTNET;
                    amountValue = {
                        currency: currency,
                        issuer: issuer,
                        value: String(amount)
                    };
                }

                const paymentTx = {
                    TransactionType: "Payment",
                    Account: senderWallet.address,
                    Destination: destinationAddress,
                    Amount: amountValue
                };

                const prepared = await client.autofill(paymentTx);
                const signed = senderWallet.sign(prepared);

                console.log(`Tentativa ${attempt} - Submetendo Payment (${currency}) na Testnet (${senderWallet.address} -> ${destinationAddress})...`);
                const result = await client.submitAndWait(signed.tx_blob);

                return {
                    hash: signed.hash,
                    result: result
                };
            } catch (error) {
                console.warn(`Tentativa ${attempt}/${retries} falhou no sendPayment:`, error.message || error);
                if (attempt < retries) {
                    await this.sleep(delay);
                } else {
                    console.error("Erro definitivo na execução de sendPayment após retentativas:", error);
                    throw error;
                }
            }
        }
    },

    async getAccountTransactions(address, limit = 20) {
        try {
            const client = await this.connect();
            const response = await client.request({
                command: "account_tx",
                account: address,
                ledger_index_min: -1,
                ledger_index_max: -1,
                limit: limit,
                forward: false
            });

            return response.result.transactions || [];
        } catch (error) {
            console.error(`Erro ao consultar histórico account_tx para ${address}:`, error);
            return [];
        }
    },

    async fetchMarketRates() {
        try {
            const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=brl,usd");
            if (!response.ok) {
                throw new Error("Falha ao buscar cotação externa de mercado.");
            }
            const data = await response.json();
            if (data && data.ripple) {
                return {
                    XRP_BRL: data.ripple.brl || 3.0,
                    XRP_USD: data.ripple.usd || 0.5
                };
            }
            return null;
        } catch (error) {
            console.warn("Aviso: Utilizando taxa de fallback padrão devido a falha na API de mercado:", error);
            return null;
        }
    },
};

if (typeof window !== 'undefined') {
    window.XRPLService = XRPLService;
}