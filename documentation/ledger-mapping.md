# Mapeamento Atômico: ledger.js
**Técnico Responsável:** André Luiz Trindade

Este documento detalha o motor da blockchain da ALT Solution, separando a lógica de negócios (Didática) da mecânica de engenharia (Técnica).

---

## 1. Motor de Hashing (Blindagem de Dados)

### Elemento: `generateHash: function (...) { ... }`
*   **Versão Didática:** É a nossa máquina de criar carimbos digitais. Ela pega qualquer informação e transforma em um código único.
*   **Versão Técnica:** Implementação do algoritmo DJB2. Utiliza operações de bitwise para converter strings em hashes hexadecimais imutáveis.

### Elemento: `hash = ((hash << 5) - hash) + char;`
*   **Versão Didática:** Esta é a "fórmula secreta" que embaralha os dados para que ninguém consiga descobrir o que foi escrito apenas olhando para o carimbo.
*   **Versão Técnica:** Operador de deslocamento binário combinado com aritmética. Minimiza colisões de hash ao distribuir os valores nos 32 bits disponíveis.

---

## 2. Gerenciamento da Corrente (Chain Management)

### Elemento: `getChain: function () { ... }`
*   **Versão Didática:** É a função que lê o livro de registros. Se o livro estiver vazio, ela escreve a primeira página.
*   **Versão Técnica:** Singleton de carregamento de dados com rotina de fallback para inicialização do Bloco Gênesis.

### Elemento: `const genesisBlock = { ... }`
*   **Versão Didática:** Este é o "Bloco de Nascimento" da rede. Ele não tem transações, apenas marca o dia em que o sistema começou.
*   **Versão Técnica:** Objeto âncora imutável (Hardcoded) que serve como ponto de confiança (Trust Anchor) para o encadeamento da blockchain.

---

## 3. Registro de Transações (Mining)

### Elemento: `addBlock: function (...) { ... }`
*   **Versão Didática:** É a função que escreve uma nova transação no livro, sempre amarrando a página nova com a assinatura da página anterior.
*   **Versão Técnica:** Método mutador que implementa o conceito de Linked List criptográfica, onde cada nó contém a referência (hash) do nó predecessor.

### Elemento: `previousHash: previousBlock.hash`
*   **Versão Didática:** Este é o "elo da corrente". Ele garante que, se alguém mexer em um bloco antigo, todos os blocos seguintes quebrarão.
*   **Versão Técnica:** Pointer de integridade retroativa. É o mecanismo fundamental que torna a blockchain imutável.

---

## 4. Auditoria de Segurança (QA Audit)

### Elemento: `isChainValid: function () { ... }`
*   **Versão Didática:** É o nosso inspetor de segurança. Ele percorre a corrente inteira conferindo se todos os elos estão perfeitamente encaixados.
*   **Versão Técnica:** Verificador de consistência linear. Compara o hash persistido contra o recálculo dinâmico para detectar Tampering.

### Elemento: `if (current.previousHash !== previous.hash) return false;`
*   **Versão Didática:** Se o inspetor achar uma assinatura que não bate com a anterior, ele imediatamente para tudo e avisa que o sistema foi violado.
*   **Versão Técnica:** Gatilho de invalidação de integridade. Retorna um estado booleano negativo que pode ser usado pela interface para travar o sistema.

---

## Detalhamento Atômico de Elementos Técnicos

**str.charCodeAt(i)**
*   **Versão Didática:** Transforma uma letra em um número que o computador entende para podermos fazer as contas.
*   **Versão Técnica:** Recuperação do valor numérico UTF-16 do caractere para processamento aritmético.

**Math.abs(hash).toString(16)**
*   **Versão Didática:** Transforma o resultado final da conta em um código alfanumérico curto e fácil de ler.
*   **Versão Técnica:** Casting de tipo numérico para representação hexadecimal (Base 16).

**chain[chain.length - 1]**
*   **Versão Didática:** Pega o último registro que foi salvo para servir de base para o próximo.
*   **Versão Técnica:** Acesso posicional ao último índice do array de objetos.

**localStorage.removeItem(...)**
*   **Versão Didática:** Limpa o cofre de transações, jogando fora todo o histórico salvo.
*   **Versão Técnica:** Invalidação física de dados persistidos para reset de estado.

---
*Documento atualizado para conformidade com o padrão de Auditoria de QA da ALT Solution.*

Detalhamento Atômico de Linhas

addBlock: function (origem, destino, valor) {

Versão Técnica (Elemento Primário de Segundo Escalão): Definição de método anônimo clássico parametrizado para captura de dados de transação e execução do ciclo de mineração de bloco.

const chain = this.getChain();

Versão Técnica (Elemento Secundário): Invocação interna do método getChain via palavra-chave this para carregar o array atual de blocos para a memória operacional.

const previousBlock = chain[chain.length - 1];

Versão Técnica (Elemento Secundário): Acessa posicionalmente o último elemento do array de blocos utilizando a propriedade length subtraída por um, isolando o nó predecessor.

const newBlock = {

Versão Técnica (Elemento Secundário): Instanciação de objeto literal em memória estruturando os metadados e os parâmetros de transação do novo bloco da rede.

id: chain.length,

Versão Técnica (Elemento Terciário): Atribuição do índice sequencial do bloco, utilizando o tamanho atual do array como indexador numérico automático.

timestamp: new Date().toLocaleString('pt-BR'),

Versão Técnica (Elemento Terciário): Geração de string de data e hora local do sistema operacional formatada para o padrão regional brasileiro.

origem: origem,

Versão Técnica (Elemento Terciário): Mapeamento da propriedade correspondente ao endereço da carteira ou entidade remetente da transação.

destino: destino,

Versão Técnica (Elemento Terciário): Mapeamento da propriedade correspondente ao endereço da carteira ou entidade destinatária da transação.

valor: valor,

Versão Técnica (Elemento Terciário): Atribuição do valor numérico correspondente ao montante financeiro transferido no escopo do bloco.

previousHash: previousBlock.hash,

Versão Técnica (Elemento Terciário): Acoplamento estrutural do hash do bloco predecessor, estabelecendo o elo criptográfico de retroalimentação da blockchain.

hash: ""

Versão Técnica (Elemento Terciário): Inicialização da propriedade hash com string vazia, reservando o espaço em memória para o cálculo subsequente.

};

Versão Técnica (Elemento Secundário): Fechamento do escopo de modelagem do objeto literal do novo bloco.

newBlock.hash = this.generateHash(

Versão Técnica (Elemento Secundário): Atribuição mutacional da propriedade hash através da invocação do método interno generateHash.

newBlock.id, newBlock.timestamp, { origem, destino, valor }, newBlock.previousHash

Versão Técnica (Elemento Terciário): Passagem ordenada de argumentos para a função geradora, incluindo um objeto literal contendo o payload da transação.

);

Versão Técnica (Elemento Secundário): Fechamento da instrução de chamada e atribuição do método gerador de hash.

chain.push(newBlock);

Versão Técnica (Elemento Terciário): Inserção síncrona do objeto do bloco completamente processado e assinado no final da coleção da corrente.

localStorage.setItem(this.KEYS.CHAIN, JSON.stringify(chain));

Versão Técnica (Bloco Secundário): Serialização do vetor atualizado de blocos em string e gravação síncrona definitiva no disco local através do método setItem().

return newBlock;

Versão Técnica (Elemento Secundário): Cláusula de encerramento do método que expõe e disponibiliza o objeto do bloco minerado para os módulos consumidores da interface.

Subbloco 04 - Auditoria de Integridade e Purga do Ambiente (isChainValid e clearLedger)
Comando Analisado: Métodos de verificação de consistência e limpeza de escopo.

Análise de Engenharia: Execução de algoritmo de varredura cíclica com complexidade de tempo linear para auditoria retrospectiva. Avalia a imutabilidade do encadeamento comparando o ponteiro de reuso de hash do nó corrente contra a propriedade de assinatura física do nó predecessor. O método de purga opera a invalidação do banco local de blocos para reconfiguração de ambiente em ciclos de QA.

Detalhamento Atômico de Linhas

isChainValid: function () {

Versão Técnica (Elemento Primário de Segundo Escalão): Definição de método de consulta analítica responsável pela validação da árvore criptográfica e consistência interna dos blocos persistidos.

const chain = this.getChain();

Versão Técnica (Elemento Secundário): Invocação interna do método utilitário de leitura para carregar o array unificado de blocos para processamento.

for (let i = 1; i < chain.length; i++) {

Versão Técnica (Elemento Secundário): Estrutura de repetição indexada inicializada no índice um, permitindo a comparação retroativa segura com o elemento predecessor zero (Bloco Gênesis).

const current = chain[i];

Versão Técnica (Elemento Terciário): Isolamento do ponteiro do bloco atual correspondente ao índice da iteração vigente no laço.

const previous = chain[i - 1];

Versão Técnica (Elemento Terciário): Isolamento posicional do bloco predecessor através da subtração unitária do índice de iteração atual.

if (current.previousHash !== previous.hash) return false;

Versão Técnica (Elemento Secundário): Condicional de verificação que aplica o operador de desigualdade estrita. Caso o hash retroativo armazenado divirja do hash real do bloco predecessor, quebra o fluxo de execução e retorna false.

}

Versão Técnica (Elemento Secundário): Fechamento do escopo de execução do laço de repetição de auditoria linear.

return true;

Versão Técnica (Elemento Secundário): Retorno padrão emitido apenas se o ciclo completo de iterações for concluído sem disparar nenhuma inconsistência de hashes.

clearLedger: function () {

Versão Técnica (Bloco Primário de Segundo Escalão): Método utilitário de purga projetado para limpeza de persistência e isolamento de cenários em testes de integração.

localStorage.removeItem(this.KEYS.CHAIN);

Versão Técnica (Bloco Secundário): Invoca o expurgo físico da chave da blockchain do disco, forçando o sistema a executar uma nova rotina de boot no próximo ciclo.