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

  function card(p) {
    var category = text(p.category, p.categoryRu);
    var description = text(p.shortDescription, p.shortDescriptionRu);
    return (
      '<article class="project-card"><div class="project-card__topline"><span>' +
      esc(p.number + " / " + category) +
      '</span></div><h2 class="project-card__title">' +
      esc(p.title) +
      '</h2><p class="project-card__description">' +
      esc(description) +
      '</p><p class="project-card__stack">' +
      p.stack.map(esc).join(" · ") +
      '</p><div class="project-card__actions"><a class="project-card__link" href="' +
      esc(base + p.detailPage) +
      '">' +
      esc(text("Project details", "Подробнее")) +
      '</a><a class="project-card__link" href="' +
      esc(p.github) +
      '" target="_blank" rel="noreferrer">' +
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
      esc(text("All projects ↗", "Все проекты ↗")) +
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
