document.addEventListener("DOMContentLoaded", () => {
 
 // 1. АВТОМАТИЧЕСКИЙ ТРЕКИНГ МЕНЮ И ПЛАВНЫЙ СКРОЛЛ
 const menuLinks = document.querySelectorAll(".nav-box");
 const sections = document.querySelectorAll(".grid-cell");
 menuLinks.forEach(link => {
   link.addEventListener("click", (e) => {
     e.preventDefault();
     const targetSection = document.querySelector(link.getAttribute("href"));
     if (targetSection) {
       targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
     }
   });
 });

 window.addEventListener("scroll", () => {
   let currentSectionId = "";
   sections.forEach(section => {
     if (window.scrollY >= section.offsetTop - 120) {
       currentSectionId = section.getAttribute("id");
     }
   });
   menuLinks.forEach(link => {
     link.classList.remove("active");
     if (link.getAttribute("href") === `#${currentSectionId}`) link.classList.add("active");
   });
 });

 // 2. СИСТЕМНЫЙ ЗВУКОВОЙ КЛИК (Web Audio API)
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

 const allButtons = document.querySelectorAll(".nav-box, .action-btn, .btn-flat");
 allButtons.forEach(btn => {
   btn.addEventListener("mouseenter", () => playBeep(1200, 0.04, "square", 0.01));
   btn.addEventListener("click", () => playBeep(600, 0.08, "triangle", 0.06));
 });

 // 3. ТОТАЛЬНЫЙ ЭФФЕКТ ХАКЕРСКОЙ ПЕРЕГЕНЕРАЦИИ ТЕКСТА
 const decryptElements = document.querySelectorAll(
   ".nav-box .txt, .panel-tag, .nav-brand, .action-btn, .btn-flat, h2, h3, .skill-info span"
 );
 const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+=[]{}";
 
 decryptElements.forEach(element => {
   const originalText = element.innerText;
   let isAnimating = false;
   element.addEventListener("mouseenter", () => {
     if (isAnimating) return;
     isAnimating = true; 
     let iteration = 0;
     const interval = setInterval(() => {
       element.innerText = originalText.split("").map((char, index) => {
         if (index < iteration) return originalText[index];
         return chars[Math.floor(Math.random() * chars.length)];
       }).join("");
       if (iteration >= originalText.length) { 
         clearInterval(interval); 
         isAnimating = false; 
       }
       iteration += 1 / 2;
     }, 30);
   });
 });
});
