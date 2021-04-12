<h1 align="center">
  <img alt="JobsCalc" title="JobsCalc" src="https://i.imgur.com/Veqm7Gh.png" width="220px" />
</h1>

<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<br>

<p align="center">
  <img alt="dev.finances" src="public/images/jobscalc.png" width="100%">
</p>

## 💻 Projeto

O JobsCalc é uma aplicação de estimativa de cálculo para projetos freelancer, onde é possível cadastrar e excluir jobs (projetos), obtendo uma estimativa de custo de cada job. Além disso, é possível traçar o valor da hora da pessoa que estará usando o sistema 💰

## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/file/s4fytPFbDiSkv4GPSfKaLE/Jobs-Planning). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- HTML
- CSS
- JavaScript
- NodeJS
- EJS
- Express
- SQLite

## 🖥️ Requisitos

Para utilizar o presente projeto em sua máquina, é necessário instalar o [Git](https://git-scm.com/) e o [Node.js](https://nodejs.org/en/). Também é necessário instalar as dependências executando no terminal os seguintes comandos no próximo subtópico.

### Dependências

Antes de tudo, é necessário clonar o repositório atual. Você pode fazer isso com a linha de comando:
```
$ git clone https://github.com/gioliveirass/maratonaDiscover-JobsCalc.git
```
Uma vez que o repositório está em sua máquina, é necessário navegar até a pasta /maratonaDiscover-JobsCalc/src. Para isso, você pode executar as seguintes linhas de comando:
```
# Para navegar até /maratonaDiscover-JobsCalc
$ cd maratonaDiscover-JobsCalc

# Para navegar até /scr
$ cd src
```

Uma vez na pasta /maratonaDiscover-JobsCalc/src, execute os comandos:
```
# Para instalar as dependências:
$ npm install

# Para gerar o banco de dados:
$ npm run init-db

# Para iniciar o servidor:
$ npm run dev
```
O servidor será iniciado na porta:3000, e você pode acessá-lo através de http://localhost:3000.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/gioliveirass/maratonaDiscover-JobsCalc/blob/main/LICENSE) para mais detalhes.