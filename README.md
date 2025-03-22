# Catedral.js

**Catedral.js** é uma biblioteca moderna e leve para criação de **Web Components** reativos e acessíveis. Ela oferece uma solução simples e eficiente para gerenciamento de estado, manipulação de dados e construção de interfaces dinâmicas. Ideal para desenvolvedores que buscam criar aplicações modulares e escaláveis com foco em desempenho e acessibilidade.

## Recursos principais

- **Gerenciamento de estado reativo**: Integração com LocalStorage, SessionStorage e IndexedDB.
- **Web Components reutilizáveis**: Componentes como inputs, modais, abas, botões e muito mais.
- **Criptografia integrada**: Suporte a dados criptografados com AES para maior segurança.
- **Acessibilidade**: Componentes projetados com foco em acessibilidade (ARIA-friendly).
- **Fácil integração**: Funciona com qualquer framework ou aplicação vanilla JavaScript.

## Instalação

Para instalar a biblioteca, use o seguinte comando:

```bash
npm install catedral.js
```

## Uso

### Exemplo básico em HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exemplo Catedral.js</title>
  <script type="module" src="src/catedral.js"></script>
</head>
<body>
  <h1>Exemplo de uso do Catedral.js</h1>

  <!-- Componente de input -->
  <catedral-input-local-session
    id="input-local-name"
    placeholder="Digite seu nome"
    data-store="local"
    aria-label="Nome no LocalStorage"
  ></catedral-input-local-session>

  <!-- Componente de output -->
  <catedral-output store="globalStoreLocal" key="inputLocalName"></catedral-output>
</body>
</html>
```

---

### Exemplo de Botões

```html
<section>
  <h2>Exemplo de Botões</h2>

  <!-- Botões com variantes preenchidas -->
  <catedral-button label="Primário" variant="primary" appearance="filled"></catedral-button>
  <catedral-button label="Sucesso" variant="success" appearance="filled"></catedral-button>

  <!-- Botões com variantes contornadas -->
  <catedral-button label="Primário Contornado" variant="primary" appearance="outlined"></catedral-button>
  <catedral-button label="Sucesso Contornado" variant="success" appearance="outlined"></catedral-button>

  <!-- Botões com tamanhos -->
  <catedral-button label="Pequeno" variant="primary" size="small"></catedral-button>
  <catedral-button label="Grande" variant="primary" size="large"></catedral-button>

  <!-- Botões com largura e altura personalizadas -->
  <catedral-button label="Largura Total" variant="primary" full></catedral-button>
  <catedral-button label="Customizado" variant="success" width="200px" height="50px"></catedral-button>
</section>
```

---

### Exemplo com Criptografia

```html
<catedral-input-local-session
  id="input-local-email-encrypted"
  placeholder="Digite seu e-mail"
  data-store="local"
  data-encrypt="true"
  aria-label="E-mail no LocalStorage Criptografado"
></catedral-input-local-session>

<catedral-output
  store="globalStoreLocalEncrypt"
  key="inputLocalEmailEncrypted"
  encrypted
></catedral-output>
```

---

### Exemplo de Modal

```html
<catedral-modal id="modal1" title="Bem-vindo ao Modal 1" open-label="Abrir Modal 1">
  <p>Este é o conteúdo do primeiro modal. Você pode adicionar qualquer texto ou elementos aqui.</p>
</catedral-modal>

<catedral-modal id="modal2" title="Bem-vindo ao Modal 2" open-label="Abrir Modal 2">
  <p>Este é o conteúdo do segundo modal. Personalize conforme necessário.</p>
</catedral-modal>
```

---

### Exemplo de Tabs

```html
<catedral-tabs active-tab="1">
  <!-- Abas -->
  <div slot="tab-1">Informações Gerais</div>
  <div slot="tab-2">Detalhes Técnicos</div>
  <div slot="tab-3">Contato</div>
  <div slot="tab-4">Sobre</div>

  <!-- Painéis -->
  <div slot="panel-1">
    <h3>Informações Gerais</h3>
    <p>Bem-vindo à aba de informações gerais. Aqui você pode encontrar uma visão geral do sistema.</p>
    <ul>
      <li>Versão: 1.0.0</li>
      <li>Data de lançamento: 22 de março de 2025</li>
      <li>Desenvolvedor: Catedral.js Team</li>
    </ul>
  </div>
  <div slot="panel-2">
    <h3>Detalhes Técnicos</h3>
    <p>Esta aba contém informações técnicas sobre o sistema:</p>
    <ul>
      <li>Framework: Catedral.js</li>
      <li>Banco de Dados: IndexedDB</li>
      <li>Armazenamento: LocalStorage e SessionStorage</li>
      <li>Criptografia: AES (CryptoJS)</li>
    </ul>
  </div>
  <div slot="panel-3">
    <h3>Contato</h3>
    <p>Entre em contato conosco:</p>
    <ul>
      <li>Email: suporte@catedraljs.com</li>
      <li>Telefone: (31) 1234-5678</li>
      <li>Endereço: Rua Exemplo, 123 - Belo Horizonte, MG</li>
    </ul>
  </div>
  <div slot="panel-4">
    <h3>Sobre</h3>
    <p>Catedral.js é uma biblioteca moderna para criação de componentes web reativos e acessíveis.</p>
    <p>Nosso objetivo é simplificar o desenvolvimento de interfaces ricas e interativas.</p>
  </div>
</catedral-tabs>
```

---

## Scripts

- `npm run lint`: Executa o linter para verificar problemas no código.
- `npm run docs`: Gera a documentação usando JSDoc.
- `npm run build`: Gera a versão de produção da biblioteca.
- `npm run dev`: Inicia o modo de desenvolvimento com watch.

---

## Contribuição

Contribuições são bem-vindas! Por favor, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção (`git checkout -b minha-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona minha feature'`).
4. Envie para o repositório remoto (`git push origin minha-feature`).
5. Abra um Pull Request.

---

## Links úteis

- **Exemplo Online**: [https://catedral-javascript.web.app](https://catedral-javascript.web.app)

---

## Licença

Copyright (c) 2025 Lucas Ferreira
 
Este projeto está licenciado sob a licença MIT.