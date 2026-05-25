Mapeamento Técnico de Persistência: storage.js
Responsável Técnico André Luiz Trindade

Este documento reúne a análise estrutural e atômica das rotinas de persistência e gerenciamento de dados locais do arquivo storage.js dentro do ecossistema ALT Solution.

Estrutura do Objeto Principal (StorageService)

O módulo atua como a engrenagem central de leitura, escrita e validação de dados no disco local do navegador (localStorage).

Subbloco 01 - Configuração de Chaves (KEYS)
Comando Analisado: KEYS: { USERS: 'alt_solution_users', SESSION: 'usuario_sessao' }

Análise de Engenharia: Criação de um dicionário estático de propriedades do objeto. Mapeia chaves alfanuméricas estruturadas para centralizar os nomes das strings utilizadas no armazenamento físico local, prevenindo erros de digitação ao longo do ciclo de vida do software.

Subbloco 02 - Recuperação de Usuários Cadastrados (getUsers)

Comando Analisado: getUsers: function () { ... }

Análise de Engenharia: Definição de método anônimo clássico para o encapsulamento do resgate de dados. Realiza uma leitura síncrona com localStorage.getItem(). Retorna o dado convertido via JSON.parse() ou aplica curto-circuito gerando um array vazio [] para blindar o sistema contra falhas de tipo (TypeError).

Subbloco 03 - Gravação e Atualização de Usuários (saveUser)
Comando Analisado: saveUser: function (userData) { ... }

Análise de Engenharia: Método de controle mutacional que utiliza o algoritmo findIndex() com disjunção lógica (||) para rastrear duplicidade de e-mail ou carteira digital. Se o registro existir, executa mutação posicional com o operador de espalhamento (... Spread Operator) para preservar metadados antigos. Caso contrário, adiciona o elemento via push() e commita os dados em formato texto stringificado.

Subbloco 04 - Gerenciamento de Sessão Ativa (getSession, setSession, logout)

Comando Analisado: Rotinas de controle de estado de login.

Análise de Engenharia: Tríade de gerenciamento de estado. getSession avalia a presença de sessão ativa no ciclo atual retornando o objeto ou null. setSession estabelece a persistência pós-autenticação. logout executa a invalidação e expurgo da chave através do método removeItem().

Subbloco 05 - Busca por Wallet (getUserByWallet)

Comando Analisado: getUserByWallet: function (wallet) { ... }

Análise de Engenharia: Método utilitário de busca indexada. Aplica o iterador de alta ordem find() executando varredura estrita baseada em igualdade de valor e tipo (===), retornando a referência do objeto correspondente.

Subbloco 06 - Rotinas de Protocolo QA (clearAll, hasGenesis, getGenesisUser)

Comando Analisado: Métodos de validação e reinicialização de ambiente.

Análise de Engenharia: clearAll atua como ferramenta de purga ambiental para automação de testes. hasGenesis e getGenesisUser operam algoritmos de validação linear utilizando os métodos some() e find() para identificar a existência e carregar privilégios do nó administrador raiz (Ambiente Gênesis).

Detalhamento Atômico de Linhas

export const StorageService = {

Versão Técnica (Bloco Primário de Segundo Escalão): Declaração e exportação de um módulo contendo um objeto literal na sintaxe ES6, permitindo o compartilhamento centralizado da lógica de persistência por toda a aplicação.

KEYS: { USERS: 'alt_solution_users', SESSION: 'usuario_sessao' },

Versão Técnica (Bloco Primário de Segundo Escalão): Criação de um dicionário estático de propriedades do objeto. Mapeia chaves alfanuméricas estruturadas para centralizar os nomes das strings utilizadas no armazenamento físico local.

getUsers: function () {

Versão Técnica (Elemento Primário de Segundo Escalão): Definição de método anônimo de assinatura clássica atado à propriedade do objeto principal, responsável pelo encapsulamento do resgate de dados de usuários.

const users = localStorage.getItem(this.KEYS.USERS);

Versão Técnica (Elemento Secundário): Declaração de constante de escopo de bloco que recebe o retorno síncrono da chamada à API nativa de armazenamento do navegador através do método getItem().

return users ? JSON.parse(users) : [];

Versão Técnica (Elemento Secundário): Execução de uma operação condicional ternária para avaliação de presença de dados. Se a constante contiver uma string válida, invoca o interpretador JSON.parse() para desserializar o formato texto de volta para um vetor de objetos. Caso seja avaliado como nulo, aplica curto-circuito e retorna um array vazio literal [].

saveUser: function (userData) {

Versão Técnica (Bloco Primário de Segundo Escalão): Método de controle mutacional que aceita um parâmetro de objeto genérico para gerenciamento de registros na base local.

const users = this.getUsers();

Versão Técnica (Bloco Secundário): Invocação interna do método do mesmo escopo via palavra-chave this para recuperar o array desserializado de usuários.

const index = users.findIndex(u => u.wallet === userData.wallet || u.email === userData.email);

Versão Técnica (Bloco Secundário): Aplicação do método utilitário de array findIndex(). O predicado de busca utiliza uma operação de disjunção lógica (||) para comparar as propriedades de string de e-mail e carteira digital, retornando o índice numérico da primeira ocorrência encontrada ou o valor -1 caso não exista.

if (index !== -1) {

Versão Técnica (Bloco Secundário): Estrutura de controle condicional que avalia o índice retornado para determinar o fluxo de bifurcação da aplicação.

users[index] = { ...users[index], ...userData };

Versão Técnica (Elemento Terciário): Operação de mutação pontual por índice utilizando a sintaxe de espalhamento (Spread Operator ...). Clona e mescla as propriedades do objeto pré-existente com os novos dados recebidos, evitando a perda de metadados antigos.

} else {

Versão Técnica (Bloco Secundário): Cláusula de desvio alternativo para tratamento de novos registros não identificados no mapeamento linear.

users.push(userData);

Versão Técnica (Elemento Terciário): Inserção linear de elemento no final do array utilizando o método nativo de mutação de coleção push().

localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));

Versão Técnica (Bloco Secundário): Interface final de persistência. Invoca JSON.stringify() para converter a coleção inteira em string estruturada e realiza a gravação síncrona no disco local através de setItem().

getSession: function () {

Versão Técnica (Bloco Primário de Segundo Escalão): Método de consulta de estado síncrono para validação de persistência de identidade de usuário no ciclo atual da aplicação.

const session = localStorage.getItem(this.KEYS.SESSION);

Versão Técnica (Bloco Secundário): Declaração de constante local que aloca o resultado da leitura da chave de sessão na API de armazenamento.

return session ? JSON.parse(session) : null;

Versão Técnica (Bloco Secundário): Aplicação de expressão lógica ternária. Caso a chave exista, realiza a conversão estrutural com JSON.parse(); se for nula, retorna explicitamente o tipo primitivo null, indicando a ausência de um login ativo.

setSession: function (user) {

Versão Técnica (Bloco Primário de Segundo Escalão): Método mutador de estado responsável por estabelecer a persistência de credenciais pós-autenticação.

localStorage.setItem(this.KEYS.SESSION, JSON.stringify(user));

Versão Técnica (Bloco Secundário): Executa a gravação física no armazenamento local serializando o objeto do usuário em string por meio do método global JSON.stringify().

logout: function () {

Versão Técnica (Bloco Primário de Segundo Escalão): Método de invalidação de estado de sessão do lado do cliente.

localStorage.removeItem(this.KEYS.SESSION);

Versão Técnica (Bloco Secundário): Invocação do método de deleção removeItem(), expurgando a chave do disco local e revogando os privilégios de acesso do usuário.

getUserByWallet: function (wallet) {

Versão Técnica (Bloco Primário de Segundo Escalão): Método utilitário de busca indexada por parâmetro de string alfanumérica.

const users = this.getUsers();

Versão Técnica (Bloco Secundário): Carrega o array unificado de dados desserializados utilizando o método utilitário local do objeto.

return users.find(u => u.wallet === wallet);

Versão Técnica (Bloco Secundário): Aplicação do método iterador de alta ordem find(). Executa uma varredura estrita baseada em igualdade de valor e tipo (===), retornando a referência do objeto correspondente ou undefined se a carteira não constar no repositório.

clearAll: function () {

Versão Técnica (Bloco Primário de Segundo Escalão): Método utilitário de purga e reconfiguração de estado, projetado especificamente para o ciclo de testes automatizados e reset de ambiente.

localStorage.removeItem(this.KEYS.USERS);

Versão Técnica (Bloco Secundário): Invoca a remoção física da chave de dados de usuários, limpando o array persistido.

localStorage.removeItem(this.KEYS.SESSION);

Versão Técnica (Bloco Secundário): Invoca a remoção física da chave de estado de sessão, deslogando qualquer conta de forma abrupta.

hasGenesis: function () {

Versão Técnica (Bloco Primário de Segundo Escalão): Método de validação condicional para controle de fluxo de inicialização do ecossistema.

const users = this.getUsers();

Versão Técnica (Bloco Secundário): Executa o resgate síncrono da coleção de usuários salvos na memória através do método interno.

return users.some(u => u.origem === "Ambiente Gênesis");

Versão Técnica (Bloco Secundário): Aplicação do método iterador de alta ordem some(). Retorna um valor booleano (true ou false) indicando se ao menos um elemento cumpre o critério de igualdade estrita para a propriedade de identificação de origem.

getGenesisUser: function () {

Versão Técnica (Bloco Primário de Segundo Escalão): Método de busca restrita para carregamento de escopo de privilégios de administration.

return users.find(u => u.origem === "Ambiente Gênesis");

Versão Técnica (Bloco Secundário): Utiliza o algoritmo de busca linear find() para rastrear a coleção e retornar a referência do primeiro objeto de usuário que contém a propriedade de string correspondente à raiz do sistema.