(() => {
  let activeDialog = null;

  function openModal({ title, message = "", type = "alert", value = "", confirmText = "Entendi", placeholder = "" }) {
    if (activeDialog?.open) activeDialog.close();

    const dialog = document.createElement("dialog");
    dialog.className = "arcana-modal";
    dialog.setAttribute("aria-labelledby", "arcana-modal-title");

    const panel = document.createElement("div");
    panel.className = "arcana-modal-panel";

    const icon = document.createElement("span");
    icon.className = "arcana-modal-icon " + (type === "confirm" ? "is-warning" : type === "prompt" ? "is-edit" : "is-info");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = type === "confirm" ? "?" : type === "prompt" ? "✎" : "i";

    const heading = document.createElement("h2");
    heading.id = "arcana-modal-title";
    heading.textContent = title;

    const description = document.createElement("p");
    description.className = "arcana-modal-message";
    description.textContent = message;

    panel.append(icon, heading, description);

    let input = null;
    if (type === "prompt") {
      input = document.createElement("input");
      input.className = "arcana-modal-input";
      input.type = "text";
      input.value = value;
      input.placeholder = placeholder;
      input.maxLength = 80;
      input.setAttribute("aria-label", title);
      panel.append(input);
    }

    const actions = document.createElement("div");
    actions.className = "arcana-modal-actions";

    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "arcana-modal-cancel";
    cancel.textContent = "Cancelar";

    const accept = document.createElement("button");
    accept.type = "button";
    accept.className = "arcana-modal-accept" + (type === "confirm" ? " is-danger" : "");
    accept.textContent = confirmText;

    if (type !== "alert") actions.append(cancel);
    actions.append(accept);
    panel.append(actions);
    dialog.append(panel);
    document.body.append(dialog);

    activeDialog = dialog;

    return new Promise(resolve => {
      let settled = false;
      const finish = result => {
        if (settled) return;
        settled = true;
        dialog.close();
        dialog.remove();
        if (activeDialog === dialog) activeDialog = null;
        resolve(result);
      };

      accept.addEventListener("click", () => {
        finish(type === "prompt" ? input.value : type === "confirm" ? true : undefined);
      });
      cancel.addEventListener("click", () => finish(type === "prompt" ? null : false));
      dialog.addEventListener("cancel", event => {
        event.preventDefault();
        finish(type === "prompt" ? null : false);
      });
      dialog.addEventListener("click", event => {
        if (event.target === dialog) finish(type === "prompt" ? null : false);
      });
      dialog.showModal();
      if (input) {
        input.focus();
        input.select();
        input.addEventListener("keydown", event => {
          if (event.key === "Enter") {
            event.preventDefault();
            accept.click();
          }
        });
      } else accept.focus();
    });
  }

  window.ArcanaModal = {
    alert(message, title = "Aviso") {
      return openModal({ title, message: String(message ?? "") });
    },
    confirm(message, title = "Confirmar ação") {
      return openModal({ title, message: String(message ?? ""), type: "confirm", confirmText: "Confirmar" });
    },
    prompt(message, value = "", title = "Editar informação") {
      return openModal({ title, message: String(message ?? ""), type: "prompt", value: String(value ?? ""), confirmText: "Salvar", placeholder: "Digite aqui" });
    }
  };
})();