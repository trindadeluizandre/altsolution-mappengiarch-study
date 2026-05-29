export const StorageService = {
    // Versão Didática: Esta linha cria o "Cofre de Dados" (Serviço), que é o gerente central responsável por salvar e ler todas as informações do sistema no navegador.
    // Versão Técnica: Declaração de um objeto constante exportável que implementa o padrão Singleton para centralizar operações de persistência de dados.
    
    KEYS: {
        // Versão Didática: Aqui abrimos uma lista de "Etiquetas", que servem para dar nome às gavetas onde guardaremos as informações para não as perdermos.
        // Versão Técnica: Definição de uma Lookup Table (Tabela de Consulta) para chaves de string, evitando o uso de "Magic Strings" e facilitando a manutenção.
        
        USERS: 'alt_solution_users',
        // Versão Didática: Esta é a etiqueta da gaveta que guarda a lista completa de todas as pessoas que se cadastraram no sistema.
        // Versão Técnica: Identificador persistente utilizado como chave primária para a coleção de objetos de usuários serializados no localStorage.
        
        SESSION: 'usuario_sessao'
        // Versão Didática: Esta é a etiqueta da gaveta que guarda apenas os dados da pessoa que está usando o sistema agora (quem está "logado").
        // Versão Técnica: Chave de endereçamento para o estado de sessão única, armazenando o perfil do usuário autenticado para controle de acesso.
    },
    // Versão Didática: Fechamento das chaves da lista de etiquetas.
    // Versão Técnica: Encerramento do sub-objeto de mapeamento de constantes literais.

    getUsers: function () {
        // Versão Didática: Esta função é o motor de leitura que resgata a lista de todos os usuários cadastrados na memória do sistema.
        // Versão Técnica: Getter que encapsula o resgate síncrono da coleção JSON, servindo como a interface de leitura primária do banco local.

        const users = localStorage.getItem(this.KEYS.USERS);
        // Versão Didática: O sistema vai até a memória física do navegador e puxa os dados guardados sob a etiqueta de usuários.
        // Versão Técnica: Recuperação de string serializada via Web Storage API utilizando resolução de escopo (this) para acessar chaves de infraestrutura.
        
        return users ? JSON.parse(users) : [];
        // Versão Didática: É o filtro de inteligência: se houver dados, ele os converte para uso; se for o primeiro acesso, ele entrega uma lista limpa.
        // Versão Técnica: Aplicação de lógica ternária para parsing condicional. Garante que o retorno seja sempre um Array iterável.
    },

    saveUser: function (userData) {
        // Versão Didática: É o gerente de arquivos: ele recebe informações novas e decide se deve criar um registro novo ou atualizar um antigo.
        // Versão Técnica: Função de Upsert (Update + Insert) que manipula a persistência baseada no estado atual da coleção de objetos.

        const users = this.getUsers();
        // Versão Didática: Antes de salvar, o sistema carrega a lista atual de quem já existe para não criar duplicados.
        // Versão Técnica: Invocação interna de método para garantir que a mutação ocorra sobre o estado mais recente da coleção desserializada.
        
        const index = users.findIndex(u => u.wallet === userData.wallet || u.email === userData.email);
        // Versão Didática: O sistema atua como um detetive, procurando na lista se já existe alguém usando o mesmo e-mail ou a mesma carteira digital.
        // Versão Técnica: Algoritmo de busca linear com predicado de disjunção lógica para identificação de colisões de identificadores únicos.
        
        if (index !== -1) {
            // Versão Didática: Se o sistema encontrar a pessoa na lista, ele entra aqui para atualizar os dados dela.
            // Versão Técnica: Estrutura de controle que desvia o fluxo para a lógica de 'Update' caso o índice de referência seja válido.

            users[index] = { ...users[index], ...userData };
            // Versão Didática: Aqui o sistema mantém o que já existia na conta e só troca ou adiciona o que veio de novo na ficha.
            // Versão Técnica: Operação de mesclagem (Shallow Merge) via Spread Operator, preservando a imutabilidade de metadados pré-existentes.

        } else {
            // Versão Didática: Se a pessoa for totalmente nova no sistema, ele simplesmente adiciona a nova ficha no final da lista.
            // Versão Técnica: Cláusula de desvio alternativo para execução da lógica de inserção (Insert).

            users.push(userData);
            // Versão Didática: O sistema simplesmente adiciona a nova ficha de usuário no final da fila da nossa lista de cadastros.
            // Versão Técnica: Inserção de elemento no final da coleção utilizando o método mutativo push do protótipo Array.
        }
        
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
        // Versão Didática: Por fim, o sistema transforma a lista atualizada em texto e tranca a gaveta do computador com os novos dados.
        // Versão Técnica: Serialização final da estrutura de dados via JSON.stringify e persistência física síncrona no disco local (setItem).
    },

    getSession: function () {
        // Versão Didática: Esta função verifica quem é o usuário que está com a sessão aberta no momento.
        // Versão Técnica: Método de consulta de estado síncrono para validação de persistência de identidade de usuário.

        const session = localStorage.getItem(this.KEYS.SESSION);
        // Versão Didática: O sistema busca na gaveta de sessão o texto com o registro do usuário ativo.
        // Versão Técnica: Recuperação de string serializada via LocalStorage.
        
        return session ? JSON.parse(session) : null;
        // Versão Didática: Se houver alguém logado, transformamos os dados em algo legível; caso contrário, retornamos vazio.
        // Versão Técnica: Desserialização condicional retornando o objeto de sessão ou null.
    },

    setSession: function (user) {
        // Versão Didática: Quando alguém faz login, pegamos os dados dessa pessoa e guardamos na gaveta de sessão ativa.
        // Versão Técnica: Método mutador de estado responsável por estabelecer a persistência de credenciais pós-autenticação.

        localStorage.setItem(this.KEYS.SESSION, JSON.stringify(user));
        // Versão Didática: Converte a ficha do usuário logado em texto e salva na gaveta de sessão.
        // Versão Técnica: Serialização e gravação física do objeto de usuário.
    },

    logout: function () {
        // Versão Didática: Esta função simplesmente joga fora as informações da gaveta de sessão, deslogando o usuário.
        // Versão Técnica: Método de invalidação de estado de sessão via remoção de chave.

        localStorage.removeItem(this.KEYS.SESSION);
        // Versão Didática: Elimina definitivamente o conteúdo guardado na gaveta de sessão.
        // Versão Técnica: Invocação do método de deleção removeItem(), expurgando a chave do disco local.
    },

    getUserByWallet: function (wallet) {
        // Versão Didática: Esta função pesquisa um cadastro completo usando o endereço da carteira digital.
        // Versão Técnica: Método utilitário de busca indexada por parâmetro de string alfanumérica.

        const users = this.getUsers();
        // Versão Didática: Carrega a lista completa de usuários cadastrados na memória do sistema.
        // Versão Técnica: Recuperação da coleção desserializada via método interno.
        
        return users.find(u => u.wallet === wallet);
        // Versão Didática: Percorre a lista inteira e retorna o usuário que possui a carteira idêntica.
        // Versão Técnica: Aplicação do iterador de alta ordem find() para varredura estrita baseada em igualdade de valor e tipo.
    },

    clearAll: function () {
        // Versão Didática: Esta é a função de limpeza total. Ela apaga todos os usuários e todas as sessões do navegador.
        // Versão Técnica: Método utilitário de purga e reconfiguração de estado projetado para reset de ambiente.

        localStorage.removeItem(this.KEYS.USERS);
        // Versão Didática: Remove de forma definitiva todos os cadastros guardados no computador.
        // Versão Técnica: Deleção física da coleção de usuários.

        localStorage.removeItem(this.KEYS.SESSION);
        // Versão Didática: Remove de forma definitiva a identificação do usuário logado atualmente.
        // Versão Técnica: Deleção física do token de sessão.
    },

    hasGenesis: function () {
        // Versão Didática: Esta função pergunta ao sistema: "Já existe um Administrador Raiz (Gênesis) cadastrado?".
        // Versão Técnica: Método de validação condicional para controle de fluxo de inicialização.

        const users = this.getUsers();
        // Versão Didática: Busca e carrega para a memória a lista atual de usuários salvos.
        // Versão Técnica: Resgate síncrono da coleção.
        
        return users.some(u => u.origem === "Ambiente Gênesis");
        // Versão Didática: Verifica na lista inteira se algum registro possui a origem igual ao mestre.
        // Versão Técnica: Aplicação do método some() para validação linear de existência de propriedade específica.
    },

    getGenesisUser: function () {
        // Versão Didática: Esta função recupera os dados completos da conta do administrador mestre.
        // Versão Técnica: Método de busca restrita para carregamento de escopo de privilégios de administração.

        const users = this.getUsers();
        // Versão Didática: Busca e carrega para a memória a lista atual de usuários salvos.
        // Versão Técnica: Resgate síncrono da coleção.
        
        return users.find(u => u.origem === "Ambiente Gênesis");
        // Versão Didática: Vasculha a lista de usuários e retorna o perfil de quem iniciou o sistema.
        // Versão Técnica: Utilização do algoritmo de busca linear find() para identificação do nó raiz.
    }
};
