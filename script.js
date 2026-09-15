/* =========================================================
   PET SHOP MONTEMOR — script.js
   Responsável apenas por:
   1. abrir/fechar o menu mobile
   2. fechar o menu ao clicar em um link
   3. overlay (sem bloquear cliques depois de fechado)
   4. pequenos reveals discretos ao rolar a página
   5. ano automático no rodapé
   A navegação entre seções é feita pelas âncoras nativas do HTML.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- MENU MOBILE ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");
  var navOverlay = document.getElementById("navOverlay");

  function openMenu() {
    mainNav.classList.add("is-open");
    navOverlay.classList.add("is-visible");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
  }

  function closeMenu() {
    mainNav.classList.remove("is-open");
    navOverlay.classList.remove("is-visible");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }

  function toggleMenu() {
    var isOpen = mainNav.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (menuToggle && mainNav && navOverlay) {
    menuToggle.addEventListener("click", toggleMenu);

    /* Fecha o menu ao clicar no overlay */
    navOverlay.addEventListener("click", closeMenu);

    /* Fecha o menu ao selecionar qualquer link do menu (desktop ou mobile) */
    var navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    /* Fecha o menu com a tecla Esc, por acessibilidade */
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    /* Se a tela for redimensionada para desktop, garante que o menu não fique "aberto" */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) {
        closeMenu();
      }
    });
  }

  /* ---------- ANO NO RODAPÉ ---------- */
  var footerYear = document.getElementById("footerYear");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  /* ---------- REVEAL DISCRETO AO ROLAR ---------- */
  var revealTargets = document.querySelectorAll(
    ".service-card, .review-card, .differentials-copy, .differentials-media, .section-head"
  );

  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Sem suporte a IntersectionObserver: mostra tudo diretamente */
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
});
