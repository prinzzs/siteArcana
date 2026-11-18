document.addEventListener("DOMContentLoaded", () => {
  const session = ArcanaAuth.requireAuth();
  if (!session) return;

  const params = new URLSearchParams(location.search);
  const campaignId = params.get("campanha");
  const campaigns = JSON.parse(localStorage.getItem("arcana_campaigns") || "[]");
  const campaign = campaigns.find(item => item.id === campaignId && item.ownerId === session.userId);

  const nameInput = document.getElementById("campaign-name");
  const descriptionInput = document.getElementById("campaign-description");
  const saveButton = document.getElementById("save-campaign");
  const header = document.querySelector(".campaign-header");

  if (!campaign) {
    header.innerHTML = '<h1>Campanha não encontrada</h1><p>Volte para a lista e selecione uma campanha sua.</p><a href="campanha.html">Voltar às campanhas</a>';
    document.querySelector(".campaign-nav")?.remove();
    document.querySelector(".content-area")?.remove();
    return;
  }

  nameInput.value = campaign.name;
  descriptionInput.value = campaign.description || "";

  const buttons = document.querySelectorAll(".nav-button");
  const pages = document.querySelectorAll(".page-content");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.page;
      buttons.forEach(item => {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
      });
      pages.forEach(page => page.classList.remove("active"));
      button.classList.add("active");
      button.setAttribute("aria-current", "page");
      document.getElementById(id)?.classList.add("active");
    });
  });

  function saveCampaign() {
    const all = JSON.parse(localStorage.getItem("arcana_campaigns") || "[]");
    const current = all.find(item => item.id === campaignId && item.ownerId === session.userId);
    if (!current) return;
    current.name = nameInput.value.trim() || current.name;
    current.description = descriptionInput.value.trim();
    localStorage.setItem("arcana_campaigns", JSON.stringify(all));
    saveButton.textContent = "Salvo!";
    setTimeout(() => saveButton.textContent = "Salvar alterações", 1200);
  }
  saveButton.addEventListener("click", saveCampaign);

  // Módulos demonstrativos: os registros ficam separados por campanha e navegador.
  const modules = {
    players: { title: "Jogadores e personagens", fields: ["Nome do jogador", "Nome do personagem"] },
    agents: { title: "Agentes", fields: ["Nome", "Descrição"] },
    combats: { title: "Combates", fields: ["Nome do encontro", "Observações"] },
    diary: { title: "Diário de sessões", fields: ["Título da sessão", "Resumo"] },
    missions: { title: "Missões", fields: ["Nome da missão", "Descrição"] },
    clues: { title: "Banco de pistas", fields: ["Pista", "Detalhes"] },
    notes: { title: "Anotações do mestre", fields: ["Título", "Anotação"] },
    npcs: { title: "Galeria de NPCs", fields: ["Nome do NPC", "Descrição"] },
    inventory: { title: "Inventário e recompensas", fields: ["Item ou recompensa", "Detalhes"] }
  };

  const storageKey = "arcana_campaign_data";
  function readData() {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); }
    catch { return {}; }
  }
  function writeData(data) { localStorage.setItem(storageKey, JSON.stringify(data)); }

  Object.entries(modules).forEach(([key, config]) => {
    const section = document.getElementById(key);
    if (!section) return;
    section.replaceChildren();
    const title = document.createElement("h2");
    title.textContent = config.title + " — " + campaign.name;
    const form = document.createElement("form");
    form.className = "demo-module-form";
    const inputs = config.fields.map((field, index) => {
      const label = document.createElement("label");
      label.textContent = field;
      const input = index === 1 && key !== "players" ? document.createElement("textarea") : document.createElement("input");
      input.name = "field" + index;
      input.required = index === 0;
      label.append(input);
      form.append(label);
      return input;
    });
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Adicionar";
    form.append(submit);
    const resultList = document.createElement("ul");
    section.append(title, form, resultList);

    function renderItems() {
      const all = readData();
      const records = all[campaignId]?.[key] || [];
      resultList.replaceChildren();
      if (!records.length) {
        const empty = document.createElement("li");
        empty.textContent = "Nenhum registro ainda.";
        resultList.append(empty);
      }
      records.forEach((record, index) => {
        const li = document.createElement("li");
        const text = document.createElement("span");
        text.textContent = record.values.filter(Boolean).join(" — ");
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Excluir";
        remove.addEventListener("click", () => {
          const data = readData();
          data[campaignId][key].splice(index, 1);
          writeData(data);
          renderItems();
        });
        li.append(text, " ", remove);
        resultList.append(li);
      });
    }

    form.addEventListener("submit", event => {
      event.preventDefault();
      const values = inputs.map(input => input.value.trim());
      if (!values[0]) return;
      const data = readData();
      if (!data[campaignId]) data[campaignId] = {};
      if (!data[campaignId][key]) data[campaignId][key] = [];
      data[campaignId][key].push({ values, createdAt: new Date().toISOString() });
      writeData(data);
      form.reset();
      renderItems();
    });
    renderItems();
  });

  const overview = document.getElementById("overview");
  overview.innerHTML = "";
  const overviewTitle = document.createElement("h2");
  overviewTitle.textContent = campaign.name;
  const overviewDescription = document.createElement("p");
  overviewDescription.textContent = campaign.description || "Esta campanha ainda não possui descrição.";
  const demoNote = document.createElement("p");
  demoNote.textContent = "Modo demonstração: os dados são armazenados somente neste navegador.";
  overview.append(overviewTitle, overviewDescription, demoNote);
});
