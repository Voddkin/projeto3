document.addEventListener("DOMContentLoaded", function() {

    //ler os botoes de exclusão
    let btn = document.querySelectorAll(".btnExclusao");
    for(let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", excluir);
    }

    function excluir() {
        //recupera o data-attribute
        console.log(this.dataset.idexclusao);

        let idExclusao = this.dataset.idexclusao;

        if(confirm("Deseja realmente excluir esse usuário?")) {

            let obj = {
                id: idExclusao
            }

            fetch("/excluircategoria", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(corpo) {
                if(corpo.ok) {
                    console.log("Categoria excluída com sucesso!");
                    window.location.reload();
                }
                else {
                    console.log("Erro ao excluir a categoria!");
                }
            })
        }
    }

})