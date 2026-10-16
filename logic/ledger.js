// logic/ledger.js

export const myLedger = {
    KEYS: {
        CHAIN: 'alt_solution_chain'
    },

    generateHash: function (index, timestamp, data, previousHash) {
        let str = index + timestamp + JSON.stringify(data) + previousHash;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).toUpperCase();
    },

    getChain: function () {
        const chain = localStorage.getItem(this.KEYS.CHAIN);
        if (chain) return JSON.parse(chain);

        const genesisBlock = {
            id: 0,
            timestamp: new Date().toLocaleString('pt-BR'),
            origem: "SISTEMA",
            destino: "REDE ALT",
            valor: 0,
            moeda: "XRP",
            previousHash: "0000000000000000",
            hash: "8B9A2F1C4D5E6F7G"
        };

        const newChain = [genesisBlock];
        localStorage.setItem(this.KEYS.CHAIN, JSON.stringify(newChain));
        return newChain;
    },

    addBlock: function (origem, destino, valor, txHash = null, moeda = "XRP", issuer = null) {
        const chain = this.getChain();
        const previousBlock = chain[chain.length - 1];

        const newBlock = {
            id: chain.length,
            timestamp: new Date().toLocaleString('pt-BR'),
            origem: origem,
            destino: destino,
            valor: valor,
            moeda: moeda,
            issuer: issuer || "",
            previousHash: previousBlock.hash,
            hash: txHash || ""
        };

        if (!newBlock.hash) {
            newBlock.hash = this.generateHash(
                newBlock.id,
                newBlock.timestamp,
                { origem, destino, valor, moeda },
                newBlock.previousHash
            );
        }

        chain.push(newBlock);
        localStorage.setItem(this.KEYS.CHAIN, JSON.stringify(chain));
        return newBlock;
    },

    isChainValid: function () {
        const chain = this.getChain();
        for (let i = 1; i < chain.length; i++) {
            const current = chain[i];
            const previous = chain[i - 1];
            if (current.previousHash !== previous.hash) return false;
        }
        return true;
    },

    clearLedger: function () {
        localStorage.removeItem(this.KEYS.CHAIN);
    }
};

if (typeof window !== 'undefined') {
    window.myLedger = myLedger;
}