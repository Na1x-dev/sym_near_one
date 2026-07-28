document.addEventListener("DOMContentLoaded", () => {
  // 1. АВТОМАТИЧЕСКИЙ ТРЕКИНГ МЕНЮ И ПЛАВНЫЙ СКРОЛЛ
  const menuLinks = document.querySelectorAll(".nav-box");
  const sections = document.querySelectorAll(".grid-cell");

  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = document.querySelector(link.getAttribute("href"));
      if (targetSection) {
        // Вычисляем позицию с учетом высоты хедера на мобильных устройствах
        const headerOffset = window.innerWidth <= 768 ? 90 : 20;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    // Оптимальный триггер смены активного пункта
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

  // 2. СИСТЕМНЫЙ ЗВУКОВОЙ КЛИК (Web Audio API)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playBeep(frequency, duration, type = "sine", volume = 0.05) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
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

  const allButtons = document.querySelectorAll(".nav-box, .action-btn, .btn-flat");
  allButtons.forEach(btn => {
    btn.addEventListener("mouseenter", () => playBeep(1200, 0.04, "square", 0.01));
    btn.addEventListener("click", () => playBeep(600, 0.08, "triangle", 0.06));
  });

    // ==========================================================================
  // 3. ЭФФЕКТ ХАКЕРСКОЙ ДЕШИФРОВКИ (С ФИКСАТОРОМ ЦВЕТА ДЛЯ БРЕНДА)
  // ==========================================================================
  const decryptElements = document.querySelectorAll(
    ".nav-box .txt, .panel-tag, .nav-brand, .action-btn, .btn-flat, h2, h3, .skill-info span"
  );
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+=[]{}";

  // Сохраняем эталонную цветную разметку бренда прямо при загрузке страницы
  const brandElement = document.querySelector(".nav-brand");
  let originalBrandHTML = "";
  if (brandElement) {
    originalBrandHTML = brandElement.innerHTML;
  }

  decryptElements.forEach(element => {
    if (!element.dataset.value) {
      element.dataset.value = element.innerText;
    }
    
    let isAnimating = false;

    element.addEventListener("mouseenter", () => {
      if (isAnimating) return; 
      isAnimating = true; 
      
      const originalText = element.dataset.value;
      let iteration = 0;
      
      const interval = setInterval(() => {
        element.innerText = originalText.split("").map((char, index) => {
          if (index < iteration || char === " " || char === "/" || char === "_") {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
        
        if (iteration >= originalText.length) { 
          clearInterval(interval); 
          isAnimating = false; 
          
          // ЭФФЕКТ-ВОЗВРАТ: Если это был бренд, мгновенно возвращаем ему цветные спаны
          if (element.classList.contains("nav-brand") && originalBrandHTML) {
            element.innerHTML = originalBrandHTML;
          }
        }
        
        iteration += 1 / 2;
      }, 30);
    });

    // Дополнительная подстраховка: если пользователь резко убрал мышь, 
    // возвращаем цвета бренду сразу, не дожидаясь конца анимации
    if (element.classList.contains("nav-brand")) {
      element.addEventListener("mouseleave", () => {
        setTimeout(() => {
          if (originalBrandHTML) {
            element.innerHTML = originalBrandHTML;
          }
        }, 50); // Микрозадержка для плавности
      });
    }
  });


    // ==========================================================================
  // 3.5 ИМПУЛЬСНЫЙ ГЛИТЧ ПРИ НАВЕДЕНИИ (ИСПРАВЛЕННЫЙ ЦВЕТ)
  // ==========================================================================
  const hoverGlitchElements = document.querySelectorAll(".nav-brand, .nav-box, section#about h2");

  hoverGlitchElements.forEach(element => {
    element.addEventListener("mouseenter", () => {
      let target = element;

      // Если навели на кнопку меню, глитчим только текст внутри
      if (element.classList.contains("nav-box")) {
        target = element.querySelector(".txt");
      }
      
      if (!target) return;
      if (target.classList.contains("glitch-active")) return;

      // Если это бренд, вешаем глитч на его внутренние спаны, чтобы сохранить их цвета
      if (element.classList.contains("nav-brand")) {
        const spans = element.querySelectorAll("span");
        spans.forEach(span => span.classList.add("glitch-active"));
        
        setTimeout(() => {
          spans.forEach(span => span.classList.remove("glitch-active"));
        }, 200);
        return; // Выходим из функции, так как спаны обработаны
      }

      // Для остальных элементов (имя, меню) применяем как обычно
      target.classList.add("glitch-active");
      setTimeout(() => {
        target.classList.remove("glitch-active");
      }, 200);
    });
  });



  // ==========================================================================
  // 4. СИСТЕМНЫЕ АВТОНОМНЫЕ СБОИ (РАНДОМНЫЙ ГЛИТЧ И ДЕШИФРОВКА)
  // ==========================================================================

  // Массив элементов, которые могут самопроизвольно давать сбои
  // Изменено: удалили .panel-tag из списка случайных целей
  const glitchTargets = document.querySelectorAll(
    ".nav-brand, h2, h3, .nav-terminal-status span"
  );


  function triggerRandomGlitch() {
    if (glitchTargets.length === 0) return;

    const randomElement = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
    
    randomElement.classList.add("glitch-active");

    // Изменено: строго 200мс (0.2 секунды) в соответствии с CSS-анимацией
    setTimeout(() => {
      randomElement.classList.remove("glitch-active");
    }, 200);
  }


  // Функция для запуска случайной хакерской дешифровки без участия мыши
  function triggerRandomDecrypt() {
    if (decryptElements.length === 0) return;

    const randomElement = decryptElements[Math.floor(Math.random() * decryptElements.length)];

    // Имитируем событие mouseenter, вызывая его программно через DispatchEvent
    const event = new Event("mouseenter");
    randomElement.dispatchEvent(event);
  }

  // Запуск фоновых циклов сбоя ядра
  // Глитч срабатывает каждые 2.5 секунды с вероятностью воспроизведения
  setInterval(() => {
    if (Math.random() > 0.4) { // 60% шанс на сбой каждые 2.5 сек
      triggerRandomGlitch();
    }
  }, 2500);

  // Бегущие символы срабатывают реже, чтобы не перегружать интерфейс (каждые 6 секунд)
  setInterval(() => {
    if (Math.random() > 0.5) {
      triggerRandomDecrypt();
    }
  }, 6000);

});
