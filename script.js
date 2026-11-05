// Site behavior: language switcher, project rendering, detail pages, and terminal.
document.addEventListener("DOMContentLoaded", function () {
  var projects = window.PORTFOLIO_PROJECTS || [];
  var language = "en";
  var onDetailPage = window.location.pathname.indexOf("/projects/") !== -1;
  var base = onDetailPage ? "../" : "";

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
      el.textContent = text(el.dataset.en, el.dataset.ru);
    });
    document
      .querySelectorAll("[data-language-toggle]")
      .forEach(function (button) {
        button.textContent = language === "en" ? "RU" : "EN";
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
  function card(p) {
    var category = text(p.category, p.categoryRu);
    var description = text(p.shortDescription, p.shortDescriptionRu);
    var detailUrl = base + p.detailPage;
    var stack = p.stack
      .map(function (item) {
        return '<span class="project-card__tag">' + esc(item) + "</span>";
      })
      .join("");
    return (
      '<article class="project-card project-card--clickable">' +
      '<a class="project-card__hit-area" href="' +
      esc(detailUrl) +
      '" aria-label="' +
      esc(text("Open project: ", "Открыть проект: ") + p.title) +
      '"></a>' +
      '<div class="project-card__topline"><span>' +
      esc(p.number + " / " + category) +
      '</span><span class="project-card__indicator" aria-label="Project"></span></div>' +
      '<div class="project-card__main"><h2 class="project-card__title">' +
      '<img class="project-card__title-icon" src="' +
      esc(base + "sources/icons/code.svg") +
      '" alt="" aria-hidden="true">' +
      esc(p.title) +
      "</h2>" +
      '<p class="project-card__description">' +
      esc(description) +
      "</p></div>" +
      '<div class="project-card__meta"><span class="project-card__meta-label">' +
      esc(text("TECH STACK", "ТЕХНОЛОГИИ")) +
      '</span><div class="project-card__stack">' +
      stack +
      "</div></div>" +
      '<div class="project-card__actions">' +
      '<a class="button button--primary" href="' +
      esc(detailUrl) +
      '">' +
      '<img class="button__icon" src="' +
      esc(base + "sources/icons/eye.svg") +
      '" alt="" aria-hidden="true">' +
      esc(text("Project details", "Подробнее")) +
      "</a>" +
      '<a class="button button--secondary" href="' +
      esc(p.github) +
      '" target="_blank" rel="noreferrer"><img class="button__icon" src="' +
      esc(base + "sources/icons/github.svg") +
      '" alt="" aria-hidden="true">' +
      esc(text("Source code", "Исходный код")) +
      "</a></div></article>"
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
      root.textContent = "Project information could not be found.";
      return;
    }
    var description = text(p.description, p.descriptionRu);
    var features = language === "ru" ? p.featuresRu : p.features;
    root.innerHTML =
      '<p class="section-label">// ' +
      esc(p.number + " — " + text(p.category, p.categoryRu)) +
      '</p><h1 class="page-title">' +
      esc(p.title) +
      '<span class="hero__cursor">_</span></h1><p class="page-lead">' +
      esc(description) +
      '</p><div class="detail-layout"><section class="detail-panel"><h2 class="detail-panel__title">' +
      esc(text("What it does", "Возможности")) +
      '</h2><ul class="feature-list">' +
      features
        .map(function (f) {
          return "<li>" + esc(f) + "</li>";
        })
        .join("") +
      '</ul></section><section class="detail-panel"><h2 class="detail-panel__title">' +
      esc(text("Technology stack", "Технологический стек")) +
      '</h2><ul class="stack-list">' +
      p.stack
        .map(function (s) {
          return "<li>" + esc(s) + "</li>";
        })
        .join("") +
      '</ul></section></div><div class="hero__actions"><a class="button button--primary" href="' +
      esc(p.github) +
      '" target="_blank" rel="noreferrer">' +
      esc(text("View source code", "Посмотреть исходный код")) +
      '</a><a class="button button--secondary" href="' +
      esc(base + "projects.html") +
      '">' +
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
    email: "",
    linkedin: ""
  };
  function setTheme(theme) {
    document.documentElement.dataset.terminalTheme = theme;
    line(text("Theme switched to " + theme + ".", "Цветовая тема изменена: " + theme + "."),
      "terminal-output--success");
  }
  function runGlitch() {
    document.body.classList.remove("terminal-glitch");
    void document.body.offsetWidth;
    document.body.classList.add("terminal-glitch");
    window.setTimeout(function () {
      document.body.classList.remove("terminal-glitch");
    }, 1400);
    line(text("Visual interference detected. Signal restored.", "Обнаружены помехи. Сигнал восстановлен."));
  }
  function runHack() {
    var messages = language === "ru"
      ? ["Инициализация безопасного соединения...", "Сканирование портов...", "Обход воображаемого файрвола...", "Доступ получен. Шутка — это портфолио 😎"]
      : ["Initializing secure connection...", "Scanning ports...", "Bypassing imaginary firewall...", "Access granted. Just kidding — it's a portfolio 😎"];
    var p = document.createElement("p");
    p.className = "terminal-output terminal-hack";
    output.appendChild(p);
    var i = 0;
    function step() {
      p.textContent = messages[i];
      output.scrollTop = output.scrollHeight;
      i += 1;
      if (i < messages.length) window.setTimeout(step, 650);
      else p.classList.add("terminal-output--success");
    }
    step();
  }
  function runMatrix() {
    var p = document.createElement("p");
    p.className = "terminal-output terminal-matrix";
    p.textContent = "01001000 01000001 01000011 01001011 01000101 01010010  ░▒▓█";
    output.appendChild(p);
    document.body.classList.add("terminal-matrix-mode");
    window.setTimeout(function () {
      document.body.classList.remove("terminal-matrix-mode");
    }, 2600);
    output.scrollTop = output.scrollHeight;
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
              "  contact    GitHub",
              "  links      полезные ссылки",
              "  matrix     эффект Matrix",
              "  hack       симуляция взлома",
              "  pink       красно-розовая тема",
              "  green      вернуть исходную тему",
              "  glitch     визуальный glitch",
              "  date       дата и время",
              "  sudo       секретная команда",
              "  clear      очистить терминал",
            ]
          : [
              "Available commands:",
              "  help       Show this command list",
              "  whoami     About the developer",
              "  stack      Show the technology stack",
              "  projects   List projects",
              "  open NAME  Open a project page",
              "  contact    Show GitHub link",
              "  links      Useful profile links",
              "  matrix     Matrix visual effect",
              "  hack       Simulated hacking sequence",
              "  pink       Red-pink color theme",
              "  green      Restore original theme",
              "  glitch     Visual glitch effect",
              "  date       Show date and time",
              "  sudo       A secret command",
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
      contact: ["GitHub: https://github.com/Na1x-dev"],
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
      if (profileLinks.email) linkLine("Email — " + profileLinks.email, "mailto:" + profileLinks.email);
      else line(text("Email: add your address to profileLinks.email in script.js", "Email: добавь адрес в profileLinks.email в script.js"));
      if (profileLinks.linkedin) linkLine("LinkedIn", profileLinks.linkedin);
      else line(text("LinkedIn: add your profile URL to profileLinks.linkedin in script.js", "LinkedIn: добавь ссылку в profileLinks.linkedin в script.js"));
      return;
    }
    if (command === "pink") { setTheme("pink"); return; }
    if (command === "green") { setTheme("default"); return; }
    if (command === "glitch") { runGlitch(); return; }
    if (command === "matrix") { runMatrix(); return; }
    if (command === "hack") { runHack(); return; }
    if (command === "date") {
      line(new Date().toLocaleString(language === "ru" ? "ru-RU" : "en-GB"));
      return;
    }
    if (command === "sudo") {
      line(text("Nice try. You already have root access to this portfolio. 😏", "Хорошая попытка. У тебя уже есть root-доступ к этому портфолио. 😏"));
      return;
    }
    if (command === "status") {
      line(
        language === "ru"
          ? "Терминал портфолио готов к работе."
          : "Portfolio terminal ready.",
      );
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
