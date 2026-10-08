document.addEventListener("DOMContentLoaded", function () {
    
    //faz a leitura do botão gravar
    let btn = document.querySelector("#cadastrar");

    btn.addEventListener("click", gravar);

    function gravar() {

        //Ler todos os campos e validá-los
        let nome = document.querySelector("#nome");
        let cpf = document.querySelector("#cpf");
        let data_nascimento = document.querySelector("#data_nascimento");

        //valida de maneira simples
        if(nome.value != "" && cpf.value != "" && data_nascimento.value != "") {

            //monta o objeto que deve ser enviado ao backend
            let obj = {
                nome: nome.value,
                cpf: cpf.value,
                data_nascimento: data_nascimento.value
            };

            //escrita do FetchAPI
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
            .then(function(corpoReposta) {

                console.log(corpoReposta);

                if(corpoReposta.ok) {

                    alert("Pessoa cadastrada com sucesso!");

                    window.location.href = "/pessoa";

                }
                else {

                    alert("Erro ao cadastrar pessoa!");

                }

            });

        }
        else {

            alert("Preencha corretamente todos os campos do formulário!");

        }
        
    }

});