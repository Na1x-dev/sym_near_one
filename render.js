// ==========================================================================
 // SYSTEM DATA RENDERER
 // ==========================================================================
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

export function renderSystemData(config) {
  // Profile
  const brand = document.getElementById("hud-version-brand");
  brand.innerHTML = `
    <span class="magenta-txt">[CORE_SYS]</span><span class="cyan-txt">_${escapeHTML(config.profile.version)}</span>
  `;
  brand.dataset.glitch = `[CORE_SYS]_${config.profile.version}`;

  document.getElementById("profile-name").innerText = `GUEST_ID // ${config.profile.name}`;
  document.getElementById("profile-declaration").innerText = config.profile.declaration;
  document.getElementById("profile-background").innerText = config.profile.background;

  const telegramLink = document.getElementById("link-tg");
  telegramLink.href = config.profile.telegram;
  telegramLink.target = "_blank";
  telegramLink.rel = "noreferrer";

  const githubLink = document.getElementById("link-gh");
  githubLink.href = config.profile.github;
  githubLink.target = "_blank";
  githubLink.rel = "noreferrer";

  document.getElementById("footer-node").innerText = config.profile.node_address;

  // Live activity log
  const logsContainer = document.getElementById("logs-container");
  const timeMarks = ["18:10:02", "18:10:05", "18:12:43", "18:15:23"];
  const typeClasses = ["cyan-txt", "copper-txt", "cyan-txt", "cyan-txt"];
  const typePrefixes = ["SYS_OK:", "NET_OK:", "LOAD:", "DONE:"];

  logsContainer.innerHTML = "";
  config.live_logs.forEach((logText, idx) => {
    logsContainer.innerHTML += `
      <p class="stream-line">
        <span class="muted-txt">[${timeMarks[idx] || "18:16:00"}]</span>
        <span class="${typeClasses[idx] || "cyan-txt"}">${typePrefixes[idx] || "INFO:"}</span>
        ${escapeHTML(logText)}
      </p>`;
  });

  // Skill meters
  const skillsContainer = document.getElementById("skills-container");
  skillsContainer.innerHTML = "";
  config.skills.forEach(skill => {
    const type = ["magenta", "copper", "cyan"].includes(skill.type) ? skill.type : "cyan";
    const level = Math.max(0, Math.min(100, Number(skill.level) || 0));
    skillsContainer.innerHTML += `
      <div class="skill-progress-wrapper">
        <div class="skill-info">
          <span class="matrix-txt">${escapeHTML(skill.name)}</span>
          <span class="${type}-txt">${level}%</span>
        </div>
        <div class="progress-bar-total">
          <div class="progress-bar-fill fill-${type}" data-target-width="${level}%" style="width: 0%;"></div>
        </div>
      </div>`;
  });

  // Project cards
  const projectsContainer = document.getElementById("projects-container");
  projectsContainer.innerHTML = "";

  config.projects.forEach(project => {
    const title = escapeHTML(project.title);
    const id = escapeHTML(project.id);
    const status = escapeHTML(project.status);
    const description = escapeHTML(project.desc);
    const tags = String(project.tags || "").split("//").map(tag => tag.trim()).filter(Boolean);
    const cardUrl = project.preview_url || project.source_url || "#";

    if (project.status === "EMPTY_SLOT") {
      projectsContainer.insertAdjacentHTML("beforeend", `
        <article class="matrix-card empty-card">
          <div class="card-top">
            <span class="muted-txt">${id} //</span>
            <span class="muted-txt">STATUS: EMPTY_SLOT</span>
          </div>
          <h3 class="muted-txt">${title}</h3>
          <p class="muted-txt">${description}</p>
        </article>`);
      return;
    }

    projectsContainer.insertAdjacentHTML("beforeend", `
      <article class="matrix-card${cardUrl ? " matrix-card--clickable" : ""}">\n        ${cardUrl ? `<a class="card-hit-area" href="${escapeHTML(cardUrl)}" target="_blank" rel="noreferrer" aria-label="Open project: ${title}"></a>` : ""}
        <div class="card-top">
          <span class="card-id copper-txt">${id} //</span>
          <span class="status-indicator tag-green"><span class="status-dot" aria-hidden="true"></span>STATUS: ${status}</span>
        </div>

        <div class="card-main">
          <div class="card-heading">
            <span class="card-project-icon" aria-hidden="true">
              <img src="sources/icons/code.svg" alt="">
            </span>
            <h3 class="cyan-txt">${title}</h3>
          </div>
          <p class="card-description">${description}</p>
        </div>

        <div class="card-tech-section">
          <span class="card-section-label">TECH_STACK</span>
          <div class="card-meta-tags">
            ${tags.map(tag => `<span class="tech-tag">${escapeHTML(tag)}</span>`).join("")}
          </div>
        </div>

        <div class="card-footer">
          <span class="card-open-hint"><img src="sources/icons/external-link.svg" alt=""> OPEN_PROJECT</span>
          <div class="card-buttons">
            <a href="${escapeHTML(project.preview_url || "#")}" class="action-btn block-magenta" target="_blank" rel="noreferrer">
              <img src="sources/icons/eye.svg" alt=""> EXECUTE_PREVIEW
            </a>
            <a href="${escapeHTML(project.source_url || "#")}" class="action-btn block-muted" target="_blank" rel="noreferrer">
              <img src="sources/icons/github.svg" alt=""> GET_SRC_CODE
            </a>
          </div>
        </div>
      </article>`);
  });

}
