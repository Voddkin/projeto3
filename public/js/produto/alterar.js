document.addEventListener("DOMContentLoaded", function() {

    let btn = document.getElementById("btnGravar");

    btn.addEventListener("click", alterar);


    function alterar() {

        let id = document.querySelector("#inputId");
        let nome = document.querySelector("#inputNome");
        let descricao = document.querySelector("#inputDescricao");
        let preco = document.querySelector("#inputPreco");
        let categoria = document.querySelector("#selCategoria");
        let marca = document.querySelector("#selMarca");

        if(
            id.value > 0 &&
            nome.value.trim() != "" &&
            descricao.value.trim() != "" &&
            preco.value != "" &&
            categoria.value != "" &&
            marca.value != ""
        ) {

            let obj = {
                id: id.value,
                nome: nome.value,
                descricao: descricao.value,
                preco: preco.value,
                id_categoria: categoria.value,
                id_marca: marca.value
            };

            fetch("/cadastrarproduto", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function(resposta) {

                console.log(resposta);

                return resposta.json();

            })
            .then(function(corpoResposta) {

                console.log(corpoResposta);

                if(corpoResposta.ok) {

                    alert("Produto atualizado com sucesso!");

                    window.location.href = "/produto";

                }
                else {

                    alert("Erro ao atualizar produto!");

                }

            });

        }
        else {

            alert("Preencha todos os campos do formulário!");

        }

    }

});