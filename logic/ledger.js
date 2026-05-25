// Motor da Blockchain ALT Solution - Camada de Auditoria e Ledger
export const myLedger = {
    
    // Configuração da chave de acesso para os blocos da blockchain local
    // Cria o nome fixo da gaveta que vai armazenar a corrente de transações
    KEYS: {
        // Define o nome da gaveta que guarda o histórico de blocos conectados
        CHAIN: 'alt_solution_chain'
    },

    // Função que calcula uma assinatura digital única para blindar o bloco
    // Transforma todas as informações recebidas em um código de identificação único
    generateHash: function (index, timestamp, data, previousHash) {
        // Junta todos os dados textuais e estruturados em uma única linha de texto
        let str = index + timestamp + JSON.stringify(data) + previousHash;
        
        // Define o ponto de partida numérico para o cálculo matemático da assinatura
        let hash = 0;
        
        // Percorre cada caractere do texto unificado para aplicar a fórmula matemática
        for (let i = 0; i < str.length; i++) {
            // Captura o código numérico padrão de cada letra ou símbolo do texto
            const char = str.charCodeAt(i);
            
            // Aplica cálculos aritméticos e deslocamento de bits para embaralhar o valor
            hash = ((hash << 5) - hash) + char;
            
            // Garante que o número resultante permaneça no limite estável do sistema
            hash = hash & hash;
        }
        
        // Converte o resultado em um formato de letras e números em maiúsculo
        return Math.abs(hash).toString(16).toUpperCase();
    },

    // Função encarregada de carregar o histórico de transações ou ligar a rede
    // Traz a corrente de blocos salva ou fabrica o Bloco Gênesis se a gaveta estiver vazia
    getChain: function () {
        // Vai até o armazenamento do computador e pega o texto da corrente de blocos
        const chain = localStorage.getItem(this.KEYS.CHAIN);
        
        // Se a corrente já existir no computador ele transforma o texto em dados e retorna
        if (chain) return JSON.parse(chain);
        
        // Se a rede nunca foi ligada antes ele monta a ficha do Bloco Gênesis inicial
        const genesisBlock = {
            // Define a posição zero como o ponto de partida absoluto da blockchain
            id: 0,
            // Registra a data e o horário exato da criação e nascimento da rede
            timestamp: new Date().toLocaleString('pt-BR'),
            // Define que a transação inicial partiu de forma automática do próprio sistema
            origem: "SISTEMA",
            // Define o destino do registro inicial direcionado para a própria rede local
            destino: "REDE ALT",
            // Define o saldo monetário padrão como zero para este bloco de fundação
            valor: 0,
            // Insere uma sequência zerada de segurança por não existir bloco anterior
            previousHash: "0000000000000000",
            // Grava a assinatura criptográfica exclusiva de nascimento fixada no sistema
            hash: "8B9A2F1C4D5E6F7G"
        };
        
        // Coloca o Bloco Gênesis criado como o primeiro elo dentro de uma nova lista
        const newChain = [genesisBlock];
        
        // Transforma essa lista inicial em formato de texto e salva na gaveta do computador
        localStorage.setItem(this.KEYS.CHAIN, JSON.stringify(newChain));
        
        // Devolve a nova corrente de blocos estruturada pronta para uso na aplicação
        return newChain;
    },

    // Função encarregada de empacotar e registrar uma nova transação na rede
    // Cria um bloco inédito com as contas envolvidas, calcula o hash e anexa na corrente
    addBlock: function (origem, destino, valor) {
        // Carrega a corrente atualizada de blocos diretamente para a memória
        const chain = this.getChain();
        
        // Localiza e isola o último bloco que foi inserido atualmente na rede
        const previousBlock = chain[chain.length - 1];
        
        // Monta a estrutura inicial do novo bloco com os dados enviados
        const newBlock = {
            // Define a posição numérica do novo elo com base no tamanho da lista
            id: chain.length,
            // Registra o carimbo de data e hora exata em que o bloco foi processado
            timestamp: new Date().toLocaleString('pt-BR'),
            // Salva o endereço da conta que está enviando os valores
            origem: origem,
            // Salva o endereço da conta que está recebendo os valores
            destino: destino,
            // Registra o montante financeiro envolvido na transação atual
            valor: valor,
            // Copia a assinatura digital do bloco anterior para criar o elo de segurança
            previousHash: previousBlock.hash,
            // Inicializa a assinatura do bloco atual vazia para ser calculada logo abaixo
            hash: ""
        };
        
        // Aciona o gerador matemático para calcular a assinatura exclusiva deste bloco
        newBlock.hash = this.generateHash(
            newBlock.id,
            newBlock.timestamp,
            { origem, destino, valor },
            newBlock.previousHash
        );
        
        // Insere o bloco novo com seu hash calculado no final da lista da corrente
        chain.push(newBlock);
        
        // Converte toda a corrente atualizada em texto e tranca na gaveta do computador
        localStorage.setItem(this.KEYS.CHAIN, JSON.stringify(chain));
        
        // Retorna o objeto do novo bloco minerado para o sistema exibir na tela
        return newBlock;
    },

    // Função encarregada de fazer a auditoria completa e checar a segurança da rede
    // Percorre a corrente inteira conferindo se algum elo de ligação foi violado
    isChainValid: function () {
        // Puxa o histórico completo da corrente de blocos para a memória operacional
        const chain = this.getChain();
        
        // Inicia um laço de repetição partindo do segundo bloco para inspecionar os elos
        for (let i = 1; i < chain.length; i++) {
            // Isola o bloco atual que está sendo analisado na rodada do laço
            const current = chain[i];
            
            // Isola o bloco imediatamente anterior na fila da corrente
            const previous = chain[i - 1];
            
            // Compara se o rastro do bloco anterior guardado no atual confere com o original
            if (current.previousHash !== previous.hash) return false;
        }
        
        // Caso o laço termine sem encontrar nenhuma quebra de elo retorna sucesso
        return true;
    },

    // Função utilitária de testes para apagar completamente os blocos gravados
    // Remove de forma definitiva a gaveta contendo o histórico de transações
    clearLedger: function () {
        // Executa a limpeza física deletando a chave da blockchain do computador
        localStorage.removeItem(this.KEYS.CHAIN);
    }
};
  