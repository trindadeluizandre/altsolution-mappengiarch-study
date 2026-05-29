MAPEAMENTO ATOMICO: REGISTER.HTML
Responsavel Tecnico: Andre Luiz Trindade

Este documento detalha os componentes de interface e logica da tela de cadastro da ALT Solution, separando a funcao pratica da mecanica de engenharia.

---

DETALHAMENTO ATOMICO DE LINHAS: LISTENERS DE INTERACAO

Linha: document.getElementById('reg-name').addEventListener('input', window.validar)
Versao Didatica: O sistema fica ouvindo o que voce digita no campo do Nome. Toda vez que voce aperta uma tecla, ele chama a funcao de validacao para conferir se esta tudo certo.
Versao Tecnica: Registra um Event Listener no no DOM #reg-name. Dispara o callback window.validar no evento de input, permitindo validacao em tempo real durante a entrada de dados.

Linha: document.getElementById('reg-email').addEventListener('input', window.validar)
Versao Didatica: O sistema vigia o campo de E-mail. Assim que voce comeca a escrever seu endereco, ele ja vai testando se o formato esta correto.
Versao Tecnica: Acopla um observador de eventos ao elemento #reg-email. Sincroniza o estado da interface com a validade do e-mail atraves do disparo reativo do metodo de validacao.

Linha: document.getElementById('reg-pass').addEventListener('input', window.validar)
Versao Didatica: O sistema observa o campo da Senha enquanto voce digita, verificando instantaneamente se ela atende aos requisitos de seguranca.
Versao Tecnica: Define um gatilho de execucao para o evento input no seletor #reg-pass. Assegura que a complexidade da senha seja avaliada a cada mutacao do buffer de entrada.

Linha: document.getElementById('reg-pass').addEventListener('change', window.validar)
Versao Didatica: Alem de olhar enquanto voce digita, o sistema faz uma ultima checagem na senha quando voce termina de preencher ou muda de campo.
Versao Tecnica: Estabelece uma redundancia de validacao via evento change no campo #reg-pass para garantir a consistencia dos indicadores de status apos a perda de foco.

---

DETALHAMENTO ATOMICO DE ELEMENTOS TECNICOS

Instrucao: addEventListener('input', ...)
Versao Didatica: Cria um vigia que monitora cada letra digitada pelo usuario em tempo real.
Versao Tecnica: Metodo de escuta de eventos que monitora alteracoes imediatas no valor de um elemento de entrada (input buffer).

Instrucao: addEventListener('change', ...)
Versao Didatica: Cria um vigia que confere os dados assim que o usuario termina de escrever ou sai do campo.
Versao Tecnica: Metodo de escuta de eventos acionado quando o valor do elemento e confirmado ou o foco e alterado (blur).

Instrucao: window.validar
Versao Didatica: E a central de inteligencia que aprova ou reprova as informacoes digitadas no formulario.
Versao Tecnica: Referencia global de um callback de validacao, exposto no objeto window para acessibilidade entre modulos e gatilhos inline.

Instrucao: getElementById
Versao Didatica: Uma ferramenta de busca que localiza um elemento especifico na tela atraves do seu nome unico.
Versao Tecnica: Metodo da interface Document que retorna uma referencia ao elemento cujo ID corresponde a string especificada.

---

DETALHAMENTO ATOMICO DE LINHAS: FUNCAO CADASTRAR

Linha: window.cadastrar = () => {
Versao Didatica: Esta e a funcao principal que registra o novo usuario no sistema. Ela e chamada quando o botao REGISTRAR ACESSO e clicado.
Versao Tecnica: Declaracao de uma funcao de seta (Arrow Function) atribuida ao objeto global 'window', servindo como o manipulador de evento para a submissao do formulario de cadastro.

Linha: const user = { ... }
Versao Didatica: Aqui criamos uma ficha com todos os dados do novo usuario, coletando as informacoes dos campos do formulario.
Versao Tecnica: Instanciacao de um objeto literal 'user' que agrega os dados coletados dos elementos de input do DOM, formando o payload do novo registro.

Linha: nome: document.getElementById('reg-name').value.trim()
Versao Didatica: Pega o nome digitado no campo 'reg-name' e remove espacos extras, guardando-o na ficha.
Versao Tecnica: Extracao e sanitizacao do valor do input '#reg-name' via '.value.trim()', atribuindo-o a propriedade 'nome'.

Linha: email: document.getElementById('reg-email').value.trim()
Versao Didatica: Pega o e-mail digitado no campo 'reg-email' e remove espacos extras, guardando-o na ficha.
Versao Tecnica: Extracao e sanitizacao do valor do input '#reg-email' via '.value.trim()', atribuindo-o a propriedade 'email'.

Linha: senha: document.getElementById('reg-pass').value
Versao Didatica: Pega a senha digitada no campo 'reg-pass' e guarda-a na ficha.
Versao Tecnica: Captura do valor do input '#reg-pass', atribuindo-o a propriedade 'senha' sem sanitizacao de espacos (para preservar senhas com espacos internos).

Linha: pin: currentPin
Versao Didatica: Adiciona o PIN de seguranca que foi gerado anteriormente a ficha do usuario.
Versao Tecnica: Atribuicao do valor da variavel de estado global 'currentPin' a propriedade 'pin' do objeto 'user'.

Linha: wallet: '0x' + Math.random().toString(16).slice(2, 10).toUpperCase()
Versao Didatica: Gera um codigo unico para a carteira digital do usuario, comecando com '0x' e usando letras e numeros aleatorios.
Versao Tecnica: Geracao de um identificador hexadecimal pseudo-aleatorio para a 'wallet', utilizando 'Math.random()' e formatacao de string.

Linha: cargo: "Administrador Genesis"
Versao Didatica: Define o cargo do primeiro usuario como Administrador Genesis, que e o dono principal do sistema.
Versao Tecnica: Atribuicao de um valor literal estatico "Administrador Genesis" a propriedade 'cargo', definindo o nivel de privilegio.

Linha: origem: "Ambiente Genesis"
Versao Didatica: Marca a origem deste usuario como Ambiente Genesis, indicando que e o usuario raiz.
Versao Tecnica: Atribuicao de um identificador de origem estatico para categorizacao do usuario como o administrador inicial do sistema.

Linha: power_level: 0
Versao Didatica: Define o nivel de poder deste usuario como 0, que e o nivel mais alto para o administrador raiz.
Versao Tecnica: Atribuicao de um valor numerico '0' a propriedade 'power_level', indicando o nivel de acesso e controle no dashboard.

Linha: saldoTotal: 0
Versao Didatica: Inicia o saldo total do novo usuario em zero.
Versao Tecnica: Inicializacao da propriedade 'saldoTotal' com valor numerico zero.

Linha: historico: []
Versao Didatica: Cria uma lista vazia para guardar o historico de transacoes futuras do usuario.
Versao Tecnica: Inicializacao de um array vazio para a propriedade 'historico', que armazenara registros de transacoes.

Linha: cadastroEm: new Date().toLocaleString('pt-BR')
Versao Didatica: Registra a data e a hora exata em que o usuario foi cadastrado no sistema.
Versao Tecnica: Captura e formatacao da data e hora atual do sistema para registro da criacao do usuario.

Linha: if (!user.nome || !user.email || !user.senha) { ... }
Versao Didatica: Verifica se o nome, e-mail ou senha estao vazios. Se algum estiver, o sistema impede o cadastro.
Versao Tecnica: Condicional que avalia a 'truthiness' das propriedades 'nome', 'email' e 'senha' do objeto 'user', impedindo o prosseguimento se alguma for uma string vazia.

Linha: alert("Por favor, preencha todos os campos.")
Versao Didatica: Exibe uma mensagem de alerta simples pedindo para o usuario preencher todos os campos.
Versao Tecnica: Invocacao da funcao global 'alert()' para exibir uma notificacao modal ao usuario.

Linha: return
Versao Didatica: Para a execucao da funcao aqui, impedindo que o cadastro continue.
Versao Tecnica: Interrompe a execucao do metodo 'cadastrar()' e retorna o controle para o ponto de chamada.

Linha: if (typeof StorageService !== 'undefined') { ... }
Versao Didatica: Verifica se o nosso Cofre de Dados (StorageService) esta carregado e pronto para ser usado.
Versao Tecnica: Condicional que verifica se o modulo 'StorageService' foi carregado corretamente e esta acessivel no escopo.

Linha: StorageService.saveUser(user)
Versao Didatica: Usa o Cofre de Dados para salvar a ficha do novo usuario de forma organizada.
Versao Tecnica: Invocacao do metodo 'saveUser()' do 'StorageService' para persistir o objeto 'user' no armazenamento local.

Linha: else { ... }
Versao Didatica: Se o Cofre de Dados nao estiver pronto, o sistema usa um metodo alternativo para salvar o usuario.
Versao Tecnica: Clausula 'else' que define um fallback de persistencia caso o 'StorageService' nao esteja disponivel.

Linha: let usuariosDaRede = JSON.parse(localStorage.getItem('alt_solution_users')) || []
Versao Didatica: Pega a lista de usuarios ja existentes ou cria uma nova lista vazia se nao houver nenhuma.
Versao Tecnica: Recuperacao e desserializacao da colecao de usuarios do 'localStorage', com fallback para um array vazio.

Linha: usuariosDaRede.push(user)
Versao Didatica: Adiciona a ficha do novo usuario a lista de usuarios.
Versao Tecnica: Insercao do objeto 'user' na colecao 'usuariosDaRede' utilizando o metodo 'push()'.

Linha: localStorage.setItem('alt_solution_users', JSON.stringify(usuariosDaRede))
Versao Didatica: Salva a lista atualizada de usuarios de volta no banco de dados do navegador.
Versao Tecnica: Serializacao da colecao 'usuariosDaRede' e persistencia no 'localStorage' sob a chave 'alt_solution_users'.

Linha: const toastElement = document.getElementById('success-toast')
Versao Didatica: Localiza a caixinha de aviso de sucesso na tela para exibir a mensagem.
Versao Tecnica: Captura a referencia do elemento DOM '#success-toast' para manipulacao visual.

Linha: let contagem = 5
Versao Didatica: Inicia um contador regressivo de 5 segundos para o redirecionamento.
Versao Tecnica: Declaracao e inicializacao de uma variavel 'contagem' para gerenciar o temporizador.

Linha: toastElement.innerText = `Identidade criada ! Redirecionando em ${contagem}s...`
Versao Didatica: Atualiza o texto da caixinha de aviso com a mensagem de sucesso e a contagem regressiva.
Versao Tecnica: Mutacao da propriedade 'innerText' do 'toastElement' com uma string formatada via Template Literal.

Linha: toastElement.classList.add('show')
Versao Didatica: Faz a caixinha de aviso de sucesso aparecer na tela.
Versao Tecnica: Adicao da classe CSS 'show' ao 'toastElement' para acionar a transicao de visibilidade.

Linha: console.log("Usuario Genesis registrado na REDE ALT:", user.wallet)
Versao Didatica: Registra uma mensagem de sucesso no console do navegador, util para o desenvolvedor e QA.
Versao Tecnica: Emissao de uma mensagem de log no console, incluindo o identificador da 'wallet' do usuario recem-registrado.

Linha: const temporizador = setInterval(() => { ... }, 1000)
Versao Didatica: Inicia um cronometro que executa uma acao a cada segundo.
Versao Tecnica: Invocacao da funcao 'setInterval()' para agendar a execucao periodica de um callback.

Linha: contagem--
Versao Didatica: Diminui o contador em uma unidade a cada segundo.
Versao Tecnica: Decremento da variavel 'contagem' em cada ciclo do temporizador.

Linha: if (contagem > 0) { ... }
Versao Didatica: Se ainda houver tempo na contagem, atualiza a mensagem de aviso.
Versao Tecnica: Condicional que verifica se a 'contagem' e maior que zero para continuar atualizando o feedback visual.

Linha: else { ... }
Versao Didatica: Quando a contagem chega a zero, o sistema para o cronometro e redireciona a pagina.
Versao Tecnica: Clausula 'else' que executa a logica de finalizacao do temporizador e redirecionamento.

Linha: clearInterval(temporizador)
Versao Didatica: Para o cronometro para que ele nao continue rodando desnecessariamente.
Versao Tecnica: Invocacao de 'clearInterval()' para interromper a execucao agendada do 'setInterval()'.

Linha: window.location.href = 'index.html'
Versao Didatica: Leva o usuario de volta para a tela de login.
Versao Tecnica: Atribuicao de uma nova URL a propriedade 'window.location.href' para forcar o redirecionamento do navegador.

Linha: }, 1000)
Versao Didatica: Define que cada passo da contagem regressiva acontece a cada 1000 milissegundos (1 segundo).
Versao Tecnica: Parametro de intervalo para 'setInterval()', especificando a frequencia de execucao do callback em milissegundos.

---
Documento atualizado para conformidade com o padrao de Engenharia Pedagogica da ALT Solution.
