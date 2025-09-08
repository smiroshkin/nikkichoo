document.addEventListener("DOMContentLoaded", function () {
  const accordion = document.getElementById("faqAccordion");
  const items = accordion.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      items.forEach((el) => {
        el.classList.remove("active");
        el.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
        el.querySelector(".accordion-content").setAttribute("aria-hidden", "true");
        el.querySelector(".accordion-content").style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        header.setAttribute("aria-expanded", "true");
        content.setAttribute("aria-hidden", "false");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });

    // Доступность: поддержка клавиатуры
    header.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        header.click();
      }
    });
  });
});
