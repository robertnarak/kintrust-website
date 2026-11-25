(function () {
  "use strict";

  var copy = {
    en: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      addressKr: "11 Jungheung-ro 139beon-gil, Buk-gu, Pohang-si, South Korea",
      langGroup: "Website language",
      navLabel: "Primary",
      footerLabel: "Footer",
      areasLabel: "Business areas"
    },
    ko: {
      openMenu: "메뉴 열기",
      closeMenu: "메뉴 닫기",
      addressKr: "대한민국 포항시 북구 중흥로139번길 11",
      langGroup: "웹사이트 언어",
      navLabel: "주 메뉴",
      footerLabel: "하단 메뉴",
      areasLabel: "사업 분야"
    }
  };

  var details = {
    email: "kintrust@naver.com",
    phone: "+256743231434",
    phoneDisplay: "+256 743 231 434",
    addressUg: "Plot 7/9, Second Street, Industrial Area, Uganda"
  };

  function text() {
    return copy[document.documentElement.lang === "ko" ? "ko" : "en"];
  }

  function nodes(selector) {
    return document.querySelectorAll(selector);
  }

  function applyDetails() {
    var strings = text();
    var whatsapp = "https://wa.me/" + details.phone.replace(/\D/g, "");
    nodes("[data-cfg]").forEach(function (node) {
      switch (node.dataset.cfg) {
        case "email":
          node.textContent = details.email;
          node.href = "mailto:" + details.email;
          break;
        case "phonePrimary":
          node.textContent = details.phoneDisplay;
          node.href = "tel:" + details.phone;
          break;
        case "addressUg":
          node.textContent = details.addressUg;
          break;
        case "addressKr":
          node.textContent = strings.addressKr;
          break;
        case "callBtn":
          node.href = "tel:" + details.phone;
          break;
        case "waBtn":
          node.href = whatsapp;
          break;
        default:
          break;
      }
    });

    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    var lang = document.documentElement.lang === "ko" ? "ko" : "en";
    nodes("[data-language]").forEach(function (link) {
      var choice = link.dataset.language === "ko" ? "ko" : "en";
      link.href = "/?lang=" + choice + window.location.hash;
      if (choice === lang) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    var group = document.querySelector(".language-switch");
    if (group) group.setAttribute("aria-label", strings.langGroup);
    var nav = document.getElementById("nav-panel");
    if (nav) nav.setAttribute("aria-label", strings.navLabel);
    var footerNav = document.getElementById("footer-nav");
    if (footerNav) footerNav.setAttribute("aria-label", strings.footerLabel);
    var areas = document.querySelector(".hero-foot");
    if (areas) areas.setAttribute("aria-label", strings.areasLabel);

    document.querySelectorAll(".brand-home").forEach(function (link) {
      link.setAttribute("aria-label", lang === "ko" ? "Kintrust Trading Company Limited 홈" : "Kintrust Trading Company Limited, home");
    });
    var menu = document.getElementById("menu-btn");
    if (menu && menu.getAttribute("aria-expanded") !== "true") {
      menu.setAttribute("aria-label", strings.openMenu);
    }
  }

  function setupMenu() {
    var header = document.querySelector(".nav");
    var button = document.getElementById("menu-btn");
    var panel = document.getElementById("nav-panel");
    var links = document.getElementById("nav-links");
    if (!header || !button || !panel || !links) return;

    var desktop = window.matchMedia("(min-width: 1101px)");

    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function open() {
      return button.getAttribute("aria-expanded") === "true";
    }

    function setOpen(next) {
      var strings = text();
      button.setAttribute("aria-expanded", String(next));
      button.setAttribute("aria-label", next ? strings.closeMenu : strings.openMenu);
      panel.classList.toggle("open", next);
      document.body.classList.toggle("menu-open", next);
      if (next) {
        var first = links.querySelector("a");
        if (first) first.focus();
      }
    }

    button.addEventListener("click", function () { setOpen(!open()); });
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { if (open()) setOpen(false); });
    });
    document.addEventListener("keydown", function (event) {
      if (!open()) return;
      if (event.key === "Escape") {
        setOpen(false);
        button.focus();
      }
    });
    function closeIfDesktop() {
      if (desktop.matches && open()) setOpen(false);
    }
    if (desktop.addEventListener) desktop.addEventListener("change", closeIfDesktop);
    else window.addEventListener("resize", closeIfDesktop);

    var current = new Map();
    links.querySelectorAll('a[href^="#"]').forEach(function (link) {
      current.set(link.getAttribute("href").slice(1), link);
    });
    if (!("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        current.forEach(function (link) { link.removeAttribute("aria-current"); });
        var active = current.get(entry.target.id);
        if (active) active.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (section) {
      observer.observe(section);
    });
  }

  function setupReveal() {
    var items = nodes(".reveal");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("in"); });
      return;
    }
    document.documentElement.classList.add("js");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (item) { observer.observe(item); });
  }

  window.addEventListener("hashchange", applyDetails);
  applyDetails();
  setupMenu();
  setupReveal();
})();
