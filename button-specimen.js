(() => {
  const specimen = document.querySelector("[data-button-specimen]");
  if (!specimen || !window.Exploded) return;

  const host = specimen.querySelector("[data-exploded-host]");
  const button = specimen.querySelector("[data-live-button]");
  const localeSelect = specimen.querySelector("[data-locale]");
  const backToTop = document.querySelector(".back-to-top");
  const labels = {
    en: { text: "Join Freelancer", lang: "en" },
    de: { text: "Freelancer beitreten", lang: "de" },
    ja: { text: "Freelancerに参加する", lang: "ja" }
  };
  let figure;
  let changingLocale = false;

  const mountFigure = async () => {
    await document.fonts.ready;
    figure = await window.Exploded.mount(host, {
      fig: 1,
      title: "Button · primary",
      target: button,
      states: [
        { id: "rest", label: "Rest" },
        { id: "hover", label: "Hover", pseudo: ["hover"] },
        { id: "focus", label: "Focus", pseudo: ["focus", "focus-visible", "focus-within"] },
        { id: "pressed", label: "Pressed", pseudo: ["hover", "active"] },
        { id: "disabled", label: "Disabled", attrs: { disabled: "", "aria-disabled": "true" } }
      ],
      theme: "light",
      tokens: true,
      tour: false,
      settle: 900
    });
  };

  localeSelect.addEventListener("change", async () => {
    if (changingLocale) return;
    changingLocale = true;
    localeSelect.disabled = true;
    try {
      if (figure) figure.destroy();
      const label = labels[localeSelect.value] || labels.en;
      button.textContent = label.text;
      button.lang = label.lang;
      figure = null;
      await mountFigure();
    } finally {
      localeSelect.disabled = false;
      changingLocale = false;
    }
  });

  if (backToTop && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      backToTop.classList.toggle("is-hidden-for-button-demo", entry.isIntersecting);
    }, { threshold: 0.01 }).observe(specimen);
  }

  mountFigure();
})();
