// Cria uma constante que recebe como valor a função express
const express = require("express")
// Executa a variável que recebeu a função e atribuí a mesma a uma nova constante
const server = express()
// Chamando o arquivo com as rotas
const routes = require("./routes")
// 
const path = require("path")
// Define o EJS como motor de vizualização do html
server.set('view engine', 'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// Habilitar arquivos statics (que estão todos na pasta public)
server.use(express.static("public"))

// Usar o requeste.body
server.use(express.urlencoded({extended: true}))

// Routes
server.use(routes)

// Cria um servidor na porta 3000 e depois exibe no console que está logando
server.listen(3000, () => console.log('rodando'))