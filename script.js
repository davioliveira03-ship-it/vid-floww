const containerVideos = document.querySelector("#videos__container");
const resultadoContagem = document.querySelector("#resultado-contagem");
const estadoVazio = document.querySelector("#estado-vazio");
const barraDePesquisa = document.querySelector("#barra-pesquisa");
const formPesquisa = document.querySelector("#form-pesquisa");
const ordenarVideos = document.querySelector("#ordenar-videos");
const toast = document.querySelector("#toast");
const menuLateral = document.querySelector("#menu-lateral");
const menuToggle = document.querySelector("#menu-toggle");
const sidebarOverlay = document.querySelector("#sidebar-overlay");

const avatarFallbacks = [
    "./img/sidebar/Avatar_Alura.png",
    "./img/sidebar/Avatar_Atila.png",
    "./img/sidebar/Avatar_Deschamps.png",
    "./img/sidebar/Avatar_Gaveta.png",
    "./img/sidebar/Avatar_Rafa.png",
    "./img/sidebar/Avatar_Souto.png"
];

const temas = ["blue", "purple", "coral", "green", "navy", "gold", "pink"];

const videosReserva = [
    { titulo: "Como criar uma página web do zero", descricao: "Alura", categoria: "Front-end", visualizacoes: 12400, data: "2026-08-29", duracao: "12:48", rotulo: "Front-end", avatar: avatarFallbacks[0], url: "https://www.youtube.com/results?search_query=como+criar+uma+pagina+web" },
    { titulo: "JavaScript: lógica de programação na prática", descricao: "Filipe Deschamps", categoria: "Programação", visualizacoes: 28600, data: "2026-08-27", duracao: "18:32", rotulo: "JavaScript", avatar: avatarFallbacks[2], url: "https://www.youtube.com/results?search_query=javascript+logica+de+programacao" },
    { titulo: "O que é mobile first e por que importa?", descricao: "Rafaella Ballerini", categoria: "Mobile", visualizacoes: 9100, data: "2026-08-24", duracao: "09:14", rotulo: "Mobile", avatar: avatarFallbacks[4], url: "https://www.youtube.com/results?search_query=mobile+first+design" },
    { titulo: "Flexbox e Grid: escolhendo o layout certo", descricao: "Gaveta", categoria: "Front-end", visualizacoes: 34100, data: "2026-08-22", duracao: "22:05", rotulo: "CSS", avatar: avatarFallbacks[3], url: "https://www.youtube.com/results?search_query=css+flexbox+grid" },
    { titulo: "Dados que contam histórias", descricao: "Alura", categoria: "Data Science", visualizacoes: 18700, data: "2026-08-20", duracao: "16:41", rotulo: "Data Science", avatar: avatarFallbacks[0], url: "https://www.youtube.com/results?search_query=data+science+visualizacao+de+dados" },
    { titulo: "Design de interfaces sem complicação", descricao: "Átila Iamarino", categoria: "Design", visualizacoes: 7600, data: "2026-08-18", duracao: "11:26", rotulo: "Design", avatar: avatarFallbacks[1], url: "https://www.youtube.com/results?search_query=design+de+interfaces" },
    { titulo: "Primeiros passos com React", descricao: "Alura", categoria: "Programação", visualizacoes: 42300, data: "2026-08-15", duracao: "25:19", rotulo: "React", avatar: avatarFallbacks[0], url: "https://www.youtube.com/results?search_query=primeiros+passos+react" },
    { titulo: "Como estudar tecnologia com consistência", descricao: "Jovem Nerd", categoria: "Carreira", visualizacoes: 15300, data: "2026-08-12", duracao: "14:03", rotulo: "Carreira", avatar: "./img/sidebar/Avatar_Jovem_Nerd.png", url: "https://www.youtube.com/results?search_query=como+estudar+tecnologia" },
    { titulo: "APIs: conectando ideias e produtos", descricao: "Filipe Deschamps", categoria: "Programação", visualizacoes: 21900, data: "2026-08-09", duracao: "19:47", rotulo: "APIs", avatar: avatarFallbacks[2], url: "https://www.youtube.com/results?search_query=apis+para+iniciantes" },
    { titulo: "Acessibilidade começa no HTML", descricao: "Alura", categoria: "Front-end", visualizacoes: 6800, data: "2026-08-06", duracao: "10:55", rotulo: "Acessibilidade", avatar: avatarFallbacks[0], url: "https://www.youtube.com/results?search_query=acessibilidade+html" },
    { titulo: "Ciência de dados em projetos reais", descricao: "Átila Iamarino", categoria: "Data Science", visualizacoes: 11200, data: "2026-08-03", duracao: "20:18", rotulo: "Projetos reais", avatar: avatarFallbacks[1], url: "https://www.youtube.com/results?search_query=ciencia+de+dados+projetos" },
    { titulo: "Criando experiências melhores para a web", descricao: "Rafaella Ballerini", categoria: "Design", visualizacoes: 9800, data: "2026-07-30", duracao: "13:37", rotulo: "Experiência", avatar: avatarFallbacks[4], url: "https://www.youtube.com/results?search_query=experiencia+do+usuario+web" }
];

const state = {
    videos: [],
    categoria: "Tudo",
    busca: "",
    ordenacao: "recentes"
};

let toastTimer;

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function normalizarVideo(video, index) {
    return {
        ...video,
        id: video.id || `video-${index + 1}`,
        titulo: video.titulo || video.title || "Vídeo sem título",
        descricao: video.descricao || video.canal || video.channel || "VidFlow",
        categoria: video.categoria || video.category || "Programação",
        visualizacoes: Number(video.visualizacoes || video.views || (index + 1) * 2300),
        data: video.data || video.date || "2026-08-01",
        duracao: video.duracao || video.duration || "12:00",
        rotulo: video.rotulo || video.label || video.categoria || "VidFlow",
        avatar: video.avatar || avatarFallbacks[index % avatarFallbacks.length],
        url: video.url || "https://www.youtube.com"
    };
}

function formatarVisualizacoes(numero) {
    if (numero >= 1000000) return `${(numero / 1000000).toFixed(1).replace(".0", "")} mi`;
    if (numero >= 1000) return `${(numero / 1000).toFixed(1).replace(".0", "")} mil`;
    return String(numero);
}

function formatarData(data) {
    const dataVideo = new Date(`${data}T12:00:00`);
    if (Number.isNaN(dataVideo.getTime())) return "recentemente";
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(dataVideo).replace(" de ", " ");
}

function obterVideosFiltrados() {
    const termo = state.busca.trim().toLocaleLowerCase("pt-BR");
    const filtrados = state.videos.filter((video) => {
        const correspondeCategoria = state.categoria === "Tudo" || video.categoria.toLocaleLowerCase("pt-BR") === state.categoria.toLocaleLowerCase("pt-BR");
        const texto = `${video.titulo} ${video.descricao} ${video.categoria} ${video.rotulo}`.toLocaleLowerCase("pt-BR");
        return correspondeCategoria && (!termo || texto.includes(termo));
    });

    return filtrados.sort((a, b) => {
        if (state.ordenacao === "populares") return b.visualizacoes - a.visualizacoes;
        if (state.ordenacao === "alfabetica") return a.titulo.localeCompare(b.titulo, "pt-BR");
        return new Date(b.data) - new Date(a.data);
    });
}

function renderizarLista() {
    const videos = obterVideosFiltrados();
    containerVideos.innerHTML = videos.map((video, index) => {
        const tema = temas[index % temas.length];
        const thumbnail = video.thumbnail || video.imagem || "";
        const imagem = thumbnail ? `<img class="video__image" src="${escapeHtml(thumbnail)}" alt="" loading="lazy" onerror="this.remove()">` : "";
        return `
            <li class="videos__item">
                <article class="video-card">
                    <a class="card__link" href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer" aria-label="Assistir: ${escapeHtml(video.titulo)}">
                        <div class="card__thumbnail card__thumbnail--${tema}">
                            ${imagem}
                            <span class="thumbnail__label">${escapeHtml(video.rotulo)}</span>
                            <span class="thumbnail__fallback">${escapeHtml(video.rotulo)}</span>
                            <span class="thumbnail__play" aria-hidden="true"></span>
                            <span class="thumbnail__duration">${escapeHtml(video.duracao)}</span>
                        </div>
                        <div class="video-card__body">
                            <img class="video-card__avatar" src="${escapeHtml(video.avatar)}" alt="" loading="lazy">
                            <div class="video-card__copy">
                                <h2 class="titulo-video">${escapeHtml(video.titulo)}</h2>
                                <p class="descricao-canal">${escapeHtml(video.descricao)}</p>
                                <div class="video-card__meta"><span>${formatarVisualizacoes(video.visualizacoes)} visualizações</span><span aria-hidden="true">•</span><span>${formatarData(video.data)}</span></div>
                            </div>
                        </div>
                    </a>
                    <div class="card__menu-wrap">
                        <button class="card__menu" type="button" aria-label="Mais opções para ${escapeHtml(video.titulo)}" aria-expanded="false" data-menu-toggle></button>
                        <div class="card__popover" data-card-popover>
                            <button type="button" data-card-action="fila">Adicionar à fila</button>
                            <button type="button" data-card-action="salvar">Salvar para mais tarde</button>
                        </div>
                    </div>
                </article>
            </li>
        `;
    }).join("");

    const total = state.videos.length;
    resultadoContagem.textContent = videos.length === total ? `${total} vídeos disponíveis` : `${videos.length} de ${total} vídeos`;
    estadoVazio.hidden = videos.length !== 0;
}

function mostrarToast(mensagem) {
    window.clearTimeout(toastTimer);
    toast.textContent = mensagem;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function fecharMenuLateral() {
    document.body.classList.remove("menu-aberto");
    menuToggle.setAttribute("aria-expanded", "false");
}

function alternarMenuLateral() {
    const aberto = document.body.classList.toggle("menu-aberto");
    menuToggle.setAttribute("aria-expanded", String(aberto));
}

async function buscarEMostrarVideos() {
    try {
        const resposta = await fetch("./backend/videos.json", { cache: "no-store" });
        if (!resposta.ok) throw new Error("Catálogo indisponível");
        const dados = await resposta.json();
        const lista = Array.isArray(dados) ? dados : dados.videos;
        state.videos = (Array.isArray(lista) && lista.length ? lista : videosReserva).map(normalizarVideo);
    } catch (error) {
        state.videos = videosReserva.map(normalizarVideo);
    }
    renderizarLista();
}

formPesquisa.addEventListener("submit", (event) => {
    event.preventDefault();
    state.busca = barraDePesquisa.value;
    renderizarLista();
    if (state.busca.trim()) mostrarToast(`Resultados para “${state.busca.trim()}”`);
    barraDePesquisa.focus();
});

barraDePesquisa.addEventListener("input", () => {
    state.busca = barraDePesquisa.value;
    renderizarLista();
});

ordenarVideos.addEventListener("change", () => {
    state.ordenacao = ordenarVideos.value;
    renderizarLista();
});

document.querySelectorAll("[data-category]").forEach((botao) => {
    botao.addEventListener("click", () => {
        state.categoria = botao.dataset.category;
        document.querySelectorAll("[data-category]").forEach((item) => item.classList.remove("superior__item--ativo"));
        botao.classList.add("superior__item--ativo");
        renderizarLista();
    });
});

document.querySelectorAll("[data-view]").forEach((item) => {
    item.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelectorAll("[data-view]").forEach((navItem) => navItem.classList.remove("menu__itens--ativo"));
        item.classList.add("menu__itens--ativo");
        fecharMenuLateral();
        if (item.dataset.view === "inicio") {
            mostrarToast("Você está na página inicial.");
            return;
        }
        mostrarToast(`${item.textContent.trim()} estará disponível em breve.`);
    });
});

document.querySelectorAll("[data-channel]").forEach((item) => {
    item.addEventListener("click", (event) => {
        event.preventDefault();
        barraDePesquisa.value = item.dataset.channel;
        state.busca = item.dataset.channel;
        renderizarLista();
        fecharMenuLateral();
        mostrarToast(`Filtrando vídeos de ${item.dataset.channel}.`);
    });
});

document.querySelector("#limpar-filtros").addEventListener("click", () => {
    state.busca = "";
    state.categoria = "Tudo";
    barraDePesquisa.value = "";
    document.querySelectorAll("[data-category]").forEach((item) => item.classList.toggle("superior__item--ativo", item.dataset.category === "Tudo"));
    renderizarLista();
});

menuToggle.addEventListener("click", alternarMenuLateral);
sidebarOverlay.addEventListener("click", fecharMenuLateral);

menuLateral.addEventListener("click", (event) => {
    const mostrarMais = event.target.closest("[data-action='mostrar-inscricoes']");
    if (mostrarMais) mostrarToast("Todas as inscrições já estão visíveis.");
});

document.querySelectorAll("[data-action]").forEach((botao) => {
    if (botao.dataset.action === "mostrar-inscricoes") return;
    botao.addEventListener("click", () => {
        const mensagens = {
            criar: "O estúdio de criação estará disponível em breve.",
            apps: "Aplicativos VidFlow estarão disponíveis em breve.",
            notificacoes: "Você não tem novas notificações.",
            conta: "Menu da conta estará disponível em breve."
        };
        mostrarToast(mensagens[botao.dataset.action] || "Ação realizada.");
    });
});

document.querySelector("#teclado-pesquisa").addEventListener("click", () => barraDePesquisa.focus());
document.querySelector("#audio-pesquisa").addEventListener("click", () => mostrarToast("A pesquisa por voz estará disponível em breve."));

document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-menu-toggle]");
    const action = event.target.closest("[data-card-action]");
    if (action) {
        const mensagem = action.dataset.cardAction === "fila" ? "Vídeo adicionado à fila." : "Vídeo salvo para assistir mais tarde.";
        document.querySelectorAll("[data-card-popover]").forEach((popover) => popover.classList.remove("is-open"));
        document.querySelectorAll("[data-menu-toggle]").forEach((button) => button.setAttribute("aria-expanded", "false"));
        mostrarToast(mensagem);
        return;
    }
    if (toggle) {
        const popover = toggle.nextElementSibling;
        const aberto = popover.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(aberto));
        document.querySelectorAll("[data-card-popover]").forEach((outroPopover) => {
            if (outroPopover !== popover) outroPopover.classList.remove("is-open");
        });
        return;
    }
    if (!event.target.closest(".card__menu-wrap")) {
        document.querySelectorAll("[data-card-popover]").forEach((popover) => popover.classList.remove("is-open"));
        document.querySelectorAll("[data-menu-toggle]").forEach((button) => button.setAttribute("aria-expanded", "false"));
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== barraDePesquisa) {
        event.preventDefault();
        barraDePesquisa.focus();
    }
    if (event.key === "Escape") {
        fecharMenuLateral();
        document.querySelectorAll("[data-card-popover]").forEach((popover) => popover.classList.remove("is-open"));
    }
});

buscarEMostrarVideos();
