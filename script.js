const containerVideos = document.querySelector('.videos__container'); // Obter identificador da lista de vídeos

async function buscarEMostrarVideos() {
    try{
        const busca = await fetch('http://localhost:3000/videos') // Obter a lista de vídeos
        const videos = await busca.json(); // Tranforma a promisse em um JSON
            videos.forEach((video) => {

                if (video.categoria == ""){
                    throw new Error('Vídeo não possui categoria');
                }

                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allow fullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="Logo do canal"
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                    </div>
                <li>        
                `
                });
    }catch(error){
        containerVideos.innerHTML = `
            <p style="color: red; margin: 15px auto; font-size: 24px;">Erro ao carregar os vídeos. Código do erro: ${error}</p>
        `;
    };
}

buscarEMostrarVideos();




