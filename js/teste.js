const navButtons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page-content");

navButtons.forEach(button => {
    button.addEventListener("click", () => {
        const targetPage = button.dataset.page;

        navButtons.forEach(item => {
            item.classList.remove("active");
            item.removeAttribute("aria-current");
        });

        pages.forEach(page => {
            page.classList.remove("active");
        });

        button.classList.add("active");
        button.setAttribute("aria-current", "page");

        document.getElementById(targetPage).classList.add("active");

        button.scrollIntoView({
            behavior: "auto",
            block: "nearest",
            inline: "nearest"
        });
    });
});

const campaignName = document.getElementById("campaign-name");
const campaignDescription = document.getElementById("campaign-description");
const saveButton = document.getElementById("save-campaign");

campaignName.value = localStorage.getItem("campaignName") || "";
campaignDescription.value = localStorage.getItem("campaignDescription") || "";

saveButton.addEventListener("click", () => {
    localStorage.setItem("campaignName", campaignName.value);
    localStorage.setItem("campaignDescription", campaignDescription.value);

    saveButton.textContent = "Salvo!";

    setTimeout(() => {
        saveButton.textContent = "Salvar alterações";
    }, 1500);
});
