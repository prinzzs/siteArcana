document.addEventListener("DOMContentLoaded", () => {
  const session = ArcanaAuth.requireAuth();
  if (!session) return;

  const STORAGE_KEY = "arcana_campaigns";
  const list = document.getElementById("campaign-list");
  const example = document.getElementById("campaign-example");
  const form = document.getElementById("campaign-form");
  const message = document.getElementById("campaign-message");
  const add = document.querySelector(".adicionar-campanha");
  const newCampaign = document.getElementById("new-campaign");

  add.addEventListener("click", () => {
    newCampaign.hidden = !newCampaign.hidden;
    add.setAttribute("aria-expanded", String(!newCampaign.hidden));
    if (!newCampaign.hidden) form.elements.name.focus();
  });

  const read = () => {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(all) ? all : [];
    } catch { return []; }
  };
  const write = items => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

  function render() {
    const campaigns = read().filter(item => item.ownerId === session.userId);
    example.hidden = true;
    list.replaceChildren();
    if (campaigns.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Você ainda não criou nenhuma campanha. Use \"Adicionar Campanha\" para começar.";
      list.append(empty);
    }
    campaigns.forEach(campaign => {
      const card = document.createElement("article");
      card.className = "campanha-card";
      const title = document.createElement("h3");
      title.textContent = campaign.name;
      const description = document.createElement("p");
      description.textContent = campaign.description || "Sem descrição.";
      const open = document.createElement("a");
      open.href = "teste.html?campanha=" + encodeURIComponent(campaign.id);
      open.textContent = "Ver detalhes";
      const rename = document.createElement("button");
      rename.type = "button";
      rename.textContent = "Editar";
      rename.className = "acao-editar";
      rename.addEventListener("click", async () => {
        const next = await ArcanaModal.prompt("Digite o novo nome para esta campanha.", campaign.name, "Renomear campanha");
        if (next === null) return;
        const clean = next.trim();
        if (!clean) {
          await ArcanaModal.alert("O nome da campanha não pode ficar vazio.", "Nome obrigatório");
          return;
        }
        const all = read();
        const target = all.find(item => item.id === campaign.id && item.ownerId === session.userId);
        if (target) target.name = clean;
        write(all);
        render();
      });
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Excluir";
      remove.className = "acao-excluir";
      remove.addEventListener("click", async () => {
        const confirmed = await ArcanaModal.confirm(
          "Esta ação não poderá ser desfeita. Deseja realmente excluir esta campanha e seus dados demonstrativos?",
          "Excluir campanha"
        );
        if (!confirmed) return;
        write(read().filter(item => !(item.id === campaign.id && item.ownerId === session.userId)));
        render();
      });
      const actions = document.createElement("footer");
      actions.className = "campanha-acoes";
      actions.append(open, rename, remove);
      card.append(title, description, actions);
      list.append(card);
    });
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const description = form.elements.description.value.trim();
    if (!name) {
      message.textContent = "Digite um nome para a campanha.";
      return;
    }
    const campaigns = read();
    campaigns.push({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      ownerId: session.userId,
      name,
      description,
      createdAt: new Date().toISOString()
    });
    write(campaigns);
    form.reset();
    newCampaign.hidden = true;
    add.setAttribute("aria-expanded", "false");
    add.focus();
    message.textContent = "Campanha criada e salva neste navegador.";
    render();
  });

  render();
});
