// Site behavior: language switcher, project rendering, detail pages, and terminal.
document.addEventListener("DOMContentLoaded", function () {
  var projects = window.PORTFOLIO_PROJECTS || [];
  var language = "en";
  var onDetailPage = window.location.pathname.indexOf("/projects/") !== -1;
  var base = onDetailPage ? "../" : "";

  var savedTheme = "default";
  try {
    savedTheme =
      window.localStorage.getItem("portfolio-theme") === "pink"
        ? "pink"
        : "default";
  } catch (error) {
    savedTheme = "default";
  }
  if (savedTheme === "pink")
    document.documentElement.dataset.terminalTheme = "pink";
  else delete document.documentElement.dataset.terminalTheme;

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }
  function text(en, ru) {
    return language === "ru" ? ru || en : en;
  }
  function applyLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-en][data-ru]").forEach(function (el) {
      var icon = el.querySelector(".button__icon");
      el.textContent = text(el.dataset.en, el.dataset.ru);
      if (icon) el.insertBefore(icon, el.firstChild);
    });
    document
      .querySelectorAll("[data-language-toggle]")
      .forEach(function (button) {
        button.innerHTML =
          '<img class="button__icon" src="' +
          base +
          'sources/icons/language.svg" alt="" aria-hidden="true" />' +
          (language === "en" ? "RU" : "EN");
        button.setAttribute(
          "aria-label",
          language === "en" ? "Switch to Russian" : "Switch to English",
        );
      });
    var input = document.querySelector("#terminal-command");
    if (input)
      input.placeholder = text(
        "type help and press Enter",
        "введите help и нажмите Enter",
      );
    renderCards();
    renderDetail();
    var count = document.querySelector("#projects-count");
    if (count)
      count.textContent = text(
        projects.length + " PROJECTS FOUND",
        "НАЙДЕНО ПРОЕКТОВ: " + projects.length,
      );
  }
  document
    .querySelectorAll("[data-language-toggle]")
    .forEach(function (button) {
      button.addEventListener("click", function () {
        applyLanguage(language === "en" ? "ru" : "en");
      });
    });

  // A stretched link makes the whole card open its detail page.
  // The two action buttons stay above it and remain independent links.
  function statusLabel(p) {
    if (p.status === "released") return text("Released", "Готов");
    if (p.status === "nearly-ready") return text("Almost ready", "Почти готов");
    if (p.statusNote) return text(p.statusNote, p.statusNoteRu);
    return text("In development", "В разработке");
  }
  // Each project gets its own inline SVG so it inherits the active theme color.
  function projectArtwork(id) {
    var drawings = {
      "techmatcher": '<rect x="70" y="20" width="92" height="142" rx="15"/><rect x="80" y="34" width="72" height="100" rx="5"/><circle cx="116" cy="146" r="5"/><path d="M94 55h44M94 67h28M94 91h44M94 103h34"/><path d="m184 42 5 11 11 5-11 5-5 11-5-11-11-5 11-5z"/>',
      "ai-content-helper": '<path d="M35 45Q35 30 50 30h112q15 0 15 15v67q0 15-15 15H91l-30 23v-23h-11q-15 0-15-15z"/><path d="M67 66h78M67 86h60M67 106h42"/><path d="m192 34 7 16 16 7-16 7-7 16-7-16-16-7 16-7z"/><path d="m207 104 4 9 9 4-9 4-4 9-4-9-9-4 9-4z"/>',
      "audio-visualizer": '<path d="M28 91h18l12-30 14 68 16-96 17 112 17-84 15 59 15-42 13 13h34"/><path d="M30 145h180" opacity=".35"/><circle cx="116" cy="91" r="74" opacity=".16"/><circle cx="116" cy="91" r="58" opacity=".25"/>',
      "ascii-video-player": '<rect x="25" y="25" width="182" height="132" rx="9"/><path d="M25 52h182"/><circle cx="43" cy="39" r="3"/><circle cx="55" cy="39" r="3"/><circle cx="67" cy="39" r="3"/><path d="m96 78 35 24-35 24z"/><path d="M43 68h8m8 0h8m8 0h8m8 0h8m8 0h8m8 0h8m8 0h8m8 0h8m8 0h8M43 139h8m8 0h8m8 0h8m8 0h8m8 0h8m8 0h8m8 0h8m8 0h8m8 0h8" opacity=".65"/>',
      "astrotrails": '<circle cx="116" cy="91" r="12"/><path d="M116 79C143 24 193 22 198 55c5 31-47 57-82 48-42-10-70-49-47-70 18-16 47-2 62 15"/><path d="M116 79C94 42 57 36 43 59c-13 21 12 55 46 65 38 11 80-3 87-31" opacity=".55"/><path d="m183 28 4 11 11 4-11 4-4 11-4-11-11-4 11-4zM48 121l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/>',
      "wedding-card": '<rect x="42" y="25" width="148" height="132" rx="5"/><rect x="52" y="35" width="128" height="112" rx="2" opacity=".45"/><path d="M116 63c-18-23-43-2-25 18l25 25 25-25c18-20-7-41-25-18z"/><path d="M116 106v22M91 128h50"/><path d="M70 54c9-9 17-9 25 0M137 54c9-9 17-9 25 0" opacity=".65"/>',
      "voice-avatar": '<path d="M116 35c-29 0-48 22-48 51v14c0 15 9 27 21 34l-9 19h72l-9-19c12-7 21-19 21-34V86c0-29-19-51-48-51z"/><path d="M91 92q10-9 20 0M121 92q10-9 20 0M101 112q15 13 30 0"/><path d="M35 82h17l10-18 12 54 13-31M197 82h-17l-10-18-12 54-13-31" opacity=".8"/><path d="M116 19v-9m-64 30-7-7m135 7 7-7" opacity=".45"/>'
    };
    return '<svg class="project-art project-art--' + esc(id) + '" viewBox="0 0 232 182" fill="none" stroke="var(--accent-color)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><g>' + (drawings[id] || drawings["techmatcher"]) + '</g></svg>';
  }
  function card(p) {
    var category = text(p.category, p.categoryRu);
    var description = text(p.shortDescription, p.shortDescriptionRu);
    var detailUrl = base + p.detailPage;
    var stack = p.stack.map(function (item) {
      return '<span class="project-card__tag">' + esc(item) + "</span>";
    }).join("");
    return (
      '<article class="project-card project-card--clickable">' +
      '<a class="project-card__hit-area" href="' + esc(detailUrl) +
      '" aria-label="' + esc(text("Open project: ", "Открыть проект: ") + p.title) + '"></a>' +
      '<div class="project-card__topline"><span>' + esc(p.number + " / " + category) +
      '</span><span class="project-status project-status--' + esc(p.status) + '">' +
      esc(statusLabel(p)) + '</span></div>' +
      '<div class="project-card__art-wrap">' + projectArtwork(p.id) + '</div>' +
      '<div class="project-card__main"><h2 class="project-card__title">' +
      esc(p.title) + "</h2>" +
      '<p class="project-card__description">' + esc(description) + "</p></div>" +
      '<div class="project-card__meta"><span class="project-card__meta-label">' +
      esc(text("TECH STACK", "ТЕХНОЛОГИИ")) + '</span><div class="project-card__stack">' +
      stack + "</div></div>" +
      '<div class="project-card__actions"><a class="button button--primary" href="' +
      esc(detailUrl) + '"><img class="button__icon" src="' + esc(base + "sources/icons/eye.svg") +
      '" alt="" aria-hidden="true">' + esc(text("Project details", "Подробнее")) + "</a>" +
      '<a class="button button--secondary" href="' + esc(p.github) +
      '" target="_blank" rel="noreferrer"><img class="button__icon" src="' +
      esc(base + "sources/icons/github.svg") + '" alt="" aria-hidden="true">' +
      esc(text("Source code", "Исходный код")) + "</a></div></article>"
    );
  }
  function renderCards() {
    var featured = document.querySelector("#featured-projects");
    if (featured) featured.innerHTML = projects.slice(0, 2).map(card).join("");
    var archive = document.querySelector("#all-projects");
    if (archive) archive.innerHTML = projects.map(card).join("");
  }
  function renderDetail() {
    var root = document.querySelector("[data-project-detail]");
    if (!root) return;
    var p = projects.find(function (item) {
      return item.id === root.dataset.projectDetail;
    });
    if (!p) {
      root.textContent = text("Project information could not be found.", "Информация о проекте не найдена.");
      return;
    }
    var description = text(p.description, p.descriptionRu);
    var features = language === "ru" ? p.featuresRu : p.features;
    root.innerHTML =
      '<p class="section-label">// ' +
      esc(p.number + " — " + text(p.category, p.categoryRu)) +
      '</p><h1 class="page-title">' +
      esc(p.title) +
      '<span class="hero__cursor">_</span></h1>' +
      '<div class="detail-status-row"><span class="project-status project-status--' + esc(p.status) + '">' +
      esc(statusLabel(p)) + '</span></div>' +
      '<div class="detail-art-wrap">' + projectArtwork(p.id) + '</div>' +
      '<section class="detail-overview"><div><p class="detail-overview__label">' +
      esc(text("PROJECT OVERVIEW", "О ПРОЕКТЕ")) +
      '</p><p class="detail-overview__text">' +
      esc(description) +
      '</p></div><span class="detail-index" aria-hidden="true">' +
      esc(p.number) +
      '</span></section>' +
      '<div class="detail-layout"><section class="detail-panel"><h2 class="detail-panel__title">' +
      esc(text("What it does", "Возможности")) +
      '</h2><ul class="feature-list">' +
      features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") +
      '</ul></section><section class="detail-panel"><h2 class="detail-panel__title">' +
      esc(text("Built with", "Технологии")) +
      '</h2><ul class="stack-list">' +
      p.stack.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") +
      '</ul></section></div><div class="hero__actions detail-actions"><a class="button button--primary" href="' +
      esc(p.github) +
      '" target="_blank" rel="noreferrer"><img class="button__icon" src="' +
      esc(base + "sources/icons/github.svg") +
      '" alt="" aria-hidden="true">' +
      esc(text("View source code", "Посмотреть исходный код")) +
      '</a>' +
      (p.liveDemo ? '<a class="button button--secondary" href="' + esc(p.liveDemo) +
      '" target="_blank" rel="noreferrer"><img class="button__icon" src="' +
      esc(base + "sources/icons/arrow-up-right.svg") + '" alt="" aria-hidden="true">' +
      esc(text("Live demo", "Открыть демо")) + '</a>' : '') +
      '<a class="button button--secondary" href="' +
      esc(base + "projects.html") +
      '"><img class="button__icon" src="' +
      esc(base + "sources/icons/arrow-up-right.svg") +
      '" alt="" aria-hidden="true">' +
      esc(text("All projects", "Все проекты")) +
      "</a></div>";
  }

  var year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
  applyLanguage("en");

  var form = document.querySelector("#terminal-form");
  var input = document.querySelector("#terminal-command");
  var output = document.querySelector("#terminal-output");
  if (!form || !input || !output) return;
  function line(value, cls) {
    var p = document.createElement("p");
    p.className = cls || "terminal-output";
    p.textContent = value;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  }
  function linkLine(label, href) {
    var p = document.createElement("p");
    p.className = "terminal-output terminal-link-line";
    var a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    a.target = "_blank";
    a.rel = "noreferrer";
    p.appendChild(a);
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  }
  var profileLinks = {
    github: "https://github.com/Na1x-dev",
    email: "na1x.1024@gmail.com",
    linkedin: "https://www.linkedin.com/in/symnearone/",
  };
  function setTheme(theme) {
    var nextTheme = theme === "pink" ? "pink" : "default";
    if (nextTheme === "pink") {
      document.documentElement.dataset.terminalTheme = "pink";
    } else {
      delete document.documentElement.dataset.terminalTheme;
    }
    try {
      if (nextTheme === "pink")
        window.localStorage.setItem("portfolio-theme", "pink");
      else window.localStorage.removeItem("portfolio-theme");
    } catch (error) {
      // The current page still changes theme if storage is unavailable.
    }
    line(
      text(
        "Theme switched to " + nextTheme + ".",
        "Цветовая тема изменена: " + nextTheme + ".",
      ),
      "terminal-output--success",
    );
  }
  function runGlitch() {
    document.body.classList.remove("terminal-glitch");
    void document.body.offsetWidth;
    document.body.classList.add("terminal-glitch");
    window.setTimeout(function () {
      document.body.classList.remove("terminal-glitch");
    }, 1400);
    line(
      text(
        "Visual interference detected. Signal restored.",
        "Обнаружены помехи. Сигнал восстановлен.",
      ),
    );
  }
  function runMatrix() {
    var overlay = document.createElement("div");
    overlay.className = "matrix-rain";
    overlay.setAttribute("aria-hidden", "true");
    var glyphs = "アイウエオカキクケコサシスセソタチツテトナニヌネノ012345789";
    for (var column = 0; column < 22; column += 1) {
      var stream = document.createElement("span");
      stream.className = "matrix-rain__column";
      stream.style.left = (column / 22) * 100 + "%";
      stream.style.animationDelay = Math.random() * -2.8 + "s";
      stream.style.animationDuration = 2.2 + Math.random() * 2.2 + "s";
      var chars = "";
      for (var row = 0; row < 18; row += 1)
        chars +=
          glyphs.charAt(Math.floor(Math.random() * glyphs.length)) + "\n";
      stream.textContent = chars;
      overlay.appendChild(stream);
    }
    document.body.appendChild(overlay);
    window.setTimeout(function () {
      overlay.remove();
    }, 4200);
    line(
      text(
        "Wake up, Neo... The Matrix has you.",
        "Проснись, Нео... Матрица уже здесь.",
      ),
      "terminal-matrix",
    );
  }
  function runHackThePentagon() {
    line(
      "01001110 01001001 01000011 01000101 00100000 01010100 01010010 01011001",
      "terminal-hack-binary",
    );
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var raw = input.value.trim();
    if (!raw) return;
    line("user@portfolio:~$ " + raw, "terminal-command-line");
    input.value = "";
    var parts = raw.split(/\s+/);
    var command = parts.shift().toLowerCase();
    if (command === "clear") {
      output.replaceChildren();
      return;
    }
    var responses = {
      help:
        language === "ru"
          ? [
              "Доступные команды:",
              "  help       список команд",
              "  whoami     обо мне",
              "  stack      технологии",
              "  projects   список проектов",
              "  open NAME  открыть проект",
              "  links      полезные ссылки",
              "  matrix",
              "  hack the pentagon",
              "  pink       красно-розовая тема",
              "  green      вернуть исходную тему",
              "  date       дата и время",
              "  clear      очистить терминал",
            ]
          : [
              "Available commands:",
              "  help       Show this command list",
              "  whoami     About the developer",
              "  stack      Show the technology stack",
              "  projects   List projects",
              "  open NAME  Open a project page",
              "  links      Useful profile links",
              "  matrix",
              "  hack the pentagon",
              "  pink       Red-pink color theme",
              "  green      Restore original theme",
              "  date       Show date and time",
              "  clear      Clear the terminal",
            ],
      whoami:
        language === "ru"
          ? [
              "Эндрю — full-stack разработчик.",
              "Основной фокус: React, Python, Django и веб-приложения.",
            ]
          : [
              "Andrew — full-stack developer.",
              "Focused on React, Python, Django, and useful web applications.",
            ],
      stack: [
        "Frontend: React, JavaScript, Redux Toolkit",
        "Backend: Python, Django REST Framework, FastAPI",
        "Data & tools: PostgreSQL, Redis, Celery, Docker, Git",
      ],
      projects: projects.map(function (p) {
        return p.id + " — " + p.title;
      }),
    };
    if (command === "open") {
      var requested = parts.join(" ").toLowerCase();
      var project = projects.find(function (p) {
        return (
          p.id === requested.replace(/\s+/g, "-") ||
          p.title.toLowerCase() === requested
        );
      });
      if (project) {
        line(text("Opening ", "Открываю ") + project.title + "...");
        window.location.href = base + project.detailPage;
      } else
        line(
          text(
            "Project not found. Type projects to see available names.",
            "Проект не найден. Введите projects, чтобы увидеть список.",
          ),
          "terminal-error",
        );
      return;
    }
    if (command === "links") {
      line(text("Useful links:", "Полезные ссылки:"));
      linkLine("GitHub — Na1x-dev", profileLinks.github);
      if (profileLinks.email)
        linkLine(
          "Email — " + profileLinks.email,
          "mailto:" + profileLinks.email,
        );
      else
        line(
          text(
            "Email: add your address to profileLinks.email in script.js",
            "Email: добавь адрес в profileLinks.email в script.js",
          ),
        );
      if (profileLinks.linkedin) linkLine("LinkedIn", profileLinks.linkedin);
      else
        line(
          text(
            "LinkedIn: add your profile URL to profileLinks.linkedin in script.js",
            "LinkedIn: добавь ссылку в profileLinks.linkedin в script.js",
          ),
        );
      return;
    }
    if (command === "pink") {
      setTheme("pink");
      return;
    }
    if (command === "green") {
      setTheme("default");
      return;
    }
    if (command === "glitch") {
      runGlitch();
      return;
    }
    if (command === "matrix") {
      runMatrix();
      return;
    }
    if (raw.toLowerCase().replace(/\s+/g, " ").trim() === "hack the pentagon") {
      runHackThePentagon();
      return;
    }
    if (command === "date") {
      line(new Date().toLocaleString(language === "ru" ? "ru-RU" : "en-GB"));
      return;
    }
    if (responses[command])
      responses[command].forEach(function (value) {
        line(value);
      });
    else
      line(
        text("Command not found: ", "Команда не найдена: ") +
          command +
          text(
            ". Type help for commands.",
            ". Введите help для списка команд.",
          ),
        "terminal-error",
      );
  });
});
