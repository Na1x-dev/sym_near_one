// Shared header and footer. Keep site-wide layout in one place.
document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector("[data-site-header]");
  var footer = document.querySelector("[data-site-footer]");
  var page = window.location.pathname.split("/").pop() || "index.html";
  if (header) {
    header.innerHTML = '<header class="site-header">' +
      '<a class="site-header__brand" href="' + (page.indexOf(".html") > -1 && window.location.pathname.indexOf("/projects/") > -1 ? "../index.html" : "index.html") + '">[sym_near_one.run]</a>' +
      '<nav class="site-nav" aria-label="Main navigation">' +
      '<a href="' + (window.location.pathname.indexOf("/projects/") > -1 ? "../index.html" : "index.html") + '">Home</a>' +
      '<a href="' + (window.location.pathname.indexOf("/projects/") > -1 ? "../projects.html" : "projects.html") + '"' + (page === "projects.html" ? ' aria-current="page"' : '') + '>Projects</a>' +
      '<a href="https://github.com/Na1x-dev" target="_blank" rel="noreferrer">GitHub ↗</a></nav>' +
      '<span class="site-header__status"><span class="status-dot"></span> SYSTEM ONLINE</span></header>';
  }
  if (footer) footer.innerHTML = '<footer class="site-footer"><span>© ' + new Date().getFullYear() +
    ' SymNearOne</span><span>BUILT WITH CURIOSITY <span class="footer-accent">✳</span></span></footer>';
});