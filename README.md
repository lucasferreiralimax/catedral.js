# Catedral.js

Biblioteca **Catedral.js** para gerenciamento dinâmico de inputs, outputs e estado reativo. Ideal para aplicações que utilizam Web Components e precisam de gerenciamento de estado simplificado.

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

### Exemplo com criptografia

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

## Scripts

- `npm run lint`: Executa o linter para verificar problemas no código.
- `npm run docs`: Gera a documentação usando JSDoc.
- `npm run build`: Gera a versão de produção da biblioteca.
- `npm run dev`: Inicia o modo de desenvolvimento com watch.

## Contribuição

Contribuições são bem-vindas! Por favor, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção (`git checkout -b minha-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona minha feature'`).
4. Envie para o repositório remoto (`git push origin minha-feature`).
5. Abra um Pull Request.

## Links úteis

- **Exemplo Online**: [https://catedral-javascript.web.app](https://catedral-javascript.web.app)

## Licença

Copyright (c) 2025 Lucas Ferreira de Lima
Este projeto está licenciado sob a licença MIT.