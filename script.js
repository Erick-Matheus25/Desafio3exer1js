document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById('btn-buscar');
   
    // Mapeia o clique do botão para chamar a função de buscar dados
    botao.addEventListener('click', carregarAlunos);
});

function carregarAlunos() {
    const container = document.getElementById('lista-alunos');
   
    // Mostra um feedback visual de carregamento logo após o clique
    container.innerHTML = '<p>Buscando dados dos alunos...</p>';

    fetch('alunos.json')
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Erro ao carregar o arquivo JSON");
            }
            return resposta.json();
        })
        .then(alunos => {
            container.innerHTML = ''; // Limpa o texto de carregamento

            alunos.forEach(aluno => {
                const classeStatus = aluno.status === "Ativo" ? "status-ativo" : "status-inativo";

                const card = `
                    <div class="card-aluno">
                        <h3>${aluno.nome}</h3>
                        <p><strong>Curso:</strong> ${aluno.curso}</p>
                        <p><strong>Status:</strong> <span class="${classeStatus}">${aluno.status}</span></p>
                    </div>
                `;

                container.innerHTML += card;
            });
        })
        .catch(erro => {
            console.error("Ops, algo deu errado:", erro);
            container.innerHTML = "<p style='color: red;'>Erro ao carregar os dados dos alunos.</p>";
        });
}