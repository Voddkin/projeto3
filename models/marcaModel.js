
const Database = require("../database/database.js");

class MarcaModel {

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


    async cadastrarMarca() {

        let sql = `INSERT INTO MARCA (nome, descricao) VALUES (?, ?)`;

        let valores = [
            this.#nome,
            this.#descricao
        ];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }


    async listarMarcas() {

        let sql = `SELECT * FROM MARCA`;

        let banco = new Database();

        let linhas = await banco.ExecutaComando(sql);

        let lista = [];

        for(let i = 0; i < linhas.length; i++) {

            let linha = linhas[i];

            let marca = new MarcaModel(
                linha["id_marca"],
                linha["nome"],
                linha["descricao"]
            );

            lista.push(marca);

        }

        return lista;

    }

    async atualizar() {

        let sql = `
            UPDATE MARCA
            SET nome = ?, descricao = ?
            WHERE id_marca = ?
        `;

        let valores = [
            this.#nome,
            this.#descricao,
            this.#id
        ];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }


    async excluirMarca() {

        let sql = `DELETE FROM MARCA WHERE id_marca = ?`;

        let valores = [
            this.#id
        ];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }


    async obterPorId(id) {

        let sql = `SELECT * FROM MARCA WHERE id_marca = ?`;

        let valores = [
            id
        ];

        let banco = new Database();

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {

            let row = rows[0];

            let marca = new MarcaModel(
                row["id_marca"],
                row["nome"],
                row["descricao"]
            );

            return marca;

        }

        return null;

    }

}

module.exports = MarcaModel;
