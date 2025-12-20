// ====================== GSAP SETUP ======================
gsap.registerPlugin(ScrollTrigger);

// ====================== SAFE SELECTORS ======================
const artCards = document.querySelectorAll(".art-card");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const closeBtn = document.querySelector(".close");

// ====================== SCROLL REVEAL: ART CARDS ======================
if (artCards.length > 0) {
  artCards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      }
    });
  });
}

// ====================== FILTER FUNCTION ======================
if (filterButtons.length > 0 && artCards.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      // Active state
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      artCards.forEach(card => {
        const match =
          filter === "all" || card.classList.contains(filter);

        if (match) {
          card.style.display = "block";

          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.96 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: "power2.out"
            }
          );
        } else {
          card.style.display = "none";
        }
      });

      ScrollTrigger.refresh();
    });
  });
}

// ====================== MODAL VIEW ======================
if (modal && modalImg && artCards.length > 0) {

  artCards.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      if (!img) return;

      modal.style.display = "flex";
      modalImg.src = img.src;

      gsap.fromTo(
        modalImg,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
      );

      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    gsap.to(modalImg, {
      scale: 0.9,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });
}

// ====================== HOVER EFFECT (DESKTOP ONLY) ======================
if (window.matchMedia("(hover: hover)").matches && artCards.length > 0) {
  artCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
        duration: 0.3,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 12px 25px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}

// ====================== CONTACT SECTION ANIMATION ======================
const contactSection = document.querySelector("#contact");

if (contactSection) {
  gsap.from(
    "#contact h2, #contact .contact-text, #contact .contact-details, #contact .whatsapp-btn, #contact .social-links",
    {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
      }
    }
  );
}


// ====================== PORTFOLIO TEXT ANIMATION (FIXED) ======================
window.addEventListener("load", () => {
  const portfolioTitle = document.querySelector(".portfolio-title");
  if (!portfolioTitle) return;

  // Ensure visible
  portfolioTitle.style.visibility = "visible";

  const text = portfolioTitle.textContent.trim();
  portfolioTitle.textContent = "";

  text.split("").forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? "\u00A0" : letter;
    span.style.display = "inline-block";
    span.style.opacity = "0";
    portfolioTitle.appendChild(span);
  });

  gsap.to(".portfolio-title span", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: portfolioTitle,
      start: "top 90%",
    }
  });
});
