document.addEventListener("DOMContentLoaded", function () {
    
    //faz a leitura do botão gravar
    let btn = document.querySelector("#cadastrar");

    btn.addEventListener("click", gravar);

    function gravar() {
        //Ler todos os campos e validá-los
        let nome = document.querySelector("#nome");
        let descricao = document.querySelector("#descricao");

        //valida de maneira simples.
        if(nome.value != "" && descricao.value != "") {

            //monta o objeto que deve ser enviado ao backend!
            let obj = {
                nome: nome.value,
                descricao: descricao.value
            };

            //escrita do FetchAPI
            fetch("/cadastrarmarca", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(resposta) {
                console.log(resposta);
                return resposta.json();
            }).then(function(corpoReposta) {
                console.log(corpoReposta);

                if(corpoReposta.ok) {
                    alert("Marca cadastrada com sucesso!");
                    window.location.href = "/marca";
                }
                else {
                    alert("Erro ao cadastrar marca!");
                }
            });

        }
        else {
            alert("Preencha corretamente todos os campos do formulário!");
        }
        
    }

});