const Database = require("../database/database.js");

class PessoaModel {

    #id
    #nome
    #cpf
    #data_nascimento

    get id() { return this.#id; }
    set id(value) { this.#id = value; }
    get nome() { return this.#nome; }
    set nome(value) { this.#nome = value; }
    get cpf() { return this.#cpf; }
    set cpf(value) { this.#cpf = value; }
    get data_nascimento() { return this.#data_nascimento; }
    set data_nascimento(value) { this.#data_nascimento = value; }

    constructor(id, nome, cpf, data_nascimento) {
        this.#id = id;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#data_nascimento = data_nascimento;
    }

    async cadastrarPessoa() {

        let sql = `INSERT INTO FISICA (nome, cpf, data_nascimento) VALUES (?, ?, ?)`;
        let valores = [this.#nome, this.#cpf, this.#data_nascimento];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

    async listarPessoas() {

        let sql = `SELECT * FROM FISICA`;

        let banco = new Database();

        let linhas = await banco.ExecutaComando(sql);

        let lista = [];

        for(let i = 0; i < linhas.length; i++) {

            let linha = linhas[i];
            
            let pessoa = new PessoaModel(linha['id_fisica'], linha['nome'], linha['cpf'], linha['data_nascimento']);

            lista.push(pessoa);
        }

        return lista;

    }

    async atualizar() {

        let sql = `
            UPDATE FISICA
            SET nome = ?, cpf = ?, data_nascimento = ?
            WHERE id_fisica = ?
        `;

        let valores = [
            this.#nome,
            this.#cpf,
            this.#data_nascimento,
            this.#id
        ];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
        
    }

    async excluirPessoa() {

        let sql = `DELETE FROM FISICA WHERE id_fisica = ?`;

        let valores = [this.#id];

        let banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

    async obterPorId(id) {
        
        let sql = "select * from FISICA where id_fisica = ?";

        let valores = [id];

        let banco = new Database();

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            let pessoa = new PessoaModel(row["id_fisica"], row["nome"], row["cpf"], row["data_nascimento"]);

            return pessoa;
        }

        return null;

    }

}

module.exports = PessoaModel;