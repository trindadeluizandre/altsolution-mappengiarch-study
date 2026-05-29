# Mapeamento Atômico: storage.js
**Responsável Técnico:** André Luiz Trindade

Este documento descreve a anatomia do código de armazenamento, dividindo cada elemento entre a sua função prática (Didática) e a sua mecânica de engenharia (Técnica).

---

## 1. Bloco de Definições e Infraestrutura

### Elemento: `export const StorageService = { ... }`
*   **Versão Didática:** É a criação do motor principal do cofre. Sem essa linha, o sistema não teria "mãos" para alcançar a memória do computador e guardar os dados.
*   **Versão Técnica:** Exportação de um módulo ES6 que implementa o padrão Singleton. Centraliza operações de I/O no Web Storage API.

### Elemento: `KEYS: { ... }`
*   **Versão Didática:** Funciona como um catálogo de etiquetas para as gavetas do banco de dados.
*   **Versão Técnica:** Lookup Table de constantes literais para evitar colisões e redundância de strings (Magic Strings).

---

## 2. Métodos de Gerenciamento de Usuários

### Elemento: `getUsers: function () { ... }`
*   **Versão Didática:** É o motor de leitura que abre o cofre e traz a lista de todos os usuários cadastrados.
*   **Versão Técnica:** Getter de coleção que utiliza `getItem()` e `JSON.parse()` com fallback para array vazio, garantindo integridade de tipo.

### Elemento: `saveUser: function (userData) { ... }`
*   **Versão Didática:** O gerente de arquivos que decide se cria uma ficha nova ou atualiza uma existente.
*   **Versão Técnica:** Implementação de lógica Upsert. Utiliza `findIndex()` para detectar duplicidade de e-mail ou carteira.

### Elemento: `users[index] = { ...users[index], ...userData };`
*   **Versão Didática:** Atualiza apenas as partes novas da ficha do usuário, mantendo as informações antigas intactas.
*   **Versão Técnica:** Shallow Merge utilizando Spread Operator. Garante a atualização parcial do objeto preservando metadados de auditoria.

---

## 3. Métodos de Gerenciamento de Sessão

### Elemento: `getSession: function () { ... }`
*   **Versão Didática:** Verifica no crachá do sistema quem é o usuário que está logado agora.
*   **Versão Técnica:** Recuperação síncrona do estado de autenticação persistido.

### Elemento: `logout: function () { ... }`
*   **Versão Didática:** Joga fora o crachá do usuário atual para que ele não tenha mais acesso às telas internas.
*   **Versão Técnica:** Invalidação de estado via `removeItem()`, revogando tokens de acesso no lado do cliente.

---

## 4. Métodos de Auditoria e QA

### Elemento: `hasGenesis: function () { ... }`
*   **Versão Didática:** Faz uma pergunta de segurança: "O dono do sistema já foi criado?".
*   **Versão Técnica:** Validação de estado inicial do ecossistema via predicado `some()`.

### Elemento: `clearAll: function () { ... }`
*   **Versão Didática:** É o botão de "Reset Geral" que apaga tudo para começar os testes do zero.
*   **Versão Técnica:** Purga física de chaves de armazenamento para reinicialização de ambiente de teste.

---

## Detalhamento Atômico de Elementos Técnicos

**localStorage.getItem(this.KEYS.USERS);**
*   **Versão Didática:** Vai até a memória física do navegador e puxa os dados guardados.
*   **Versão Técnica:** Invocação síncrona do Web Storage API para leitura de stream de caracteres.

**JSON.parse(users) : []**
*   **Versão Didática:** Se houver dados, converte para lista; se não, entrega uma lista vazia.
*   **Versão Técnica:** Desserialização condicional para prevenção de falhas de processamento em coleções nulas.

**JSON.stringify(users)**
*   **Versão Didática:** Empacota a lista de volta em um formato de texto para ser guardada na gaveta.
*   **Versão Técnica:** Serialização de estrutura de dados complexa para persistência em formato string.

**users.findIndex(...)**
*   **Versão Didática:** Procura a posição exata de um usuário específico dentro da lista.
*   **Versão Técnica:** Algoritmo de busca linear com complexidade O(n) para detecção de colisões.

---
*Documento atualizado para conformidade com o padrão de Engenharia Pedagógica da ALT Solution.*