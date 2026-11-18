(() => {
  const storageKey = "arcana_theme";
  const root = document.documentElement;

  function getTheme() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch (error) {}
    return "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const button = document.getElementById("arcana-theme-toggle");
    if (button) {
      const dark = theme === "dark";
      button.textContent = dark ? "☀" : "☾";
      button.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
      button.setAttribute("title", dark ? "Ativar modo claro" : "Ativar modo escuro");
      button.setAttribute("aria-pressed", String(dark));
    }
  }

  function initTheme() {
    let button = document.getElementById("arcana-theme-toggle");
    if (!button) {
      button = document.createElement("button");
      button.id = "arcana-theme-toggle";
      button.type = "button";
      button.addEventListener("click", () => {
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        try { localStorage.setItem(storageKey, next); } catch (error) {}
        applyTheme(next);
      });
      document.body.append(button);
    }
    applyTheme(getTheme());
  }

  applyTheme(getTheme());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme, { once: true });
  } else {
    initTheme();
  }
})();