# 💻 React Widget App

## 🔨 Instalação

Para instalar a aplicação, siga os passos abaixo na pasta `react-app`:

### Com Yarn

```bash
yarn install
```

### Com Node/npm

```bash
npm install
```

---

## 👨‍💻 Execução da Aplicação React

Ainda na pasta `react-app`, para iniciar a aplicação:

### Com Yarn

```bash
yarn dev
```

### Com Node/npm

```bash
npm run dev
```

> Observação: a aplicação irá rodar em `localhost` em uma porta específica (normalmente `5173`).

---

## 🧠 Testando o Widget

1. Abra o site de exemplo que deseja utilizar.
2. Utilize a extensão **Go Live** do VSCode ou abra o HTML manualmente no navegador.
3. Automaticamente, o widget deverá aparecer no canto inferior direito da página.

---

## 🐛 Troubleshooting

Caso, ao clicar no widget, o `localhost` não seja acessado:

1. Abra o arquivo `widget.js`.
2. Localize o objeto `IFRAME_CONFIG`.
3. Altere a porta no campo `url` para a mesma porta exibida ao iniciar a aplicação (passo de execução).
