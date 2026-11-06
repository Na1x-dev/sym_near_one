// Project content lives here once and is reused on the homepage, archive, and detail pages.
window.PORTFOLIO_PROJECTS = [
  {
    "id": "techmatcher",
    "number": "01",
    "title": "TechMatcher",
    "category": "FULL-STACK WEB APPLICATION",
    "categoryRu": "FULL-STACK ВЕБ-ПРИЛОЖЕНИЕ",
    "status": "released",
    "shortDescription": "A smartphone discovery and comparison platform. Browse a catalog, inspect detailed specifications, compare devices, and manage a personal account.",
    "shortDescriptionRu": "Платформа для поиска и сравнения смартфонов. Изучайте каталог, характеристики устройств, сравнивайте модели и управляйте личным аккаунтом.",
    "description": "TechMatcher helps users find a smartphone that matches their needs. It combines a product catalog, detailed specifications, side-by-side comparison, a shopping cart, and user accounts.",
    "descriptionRu": "TechMatcher помогает подобрать смартфон под свои задачи. В приложении есть каталог устройств, подробные характеристики, сравнение моделей, корзина и личные аккаунты.",
    "features": [
      "Browse and search a smartphone catalog",
      "View detailed specifications and compare devices",
      "Manage a shopping cart and user profile",
      "Authenticate with JWT and Google login",
      "Collect product data with a background scraper"
    ],
    "featuresRu": [
      "Просмотр и поиск смартфонов в каталоге",
      "Подробные характеристики и сравнение устройств",
      "Корзина и профиль пользователя",
      "Авторизация через JWT и Google",
      "Сбор данных о товарах в фоновом режиме"
    ],
    "stack": [
      "React",
      "Redux Toolkit",
      "Axios",
      "Django 5",
      "Django REST Framework",
      "PostgreSQL",
      "Celery",
      "Redis",
      "BeautifulSoup",
      "Docker"
    ],
    "github": "https://github.com/Na1x-dev/TechMatcher",
    "detailPage": "projects/techmatcher.html"
  },
  {
    "id": "ai-content-helper",
    "number": "02",
    "title": "AI Content Helper",
    "category": "AI-POWERED SAAS",
    "categoryRu": "SAAS-ПЛАТФОРМА С ИИ",
    "status": "in-development",
    "statusNote": "In development · almost ready",
    "statusNoteRu": "В разработке · почти готов",
    "shortDescription": "An AI-powered content assistant for Telegram, VC.ru, and X. Generate drafts, customize the tone of voice, and manage usage limits.",
    "shortDescriptionRu": "ИИ-помощник для создания контента в Telegram, VC.ru и X. Генерируйте черновики, настраивайте тональность и управляйте лимитами использования.",
    "description": "AI Content Helper is a content generation platform for several publishing channels. Users can create platform-specific drafts, choose a tone of voice, and work with subscription and usage limits. A few features are still in development.",
    "descriptionRu": "AI Content Helper — платформа для генерации контента под разные площадки. Пользователи могут создавать адаптированные публикации, выбирать тональность и управлять подпиской и лимитами. Несколько функций ещё находятся в разработке.",
    "features": [
      "Generate content for Telegram, VC.ru, and X",
      "Customize the tone and style of generated text",
      "Run generation tasks asynchronously",
      "Authenticate with JWT and Google OAuth",
      "Manage subscriptions and usage limits"
    ],
    "featuresRu": [
      "Генерация контента для Telegram, VC.ru и X",
      "Настройка тона и стиля текста",
      "Асинхронная обработка задач генерации",
      "Авторизация через JWT и Google OAuth",
      "Управление подписками и лимитами"
    ],
    "stack": [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Django",
      "Django REST Framework",
      "Celery",
      "Redis",
      "PostgreSQL",
      "OpenAI API",
      "Docker"
    ],
    "github": "https://github.com/Na1x-dev/ai_content_helper",
    "detailPage": "projects/ai-content-helper.html"
  },
  {
    "id": "audio-visualizer",
    "number": "03",
    "title": "Audio Visualizer Studio",
    "category": "BROWSER-BASED CREATIVE TOOL",
    "categoryRu": "БРАУЗЕРНЫЙ ИНСТРУМЕНТ ДЛЯ ТВОРЧЕСТВА",
    "status": "in-development",
    "shortDescription": "A browser-based audio visualizer with animated styles, detailed sound controls, and image or video export.",
    "shortDescriptionRu": "Браузерный аудиовизуализатор с несколькими стилями анимации, настройками звука и экспортом изображений и видео.",
    "description": "Audio Visualizer Studio turns locally loaded audio into animated visual compositions. It offers multiple visualization modes, fine-grained frequency and appearance controls, and export tools without uploading audio to a server.",
    "descriptionRu": "Audio Visualizer Studio превращает локально загруженную музыку в анимированные визуализации. В проекте есть несколько режимов отображения, точные настройки частот и внешнего вида, а также экспорт без загрузки аудио на сервер.",
    "features": [
      "Spectrum, waveform, radial, particles, and neon visualizations",
      "Adjust frequency range, sensitivity, smoothing, and effects",
      "Choose preset or custom canvas dimensions",
      "Export PNG frames and record WebM video",
      "Process audio locally in the browser"
    ],
    "featuresRu": [
      "Спектр, волна, радиальная визуализация, частицы и неоновые эффекты",
      "Настройка частотного диапазона, чувствительности и сглаживания",
      "Выбор готового или собственного размера холста",
      "Экспорт PNG-кадров и запись видео WebM",
      "Обработка аудио локально в браузере"
    ],
    "stack": [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "Web Audio API",
      "Canvas API",
      "MediaRecorder API"
    ],
    "github": "https://github.com/Na1x-dev/audio_visualizer",
    "liveDemo": "https://na1x-dev.github.io/audio_visualizer/",
    "detailPage": "projects/audio-visualizer.html"
  },
  {
    "id": "ascii-video-player",
    "number": "04",
    "title": "ASCII Video Player",
    "category": "PYTHON CLI TOOL",
    "categoryRu": "КОНСОЛЬНАЯ УТИЛИТА НА PYTHON",
    "status": "released",
    "shortDescription": "A terminal video player that converts video frames into ASCII art and plays the animation directly in the console.",
    "shortDescriptionRu": "Консольный видеоплеер, который преобразует кадры видео в ASCII-графику и воспроизводит анимацию прямо в терминале.",
    "description": "ASCII Video Player separates video preparation from playback. A compiler converts frames into a text cache, then a lightweight player renders the prepared animation in the terminal.",
    "descriptionRu": "ASCII Video Player разделяет подготовку видео и воспроизведение. Компилятор преобразует кадры в текстовый кэш, после чего лёгкий плеер выводит подготовленную анимацию в терминал.",
    "features": [
      "Convert video frames into ASCII characters",
      "Cache processed frames for smoother playback",
      "Configure output width and playback FPS",
      "Separate compilation and playback modules",
      "Run from the command line"
    ],
    "featuresRu": [
      "Преобразование видеокадров в ASCII-символы",
      "Кэширование обработанных кадров для плавного воспроизведения",
      "Настройка ширины вывода и FPS",
      "Разделение компиляции и воспроизведения на модули",
      "Запуск из командной строки"
    ],
    "stack": [
      "Python",
      "OpenCV",
      "NumPy",
      "CLI"
    ],
    "github": "https://github.com/Na1x-dev/ascii_video_player",
    "detailPage": "projects/ascii-video-player.html"
  },
  {
    "id": "astrotrails",
    "number": "05",
    "title": "AstroTrails",
    "category": "ASTROPHOTOGRAPHY WEB TOOL",
    "categoryRu": "ВЕБ-ИНСТРУМЕНТ ДЛЯ АСТРОФОТОГРАФИИ",
    "status": "released",
    "shortDescription": "A browser-based editor for creating comet-style star trails from astrophotography timelapse videos.",
    "shortDescriptionRu": "Браузерный редактор для создания звёздных треков с эффектом комет из астрофотографических таймлапсов.",
    "description": "AstroTrails is a fully client-side editor for processing astrophotography timelapses into star-trail images. It provides comet-tail controls, color and exposure adjustments, GPU-optimized previews, and full-resolution export.",
    "descriptionRu": "AstroTrails — автономный редактор для превращения астрофотографических таймлапсов в изображения звёздных треков. Он позволяет настраивать хвосты комет, цвет и экспозицию, использовать оптимизированное GPU-превью и экспортировать результат в исходном разрешении.",
    "features": [
      "Create smooth comet-style star trails",
      "Export at the source video's full resolution, including 4K",
      "Use GPU-optimized preview rendering",
      "Adjust exposure, gamma, and RGB channels",
      "Work locally in a responsive browser interface"
    ],
    "featuresRu": [
      "Создание плавных звёздных треков с эффектом комет",
      "Экспорт в исходном разрешении видео, включая 4K",
      "GPU-оптимизированный предпросмотр",
      "Настройка экспозиции, гаммы и RGB-каналов",
      "Автономная работа в адаптивном браузерном интерфейсе"
    ],
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Canvas API",
      "GPU-accelerated rendering"
    ],
    "github": "https://github.com/Na1x-dev/AstroTrails",
    "liveDemo": "https://na1x-dev.github.io/AstroTrails/",
    "detailPage": "projects/astrotrails.html"
  },
  {
    "id": "wedding-card",
    "number": "06",
    "title": "Digital Wedding",
    "category": "INTERACTIVE LANDING PAGE",
    "categoryRu": "ИНТЕРАКТИВНЫЙ LANDING PAGE",
    "status": "in-development",
    "shortDescription": "A multilingual showcase for digital wedding invitations, with template browsing and personalized order links.",
    "shortDescriptionRu": "Мультиязычная витрина цифровых свадебных приглашений с каталогом шаблонов и персонализированными ссылками для заказа.",
    "description": "Digital Wedding is a responsive landing page for presenting digital wedding invitation designs and collecting individual orders. It includes dynamic localization, a template catalog, and an interactive link builder.",
    "descriptionRu": "Digital Wedding — адаптивная страница для демонстрации дизайнов цифровых свадебных приглашений и приёма индивидуальных заказов. В проекте реализованы локализация, каталог шаблонов и интерактивный конструктор ссылок.",
    "features": [
      "Switch between Russian and English content",
      "Browse a catalog of invitation templates",
      "Generate personalized messenger links from template IDs",
      "Use a responsive glassmorphism interface",
      "Manage template content from a central configuration file"
    ],
    "featuresRu": [
      "Переключение между русским и английским языками",
      "Просмотр каталога шаблонов приглашений",
      "Создание персонализированных ссылок для мессенджеров по ID шаблона",
      "Адаптивный интерфейс с эффектом glassmorphism",
      "Управление шаблонами через единый конфигурационный файл"
    ],
    "stack": [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "i18n",
      "GitHub Pages"
    ],
    "github": "https://github.com/Na1x-dev/WeddingCard",
    "liveDemo": "https://na1x-dev.github.io/WeddingCard/",
    "detailPage": "projects/wedding-card.html"
  },
  {
    "id": "voice-avatar",
    "number": "07",
    "title": "Voice Avatar Studio",
    "category": "REAL-TIME CREATOR TOOL",
    "categoryRu": "ИНСТРУМЕНТ ДЛЯ СТРИМЕРОВ И АВТОРОВ",
    "status": "released",
    "shortDescription": "A voice-controlled PNGTuber studio with real-time avatar animation, custom expressions, and an OBS-ready chroma key view.",
    "shortDescriptionRu": "Голосовая PNGTuber-студия с анимацией аватара в реальном времени, пользовательскими эмоциями и режимом хромакея для OBS.",
    "description": "Voice Avatar Studio animates a PNG avatar in response to microphone input. It supports custom expression thresholds, automatic blinking, multilingual controls, and local persistence for settings and uploaded assets.",
    "descriptionRu": "Voice Avatar Studio анимирует PNG-аватар в ответ на звук с микрофона. Поддерживает пользовательские пороги эмоций, автоматическое моргание, мультиязычный интерфейс и локальное сохранение настроек и загруженных изображений.",
    "features": [
      "Animate avatar mouth movement from live microphone input",
      "Create custom expressions with individual volume thresholds",
      "Add automatic eye blinking",
      "Save settings and image assets in IndexedDB",
      "Use a dedicated chroma key view for OBS"
    ],
    "featuresRu": [
      "Анимация рта аватара по сигналу микрофона в реальном времени",
      "Создание эмоций с индивидуальными порогами громкости",
      "Автоматическое моргание",
      "Сохранение настроек и изображений в IndexedDB",
      "Отдельная зона хромакея для OBS"
    ],
    "stack": [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "Web Audio API",
      "IndexedDB",
      "OBS Studio"
    ],
    "github": "https://github.com/Na1x-dev/VoiceAvatar",
    "liveDemo": "https://na1x-dev.github.io/VoiceAvatar/",
    "detailPage": "projects/voice-avatar.html"
  }
];
