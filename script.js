// Render project cards from shared data and handle portfolio terminal commands.
document.addEventListener("DOMContentLoaded", function () {
  var projects = window.PORTFOLIO_PROJECTS || [];
  function esc(value) { return String(value).replace(/[&<>"']/g, function(c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function card(p) {
    return '<article class="project-card"><div class="project-card__topline"><span>' + esc(p.number + " / " + p.category) +
      '</span><span class="project-card__indicator" aria-hidden="true">●</span></div><h2 class="project-card__title">' + esc(p.title) +
      '</h2><p class="project-card__description">' + esc(p.shortDescription) + '</p><p class="project-card__stack">' +
      p.stack.map(esc).join(" · ") + '</p><div class="project-card__actions"><a class="project-card__link" href="' + esc(p.detailPage) +
      '">Project details ↗</a><a class="project-card__link" href="' + esc(p.github) + '" target="_blank" rel="noreferrer">Source code ↗</a></div></article>';
  }
  var featured = document.querySelector("#featured-projects");
  if (featured) featured.innerHTML = projects.slice(0, 2).map(card).join("");
  var archive = document.querySelector("#all-projects");
  if (archive) {
    archive.innerHTML = projects.map(card).join("");
    var count = document.querySelector("#projects-count");
    if (count) count.textContent = projects.length + " PROJECTS FOUND";
  }
  var form = document.querySelector("#terminal-form"), input = document.querySelector("#terminal-command"), output = document.querySelector("#terminal-output");
  if (!form || !input || !output) return;
  function line(text, cls) {
    var p = document.createElement("p"); p.className = cls || "terminal-output"; p.textContent = text;
    output.appendChild(p); output.scrollTop = output.scrollHeight;
  }
  var commands = {
    help:["Available commands:","  help       Show this command list","  whoami     About the developer","  stack      Show the main technology stack","  projects   List portfolio projects","  open NAME  Open a project details page","  contact    Show contact links","  status     Show terminal status","  clear      Clear the terminal"],
    whoami:["Andrew — full-stack developer.","Focused on React, Python, Django, and useful web applications."],
    stack:["Frontend: React, JavaScript, Redux Toolkit","Backend: Python, Django REST Framework, FastAPI","Data & tools: PostgreSQL, Redis, Celery, Docker, Git"],
    projects:projects.map(function(p){return p.id + " — " + p.title;}),
    contact:["GitHub: https://github.com/Na1x-dev"],
    status:["SYSTEM ONLINE — portfolio terminal ready."]
  };
  form.addEventListener("submit", function(event) {
    event.preventDefault(); var raw = input.value.trim(); if (!raw) return;
    line("andrew@portfolio:~$ " + raw, "terminal-command-line"); input.value = "";
    var parts = raw.split(/\s+/), command = parts.shift().toLowerCase();
    if (command === "clear") { output.replaceChildren(); return; }
    if (command === "open") {
      var requested = parts.join(" ").toLowerCase();
      var project = projects.find(function(p){return p.id === requested.replace(/\s+/g,"-") || p.title.toLowerCase() === requested;});
      if (project) { line("Opening " + project.title + "..."); window.location.href = project.detailPage; }
      else line("Project not found. Type projects to see available names.", "terminal-error");
      return;
    }
    if (commands[command]) commands[command].forEach(function(item){line(item);});
    else line("Command not found: " + command + ". Type help for available commands.", "terminal-error");
  });
});