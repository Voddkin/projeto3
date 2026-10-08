document.addEventListener("DOMContentLoaded", function() {

    let btn = document.getElementById("btnGravar");

    btn.addEventListener("click", alterar);


    function alterar() {
        //leitura dos campos e validação prévia
        let nome = document.querySelector("#inputNome");
        let descricao = document.querySelector("#inputDescricao");
        let id = document.querySelector("#inputId");

        if(id.value > 0 && nome.value != "" && descricao.value != "") { 

            let obj = {
                id: id.value,
                nome: nome.value,
                descricao: descricao.value
            }

            //envia o objeto ao backend
            fetch("/cadastrarcategoria", {
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
                    alert("Categoria atualizada com sucesso!")
                    window.location.href= "/categoria";
                }
                else {
                    alert("Erro ao atualizar categoria!");
                }
           })
        }
        else {
            alert("Preencha todos os campos do formulário!");
        }
    }

})