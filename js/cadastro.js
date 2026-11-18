document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");
  const message = document.getElementById("cadastro-message");
  if (!form || !window.ArcanaAuth) return;

  form.addEventListener("submit", async event => {
    event.preventDefault();
    message.textContent = "";
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;

    try {
      await ArcanaAuth.register({
        username: form.elements.username.value,
        displayName: form.elements.displayName.value,
        password: form.elements.password.value
      });
      message.textContent = "Conta criada! Redirecionando...";
      message.dataset.type = "success";
      window.location.href = "campanha.html";
    } catch (error) {
      message.textContent = error.message;
      message.dataset.type = "error";
    } finally {
      submit.disabled = false;
    }
  });
});
