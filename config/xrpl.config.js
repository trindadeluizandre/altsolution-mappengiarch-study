// config/xrpl.config.js

export const XRPL_CONFIG = {
    // Endpoints Principais da XRPL Testnet
    WSS_ENDPOINT: "wss://s.altnet.rippletest.net:51233",
    FAUCET_URL: "https://faucet.altnet.rippletest.net/accounts",
    EXPLORER_URL: "https://testnet.xrpl.org",

    // Parâmetros da Tokenização do Ativo Corporativo e Stablecoins (IOU)
    CURRENCY_CODE: "ALT",
    CURRENCY_NAME: "ALT Solution Token",

    // Configuração RLUSD (Ripple USD na Testnet)
    RLUSD_CURRENCY_CODE: "RLUSD",
    RLUSD_ISSUER_TESTNET: "rQh3f94G6pEbM2L3C8G4K9L1M2N3P4Q5R6",
    
    // Cotações Fixas de Referência para Oráculo Interno
    RATES: {
        XRP_BRL: 3.00,    // 1 XRP = R$ 3,00
        RLUSD_BRL: 5.50,  // 1 RLUSD = R$ 5,50
        USD_BRL: 5.50
    },

    // Parâmetros do Protocolo
    DEFAULT_FEE_DROPS: "12",
    CONNECTION_TIMEOUT: 15000,
    MAX_RECONNECT_RETRIES: 5,

    // Identificador Visual e Status da Rede
    NETWORK_NAME: "XRPL TESTNET",
    NODE_TYPE: "Nó de Testes Público"
};

// Injeção no escopo global para resiliência de execução no navegador
if (typeof window !== 'undefined') {
    window.XRPL_CONFIG = XRPL_CONFIG;
}