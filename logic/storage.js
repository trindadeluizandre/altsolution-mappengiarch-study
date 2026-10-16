// logic/storage.js

export const StorageService = {
    KEYS: {
        USERS: 'alt_solution_users',
        SESSION: 'usuario_sessao'
    },

    ROLE_LEVELS: {
        "Administrador Gênesis": 0,
        
        "Presidente do Conselho": 1,
        "Conselheiro Consultivo": 1,
        "CEO": 1,
        "COO": 1,
        "CFO": 1,
        "CTO": 1,
        "CMO": 1,
        "CHRO": 1,
        "CIO": 1,
        "CLO": 1,
        "CCO": 1,
        "CDO": 1,
        "Presidente": 1,
        "Vice-Presidente Executivo": 1,

        "Diretor Regional": 2,
        "Diretor de Unidade": 2,
        "Diretor Adjunto": 2,
        "Gerente de Divisão": 2,
        "Gerente Geral": 2,
        "Gerente de Planta": 2,

        "Gerente de Departamento": 3,
        "Gerente de Área": 3,
        "Gerente Comercial": 3,
        "Coordenador de Equipe": 3,
        "Coordenador de Projetos": 3,
        "Supervisor de Vendas": 3,
        "Supervisor de Produção": 3,
        "Supervisor Administrativo": 3,

        "Especialista de Produto": 4,
        "Consultor Interno": 4,
        "Arquiteto de Soluções": 4,
        "Analista Sênior": 4,
        "Analista Pleno": 4,
        "Analista Júnior": 4,
        "Analista QA": 4,
        "Líder de Equipe": 4,
        "Tech Lead": 4,
        "Encarregado": 4,

        "Assistente Administrativo": 5,
        "Assistente de Vendas": 5,
        "Assistente de RH": 5,
        "Auxiliar de Escritório": 5,
        "Auxiliar de Serviços Gerais": 5,
        "Auxiliar de Estoque": 5,
        "Operador de Máquinas": 5,
        "Vendedor": 5,
        "Atendente de Suporte": 5,
        "Técnico de Campo": 5,
        "Estagiário": 5,
        "Trainee": 5,
        "Jovem Aprendiz": 5
    },

    getRoleLevel: function (roleName) {
        return this.ROLE_LEVELS[roleName] !== undefined ? this.ROLE_LEVELS[roleName] : 5;
    },

    getUsers: function () {
        const users = localStorage.getItem(this.KEYS.USERS);
        return users ? JSON.parse(users) : [];
    },

    saveUser: function (userData) {
        const users = this.getUsers();
        
        if (!userData.hierarchical_level && userData.cargo) {
            userData.hierarchical_level = this.getRoleLevel(userData.cargo);
        }

        if (!userData.saldos) {
            userData.saldos = {
                XRP: userData.saldo || 0,
                RLUSD: 0,
                BRL: (userData.saldo || 0) * 3.0
            };
        }

        const index = users.findIndex(u => u.wallet === userData.wallet || u.email === userData.email);

        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
        } else {
            users.push(userData);
        }

        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    },

    getSession: function () {
        const session = localStorage.getItem(this.KEYS.SESSION);
        return session ? JSON.parse(session) : null;
    },

    setSession: function (user) {
        if (user && !user.saldos) {
            user.saldos = {
                XRP: user.saldo || 0,
                RLUSD: 0,
                BRL: (user.saldo || 0) * 3.0
            };
        }
        localStorage.setItem(this.KEYS.SESSION, JSON.stringify(user));
    },

    logout: function () {
        localStorage.removeItem(this.KEYS.SESSION);
    },

    getUserByWallet: function (wallet) {
        const users = this.getUsers();
        return users.find(u => u.wallet === wallet);
    },

    getSubordinates: function (parentWallet) {
        const users = this.getUsers();
        return users.filter(u => u.parent_wallet === parentWallet);
    },

    getDescendantTree: function (rootWallet) {
        const users = this.getUsers();
        const descendants = [];

        function collect(wallet) {
            const children = users.filter(u => u.parent_wallet === wallet);
            children.forEach(child => {
                descendants.push(child);
                collect(child.wallet);
            });
        }

        collect(rootWallet);
        return descendants;
    },

    clearAll: function () {
        localStorage.removeItem(this.KEYS.USERS);
        localStorage.removeItem(this.KEYS.SESSION);
    },

    hasGenesis: function () {
        const users = this.getUsers();
        return users.some(u => u.origem === "Ambiente Gênesis");
    },

    getGenesisUser: function () {
        const users = this.getUsers();
        return users.find(u => u.origem === "Ambiente Gênesis");
    }
};

if (typeof window !== 'undefined') {
    window.StorageService = StorageService;
}