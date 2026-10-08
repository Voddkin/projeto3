const express = require("express");
const LojaController = require("../controller/lojaController");
const loginController = require("../controller/loginController");
const funcionarioController = require("../controller/funcionarioController");
const finalizarControler = require("../controller/finalizarController");
const carrinhoControler = require("../controller/carrinhoController");
const cadastroController = require("../controller/cadastroController");
const categoria = require("../controller/categoriaController");
const marcaController = require("../controller/marcaController");
const PessoaFisicaController = require("../controller/pessoafisicaController");
const ProdutoController = require("../controller/produtoController");


const router = express.Router();

// ================= CATEGORIA =====================

let categoriacontroller = new categoria();

router.get("/cadastrarcategoria", categoriacontroller.cadastrarcategoria);
router.post("/cadastrarcategoria", categoriacontroller.cadastrar);
router.get("/categoria", categoriacontroller.listarcategoria);
router.post("/excluircategoria", categoriacontroller.excluir);
router.get("/alterarcategoria/:id", categoriacontroller.alterarView);

// ================= MARCA =====================

let marca = new marcaController();

router.get("/cadastrarmarca", marca.cadastrarMarca);
router.post("/cadastrarmarca",marca.cadastrar);
router.get("/marca", marca.listarMarca);
router.post("/excluirmarca", marca.excluirMarca);
router.get("/alterarmarca/:id", marca.alterarMarcaView);

// ================= PESSOA FISICA =====================
let pessoafisicacontroller = new PessoaFisicaController();

router.get("/pessoa", pessoafisicacontroller.listarPessoaFisica);

router.get("/cadastrarpessoa", pessoafisicacontroller.cadastrarPessoaFisica);

router.post("/cadastrarpessoa", pessoafisicacontroller.cadastrar);

router.post("/excluirpessoa", pessoafisicacontroller.excluirPessoaFisica);

router.get("/pessoa/alterar/:id", pessoafisicacontroller.alterarPessoaFisicaView);

// ================= PRODUTO =====================

let produtocontroller = new ProdutoController();

router.get("/produto", produtocontroller.listarProdutos);

router.get("/cadastrarproduto", produtocontroller.cadastrarProduto);

router.post("/cadastrarproduto", produtocontroller.cadastrar);

router.post("/excluirproduto", produtocontroller.excluirProduto);

router.get("/produto/alterar/:id", produtocontroller.alterarProdutoView);

// ================= LOJA =====================

let lojacontroller = new LojaController();

router.get("/", lojacontroller.index);


// ================ LOGIN =====================

let logincontroller = new loginController();

router.get("/login",logincontroller.login);


// ================ FUNCIONARIO =====================

let funcionariocontroller = new funcionarioController();

router.get("/funcionario", funcionariocontroller.funcionario);


// ================ FINALIZAR =====================

let finalizarcontroller = new finalizarControler();

router.get("/finalizar", finalizarcontroller.finalizar);


// ================ CARRINHO =====================

let carrinhocontroller = new carrinhoControler();

router.get("/carrinho",carrinhocontroller.carrinho);


// ================ CADASTRO =====================

let cadastrocontroller = new cadastroController();

router.get("/cadastro", cadastrocontroller.cadastroView);



module.exports = router;
