(function () {
  "use strict";

  var data = window.SITE_DATA || {};
  var profile = data.profile || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // http(s) と相対パスのみ許可（javascript: などを防ぐ）
  function safeUrl(url) {
    if (!url) return "";
    var u = String(url).trim();
    if (/^https?:\/\//i.test(u)) return u;
    if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return "";
    return u;
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- icons ---------- */
  var ICONS = {
    youtube: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path class="fill" d="M10 9.2v5.6l4.8-2.8z"/>',
    shorts: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/><path class="fill" d="M10.5 8.6v5l4.2-2.5z"/>',
    consult: '<path d="M4 5.5h11a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H9l-3.5 3v-3H4A1.5 1.5 0 0 1 2.5 13V7A1.5 1.5 0 0 1 4 5.5z"/><path d="M19.5 9.5h.5A1.5 1.5 0 0 1 21.5 11v5a1.5 1.5 0 0 1-1.5 1.5h-1V20l-3-2.5h-3.5"/>',
    ai: '<path d="M12 3.5l1.8 4.7 4.7 1.8-4.7 1.8L12 16.5l-1.8-4.7L5.5 10l4.7-1.8z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
    automation: '<path d="M20 11a8 8 0 0 0-14.3-4.9"/><path d="M5.5 3v3.3h3.3"/><path d="M4 13a8 8 0 0 0 14.3 4.9"/><path d="M18.5 21v-3.3h-3.3"/><circle cx="12" cy="12" r="2.4"/>',
    x: '<path class="fill" d="M17.75 3h3.07l-6.71 7.67L22 21h-6.18l-4.84-6.33L5.44 21H2.37l7.18-8.2L2 3h6.33l4.38 5.79L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z"/>',
    web: '<rect x="2.5" y="4" width="19" height="16" rx="2.5"/><path d="M2.5 8.5h19"/><path d="M9.5 12.5l-2.2 2.2 2.2 2.2M14.5 12.5l2.2 2.2-2.2 2.2"/>',
    learn: '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/>'
  };

  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.learn) + "</svg>";
  }

  /* ---------- works visuals (CSS/SVG placeholders) ---------- */
  var VISUALS = {
    baseball:
      '<svg viewBox="0 0 320 240" aria-hidden="true">' +
        '<rect class="v-frame" x="118" y="22" width="112" height="196" rx="14"/>' +
        '<circle class="v-ball" cx="150" cy="122" r="58"/>' +
        '<path class="v-seam" d="M112 80c22 18 26 66 0 86"/>' +
        '<path class="v-seam" d="M188 80c-22 18-26 66 0 86"/>' +
        '<path class="v-stitch" d="M112 80c22 18 26 66 0 86"/>' +
        '<path class="v-stitch" d="M188 80c-22 18-26 66 0 86"/>' +
        '<path class="v-trail" d="M30 168c40-6 62-20 80-40"/>' +
        '<path class="v-trail v-trail--2" d="M42 190c38-4 64-16 84-34"/>' +
      "</svg>",
    ai:
      '<svg viewBox="0 0 320 240" aria-hidden="true">' +
        '<g class="v-links">' +
          '<path d="M160 120L88 70M160 120L232 70M160 120L80 160M160 120L240 164M160 120L160 40M88 70L160 40L232 70M80 160L118 206M240 164L200 206M118 206h82"/>' +
        "</g>" +
        '<circle class="v-node" cx="88" cy="70" r="5"/><circle class="v-node" cx="232" cy="70" r="5"/>' +
        '<circle class="v-node" cx="80" cy="160" r="5"/><circle class="v-node" cx="240" cy="164" r="5"/>' +
        '<circle class="v-node" cx="160" cy="40" r="5"/><circle class="v-node" cx="118" cy="206" r="4"/><circle class="v-node" cx="200" cy="206" r="4"/>' +
        '<circle class="v-core-glow" cx="160" cy="120" r="34"/>' +
        '<circle class="v-core" cx="160" cy="120" r="16"/>' +
        '<text class="v-label" x="160" y="125" text-anchor="middle">AI</text>' +
      "</svg>",
    clone:
      '<svg viewBox="0 0 320 240" aria-hidden="true">' +
        '<circle class="v-head" cx="104" cy="92" r="28"/>' +
        '<path class="v-head" d="M54 196c0-36 22-60 50-60s50 24 50 60"/>' +
        '<circle class="v-head v-head--clone" cx="216" cy="92" r="28"/>' +
        '<path class="v-head v-head--clone" d="M166 196c0-36 22-60 50-60s50 24 50 60"/>' +
        '<path class="v-flow" d="M140 92h40"/>' +
        '<circle class="v-node" cx="104" cy="92" r="4"/>' +
        '<circle class="v-core" cx="216" cy="92" r="5"/>' +
      "</svg>",
    automation:
      '<svg viewBox="0 0 320 240" aria-hidden="true">' +
        '<rect class="v-box" x="28" y="96" width="64" height="48" rx="10"/>' +
        '<rect class="v-box" x="128" y="96" width="64" height="48" rx="10"/>' +
        '<rect class="v-box v-box--accent" x="228" y="96" width="64" height="48" rx="10"/>' +
        '<path class="v-flow" d="M92 120h36M192 120h36"/>' +
        '<path class="v-loop" d="M260 96V66H60v30"/>' +
        '<path class="v-loop" d="M60 144v30h200v-30"/>' +
        '<text class="v-label v-label--sm" x="60" y="124" text-anchor="middle">INPUT</text>' +
        '<text class="v-label v-label--sm" x="160" y="124" text-anchor="middle">AI</text>' +
        '<text class="v-label v-label--sm" x="260" y="124" text-anchor="middle">OUTPUT</text>' +
      "</svg>"
  };

  /* ---------- profile ---------- */
  function renderProfile() {
    var xUrl = safeUrl(profile.xUrl);
    if (xUrl) $all("[data-x-link]").forEach(function (a) { a.href = xUrl; });
    if (profile.xHandle) $all("[data-x-handle]").forEach(function (el) { el.textContent = profile.xHandle; el.setAttribute("translate", "no"); });

    var nameEl = $('[data-profile="name"]');
    if (nameEl && profile.name) nameEl.textContent = profile.name;

    var ageRow = $("[data-age-row]");
    if (ageRow) {
      if (profile.showAge && profile.age) {
        $('[data-profile="age"]').textContent = profile.age + "歳";
      } else {
        ageRow.remove();
      }
    }

    var avatarSrc = safeUrl(profile.avatar);
    if (avatarSrc) {
      var core = $("#avatar");
      var img = new Image();
      img.alt = (profile.name || "") + "のアイコン";
      img.className = "avatar__img";
      img.width = 480;
      img.height = 480;
      img.decoding = "async";
      img.onload = function () { core.appendChild(img); core.classList.add("has-image"); };
      img.src = avatarSrc; // 読み込み失敗時は CSS ロゴのまま
    }

    var bio = $("#aboutBio");
    if (bio && profile.bio) {
      bio.innerHTML = profile.bio.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    }

    var points = $("#aboutPoints");
    if (points && profile.points) {
      points.innerHTML = profile.points.map(function (pt) {
        return (
          '<li class="about__point">' +
            "<h3>" + esc(pt.title) + "</h3><p>" + esc(pt.text) + "</p>" +
          "</li>"
        );
      }).join("");
    }
  }

  /* ---------- activity ---------- */
  function renderActivities() {
    var grid = $("#activityGrid");
    if (!grid || !data.activities) return;
    grid.innerHTML = data.activities.map(function (a) {
      return (
        '<li class="act">' +
          '<span class="act__icon">' + icon(a.icon) + "</span>" +
          "<div>" +
            '<h3 class="act__title">' + esc(a.title) + "</h3>" +
            '<p class="act__text">' + esc(a.text) + "</p>" +
          "</div>" +
        "</li>"
      );
    }).join("");
  }

  /* ---------- works ---------- */
  function renderWorks() {
    var grid = $("#worksGrid");
    if (!grid || !data.works) return;
    grid.innerHTML = data.works.map(function (w) {
      var visualKey = VISUALS[w.visual] ? w.visual : "ai";
      var image = safeUrl(w.image);
      var url = safeUrl(w.url);

      var meta = "";
      if (w.role) meta += "<div><dt>担当</dt><dd>" + esc(w.role) + "</dd></div>";
      if (w.tools && w.tools.length) {
        meta += '<div><dt>ツール</dt><dd><ul class="chips">' +
          w.tools.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></dd></div>";
      }
      if (w.status) meta += '<div><dt>状況</dt><dd><span class="status"><span class="status__dot" aria-hidden="true"></span>' + esc(w.status) + "</span></dd></div>";

      return (
        '<li class="work" data-glow>' +
          '<div class="work__visual viz viz--' + visualKey + '">' +
            VISUALS[visualKey] +
            (image ? '<img class="work__img" src="' + esc(image) + '" alt="' + esc(w.title) + 'のサムネイル" width="640" height="480" loading="lazy" decoding="async" onerror="this.remove()">' : "") +
          "</div>" +
          '<div class="work__body">' +
            '<p class="work__cat">' + esc(w.category) + "</p>" +
            '<h3 class="work__title">' + esc(w.title) + "</h3>" +
            '<p class="work__summary">' + esc(w.summary) + "</p>" +
            (meta ? '<dl class="work__meta">' + meta + "</dl>" : "") +
            (url
              ? '<a class="work__link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' +
                  esc(w.linkLabel || "作品を見る") + ' <span aria-hidden="true">↗</span><span class="visually-hidden">（新しいタブで開きます）</span></a>'
              : "") +
          "</div>" +
        "</li>"
      );
    }).join("");
  }

  /* ---------- achievements ---------- */
  function renderAchievements() {
    var box = $("#worksStats");
    if (!box) return;
    var list = data.achievements || [];
    if (!list.length) { box.remove(); return; }
    box.innerHTML = list.map(function (a) {
      return (
        '<li class="stat">' +
          '<p class="stat__value">' + esc(a.value) + '<span class="stat__unit">' + esc(a.unit) + "</span></p>" +
          '<p class="stat__label">' + esc(a.label) + "</p>" +
        "</li>"
      );
    }).join("");
  }

  /* ---------- journey ---------- */
  function renderJourney() {
    var list = $("#journeyList");
    if (!list || !data.journey) return;
    var items = data.journey.map(function (j, i) {
      var label = j.current ? "Now" : "Step " + (i + 1);
      return (
        '<li class="timeline__item' + (j.current ? " is-current" : "") + '">' +
          '<span class="timeline__dot" aria-hidden="true"></span>' +
          '<div class="timeline__head">' +
            '<span class="timeline__label">' + label + "</span>" +
            (j.date ? '<time class="timeline__date">' + esc(j.date) + "</time>" : "") +
          "</div>" +
          '<h3 class="timeline__title">' + esc(j.title) + "</h3>" +
          '<p class="timeline__text">' + esc(j.text) + "</p>" +
          (j.tags && j.tags.length
            ? '<ul class="chips">' + j.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"
            : "") +
        "</li>"
      );
    });
    items.push(
      '<li class="timeline__item is-next">' +
        '<span class="timeline__dot" aria-hidden="true"></span>' +
        '<div class="timeline__head"><span class="timeline__label">Next</span></div>' +
        '<h3 class="timeline__title">次の挑戦へ。</h3>' +
        '<p class="timeline__text">この先の記録は、これから自分の手で書き足していきます。</p>' +
      "</li>"
    );
    list.innerHTML = items.join("");
  }

  /* ---------- header / navigation ---------- */
  function initHeader() {
    var header = $("#header");
    var btn = $("#menuBtn");
    var nav = $("#nav");

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function setMenu(open) {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      document.body.classList.toggle("menu-open", open);
      // メニューを開いている間は背面のコンテンツにフォーカスが移らないようにする
      ["main", ".footer"].forEach(function (sel) {
        var el = $(sel);
        if (el) el.inert = open;
      });
    }
    btn.addEventListener("click", function () {
      setMenu(btn.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        setMenu(false);
        btn.focus();
      }
    });
    window.matchMedia("(min-width: 900px)").addEventListener("change", function (m) {
      if (m.matches) setMenu(false);
    });

    // 現在表示中のセクションをナビでハイライト
    var links = $all(".nav__link");
    var map = {};
    links.forEach(function (l) { map[l.getAttribute("href").slice(1)] = l; });
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (l) { l.classList.remove("is-active"); l.removeAttribute("aria-current"); });
          var active = map[entry.target.id];
          if (active) { active.classList.add("is-active"); active.setAttribute("aria-current", "true"); }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    var targets = $all("[data-reveal], .timeline__item");
    window.__revealReady = true;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- card glow follows pointer ---------- */
  function initGlow() {
    if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest("[data-glow]");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    }, { passive: true });
  }

  /* ---------- hero load sequence ---------- */
  function initHero() {
    var root = document.documentElement;
    var start = function () { requestAnimationFrame(function () { root.classList.add("is-loaded"); }); };
    // フォント読み込みを少しだけ待ってから演出を開始（最大0.6秒）
    if (document.fonts && document.fonts.ready) {
      Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 600); })]).then(start);
    } else {
      start();
    }
  }

  /* ---------- init ---------- */
  renderProfile();
  renderActivities();
  renderAchievements();
  renderWorks();
  renderJourney();
  initHeader();
  initReveal();
  initGlow();
  initHero();

  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
