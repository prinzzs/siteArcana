const entidades = [

    {
        id: "ratos",
        nome: "Ratos",
        grupo: "real",
        tipo: "Animal (enxame)",
        tamanho: "Médio",
        vd: 10,
        imagem: "img/ratos.jpg",
        vida: 15,
        defesa: 13,
        atributos: [1, 0, 0, 1, 1],

        deslocamento: [
            "9m / 6q",
            "Escalar/nadar 6m / 4q"
        ],

        pericias: [
            ["Percepção", "1d20+5"],
            ["Iniciativa", "1d20+5"],
            ["Fortitude", "1d20+5"],
            ["Reflexos", "1d20+5"],
            ["Vontade", "1d20"]
        ],

        sentidos: ["Faro", "Visão na penumbra"],

        combate: [
            {
                nome: "Enxame",
                descricao: "Causa dano de perfuração aos seres em seu espaço."
            },
            {
                nome: "Doença",
                descricao: "Pode transmitir febre hemorrágica."
            }
        ],

        descricao:
            "Ratos são animais que vivem em grupos e podem ser encontrados em praticamente qualquer ambiente. Um enxame de ratos pode representar uma ameaça quando age em conjunto."
    },

    {
        id: "abelhas",
        nome: "Enxame de Abelhas",
        grupo: "real",
        tipo: "Animal (enxame)",
        tamanho: "Médio",
        vd: 10,
        imagem: "img/abelhas.jpg",
        vida: 10,
        defesa: 15,
        atributos: [1, 0, 0, 1, 0],

        deslocamento: [
            "3m / 2q",
            "Voo 9m / 6q"
        ],

        pericias: [
            ["Percepção", "1d20+5"],
            ["Iniciativa", "1d20+5"],
            ["Fortitude", "-2d20"],
            ["Reflexos", "1d20+5"],
            ["Vontade", "1d20"]
        ],

        sentidos: ["Visão na penumbra"],

        combate: [
            {
                nome: "Enxame",
                descricao: "Um enxame é uma aglomeração de criaturas que agem em conjunto. Em termos de regras, pode entrar no espaço ocupado por um ser. No fim do seu turno, o enxame causa 2d6 pontos de dano de perfuração a qualquer ser em seu espaço, automaticamente. Um enxame é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano e sofre apenas metade do dano de ataques com armas. Porém, sofre 50% a mais de dano por efeitos de área."
            },
            {
                nome: "Zumbido nauseante",
                descricao: "Um ser que sofra dano do enxame de abelhas fica enjoado por 1 rodada (Fortitude DT 15 evita)."
            }
        ],

        descricao:
            "Normalmente pacíficas, abelhas podem se tornar agressivas se sua colmeia for ameaçada.\n\nEncontradas principalmente em zonas rurais, abelhas podem estabelecer colmeias em parques e em casas abandonadas."
    },

    {
        id: "noxlith",
        nome: "Noxlith",
        grupo: "arcana",
        tipo: "Criatura",
        tamanho: "Médio",
        vd: 90,
        imagem: "img/Noxlith.jpg",
        vida: 90,
        defesa: 20,
        atributos: [4, 5, 3, 4, 4],

        deslocamento: ["15m / 10q"],

        pericias: [
            ["Percepção", "2d+12"],
            ["Iniciativa", "2d+8"],
            ["Fortitude", "2d+8"],
            ["Reflexos", "2d+9"],
            ["Vontade", "2d+10"]
        ],

        sentidos: [
            "Detecta emoções e presença de seres vivos em um raio de 24m."
        ],

        imunidades: ["Fogo", "Medo", "Mente"],
        condicoes: ["Atordoamento", "Paralisia"],

        resistencias: [
            "Balístico: 20",
            "Impacto: 20",
            "Perfuração: 20"
        ],

        vulnerabilidades: ["Morte"],

        combate: [
            {
                nome: "Forma Sólida",
                descricao: "2d+8 — Dano de Corte ou Esmagamento."
            },
            {
                nome: "Estilhaço de Medo",
                descricao: "2d+7 — Dano Mental, alcance de 18m."
            }
        ],

        descricao:
            "Noxlith é uma manifestação do horror primordial, sua forma sólida é uma massa viscosa e cinza, parecendo um óleo misturado com sangue coagulado. Seus olhos são dois poços de luz amarela, enquanto sua boca grotesca está cheia de dentes irregulares que se fundem à sua própria gosma. Ele se desloca pelas sombras e emite um cheiro de podridão."
    },

    {
        id: "serafim",
        nome: "Serafim Decaído",
        grupo: "arcana",
        tipo: "Entidade",
        tamanho: "Grande",
        vd: 120,
        imagem: "img/serafins.jpg",
        vida: 120,
        defesa: 22,
        atributos: [5, 6, 3, 3, 5],

        deslocamento: [
            "12m / 8q",
            "Voo 24m / 16q"
        ],

        pericias: [
            ["Percepção", "2d+10"],
            ["Iniciativa", "2d+9"],
            ["Fortitude", "2d+10"],
            ["Reflexos", "2d+11"],
            ["Vontade", "2d+9"]
        ],

        sentidos: [
            "Consciência sobrenatural em um raio de 30m."
        ],

        imunidades: ["Cegueira", "Invisibilidade"],
        condicoes: ["Atordoamento", "Paralisia"],

        resistencias: [
            "Balístico: 22",
            "Impacto: 22",
            "Perfuração: 22"
        ],

        vulnerabilidades: ["Não especificada"],

        combate: [
            {
                nome: "Lâminas de Luz",
                descricao: "Ataque de luz e corte."
            },
            {
                nome: "Rajada de Ventos Divinos",
                descricao: "Rajada de ventos divinos."
            }
        ],

        descricao:
            "Suas asas eram o primeiro sinal de sua decadência, o que antes tinha belas plumas radiantes agora são escombros carbonizados. Muitas das penas caíram, deixando apenas ossos quebrados e carne necrosada, retorcida em ângulos impossíveis. Chamas negras e cinzas flutuam ao redor dessas asas. Seus olhos veem mais do que qualquer visão mortal: eles enxergam as almas, despindo as intenções e medos de quem cruzar seu caminho.\n\nSeus rostos possuem uma beleza angelical perfeita, mas estão sempre escondidos por máscaras sombrias de metal escurecido, adornadas com fissuras que deixam escapar uma luz pálida e perturbadora. Seus corpos, apesar de cobertos por longas vestes que arrastam no chão como um manto de luto, ainda mantêm traços de sua antiga glória celestial. A pele é impecável, quase translúcida, mas veias negras se enraízam lentamente, como as garras da corrupção que tentam se infiltrar em cada parte de sua existência, prometendo consumir o que resta de sua divindade."
    }

];

const catalog = document.getElementById("catalog");
const detail = document.getElementById("detail");
const grid = document.getElementById("entityGrid");
const search = document.getElementById("search");

let filtroAtual = "todos";
let criaturaAtual = null;
let vidaAtual = 0;

function renderizarEntidades() {

    const termo = search.value.toLowerCase();

    const filtradas = entidades.filter(entidade => {

        const nomeCorresponde =
            entidade.nome.toLowerCase().includes(termo);

        const grupoCorresponde =
            filtroAtual === "todos" ||
            entidade.grupo === filtroAtual;

        return nomeCorresponde && grupoCorresponde;
    });

    grid.innerHTML = "";

    if (filtradas.length === 0) {
        grid.innerHTML = `
            <div class="empty">
                Nenhuma criatura encontrada.
            </div>
        `;
        return;
    }

    filtradas.forEach(entidade => {

        const grupoNome =
            entidade.grupo === "real"
                ? "Mundo Real"
                : "Arcana";

        const card = document.createElement("article");
        card.className = "entity-card";

        const imagem = document.createElement("img");
        imagem.src = entidade.imagem;
        imagem.alt = entidade.nome;
        imagem.onerror = () => imagem.style.display = "none";

        const conteudo = document.createElement("div");
        conteudo.className = "card-content";

        const titulo = document.createElement("h2");
        titulo.textContent = entidade.nome;

        const vd = document.createElement("p");
        vd.textContent = `VD: ${entidade.vd}`;

        const tipo = document.createElement("p");
        tipo.textContent = `${entidade.tipo} - ${entidade.tamanho}`;

        const categoria = document.createElement("span");
        categoria.className = "category";
        categoria.textContent = grupoNome;

        conteudo.append(titulo, vd, tipo, categoria);
        card.append(imagem, conteudo);

        card.addEventListener("click", () => {
            abrirFicha(entidade.id);
        });

        grid.appendChild(card);
    });
}

function abrirFicha(id, atualizarHistorico = true) {

    const entidade = entidades.find(item => item.id === id);

    if (!entidade) return;

    criaturaAtual = entidade;
    vidaAtual = entidade.vida;

    catalog.classList.add("hidden");
    detail.classList.remove("hidden");

    document.getElementById("entityName").textContent =
        entidade.nome;

    document.getElementById("entityInfo").textContent =
        `VD: ${entidade.vd} | ${entidade.tipo} - ${entidade.tamanho}`;

    atualizarVida();
    renderizarStatus(entidade);
    renderizarCombate(entidade);

    const descricao = document.getElementById("descricao");

    descricao.innerHTML = `
        <h3>Descrição</h3>
        <p class="description"></p>
    `;

    descricao.querySelector("p").textContent =
        entidade.descricao;

    mudarAba("status");

    if (atualizarHistorico) {
        history.pushState({}, "", `?id=${entidade.id}`);
    }
}

function renderizarStatus(entidade) {

    const status = document.getElementById("status");

    let html = `
        <h3>Status</h3>

        <div class="attributes">
            ${["AGI", "FOR", "INT", "PRE", "VIG"].map(
                (nome, index) => `
                    <div class="attribute">
                        ${nome}
                        <strong>${entidade.atributos[index]}</strong>
                    </div>
                `
            ).join("")}
        </div>

        <div class="info-box">
            <p><strong>Defesa:</strong> ${entidade.defesa}</p>
            <p><strong>Deslocamento:</strong></p>
            ${entidade.deslocamento.map(item => `<p>${item}</p>`).join("")}
        </div>

        <h3>Perícias</h3>

        <table class="pericias">
            <thead>
                <tr>
                    <th>Perícia</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                ${entidade.pericias.map((pericia, index) => `
                    <tr>
                        <td>${pericia[0]}</td>
                        <td>${pericia[1]}</td>
                        <td>
                            <button class="roll-button"
                                data-pericia="${index}">
                                Rolar
                            </button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    if (entidade.sentidos?.length) {
        html += criarInfo("Sentidos", entidade.sentidos);
    }

    if (entidade.imunidades?.length) {
        html += criarInfo("Imunidades", entidade.imunidades);
    }

    if (entidade.condicoes?.length) {
        html += criarInfo("Condições", entidade.condicoes);
    }

    if (entidade.resistencias?.length) {
        html += criarInfo("Resistências", entidade.resistencias);
    }

    if (entidade.vulnerabilidades?.length) {
        html += criarInfo("Vulnerabilidades", entidade.vulnerabilidades);
    }

    status.innerHTML = html;

    status.querySelectorAll(".roll-button").forEach(botao => {
        botao.addEventListener("click", () => {
            rolarPericia(Number(botao.dataset.pericia));
        });
    });
}

function renderizarCombate(entidade) {

    const combate = document.getElementById("combate");

    combate.innerHTML = `
        <h3>Combate</h3>

        ${entidade.combate.map(poder => `
            <div class="info-box">
                <h3>${poder.nome}</h3>
                <p>${poder.descricao}</p>
            </div>
        `).join("")}
    `;
}

function criarInfo(titulo, itens) {

    return `
        <div class="info-box">
            <h3>${titulo}</h3>
            ${itens.map(item => `<p>${item}</p>`).join("")}
        </div>
    `;
}

function atualizarVida() {

    document.getElementById("hpValue").textContent =
        `${vidaAtual} / ${criaturaAtual.vida}`;
}

document.getElementById("hpDown").addEventListener("click", () => {

    if (!criaturaAtual) return;

    vidaAtual = Math.max(0, vidaAtual - 1);
    atualizarVida();
});

document.getElementById("hpUp").addEventListener("click", () => {

    if (!criaturaAtual) return;

    vidaAtual = Math.min(criaturaAtual.vida, vidaAtual + 1);
    atualizarVida();
});

function mudarAba(nome) {

    document.querySelectorAll(".section").forEach(secao => {
        secao.classList.remove("active");
    });

    document.querySelectorAll(".tabs button").forEach(botao => {
        botao.classList.remove("active");
    });

    document.getElementById(nome).classList.add("active");

    document.querySelector(
        `.tabs button[data-tab="${nome}"]`
    ).classList.add("active");
}

document.querySelectorAll(".tabs button").forEach(botao => {

    botao.addEventListener("click", () => {
        mudarAba(botao.dataset.tab);
    });
});

function rolarPericia(index) {

    const pericia = criaturaAtual.pericias[index];
    const valor = pericia[1];

    const dados = valor.match(/^(-?\d*)d(\d+)?([+-]\d+)?$/i);

    if (!dados) {
        alert("Expressão não reconhecida: " + valor);
        return;
    }

    const quantidade = Math.abs(Number(dados[1] || 1));
    const lados = Number(dados[2] || 20);
    const modificador = Number(dados[3] || 0);
    const sinal = dados[1].startsWith("-") ? -1 : 1;

    let resultado = 0;
    let detalhes = [];

    for (let i = 0; i < quantidade; i++) {

        const dado = Math.floor(Math.random() * lados) + 1;

        resultado += dado * sinal;
        detalhes.push(dado);
    }

    resultado += modificador;

    alert(
        `${pericia[0]}\n` +
        `Dados: ${detalhes.join(" + ")}\n` +
        `Modificador: ${modificador}\n` +
        `Resultado: ${resultado}`
    );
}

document.querySelectorAll(".filter-buttons button").forEach(botao => {

    botao.addEventListener("click", () => {

        document.querySelectorAll(".filter-buttons button")
            .forEach(item => item.classList.remove("active"));

        botao.classList.add("active");

        filtroAtual = botao.dataset.filter;

        renderizarEntidades();
    });
});

search.addEventListener("input", renderizarEntidades);

renderizarEntidades();

const idInicial =
    new URLSearchParams(location.search).get("id");

if (idInicial) {
    abrirFicha(idInicial, false);
}

window.addEventListener("popstate", () => {

    const id =
        new URLSearchParams(location.search).get("id");

    if (id) {
        abrirFicha(id, false);
    } else {
        detail.classList.add("hidden");
        catalog.classList.remove("hidden");
        criaturaAtual = null;
    }
});
