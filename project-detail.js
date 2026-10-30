// Shared renderer for individual project detail pages.
document.addEventListener("DOMContentLoaded", function() {
  var root = document.querySelector("[data-project-detail]"); if (!root) return;
  var project = (window.PORTFOLIO_PROJECTS || []).find(function(p){return p.id === root.dataset.projectDetail;});
  if (!project) { root.textContent = "Project information could not be found."; return; }
  function esc(value) { return String(value).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); }
  document.title = project.title + " | Andrew";
  root.innerHTML = '<p class="section-label">// ' + esc(project.number + " — " + project.category) + '</p><h1 class="page-title">' +
    esc(project.title) + '<span class="hero__cursor">_</span></h1><p class="page-lead">' + esc(project.description) +
    '</p><div class="detail-layout"><section class="detail-panel"><h2 class="detail-panel__title">What it does</h2><ul class="feature-list">' +
    project.features.map(function(f){return "<li>"+esc(f)+"</li>";}).join("") +
    '</ul></section><section class="detail-panel"><h2 class="detail-panel__title">Technology stack</h2><ul class="stack-list">' +
    project.stack.map(function(s){return "<li>"+esc(s)+"</li>";}).join("") +
    '</ul></section></div><div class="hero__actions"><a class="button button--primary" href="' + esc(project.github) +
    '" target="_blank" rel="noreferrer">View source code ↗</a><a class="button button--secondary" href="../projects.html">All projects ↗</a></div>';
});