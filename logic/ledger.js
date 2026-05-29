// Motor da Blockchain ALT Solution - Camada de Auditoria e Ledger
export const myLedger = {
    // Configuração da chave de acesso para os blocos da blockchain local
    // Cria o nome fixo da gaveta que vai armazenar a corrente de transações
    // Versão Didática: Este é o "Livro de Registro" (Ledger) da empresa. É o motor que cria, guarda e confere se todas as transações de dinheiro são verdadeiras.
    // Versão Técnica: Objeto constante exportável que encapsula a lógica de Distributed Ledger Technology (DLT) e auditoria criptográfica.

    KEYS: {
        // Define o nome da gaveta que guarda o histórico de blocos conectados
        // Versão Didática: Aqui definimos a etiqueta da gaveta onde a corrente de blocos (a blockchain) será guardada.
        // Versão Técnica: Lookup Table para constantes de endereçamento no LocalStorage, garantindo unicidade na persistência da chain.

        CHAIN: 'alt_solution_chain'
        // Versão Didática: Este é o nome da gaveta que armazena todo o histórico de transações conectadas.
        // Versão Técnica: Chave identificadora para a coleção serializada da blockchain no Web Storage API.
    },
    // Versão Didática: Fechamento do dicionário de chaves.
    // Versão Técnica: Encerramento do sub-objeto de mapeamento de constantes literais.

    // Função que calcula uma assinatura digital única para blindar o bloco
    // Transforma todas as informações recebidas em um código de identificação único
    generateHash: function (index, timestamp, data, previousHash) {
        // Junta todos os dados textuais e estruturados em uma única linha de texto
        // Versão Didática: Esta função é a "Fábrica de Carimbos". Ela pega os dados do bloco e cria uma assinatura única e impossível de falsificar.
        // Versão Técnica: Implementação de um algoritmo de hashing determinístico (DJB2 adaptado) para geração de checksums de integridade.

        let str = index + timestamp + JSON.stringify(data) + previousHash;
        // Versão Didática: Primeiro, juntamos todas as informações do bloco (número, data, valores e o carimbo anterior) em uma única frase comprida.
        // Versão Técnica: Concatenação de metadados e payload serializado para criação da semente (seed) do cálculo de hash.
        
        // Define o ponto de partida numérico para o cálculo matemático da assinatura
        let hash = 0;
        // Versão Didática: Começamos o cálculo com o valor zero.
        // Versão Técnica: Inicialização do acumulador numérico para a operação de redução por iteração.
        
        // Percorre cada caractere do texto unificado para aplicar a fórmula matemática
        for (let i = 0; i < str.length; i++) {
            // Captura o código numérico padrão de cada letra ou símbolo do texto
            // Versão Didática: O sistema lê a frase comprida letra por letra para fazer o cálculo matemático.
            // Versão Técnica: Laço de repetição linear para processamento atômico de cada caractere da string.

            const char = str.charCodeAt(i);
            // Versão Didática: Capturamos o código numérico secreto de cada letra.
            // Versão Técnica: Extração do valor decimal correspondente ao caractere na tabela Unicode/ASCII.
            
            // Aplica cálculos aritméticos e deslocamento de bits para embaralhar o valor
            hash = ((hash << 5) - hash) + char;
            // Versão Didática: Fazemos uma conta matemática complexa para embaralhar os números e criar uma assinatura difícil de adivinhar.
            // Versão Técnica: Operação de deslocamento de bits (Bitwise Left Shift) e aritmética para distribuição de entropia.
            
            // Garante que o número resultante permaneça no limite estável do sistema
            hash = hash & hash;
            // Versão Didática: Garantimos que o número final não seja grande demais para o computador processar.
            // Versão Técnica: Aplicação de operador binário AND para conversão forçada em um inteiro assinado de 32 bits.
        }
        
        // Converte o resultado em um formato de letras e números em maiúsculo
        return Math.abs(hash).toString(16).toUpperCase();
        // Versão Didática: No fim, transformamos o número em um código de letras e números bonitinho e todo em maiúsculo.
        // Versão Técnica: Normalização do valor absoluto, conversão para base hexadecimal e formatação em caixa alta.
    },

    // Função encarregada de carregar o histórico de transações ou ligar a rede
    // Traz a corrente de blocos salva ou fabrica o Bloco Gênesis se a gaveta estiver vazia
    getChain: function () {
        // Vai até o armazenamento do computador e pega o texto da corrente de blocos
        // Versão Didática: Esta função traz a corrente de blocos do computador. Se a rede estiver começando agora, ela cria o primeiro bloco (Gênesis).
        // Versão Técnica: Método de recuperação e inicialização de estado (Bootstrapping) da blockchain local.

        const chain = localStorage.getItem(this.KEYS.CHAIN);
        // Versão Didática: O sistema vai até a memória do navegador buscar o histórico de transações.
        // Versão Técnica: Resgate síncrono da string serializada via LocalStorage.
        
        // Se a corrente já existir no computador ele transforma o texto em dados e retorna
        if (chain) return JSON.parse(chain);
        // Versão Didática: Se a corrente já existir, nós a transformamos em dados para o sistema usar.
        // Versão Técnica: Condicional de desserialização JSON para retorno de coleção persistida.
        
        // Se a rede nunca foi ligada antes ele monta a ficha do Bloco Gênesis inicial
        const genesisBlock = {
            // Define a posição zero como o ponto de partida absoluto da blockchain
            id: 0,
            // Registra a data e o horário exato da criação e nascimento da rede
            // Versão Didática: Este é o bloco número zero, o começo de tudo.
            // Versão Técnica: Identificador de índice zero para o bloco de fundação.

            timestamp: new Date().toLocaleString('pt-BR'),
            // Define que a transação inicial partiu de forma automática do próprio sistema
            // Versão Didática: Anota a data e hora exata em que a rede nasceu.
            // Versão Técnica: Carimbo de tempo regionalizado para auditoria de criação.

            origem: "SISTEMA",
            // Define o destino do registro inicial direcionado para a própria rede local
            destino: "REDE ALT",
            // Define o saldo monetário padrão como zero para este bloco de fundação
            valor: 0,
            // Insere uma sequência zerada de segurança por não existir bloco anterior
            previousHash: "0000000000000000",
            // Grava a assinatura criptográfica exclusiva de nascimento fixada no sistema
            hash: "8B9A2F1C4D5E6F7G"
            // Versão Didática: Definimos os dados de nascimento da rede com uma assinatura de segurança especial.
            // Versão Técnica: Propriedades imutáveis do Bloco Gênesis para ancoragem da corrente.
        };
        
        const newChain = [genesisBlock];
        // Versão Didática: Colocamos o bloco de nascimento em uma nova lista.
        // Versão Técnica: Inicialização do vetor de objetos da blockchain.
        
        localStorage.setItem(this.KEYS.CHAIN, JSON.stringify(newChain));
        // Versão Didática: Salvamos essa nova lista no computador.
        // Versão Técnica: Persistência física do estado inicial da rede.
        
        return newChain;
        // Versão Didática: Entregamos a rede pronta para ser usada.
        // Versão Técnica: Retorno da estrutura de dados inicializada.
    },

    addBlock: function (origem, destino, valor) {
        // Versão Didática: Esta função adiciona uma nova transação na rede, como se estivesse escrevendo uma nova página no livro.
        // Versão Técnica: Método de mineração e acréscimo de novos nós (blocos) na estrutura de dados.

        const chain = this.getChain();
        // Versão Didática: Pegamos a corrente atual de transações.
        // Versão Técnica: Carregamento síncrono da chain para memória RAM.
        
        const previousBlock = chain[chain.length - 1];
        // Versão Didática: Olhamos qual foi o último bloco que foi adicionado.
        // Versão Técnica: Referenciação do último elemento do array para extração do hash anterior.
        
        const newBlock = {
            id: chain.length,
            timestamp: new Date().toLocaleString('pt-BR'),
            origem: origem,
            destino: destino,
            valor: valor,
            previousHash: previousBlock.hash,
            hash: ""
            // Versão Didática: Criamos um novo bloco com os dados da transação e o carimbo do bloco anterior para ligá-los.
            // Versão Técnica: Instanciação de novo objeto de bloco com encadeamento de hash (Linking).
        };
        
        newBlock.hash = this.generateHash(
            newBlock.id,
            newBlock.timestamp,
            { origem, destino, valor },
            newBlock.previousHash
        );
        
        // Versão Didática: Calculamos a assinatura digital única para este novo bloco.
        // Versão Técnica: Execução da rotina de hashing para selagem do bloco.

        chain.push(newBlock);
        // Versão Didática: Colocamos o novo bloco no final da nossa corrente.
        // Versão Técnica: Inserção do novo nó no final da coleção.
        
        localStorage.setItem(this.KEYS.CHAIN, JSON.stringify(chain));
        // Versão Didática: Salvamos tudo de volta na memória do computador.
        // Versão Técnica: Persistência da chain atualizada.
        
        return newBlock;
        // Versão Didática: Devolvemos o bloco pronto para ser exibido na tela.
        // Versão Técnica: Retorno do bloco minerado.
    },

    isChainValid: function () {
        // Versão Didática: Esta função é o "Auditor". Ela confere se ninguém tentou falsificar ou alterar as transações passadas.
        // Versão Técnica: Algoritmo de validação de integridade linear para detecção de adulteração (Tampering).

        const chain = this.getChain();
        // Versão Didática: Pegamos a corrente inteira de blocos.
        // Versão Técnica: Carregamento da coleção para análise.
        
        for (let i = 1; i < chain.length; i++) {
            const current = chain[i];
            // Versão Didática: Olhamos para o bloco atual que estamos conferindo.
            // Versão Técnica: Atribuição do ponteiro do bloco de análise.

            const previous = chain[i - 1];
            // Versão Didática: Olhamos para o bloco que veio logo antes dele.
            // Versão Técnica: Atribuição do ponteiro do bloco de referência.
            
            if (current.previousHash !== previous.hash) return false;
            // Versão Didática: Se o carimbo que o bloco atual diz ter do anterior não bater com o carimbo real, o sistema avisa que houve fraude!
            // Versão Técnica: Verificação de quebra de encadeamento criptográfico.
        }
        
        return true;
        // Versão Didática: Se conferirmos tudo e estiver certo, o sistema dá o sinal de "Sucesso".
        // Versão Técnica: Confirmação de integridade da blockchain.
    },

    clearLedger: function () {
        // Versão Didática: Esta função apaga todo o histórico de transações do computador.
        // Versão Técnica: Método de expurgo da chain para reset de ambiente.

        localStorage.removeItem(this.KEYS.CHAIN);
        // Versão Didática: Remove a gaveta da blockchain para sempre.
        // Versão Técnica: Deleção física da chave no LocalStorage.
    }
};
  