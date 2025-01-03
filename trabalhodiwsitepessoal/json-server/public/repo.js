const urlParams = new URLSearchParams(window.location.search);
const repoId = parseInt(urlParams.get('id')); // Certifique-se que o id é um número

let repos = [];

// Busca os dados de todos os repositórios da API
fetch('https://api.github.com/users/PaulaNogueiraC/repos')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        repos = data;
        carregaDadosRepositorio();
    })
    .catch(error => {
        console.error('Erro ao buscar dados dos repositórios:', error);
        // Lógica para exibir mensagem de erro ao usuário (opcional)
    });

function carregaDadosRepositorio() {
    // Encontra o repositório pelo ID usando o find
    const repo = repos.find(repo => repo.id === repoId);

    if (repo) {
        // Preenche os elementos HTML com os dados do repositório
        document.getElementById("repo-name").textContent = repo.name;
        document.getElementById("description").textContent = repo.description || "Descrição não disponível";
        document.getElementById("created_at").textContent = formatDate(repo.created_at);
        document.getElementById("ling").textContent = repo.language || "Linguagem não especificada";
        document.getElementById("link").href = repo.html_url;
        document.getElementById("link").textContent = repo.html_url; // Atualiza o texto do link
    } else {
        // Repositório não encontrado
        document.getElementById("tela").innerHTML = "Repositório não encontrado";
    }
}

function formatDate(isoDateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoDateString).toLocaleDateString(undefined, options);
}
