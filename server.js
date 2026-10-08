const express = require("express");
const expressEjsLayout = require("express-ejs-layouts");
const lojaRouter = require("./routes/lojaRouter");

const server = express();

// 1. Configuração do Motor de View
server.set("view engine", "ejs");
server.use(express.static("public"));
server.set("layout", "layout");

// 2. Middleware de Layout (deve vir ANTES de carregar as rotas)
server.use(expressEjsLayout); // Aponta para views/layout.ejs (sem o .ejs)

// 3. Middlewares de Formulário e Arquivos Estáticos
server.use(express.urlencoded());
server.use(express.json());

// 4. Definição de Rotas
server.use("/", lojaRouter);

server.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000");
});