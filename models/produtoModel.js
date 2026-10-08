const Database = require("../database/database.js");

class ProdutoModel {

    #id
    #nome
    #descricao
    #preco
    #id_categoria
    #id_marca
    #nome_categoria
    #nome_marca

    get id() { return this.#id; }
    set id(value) { this.#id = value; }

    get nome() { return this.#nome; }
    set nome(value) { this.#nome = value; }

    get descricao() { return this.#descricao; }
    set descricao(value) { this.#descricao = value; }

    get preco() { return this.#preco; }
    set preco(value) { this.#preco = value; }

    get id_categoria() { return this.#id_categoria; }
    set id_categoria(value) { this.#id_categoria = value; }

    get id_marca() { return this.#id_marca; }
    set id_marca(value) { this.#id_marca = value; }

    get nome_categoria() { return this.#nome_categoria; }
    set nome_categoria(value) { this.#nome_categoria = value; }

    get nome_marca() { return this.#nome_marca; }
    set nome_marca(value) { this.#nome_marca = value; }

    constructor(id, nome, descricao, preco, id_categoria, id_marca) {
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#preco = preco;
        this.#id_categoria = id_categoria;
        this.#id_marca = id_marca;
    }

    async cadastrarProduto() {

        let sql = `INSERT INTO PRODUTO 
        (nome, descricao, preco, categoria_id_categoria, marca_id_marca) 
        VALUES (?, ?, ?, ?, ?)`;

        let valores = [
            this.#nome,
            this.#descricao,
            this.#preco,
            this.#id_categoria,
            this.#id_marca
        ];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listarProdutos() {

        let sql = `
            SELECT 
                P.id_produto,
                P.nome,
                P.descricao,
                P.preco,
                P.categoria_id_categoria,
                P.marca_id_marca,
                C.nome AS nome_categoria,
                M.nome AS nome_marca
            FROM PRODUTO P
            INNER JOIN CATEGORIA C
                ON P.categoria_id_categoria = C.id_categoria
            INNER JOIN MARCA M
                ON P.marca_id_marca = M.id_marca
        `;

        let banco = new Database();

        let linhas = await banco.ExecutaComando(sql);

        let lista = [];

        for(let i = 0; i < linhas.length; i++) {

            let linha = linhas[i];

            let produto = new ProdutoModel(
                linha['id_produto'],
                linha['nome'],
                linha['descricao'],
                linha['preco'],
                linha['categoria_id_categoria'],
                linha['marca_id_marca']
            );

            produto.nome_categoria = linha['nome_categoria'];
            produto.nome_marca = linha['nome_marca'];

            lista.push(produto);
        }

        return lista;
    }

    async excluirProduto() {

        let sql = `DELETE FROM PRODUTO WHERE id_produto = ?`;

        let valores = [this.#id];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obterPorId(id) {

        let sql = `SELECT * FROM PRODUTO WHERE id_produto = ?`;

        let valores = [id];

        let banco = new Database();

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {

            let row = rows[0];

            let produto = new ProdutoModel(
                row["id_produto"],
                row["nome"],
                row["descricao"],
                row["preco"],
                row["categoria_id_categoria"],
                row["marca_id_marca"]
            );

            return produto;
        }

        return null;
    }

    async atualizar() {

        let sql = `
            UPDATE PRODUTO 
            SET nome = ?, 
                descricao = ?, 
                preco = ?, 
                categoria_id_categoria = ?, 
                marca_id_marca = ?
            WHERE id_produto = ?
        `;

        let valores = [
            this.#nome,
            this.#descricao,
            this.#preco,
            this.#id_categoria,
            this.#id_marca,
            this.#id
        ];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
    
}

module.exports = ProdutoModel;