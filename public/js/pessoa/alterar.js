document.addEventListener("DOMContentLoaded", function() {

    let btn = document.getElementById("btnGravar");

    btn.addEventListener("click", alterar);


    function alterar() {

        let id = document.querySelector("#inputId");
        let nome = document.querySelector("#inputNome");
        let cpf = document.querySelector("#inputCpf");
        let dataNascimento = document.querySelector("#inputDataNascimento");

        if(
            id.value > 0 &&
            nome.value.trim() != "" &&
            cpf.value.trim() != "" &&
            dataNascimento.value != ""
        ) {

            let obj = {
                id: id.value,
                nome: nome.value,
                cpf: cpf.value,
                data_nascimento: dataNascimento.value
            };

            fetch("/cadastrarpessoa", {
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

                    alert("Pessoa atualizada com sucesso!");

                    window.location.href = "/pessoa";

                }
                else {

                    alert("Erro ao atualizar pessoa!");

                }

            });

        }
        else {

            alert("Preencha todos os campos do formulário!");

        }

    }

});