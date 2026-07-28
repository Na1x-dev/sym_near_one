// ==========================================================================
// СИСТЕМНЫЙ МОДУЛЬ РЕНДЕРИНГА (RENDER ENGINE)
// ==========================================================================

export function renderSystemData(config) {
  // 1. Внедрение данных профиля (блок ABOUT)
  document.getElementById('hud-version-brand').innerHTML = `
    <span class="magenta-txt">[CORE_SYS]</span><span class="cyan-txt">_${config.profile.version}</span>
  `;
  document.getElementById('profile-name').innerText = `GUEST_ID // ${config.profile.name}`;
  document.getElementById('profile-declaration').innerText = config.profile.declaration;
  document.getElementById('profile-background').innerText = config.profile.background;
  document.getElementById('link-tg').href = config.profile.telegram;
  document.getElementById('link-gh').href = config.profile.github;
  document.getElementById('footer-node').innerText = config.profile.node_address;

  // 2. Внедрение системных логов реального времени
  const logsContainer = document.getElementById('logs-container');
  const timeMarks = ['18:10:02', '18:10:05', '18:12:43', '18:15:23'];
  const typeClasses = ['cyan-txt', 'copper-txt', 'cyan-txt', 'cyan-txt'];
  const typePrefixes = ['SYS_OK:', 'NET_OK:', 'LOAD:', 'DONE:'];

  logsContainer.innerHTML = ''; // Очистка перед заполнением
  config.live_logs.forEach((logText, idx) => {
    const time = timeMarks[idx] || '18:16:00';
    const cssClass = typeClasses[idx] || 'cyan-txt';
    const prefix = typePrefixes[idx] || 'INFO:';
    logsContainer.innerHTML += `
      <p class="stream-line">
        <span class="muted-txt">[${time}]</span> 
        <span class="${cssClass}">${prefix}</span> ${logText}
      </p>`;
  });

  // 3. Внедрение шкал навыков
  const skillsContainer = document.getElementById('skills-container');
  skillsContainer.innerHTML = '';
  config.skills.forEach(skill => {
    skillsContainer.innerHTML += `
      <div class="skill-progress-wrapper">
        <div class="skill-info">
          <span class="matrix-txt">${skill.name}</span>
          <span class="${skill.type}-txt">${skill.level}%</span>
        </div>
        <div class="progress-bar-total">
          <div class="progress-bar-fill fill-${skill.type}" data-target-width="${skill.level}%" style="width: 0%;"></div>
        </div>
      </div>`;
  });

  // 4. Внедрение карточек проектов в хранилище портфолио
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = '';
  config.projects.forEach(project => {
    if (project.status === "EMPTY_SLOT") {
      projectsContainer.innerHTML += `
        <div class="matrix-card empty-card">
          <div class="card-top"><span class="muted-txt">${project.id} //</span><span class="muted-txt">STATUS: EMPTY_SLOT</span></div>
          <h3 class="muted-txt">${project.title}</h3>
          <p class="muted-txt">${project.desc}</p>
        </div>`;
    } else {
      projectsContainer.innerHTML += `
        <div class="matrix-card">
          <div class="card-top"><span class="copper-txt">${project.id} //</span><span class="status-indicator tag-green">STATUS: ${project.status}</span></div>
          <h3 class="cyan-txt">${project.title}</h3>
          <p class="dim-cyan-txt">${project.desc}</p>
          <div class="card-meta-tags">${project.tags}</div>
          <div class="card-buttons">
            <a href="${project.preview_url}" class="action-btn block-magenta">EXECUTE_PREVIEW</a>
            <a href="${project.source_url}" class="action-btn block-muted">GET_SRC_CODE</a>
          </div>
        </div>`;
    }
  });
}
