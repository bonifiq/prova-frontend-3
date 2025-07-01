# Projeto React + TypeScript com Vite

Este é um projeto criado com React e TypeScript utilizando o Vite como bundler.

---

## Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- npm (gerenciador de pacotes)

---

## Instalação

1. Clone este repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```
<br/>

2. Acessar a pasta react-app para instalação das dependências

```
cd react-app
npm install
```
<br/>

3. Verificar qual a versão do VITE
* Se a versão for maior que 5.2 deve-se executar o seguinte comando

```
npm install vite@5.2
```
<br/>

## Executando a aplicação localmente

```
npm run dev
```
<br/>
Isso executará a aplicação na url <a>http://localhost:5173</a>
<br/>

## Criação da URL no arquivo widget.js

Existe duas constantes que motam a url do arquivo. 

1. host 
* const host = window.location.hostname;
2. app_url
* const app_url = `http://${host}:5173`
