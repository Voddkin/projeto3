document.addEventListener("DOMContentLoaded", function() {

    let btn = document.getElementById("btnGravar");

    btn.addEventListener("click", alterar);


    function alterar() {

        let nome = document.querySelector("#inputNome");
        let descricao = document.querySelector("#inputDescricao");
        let id = document.querySelector("#inputId");

        if(
            id.value > 0 &&
            nome.value.trim() != "" &&
            descricao.value.trim() != ""
        ) {

            let obj = {
                id: id.value,
                nome: nome.value,
                descricao: descricao.value
            };

            fetch("/cadastrarmarca", {
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

                    alert("Marca atualizada com sucesso!");

                    window.location.href = "/marca";

                }
                else {

                    alert("Erro ao atualizar marca!");

                }

            });

        }
        else {

            alert("Preencha todos os campos do formulário!");

        }

    }

});