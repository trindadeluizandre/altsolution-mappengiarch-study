Detalhamento Atômico de Elementos versão técnica

Desenvolvedor e Responsável Técnico: André Luiz Trindade
_________________________________________________________

O bloco citado abaixo corresponde à estrutura inicial de interface do arquivo index.html. Ele define a barra de notificações de erro (Toast), o contêiner principal da página de login, o cabeçalho descritivo da aplicação financeira corporativa e a luz indicadora de status de conexão com a rede local.

<body>
(Bloco Primário de Primeiro Escalão): Tag de abertura do escopo de renderização do corpo do documento HTML5. Atua como o nó raiz para a injeção do ciclo de vida visual e manipulação dinâmica dos scripts.

<div id="error-toast" class="toast">Acesso Negado! Credenciais inválidas.</div>
(Elemento Primário de Segundo Escalão): Tag de bloco genérica definida com um identificador único (id) e um seletor de classe (class). Funciona como um elemento de feedback flutuante (Toast) parametrizado para exibição condicional de falhas de autenticação.

<div class="container">
(Bloco Secundário de Layout): Tag de container estrutural configurada via classe CSS global para encapsulamento, centralização e aplicação de limites de largura na interface gráfica.

<header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
(Elemento Semântico de Segundo Escalão): Tag semântica de cabeçalho configurada com estilo em linha (Inline CSS). Aplica o modelo Flexible Box Layout (display: flex) com distribuição de espaço nas extremidades (justify-content: space-between), alinhamento de eixo vertical centralizado (align-items: center) e margem inferior de espaçamento.

<div>
(Bloco Terciário de Agrupamento): Tag de divisão interna utilizada como wrapper estrutural para isolar os fluxos de texto e garantir o posicionamento correto dentro do grid flexível do cabeçalho.

<h2 style="font-size: 1.5rem;">Acesso a Rede</h2>
(Elemento Textual Secundário): Tag de título de segundo nível hierárquico com escala tipográfica redimensionada em linha para $1.5\text{rem}$, estabelecendo a identidade primária da tela de login.

<p style="color: #888; font-size: 0.8rem;">ALT Solution - Assets Liquidity & Treasury</p>
(Elemento Textual Terciário): Tag de parágrafo configurada via CSS inline com cor cinza atenuada (#888) e tamanho de fonte de $0.8\text{rem}$ para exibição de metadados institucionais de suporte.

</div>
(Fechamento de Bloco): Tag de fechamento da divisão do wrapper dos textos informativos do cabeçalho.

<div id="status-light" class="status-light light-red"></div>
(Elemento de Sinalização de Estado): Tag de bloco configurada com um ID específico e classes combinadas. Atua como um indicador luminoso de status (State Light), inicializado no estado offline através da classe de cor vermelha (light-red), preparado para manipulação dinâmica via manipulação de classes no JavaScript.

</header>
(Fechamento Semântico): Tag de fechamento do bloco semântico do cabeçalho da interface.

----------------------------------------------

O próximo trecho finaliza a estrutura do formulário de autenticação. Ele engloba os campos de entrada de dados para e-mail e senha (com o ícone de alternância de visibilidade), o botão principal de submissão do formulário (inicialmente desabilitado por motivos de segurança e validação) e o link de redirecionamento para o cadastro de novos usuários. Também inclui a abertura da tag de script do tipo módulo.

Estrutura do Objeto Principal (Documento de Autenticação)

O módulo de marcação define os pontos de ancoragem do DOM (Document Object Model), a estrutura de renderização do cabeçalho da aplicação e os nós globais de tratamento de mensagens assíncronas do sistema.

Subbloco 02 - Elementos de Captura de Dados e Gatilhos do Formulário

Comando Analisado: Campos estruturados para entrada de credenciais, botões de submissão vinculados a manipuladores de eventos e links utilitários.

Análise de Engenharia: Instanciação de elementos funcionais do formulário. Os nós #l-email e #l-pass implementam os seletores de tipo nativos do HTML5 para impor validações preliminares no lado do cliente. O elemento #btn-login faz uso do estado booleano de bloqueio (disabled) de forma síncrona com a classe visual de inatividade, garantindo a proteção do endpoint de autenticação até que os critérios de preenchimento do QA sejam atingidos. O encerramento do escopo do container do DOM é acompanhado pela abertura de uma tag de script interpretada sob a especificação de escopo isolado de módulos ES6.

Detalhamento Atômico de Elementos:

<div class="input-container">
(Bloco Secundário de Layout): Tag de divisão genérica que atua como um elemento wrapper. Utiliza a classe CSS input-container para estabelecer o contexto de posicionamento relativo para os ícones e inputs.

<i class="fa-solid fa-envelope icon-left"></i>
(Elemento de Iconografia Vetorial): Tag inline utilizada para injeção de fontes de ícones. Invoca as classes estáticas do framework Font Awesome para renderizar um caractere vetorial em formato de envelope alinhado à esquerda.

<input type="email" id="l-email" placeholder="E-mail de acesso">
(Elemento de Entrada de Dados): Tag de controle interativo configurada com o tipo de entrada email. Possui o identificador exclusivo #l-email para captura do valor no DOM e atributo placeholder para exibição de texto instrutivo volátil.

</div>
(Fechamento de Bloco): Tag de encerramento da divisão do contêiner do campo de e-mail.

<div class="input-container">
(Bloco Secundário de Layout): Reinstanciação da tag de divisão wrapper configurada com a classe utilitária de agrupamento para o segundo campo do formulário.

<i class="fa-solid fa-lock icon-left"></i>
(Elemento de Iconografia Vetorial): Tag inline que invoca as propriedades visuais do Font Awesome para a renderização de um vetor em formato de cadeado.

<input type="password" id="l-pass" placeholder="Sua senha">
(Elemento de Entrada de Dados): Tag de controle interativo configurada com o tipo de entrada password. Oculta os caracteres digitados por padrão para segurança de interface e possui o ID exclusivo #l-pass.

<i class="fa-solid fa-eye toggle-password" onclick="togglePassword()"></i>
(Elemento Interativo de Controle Visual): Tag inline que invoca o ícone de olho do Font Awesome. Implementa o atributo inline de manipulação de evento onclick para interceptar cliques e disparar a rotina de script togglePassword().

</div>
(Fechamento de Bloco): Tag de encerramento da divisão do contêiner do campo de senha.

<button id="btn-login" class="btn-inactive" disabled onclick="autenticar()">AUTENTICAR NA REDE</button>
(Elemento de Acionamento e Disparo): Tag de botão de interface identificada via #btn-login. Inicializada com a classe estrutural btn-inactive e bloqueada por meio da propriedade HTML nativa disabled. Possui um vinculador de evento onclick direcionado à função global autenticar().

<div style="margin-top: 20px; text-align: center;">
(Bloco de Formatação e Margem Inline): Tag de divisão simples configurada com CSS inline para injetar propriedades de margem externa vertical superior de $20\text{px}$ e alinhamento horizontal centralizado do fluxo de texto.

<a href="register.html" style="color: #21d4fd; text-decoration: none; font-size: 0.9rem;">Criar nova identidade</a>
(Elemento de Hiperlink e Navegação): Tag de âncora usada para navegação entre páginas através do atributo referencial href. Redefine as diretivas visuais padrão anulando o sublinhado (text-decoration: none), injetando a cor hexadecimal #21d4fd e aplicando escala de fonte de $0.9\text{rem}$.

</div>
(Fechamento de Bloco): Tag de fechamento da divisão de formatação do link de navegação.

</div>
(Fechamento de Bloco Estrutural Superior): Tag de fechamento que encerra a árvore hierárquica do contêiner principal (.container) instanciado no início do arquivo.

__________________________________________________
script

O próximo bloco implementa a função em tempo real de validação de formulário. Esse bloco monitora o que o usuário digita nos campos de e-mail e senha, aplica regras rigorosas de segurança (Expressões Regulares) e, dinamicamente, destranca o botão e muda a luz de status para verde apenas se os dados forem válidos.

Este documento reúne a análise estrutural e atômica das rotinas de marcação e componentes de interface do arquivo index.html dentro do ecossistema ALT Solution.

Estrutura do Objeto Principal (Documento de Autenticação)O módulo de marcação define os pontos de ancoragem do DOM (Document Object Model), a estrutura de renderização do cabeçalho da aplicação e os nós globais de tratamento de mensagens assíncronas do sistema.

Subbloco 03 - Módulos Lógicos e Motores de Validação 

SíncronaComando Analisado: Injeção da tag <script type="module">, importação de serviços de persistência, declaração de rotinas no escopo global window e algoritmos de avaliação por Expressão Regular (RegEx).

Análise de Engenharia: Implementação de arquitetura orientada a eventos para validação de integridade no lado do cliente (Client-Side Validation). A rotina window.validar é exposta diretamente no objeto global de execução para permitir sua invocação por ouvintes de eventos de digitação (input/change). O bloco utiliza Expressões Regulares avançadas (Lookarounds positivos como (?=.*[a-zA-Z])) para impor validação de complexidade com custo computacional $O(1)$ antes de expor os endpoints de rede. A mutação do estado visual é gerenciada pela reatribuição síncrona da propriedade className e do estado nativo de interatividade disabled dos nós mapeados.

--------------------------

Detalhamento Atômico de Elementos

<script type="module">
(Bloco Primário de Primeiro Escalão): Tag de inicialização de ambiente lógico. O atributo type="module" habilita o escopo isolado do interpretador do navegador, ativando suporte nativo a importações e forçando a execução sob o Modo Estrito (Strict Mode).

import { StorageService } from '../logic/storage.js';
(Instrução Primária de Vinculação Externa): Declaração de importação estática na sintaxe ES6. Carrega a referência do objeto StorageService a partir do caminho relativo apontado, disponibilizando seus métodos de persistência para o escopo do script atual.

window.validar = () => {
(Bloco Primário de Segundo Escalão - Definição de Função): Atribuição de uma função de seta anônima (Arrow Function) a uma nova propriedade explicitamente criada no objeto global window. Garante que a função permaneça acessível mesmo sob as restrições de isolamento do módulo.

const e = document.getElementById('l-email').value.trim();
(Bloco Secundário - Captura e Sanitização de Input): Declaração de constante de escopo de bloco. Localiza o nó do input no DOM via getElementById, extrai a string contida na propriedade value e aplica o método utilitário trim() para expurgar espaços em branco nos prefixos e sufixos da string.

const p = document.getElementById('l-pass').value.trim();
(Bloco Secundário - Captura e Sanitização de Input): Declaração de constante de escopo de bloco que captura, acessa e sanitiza a string de texto contida na propriedade de valor do nó correspondente ao campo de senha do usuário.

const btn = document.getElementById('btn-login');
(Bloco Secundário - Mapeamento de Referência de Nó): Armazena a referência física do elemento do botão de login do DOM na constante btn, permitindo a manipulação posterior de suas propriedades estruturais sem reexecutar buscas na árvore de elementos.

const light = document.getElementById('status-light');
(Bloco Secundário - Mapeamento de Referência de Nó): Armazena a referência física do elemento indicador luminoso do DOM na constante light para otimizar mutações estéticas assíncronas de classe CSS.

const regexSeguranca = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
(Bloco Secundário - Instanciação de Expressão Regular de Complexidade): Cria uma instância de Expressão Regular literal. A sintaxe utiliza asserções de olhar adiante (Positive Lookarounds) para impor de forma estrita a presença concorrente de caracteres alfabéticos, numerais, símbolos especiais e limite de comprimento mínimo de 8 caracteres.

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
(Bloco Secundário - Instanciação de Expressão Regular de Formato): Cria uma instância de Expressão Regular literal para validação de strings textuais sob a semântica padrão de endereçamentos de correio eletrônico, exigindo estruturas de texto divididas por caractere delimitador arroba e ponto final.

if (emailRegex.test(e) && regexSeguranca.test(p)) {
(Bloco Secundário - Bifurcação Condicional de Fluxo): Estrutura de controle condicional que invoca o método nativo .test() de ambas as instâncias de RegEx passando as strings de input. Utiliza o operador lógico de conjunção && (AND) para exigir sucesso simultâneo em ambos os testes.

btn.className = 'btn-active';
(Bloco Terciário - Mutação de Propriedade do DOM): Substitui completamente a lista de classes do elemento de botão pela string btn-active, alterando instantaneamente as propriedades visuais aplicadas pelo motor CSS.

btn.disabled = false;
(Bloco Terciário - Alteração de Estado Booleano): Atribui o valor booleano false ao atributo nativo de bloqueio disabled do botão, removendo a restrição de interatividade e habilitando o disparo do evento de clique.

light.className = 'status-light light-green';
(Bloco Terciário - Mutação de Propriedade do DOM): Redefine a propriedade de classe do nó indicador luminoso do cabeçalho, injetando os seletores que aplicam a estilização do estado ativo na cor verde.

} else {
(Bloco Secundário - Cláusula de Desvio Alternativo): Define o bloco de tratamento padrão para o cenário onde ao menos um dos predicados avaliados na conjunção lógica do if retorne valor avaliado como falso.

btn.className = 'btn-inactive';
(Bloco Terciário - Restauração de Estado do DOM): Reaplica a string de classe visual de inatividade btn-inactive no elemento de botão, retornando o componente à sua estética cinza padrão.

btn.disabled = true;
(Bloco Terciário - Bloqueio de Estado Booleano): Força o atributo de interatividade disabled do botão para o valor booleano true, bloqueando novos cliques e tentativas de submissão.

light.className = 'status-light light-red';
(Bloco Terciário - Restauração de Estado do DOM): Força a reatribuição das classes do indicador luminoso para a combinação original contendo o seletor de cor vermelha (light-red).

------------------------------------

O bloco atual traz a ativação dos ouvintes de eventos (que chamam a validação que estruturamos no bloco anterior toda vez que o usuário digita algo) e a lógica completa da função de alternar a visibilidade da senha (revelando ou ocultando os caracteres e trocando o desenho do ícone do olho).

Estrutura do Objeto Principal (Documento de Autenticação)

O módulo de marcação define os pontos de ancoragem do DOM (Document Object Model), a estrutura de renderização do cabeçalho da aplicação e os nós globais de tratamento de mensagens assíncronas do sistema.

Subbloco 04 - Listeners de Interação Assíncrona e Manipuladores Visuais do DOM

Comando Analisado: Registro de ouvintes de escopo ativo (addEventListener), atribuição de rotina dinâmica no objeto window e lógica de inversão de estado com operadores relacionais ternários.

Análise de Engenharia: Acoplamento de manipuladores de eventos (Event Handlers) baseados no tipo de gatilho input. Esta implementação permite a execução reativa do motor de validação a cada mutação de estado do teclado no cliente, mitigando gargalos de processamento. A função window.togglePassword encapsula a mutação dinâmica de propriedades nativas de segurança do elemento input (type="password" para type="text"), acionando em paralelo o método classList.toggle para alterar o vetor estético de iconografia do Font Awesome sem forçar um redesenho integral (Reflow) da página.

Detalhamento Atômico de Elementos

document.getElementById('l-email').addEventListener('input', window.validar);
(Bloco Secundário - Registro de Evento): Localiza o nó do input de e-mail via identificador e invoca o método addEventListener. Define o evento de captura input como gatilho e injeta a referência da função global window.validar como callback de execução.

document.getElementById('l-pass').addEventListener('input', window.validar);
(Bloco Secundário - Registro de Evento): Registra um ouvinte de eventos idêntico no nó de entrada de dados da senha, apontando para a mesma rotina de callback reativa.

window.togglePassword = () => {
(Bloco Secundário - Definição de Função Interativa): Declaração de uma função de seta (Arrow Function) atribuída explicitamente como propriedade do objeto global window para garantir o acesso externo a partir do atributo inline onclick presente no HTML.

const input = document.getElementById('l-pass');
(Bloco Secundário - Captura de Referência local): Declaração de uma constante que armazena o endereço e as propriedades físicas do nó do input de senha, agilizando as operações de mutação de atributos subsequentes.

const icon = document.querySelector('.toggle-password');
(Bloco Secundário - Captura de Referência via Seletor): Declaração de uma constante que utiliza o método querySelector para varrer o documento em busca do primeiro elemento que contenha a classe CSS .toggle-password, que corresponde ao ícone do olho.

input.type = input.type === 'password' ? 'text' : 'password';
(Bloco Secundário - Avaliação Condicional Ternária e Mutação de Tipo): Altera o atributo de tipo do input de senha. Utiliza um operador ternário (? :) para avaliar o estado atual: se for estritamente igual a 'password', redefine a propriedade para 'text' (revelando os caracteres); caso contrário, retorna para 'password' (ocultando-os).

icon.classList.toggle('fa-eye-slash');
(Bloco Secundário - Alternância de Classe CSS): Invoca o método toggle sobre a lista de classes do elemento de ícone. Insere a classe fa-eye-slash se ela não estiver presente ou a remove caso já exista, alternando o estado visual do Font Awesome (olho com uma barra riscada).

};
(Fechamento de Escopo Lógico): Encerramento sintático do corpo de comandos da função de alternância.

----------------------------------

Estrutura do Objeto Principal (Documento de Autenticação)

O módulo de marcação define os pontos de ancoragem do DOM (Document Object Model), a estrutura de renderização do cabeçalho da aplicação e os nós globais de tratamento de mensagens assíncronas do sistema.

Subbloco 05 - Fluxo de Sucesso de Autenticação e Mutação de Estado da Sessão

Comando Analisado: Pipeline completo de validação afirmativa do usuário, serialização de estado no localStorage, validação preventiva de escopo global para módulos (typeof) e redirecionamento de rota via objeto location.

Análise de Engenharia: Quando o predicado lógico do elemento secundário resolve como verdadeiro (user populado), o motor de execução inicia o isolamento de contexto da sessão corrente. A gravação duplicada (via API nativa do navegador e via método encapsulado StorageService.setSession) atua como redundância arquitetural para garantir a sincronização do estado de login entre módulos. A verificação estrita typeof StorageService !== 'undefined' é um padrão de resiliência indispensável para evitar quebras de execução (Runtime Errors) caso os arquivos lógicos externos falhem no carregamento assíncrono. O encerramento do ciclo de login destrói o escopo atual carregando um novo contexto de aplicação através da atribuição de string no endereço de localização.

Detalhamento Atômico de Elementos

window.autenticar = () => {}
(Bloco Primário de Segundo Escalão - Definição de Função Core): Declaração de uma função de seta (Arrow Function) anônima indexada diretamente ao objeto global window. Expõe o gatilho principal de autenticação de forma global para interceptação dos cliques do botão de submissão do formulário.

const e = document.getElementById('l-email').value;
(Bloco Secundário - Captura de Valor do DOM): Cria uma constante de escopo de bloco que localiza o nó do e-mail por ID no DOM e extrai o conteúdo alfanumérico bruto da sua propriedade .value para o escopo interno da função.

const p = document.getElementById('l-pass').value;
(Bloco Secundário - Captura de Valor do DOM): Cria uma constante de escopo de bloco que realiza o mapeamento e extração de dados do nó correspondente ao campo de senha, armazenando os dados brutos de entrada na variável local p.

const usuariosDaRede = JSON.parse(localStorage.getItem('alt_solution_users')) || [];
(Bloco Secundário - Desserialização e Tratamento de Persistência): Acessa a API do navegador via localStorage.getItem para ler a string armazenada. Aplica o método JSON.parse para converter a string JSON de volta para um array de objetos JavaScript. Utiliza o operador de coalescência lógica || (OR) para atribuir uma coleção vazia ([]) caso a chave avaliada retorne o valor nulo.

const user = usuariosDaRede.find(u => u.email === e && u.senha === p);
(Bloco Secundário - Busca e Filtragem por Predicado Condicional): Invoca o método de array .find() sobre a coleção. Passa uma função de callback que atua como predicado de teste, comparando iterativamente as chaves email e senha de cada registro interno (u) contra as constantes de input locais e e p. Retorna a primeira referência positiva encontrada ou undefined.

if (user) {
(Bloco Secundário - Avaliação de Existência de Objeto): Estrutura de desvio condicional que avalia o valor de verdade (truthiness) contido no objeto user. Caso o valor seja diferente de nulo ou indefinido, o fluxo de execução é direcionado para as rotinas do escopo de sucesso.

localStorage.setItem('usuario_sessao', JSON.stringify(user));
(Bloco Terciário - Serialização e Persistência de Estado): Invoca a API de armazenamento local para persistir dados. Transforma o objeto JavaScript user em uma string de texto JSON usando JSON.stringify e grava na memória sob o rótulo identificador 'usuario_sessao'.

if (typeof StorageService !== 'undefined' && StorageService.setSession) {

(Bloco Terciário - Avaliação de Tipo de Escopo Global e Existência de Método): Uma condicional de segurança em tempo de execução. Avalia por string se o identificador do serviço não é indefinido e valida logicamente a presença do método interno setSession.

StorageService.setSession(user);
(Bloco Terciário - Invocação de Método de Serviço Modular): Dispara o método do objeto de persistência avançado passando o ponteiro do usuário ativo como parâmetro, consolidando a identidade no estado da aplicação.

}
(Fechamento de Bloco): Encerramento sintático da estrutura condicional de segurança do serviço de armazenamento.

console.log("Login autorizado para:", user.nome);
(Bloco Terciário - Emissão de Stream de Log): Invoca a API de depuração do console do navegador enviando uma string literal estática concatenada com a propriedade de string nome contida no objeto do usuário cadastrado.

window.location.href = 'dashboard.html';
(Bloco Terciário - Redirecionamento de Contexto de Rota): Altera a propriedade de endereço (href) do objeto de localização global do navegador (window.location), forçando o carregamento síncrono imediato do arquivo HTML indicado.

} else {
(Bloco Secundário - Cláusula de Desvio Alternativo): Define a ramificação alternativa da condicional principal, executando as instruções em lote caso o retorno do método de busca .find() avalie como indefinido (falsy).

const toast = document.getElementById('error-toast');
(Bloco Terciário - Mapeamento de Referência de Componente): Armazena o endereço em memória do nó contêiner do toast flutuante na constante de bloco local toast, otimizando chamadas de propriedades em cadeia.

toast.innerHTML = '<div style="text-align: center;">Acesso Negado ! ...';
(Bloco Terciário - Injeção Dinâmica de Marcação): Sobrescreve o conteúdo interno do nó injetando uma árvore de strings de marcação. Aplica propriedades estilísticas inline para centralização e controle microestrutural de opacidade do texto explicativo.

toast.classList.add('show');
(Bloco Terciário - Mutação Estatística de Classe): Invoca a API de gerenciamento de tokens de classe do DOM para inserir o seletor .show, acionando as regras visuais de transição de opacidade mapeadas na folha de estilo.

setTimeout(() => {, toast.classList.remove('show');, }, 8000);
(Bloco Terciário - Agendamento de Callback Assíncrono): Dispara a função global de temporização da Web API do navegador. Registra uma função de seta para remover a classe .show do nó após o estouro do cronômetro definido em $8000$ milissegundos.

};
(Fechamento de Escopo Lógico): Encerramento sintático da rotina completa da função de autenticação atrelada ao objeto global.

document.getElementById('l-pass').addEventListener('blur', window.validar);
(Bloco Secundário - Registro de Ouvinte de Foco): Captura o input de senha e registra o ouvinte de evento sob o gatilho blur. Dispara a rotina de validação quando o elemento perde o foco de entrada ativo.

document.getElementById('l-email').addEventListener('blur', window.validar);
(Bloco Secundário - Registro de Ouvinte de Foco): Captura o input de e-mail e registra o ouvinte sob o gatilho blur, garantindo que a consistência visual dos indicadores seja acionada ao desfocar o campo.

</script>
(Fechamento de Bloco Primário de Primeiro Escalão): Tag de fechamento da tag de script modular.

</body>
(Fechamento de Bloco Estrutural Superior): Tag de encerramento do corpo de renderização visual.

</html>

Versão Técnica (Fechamento de Raiz do Documento): Tag que encerra a árvore hierárquica do código HTML do documento.