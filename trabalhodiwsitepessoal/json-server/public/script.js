const repos = document.querySelector(".repo")

fetch('https://api.github.com/users/PaulaNogueiraC')
  .then(res => res.json() )
  .then(data => {
   console.log(data);
    document.getElementById('avatar_url').src = data.avatar_url;
    document.getElementById('name').innerHTML = data.name;
    document.getElementById('login').innerHTML = data.login;
    document.getElementById('bio').innerHTML = data.bio;
    document.getElementById('location').innerHTML = data.location;
    document.getElementById('followers').innerHTML = data.followers;
 })


fetch("https://api.github.com/users/PaulaNogueiraC/repos")
  .then(res => {
    return res.json()
  })
  .then(data => {
    data.forEach(repositorio => {
      repos.innerHTML += `
        <div class="card col-12 col-sm-3" style="height: 18rem;">
            <a class="repo-link" href="index1.html?name=${repositorio.name}">${repositorio.name}</a>
            <div class="card-body pt-0">
              <p>${repositorio.description}</p>
              <strong>${repositorio.language}</strong>
                <p class="card-text">
                <div class="icon">
                    <div class="icones star"><i class="fa-solid fa-star"></i>
                        <p>${repositorio.stargazers_count}</p>
                    </div>
                    <div class="icones user"><i class="fa-solid fa-user"></i>
                        <p>${repositorio.watchers_count}</p>
                    </div>
                </div>
                </p>
            </div>
        </div>
      `
    })
})


  /*Carousel*/

  document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.getElementById('carousel');
    let todosOsConteudos = [];

    function carregarConteudos(todosOsConteudos) {
        let carousel = '';

            for (let i = 0; i < todosOsConteudos.length; i++) {
                let conteudo = todosOsConteudos[i];
                carousel += `
                    <div class="carousel-item ${i === 0 ? 'active' : ''}" id="item-${i + 1}">
                        <img src="${conteudo.image}" class="d-block w-100" alt="Foto de ${conteudo.id}">
                    </div>`;
            }
        carouselContainer.innerHTML = carousel;
    }

    function carregarConteudosJSON() {
        fetch('http://localhost:3000/conteudo')
            .then(res => res.json())
            .then(data => {
                console.log('Dados carregados:', data); // Log para depuração
                if (Array.isArray(data) && data.length > 0) {
                    todosOsConteudos = data;
                    carregarConteudos(todosOsConteudos[0]); // Chamar a função para renderizar os conteúdos
                } else if (data && Array.isArray(data[0])) {
                    todosOsConteudos = data[0];
                    carregarConteudos(todosOsConteudos[0]); // Chamar a função para renderizar os conteúdos
                } else {
                    console.error('Formato de dados inválido:', data);
                }
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error); // Log de erro
            });
    }


    function carregarColegasJSON() {
        fetch('http://localhost:3000/colegas')
            .then(res => res.json())
            .then(data => {
              let tela = '';
              for(let a = 0; a < data.length; a++)
              {
              let colegaT = data[a];
              tela = tela + `<a href=${colegaT.gitHub}><div class="colega">
              <img src=${colegaT.image}>
              <p>${colegaT.name}</p>
               </div></a>`
              }
              document.getElementById("colegas-container").innerHTML = tela;
    })
          }

    // Carregar ambos os conjuntos de dados
    carregarConteudosJSON();
    carregarColegasJSON();
});
