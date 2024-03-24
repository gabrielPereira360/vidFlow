const containerVideos = document.querySelector('.videos__container'); // Obter identificador da lista de vídeos

async function buscarEMostrarVideos() {
    try {
        const busca = await fetch('https://gabrielpereira360.github.io/apiVidflow/videos.json') // Obter a lista de vídeos
        const videos = await busca.json(); // Tranforma a promisse em um JSON
        videos.forEach((video) => {

            if (video.categoria == "") {
                throw new Error('Vídeo não possui categoria');
            }

            containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allow fullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="Logo do canal"</img>
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                <li>        
                `
        });
    } catch (error) {
        containerVideos.innerHTML = `
            <p style="color: red; margin: 15px auto; font-size: 24px;">Erro ao carregar os vídeos. Código do erro: ${error}</p>
        `;
    };
}

buscarEMostrarVideos();


const barraDePesquisa = document.querySelector('.pesquisar__input');

barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item'); // Obtem a lista de vídeos
    const valorFiltro = barraDePesquisa.value.toLowerCase(); // Obtem o item da barra de pesquisa em minusculo

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
        video.style.display = valorFiltro ? (titulo.includes(valorFiltro) ? 'block' : 'none') : 'block';
    });
}

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name'); // Captura a categoria de cada botao
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll('.videos__item'); // Obtem a lista de vídeos
    const nomeDaCategoria = filtro.toLowerCase();
    videos.forEach((video) => {
        const categoriaVideo = video.querySelector('.categoria').textContent.toLowerCase();
        video.style.display = ((!categoriaVideo.includes(nomeDaCategoria)) && (nomeDaCategoria != 'tudo')) ? 'none' : 'block';
    });
}

