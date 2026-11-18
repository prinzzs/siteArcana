document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const message = document.getElementById("login-message");
  if (!form || !window.ArcanaAuth) return;

  form.addEventListener("submit", async event => {
    event.preventDefault();
    message.textContent = "";
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;

    try {
      await ArcanaAuth.login({
        username: form.elements.username.value,
        password: form.elements.password.value
      });
      message.textContent = "Login realizado! Redirecionando...";
      message.dataset.type = "success";
      const requested = new URLSearchParams(location.search).get("returnTo");
      const allowed = ["campanha.html", "fichas.html", "teste.html"];
      location.href = allowed.includes(requested) ? requested : "campanha.html";
    } catch (error) {
      message.textContent = error.message;
      message.dataset.type = "error";
    } finally {
      submit.disabled = false;
    }
  });
});
