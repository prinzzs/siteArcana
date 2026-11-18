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


  // Gerenciador demonstrativo de combates e criaturas personalizadas.
  const combatSection = document.getElementById("combats");
  const creatureKey = "arcana_custom_creatures";
  const encounterKey = "arcana_combat_encounters";
  const standardCreatures = [
    {id:"ratos",nome:"Ratos",vida:15,defesa:13},
    {id:"abelhas",nome:"Enxame de Abelhas",vida:10,defesa:15},
    {id:"noxlith",nome:"Noxlith",vida:90,defesa:20},
    {id:"serafim",nome:"Serafim Decaído",vida:120,defesa:22}
  ];
  const readLocal = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; } };
  const customCreatures = () => readLocal(creatureKey, []);
  const allCreatures = () => standardCreatures.concat(customCreatures()).sort((a,b) => a.nome.localeCompare(b.nome,"pt-BR"));
  const allEncounters = readLocal(encounterKey, {});
  let encounters = allEncounters[campaignId] || [];
  const saveEncounters = () => { allEncounters[campaignId] = encounters; localStorage.setItem(encounterKey, JSON.stringify(allEncounters)); };
  const makeElement = (tag, text, className) => { const node=document.createElement(tag); if(text !== undefined) node.textContent=text; if(className) node.className=className; return node; };

  function renderCombatManager() {
    combatSection.replaceChildren();
    combatSection.append(makeElement("h2","Combates — " + campaign.name));
    combatSection.append(makeElement("p","Crie encontros e adicione criaturas do catálogo ou cadastre uma nova sem sair desta página."));
    const create = document.createElement("form");
    create.className = "demo-module-form";
    create.innerHTML = '<label>Nome do combate<input name="name" required placeholder="Ex.: Emboscada na floresta"></label><label>Observações<textarea name="notes" placeholder="Anotações do mestre"></textarea></label><button type="submit">Criar combate</button>';
    combatSection.append(create);
    const list = makeElement("div",undefined,"combat-encounters");
    combatSection.append(list);
    create.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(create);
      encounters.push({id:"enc-" + Date.now(),name:String(data.get("name")).trim(),notes:String(data.get("notes")).trim(),creatures:[]});
      saveEncounters(); renderCombatManager();
    });
    if (!encounters.length) list.append(makeElement("p","Nenhum combate criado nesta campanha ainda."));
    encounters.forEach(encounter => {
      const card = makeElement("article",undefined,"combat-card");
      card.append(makeElement("h3",encounter.name),makeElement("p",encounter.notes || "Sem observações."));
      const addExisting = document.createElement("form");
      addExisting.className = "combat-add-form";
      const select = document.createElement("select");
      select.required = true;
      const placeholder = makeElement("option","Escolha uma criatura..."); placeholder.value = ""; select.append(placeholder);
      allCreatures().forEach(creature => { const option=makeElement("option",creature.nome + " (PV " + creature.vida + ")"); option.value=creature.id; select.append(option); });
      const selectLabel=makeElement("label","Criatura existente"); selectLabel.append(select);
      const addButton=makeElement("button","Adicionar ao combate"); addButton.type="submit";
      addExisting.append(selectLabel,addButton);
      addExisting.addEventListener("submit",event => {
        event.preventDefault();
        const creature=allCreatures().find(item => item.id===select.value);
        if(!creature) return;
        encounter.creatures.push({id:"instance-"+Date.now(),creatureId:creature.id,nome:creature.nome,vidaMaxima:Number(creature.vida)||1,vidaAtual:Number(creature.vida)||1,defesa:Number(creature.defesa)||0});
        saveEncounters(); renderCombatManager();
      });
      const newButton=makeElement("button","＋ Criar nova criatura","secondary-button"); newButton.type="button";
      const newForm=document.createElement("form"); newForm.className="combat-creature-form hidden";
      newForm.innerHTML='<h4>Nova criatura</h4><label>Nome<input name="nome" required maxlength="60"></label><div class="combat-form-grid"><label>Tipo<input name="tipo" value="Criatura" maxlength="40"></label><label>Tamanho<select name="tamanho"><option>Minúsculo</option><option>Pequeno</option><option selected>Médio</option><option>Grande</option><option>Enorme</option><option>Colossal</option></select></label><label>VD<input name="vd" type="number" min="0" value="10" required></label><label>Pontos de vida<input name="vida" type="number" min="1" value="20" required></label><label>Defesa<input name="defesa" type="number" min="0" value="10" required></label></div><label>Descrição<textarea name="descricao" maxlength="1000"></textarea></label><label>Ataques e habilidades<textarea name="habilidades" maxlength="1200" placeholder="Uma habilidade por linha. Ex.: Mordida: causa 1d6 de dano."></textarea></label><button type="submit">Salvar criatura e adicionar</button>';
      newButton.addEventListener("click",()=>newForm.classList.toggle("hidden"));
      newForm.addEventListener("submit",event=>{
        event.preventDefault();
        const data=new FormData(newForm);
        const creature={
          id:"custom-"+Date.now(),nome:String(data.get("nome")).trim(),tipo:String(data.get("tipo")||"Criatura").trim(),
          tamanho:String(data.get("tamanho")||"Médio"),vd:Math.max(0,Number(data.get("vd"))||0),
          vida:Math.max(1,Number(data.get("vida"))||1),defesa:Math.max(0,Number(data.get("defesa"))||0),
          grupo:"personalizada",imagem:"",atributos:[0,0,0,0,0],deslocamento:[],pericias:[],sentidos:[],
          combate:String(data.get("habilidades")||"").split(String.fromCharCode(10)).map(line=>line.trim()).filter(Boolean).map((line,i)=>{
            const pos=line.indexOf(":"); return pos<0?{nome:"Habilidade "+(i+1),descricao:line}:{nome:line.slice(0,pos).trim(),descricao:line.slice(pos+1).trim()};
          }),descricao:String(data.get("descricao")||"").trim(),personalizada:true
        };
        const saved=customCreatures(); saved.push(creature); localStorage.setItem(creatureKey,JSON.stringify(saved));
        encounter.creatures.push({id:"instance-"+Date.now(),creatureId:creature.id,nome:creature.nome,vidaMaxima:creature.vida,vidaAtual:creature.vida,defesa:creature.defesa});
        saveEncounters(); renderCombatManager();
      });
      card.append(addExisting,newButton,newForm);
      const creatureList=makeElement("ul",undefined,"combat-creature-list");
      if(!encounter.creatures.length) creatureList.append(makeElement("li","Nenhuma criatura neste combate."));
      encounter.creatures.forEach((instance,index)=>{
        const row=makeElement("li",instance.nome+" — PV: "+instance.vidaAtual+"/"+instance.vidaMaxima+" — Defesa: "+instance.defesa);
        const down=makeElement("button","− PV"); down.type="button"; down.addEventListener("click",()=>{instance.vidaAtual=Math.max(0,instance.vidaAtual-1);saveEncounters();renderCombatManager();});
        const up=makeElement("button","+ PV"); up.type="button"; up.addEventListener("click",()=>{instance.vidaAtual=Math.min(instance.vidaMaxima,instance.vidaAtual+1);saveEncounters();renderCombatManager();});
        const remove=makeElement("button","Remover"); remove.type="button"; remove.addEventListener("click",()=>{encounter.creatures.splice(index,1);saveEncounters();renderCombatManager();});
        row.append(" ",down," ",up," ",remove); creatureList.append(row);
      });
      const deleteButton=makeElement("button","Excluir combate","danger-button"); deleteButton.type="button";
      deleteButton.addEventListener("click",()=>{if(confirm("Excluir este combate?")){encounters=encounters.filter(item=>item.id!==encounter.id);saveEncounters();renderCombatManager();}});
      card.append(creatureList,deleteButton); list.append(card);
    });
  }
  renderCombatManager();

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
