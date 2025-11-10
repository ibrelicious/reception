// Modal + filtrering
(function () {
    const modal = document.getElementById("recipeModal");
    const modalBody = modal.querySelector(".modal-body");
    const modalTitle = document.getElementById("modal-title");
    const closeBtn = modal.querySelector(".close");
    const openButtons = document.querySelectorAll(".img-btn");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");

    let lastFocusedElement = null;

    function openModal(targetId) {
        const content = document.getElementById(targetId);
        if (!content) return;

        modalBody.innerHTML = content.innerHTML;
        const h2 = content.querySelector("h2");
        modalTitle.textContent = h2 ? h2.textContent : "Recept";

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");

        lastFocusedElement = document.activeElement;
        closeBtn.focus();

        document.addEventListener("keydown", onKeydown);
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        modalBody.innerHTML = "";

        document.removeEventListener("keydown", onKeydown);

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
    }

    function onKeydown(e) {
        if (e.key === "Escape") {
            closeModal();
        }
    }

    openButtons.forEach((btn) => {
        btn.addEventListener("click", () => openModal(btn.dataset.target));
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    closeBtn.addEventListener("click", closeModal);

    // Filtrera kort efter kategori
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            cards.forEach((card) => {
                const category = card.dataset.category;
                const show = filter === "all" || filter === category;
                card.style.display = show ? "" : "none";
            });
        });
    });
})();
