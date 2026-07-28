import { renderSystemData } from './render.js';

document.addEventListener("DOMContentLoaded", () => {
  // 1. АСИНХРОННАЯ ИНИЦИАЛИЗАЦИЯ И ПОЛУЧЕНИЕ ДАННЫХ
  fetch('config.json')
    .then(response => response.json())
    .then(data => {
      // Вызываем внешний рендеринг из render.js
      renderSystemData(data);
      // После успешной инъекции HTML запускаем лоадер дисплея
      runSystemLoader();
    })
    .catch(err => {
      console.error("Ошибка загрузки системного конфига:", err);
      document.getElementById('cyber-loader').style.display = 'none';
    });

  // 2. ИМИТАЦИЯ СИСТЕМНОГО CRT ЛОАДЕРА (ГЛИТЧ-ВЕРСИЯ)
  // 2. ИМИТАЦИЯ СИСТЕМНОГО CRT ЛОАДЕРА (ИМПУЛЬСНЫЙ ГЛИТЧ)
  function runSystemLoader() {
    const loader = document.getElementById('cyber-loader');
    const bar = loader.querySelector('.loader-bar-fill');
    const status = loader.querySelector('.loader-status');
    const brand = loader.querySelector('.loader-brand');

    let progress = 0;
    const charsList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+=[]{}";

    const stages = [
      { p: 15, text: "CONNECTING_TO_GRID..." },
      { p: 35, text: "FETCHING_CONFIG_DATA... OK" },
      { p: 55, text: "MOUNTING_DRIVE_NODES... SUCCESS" },
      { p: 75, text: "INJECTING_DOM_NODES... 100%" },
      { p: 90, text: "STABILIZING_SCANLINES..." },
      { p: 100, text: "LINK_ESTABLISHED // WELCOME" }
    ];

    let currentStageText = stages[0].text;
    let decryptInterval = null;

    // Расшифровка текста статуса
    function triggerLoaderDecrypt(targetText) {
      clearInterval(decryptInterval);
      let iteration = 0;

      decryptInterval = setInterval(() => {
        status.innerText = targetText.split("").map((char, index) => {
          if (index < iteration || char === " " || char === "/" || char === "_") {
            return targetText[index];
          }
          return charsList[Math.floor(Math.random() * charsList.length)];
        }).join("");

        if (iteration >= targetText.length) {
          clearInterval(decryptInterval);
        }
        iteration += 1;
      }, 25);
    }

    triggerLoaderDecrypt(currentStageText);

    // Внедрено: Случайные импульсные глитчи для заголовка лоадера (срабатывают раз в 400мс с шансом 30%)
    const loaderGlitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        brand.classList.add("glitch-active");
        setTimeout(() => {
          brand.classList.remove("glitch-active");
        }, 200); // Строго на 0.2 секунды
      }
    }, 400);

    const mainInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 1;
      if (progress > 100) progress = 100;

      bar.style.width = `${progress}%`;

      const stage = stages.find(s => progress <= s.p);
      if (stage && stage.text !== currentStageText) {
        currentStageText = stage.text;
        triggerLoaderDecrypt(currentStageText);
      }

      if (progress >= 100) {
        clearInterval(mainInterval);
        clearInterval(decryptInterval);
        clearInterval(loaderGlitchInterval); // Важно: очищаем интервал глитча при завершении
        status.innerText = "LINK_ESTABLISHED // WELCOME";

        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
            initSkillsAnimateObserver();
          }, 400);
        }, 600);
      }
    }, 60);
  }



  // 3. УМНАЯ АНИМАЦИЯ ШКАЛ СКИЛЛОВ ПРИ СКРОЛЛЕ (IntersectionObserver)
  function initSkillsAnimateObserver() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.targetWidth;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.1 });

    progressBars.forEach(bar => observer.observe(bar));
  }

  // 4. ТРЕКИНГ МЕНЮ И СМУЗ-СКРОЛЛ
  const menuLinks = document.querySelectorAll(".nav-box");
  const sections = document.querySelectorAll(".grid-cell");

  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = document.querySelector(link.getAttribute("href"));
      if (targetSection) {
        const headerOffset = window.innerWidth <= 768 ? 90 : 20;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const triggerOffset = window.innerWidth <= 768 ? 140 : 120;

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - triggerOffset) {
        currentSectionId = section.getAttribute("id");
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // 5. ЗВУКИ (Web Audio API)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playBeep(frequency, duration, type = "sine", volume = 0.05) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  }

  document.body.addEventListener("mouseenter", (e) => {
    if (e.target.matches(".nav-box, .action-btn, .btn-flat")) {
      playBeep(1200, 0.04, "square", 0.01);
    }
  }, true);

  document.body.addEventListener("click", (e) => {
    if (e.target.matches(".nav-box, .action-btn, .btn-flat")) {
      playBeep(600, 0.08, "triangle", 0.06);
    }
  }, true);

  // 6. ХАКЕРСКАЯ ДЕШИФРОВКА ТЕКСТА
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+=[]{}";
  const brandElement = document.querySelector(".nav-brand");

  function runDecrypt(element) {
    if (!element.dataset.value) element.dataset.value = element.innerText;
    if (element.dataset.isAnimating === "true") return;
    element.dataset.isAnimating = "true";

    const originalText = element.dataset.value;
    let iteration = 0;

    const interval = setInterval(() => {
      element.innerText = originalText.split("").map((char, index) => {
        if (index < iteration || char === " " || char === "/" || char === "_") return originalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);
        element.dataset.isAnimating = "false";

        // Быстрый фиксатор возврата HTML для бренда
        if (element.classList.contains("nav-brand") && brandElement) {
          fetch('config.json').then(r => r.json()).then(c => {
            brandElement.innerHTML = `<span class="magenta-txt">[CORE_SYS]</span><span class="cyan-txt">_${c.profile.version}</span>`;
          });
        }
      }
      iteration += 1 / 2;
    }, 30);
  }

  // Изменено: Единый прослушиватель мыши, который одновременно запускает дешифровку и 3D-глитч
  document.body.addEventListener("mouseenter", (e) => {
    // Проверяем элементы, на которые навели
    if (e.target.matches(".nav-box .txt, .action-btn, .btn-flat, h2, h3, .skill-info span, .nav-brand")) {

      // 1. ЗАПУСК ДЕШИФРОВКИ
      runDecrypt(e.target);

      // 2. ЗАПУСК ИМПУЛЬСНОГО ГЛИТЧА НА 0.2 СЕКУНДЫ
      let glitchTarget = e.target;
      // Если навели на кнопку меню, глитчим текст внутри
      if (e.target.classList.contains("nav-box")) {
        glitchTarget = e.target.querySelector(".txt");
      }

      if (glitchTarget && !glitchTarget.classList.contains("glitch-active")) {
        glitchTarget.classList.add("glitch-active");
        setTimeout(() => {
          glitchTarget.classList.remove("glitch-active");
        }, 200); // Ровно на 0.2 секунды
      }
    }
  }, true);


  // 7. СЛУЧАЙНЫЕ ФОНОВЫЕ СБОИ
  setInterval(() => {
    const glitchTargets = document.querySelectorAll(".nav-brand, h2, h3, .nav-terminal-status span");
    if (glitchTargets.length === 0 || Math.random() > 0.4) return;
    const el = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
    el.classList.add("glitch-active");
    setTimeout(() => el.classList.remove("glitch-active"), 200);
  }, 2500);
});
