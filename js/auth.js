/* Arcana - autenticação demonstrativa no navegador.
   Para produção, substitua por autenticação com servidor (ex.: Supabase Auth).
*/
(() => {
  const USERS_KEY = "arcana_users";
  const SESSION_KEY = "arcana_session";

  function readUsers() {
    try {
      const value = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function getSession() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }

  function normalizeUsername(value) {
    return String(value || "").trim().toLowerCase();
  }

  async function hashPassword(password, salt) {
    if (!window.crypto?.subtle) {
      throw new Error("A autenticação demonstrativa precisa de HTTPS ou localhost e de um navegador moderno.");
    }
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({
      name: "PBKDF2",
      salt,
      iterations: 120000,
      hash: "SHA-256"
    }, key, 256);
    return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, "0")).join("");
  }

  function toBase64(bytes) {
    return btoa(String.fromCharCode(...bytes));
  }

  function fromBase64(value) {
    return Uint8Array.from(atob(value), char => char.charCodeAt(0));
  }

  async function register({ username, displayName, password }) {
    const normalized = normalizeUsername(username);
    const name = String(displayName || "").trim();

    if (!/^[a-z0-9_.]{3,20}$/.test(normalized)) {
      throw new Error("O nome de usuário deve ter de 3 a 20 caracteres: letras, números, ponto ou underline.");
    }
    if (name.length < 2 || name.length > 60) {
      throw new Error("Informe um nome com pelo menos 2 caracteres.");
    }
    if (String(password || "").length < 8) {
      throw new Error("A senha precisa ter pelo menos 8 caracteres.");
    }

    const users = readUsers();
    if (users.some(user => user.username === normalized)) {
      throw new Error("Esse nome de usuário já está em uso. Escolha outro.");
    }

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const passwordHash = await hashPassword(password, salt);
    const user = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2),
      username: normalized,
      displayName: name,
      salt: toBase64(salt),
      passwordHash,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      userId: user.id,
      username: user.username,
      displayName: user.displayName
    }));
    return user;
  }

  async function login({ username, password }) {
    const normalized = normalizeUsername(username);
    const user = readUsers().find(item => item.username === normalized);
    if (!user) throw new Error("Nome de usuário ou senha incorretos.");

    const calculated = await hashPassword(password, fromBase64(user.salt));
    if (calculated !== user.passwordHash) {
      throw new Error("Nome de usuário ou senha incorretos.");
    }

    const session = {
      userId: user.id,
      username: user.username,
      displayName: user.displayName
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = "login.html";
  }

  function requireAuth() {
    const session = getSession();
    if (!session) {
      const returnTo = window.location.pathname.split("/").pop() || "campanha.html";
      window.location.replace("login.html?returnTo=" + encodeURIComponent(returnTo));
      return null;
    }
    return session;
  }

  function renderUserMenu() {
    const slot = document.querySelector("[data-user-menu]");
    if (!slot) return;
    const session = getSession();
    if (!session) {
      slot.innerHTML = '<a href="login.html">Entrar</a>';
      return;
    }
    const profile = document.createElement("div");
    profile.className = "perfil-identidade";

    const avatar = document.createElement("span");
    avatar.className = "perfil-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = (session.displayName || session.username || "?").trim().charAt(0).toUpperCase();

    const name = document.createElement("span");
    name.className = "perfil-nome";
    name.textContent = session.displayName + " (@" + session.username + ")";

    profile.append(avatar, name);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "perfil-sair";
    button.textContent = "Sair";
    button.addEventListener("click", logout);
    slot.replaceChildren(profile, button);
  }

  window.ArcanaAuth = { register, login, logout, requireAuth, getSession, renderUserMenu };
  document.addEventListener("DOMContentLoaded", renderUserMenu);
})();
