const Database = require("../database/database.js");

class CategoriaModel {

    #id
    #nome
    #descricao

    get id() { return this.#id; }
    set id(value) { this.#id = value; }
    get nome() { return this.#nome; }
    set nome(value) { this.#nome = value; }
    get descricao() { return this.#descricao; }
    set descricao(value) { this.#descricao = value; }

    constructor(id, nome, descricao) {
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
    }

    async cadastrarCategoria() {

        let sql = `INSERT INTO CATEGORIA (nome, descricao) VALUES (?, ?)`;
        let valores = [this.#nome, this.#descricao];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

    async listarCategorias() {

        let sql = `SELECT * FROM CATEGORIA`;

        let banco = new Database();

        let linhas = await banco.ExecutaComando(sql);

        let lista = [];

        for(let i = 0; i < linhas.length; i++) {

            let linha = linhas[i];
            
            let categoria = new CategoriaModel(linha['id_categoria'], linha['nome'], linha['descricao']);

            lista.push(categoria);
        }

        return lista;

    }

    async atualizar() {
        let sql = "update CATEGORIA set nome = ?, descricao = ? where id_categoria = ?";

        let valores = [this.#nome, this.#descricao, this.#id];

        let banco = new Database();
        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluirCategoria(id) {

        let sql = `DELETE FROM CATEGORIA WHERE id_categoria = ?`;

        let valores = [id];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

    async obterPorId(id) {
        
        let sql = "select * from CATEGORIA where id_categoria = ?";

        let valores = [id];

        let banco = new Database();

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            let categoria = new CategoriaModel(row["id_categoria"], row["nome"], row["descricao"]);

            return categoria;
        }

        return null;

    }

}

module.exports = CategoriaModel;