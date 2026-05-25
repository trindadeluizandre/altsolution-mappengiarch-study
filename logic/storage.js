// Camada de Persistência ALT Solution - Serviço de Armazenamento Global
export const StorageService = {
    
    // Configuração geral das chaves de acesso do banco de dados local
    // Cria os nomes fixos das gavetas que guardam as informações no computador
    KEYS: {
        // Define o nome da gaveta que vai armazenar todos os usuários cadastrados
        USERS: 'alt_solution_users',
        // Define o nome da gaveta que vai armazenar a sessão do usuário conectado
        SESSION: 'usuario_sessao'
    },

    // Função que realiza a busca e o resgate dos usuários salvos
    // Vai até a gaveta de cadastros e transforma o texto em uma lista organizada
    getUsers: function () {
        // Procura no computador o texto bruto salvo na gaveta de usuários
        const users = localStorage.getItem(this.KEYS.USERS);
        
        // Se encontrar o texto ele converte em lista se não devolve uma lista vazia
        return users ? JSON.parse(users) : [];
    },

    // Função principal responsável por salvar ou atualizar as informações do usuário
    // Recebe a ficha com os dados de cadastro e decide se atualiza ou se cria um novo
    saveUser: function (userData) {
        // Carrega a lista completa de usuários já existentes na memória
        const users = this.getUsers();
        
        // Vasculha a lista para encontrar a linha de alguém com a mesma carteira ou e-mail
        const index = users.findIndex(u => u.wallet === userData.wallet || u.email === userData.email);
        
        // Verifica se o usuário já foi localizado antes na lista de registros
        if (index !== -1) {
            // Junta as informações antigas do usuário com as novas informações recebidas
            users[index] = { ...users[index], ...userData };
        } else {
            // Insere os novos dados do usuário como uma conta inédita no final da lista
            users.push(userData);
        }
        
        // Transforma a lista atualizada em formato de texto e tranca de volta na gaveta
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    },

    // Função que verifica se existe algum usuário conectado no sistema atualmente
    // Puxa o crachá de identificação salvo e o converte em dados legíveis
    getSession: function () {
        // Busca na gaveta de sessão o texto com o registro do usuário ativo
        const session = localStorage.getItem(this.KEYS.SESSION);
        
        // Se encontrar o texto da sessão ele converte em dados se não retorna vazio
        return session ? JSON.parse(session) : null;
    },

    // Função que cria e salva a sessão ativa do usuário ao entrar no sistema
    // Pega a ficha do usuário conectado e guarda com segurança na gaveta de sessão
    setSession: function (user) {
        // Converte a ficha do usuário logado em texto e salva na gaveta de sessão
        localStorage.setItem(this.KEYS.SESSION, JSON.stringify(user));
    },

    // Função que encerra o acesso do usuário e limpa o estado de login
    // Abre a gaveta de sessão ativa e remove completamente o registro de lá dentro
    logout: function () {
        // Elimina definitivamente o conteúdo guardado na gaveta de sessão
        localStorage.removeItem(this.KEYS.SESSION);
    },

    // Função utilitária que pesquisa um cadastro completo usando a carteira digital
    // Varre a lista de usuários salvos procurando quem tem o endereço igual ao enviado
    getUserByWallet: function (wallet) {
        // Carrega a lista completa de usuários cadastrados na memória do sistema
        const users = this.getUsers();
        
        // Percorre a lista inteira e retorna o usuário que possui a carteira idêntica
        return users.find(u => u.wallet === wallet);
    },

    // Função exclusiva do ambiente de testes para limpar o banco de dados
    // Apaga completamente as gavetas de usuários e de sessões do navegador
    clearAll: function () {
        // Remove de forma definitiva todos os cadastros guardados no computador
        localStorage.removeItem(this.KEYS.USERS);
        // Remove de forma definitiva a identificação do usuário logado atualmente
        localStorage.removeItem(this.KEYS.SESSION);
    },

    // Função que checa a existência de um usuário mestre no sistema
    // Examina os cadastros e responde se encontrou alguém com o rótulo do criador
    hasGenesis: function () {
        // Busca e carrega para a memória a lista atual de usuários salvos
        const users = this.getUsers();
        
        // Verifica na lista inteira se algum registro possui a origem igual ao mestre
        return users.some(u => u.origem === "Ambiente Gênesis");
    },

    // Função que recupera os dados completos da conta do administrador mestre
    // Vasculha a lista de usuários e retorna o perfil de quem iniciou o sistema
    getGenesisUser: function () {
        // Busca e carrega para a memória a lista atual de usuários salvos
        const users = this.getUsers();
        
        // Procura na lista e traz o objeto completo do usuário com origem no mestre
        return users.find(u => u.origem === "Ambiente Gênesis");
    }
};

