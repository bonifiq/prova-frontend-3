# 🧪 Prova Prática – Desenvolvedor Front-End

## ✅ Como Executar o Projeto

### 1️⃣ Acessar o Projeto React App

Entre na pasta do React App:

```bash
cd react-app
```

### 2️⃣ Instalar Dependências

Utilizando Yarn:

```bash
yarn install
```

Ou utilizando NPM:

```bash
npm install
```

### 3️⃣ Executar o Projeto em Modo de Desenvolvimento

Com Yarn:

```bash
yarn dev
```

Com NPM:

```bash
npm run dev
```

A aplicação estará disponível por padrão em:

```
http://localhost:5173
```

### 4️⃣ Ajuste no Widget Externo (widget.js)

Dentro do arquivo `widget.js` é necessário alterar a URL local da aplicação React para apontar para onde ela está rodando:

```js
iframe.src = "http://localhost:5173";
```

Ou para a URL de produção quando publicar.

## ✅ Tecnologias e Bibliotecas Utilizadas

- **React** com **Vite + TypeScript**
- **Styled Components** para estilização
- **Phosphor Icons** para utilização dos ícones no botão do widget

---



Obrigado! 🍀
