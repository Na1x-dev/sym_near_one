// Single source of truth for project content across all portfolio pages.
window.PORTFOLIO_PROJECTS = [
 {id:"techmatcher",number:"01",category:"FULL-STACK WEB APPLICATION",title:"TechMatcher",
 shortDescription:"A smartphone discovery and comparison platform. Browse a catalog, inspect detailed specifications, compare devices, and manage a personal account.",
 description:"TechMatcher helps users find a smartphone that matches their needs. It combines a product catalog, detailed specifications, side-by-side comparison, a shopping cart, and user accounts.",
 features:["Browse and search a smartphone catalog","View detailed specifications and compare devices","Manage a shopping cart and user profile","Authenticate with JWT and Google login","Collect product data with a background scraper"],
 stack:["React","Redux Toolkit","Axios","Django 5","Django REST Framework","PostgreSQL","Celery","Redis","BeautifulSoup","Docker"],
 github:"https://github.com/Na1x-dev/TechMatcher",detailPage:"projects/techmatcher.html"},
 {id:"ai-content-helper",number:"02",category:"AI-POWERED SAAS",title:"AI Content Helper",
 shortDescription:"An AI-powered content assistant for Telegram, VC.ru, and X. Generate drafts, customize the tone of voice, and manage usage limits.",
 description:"AI Content Helper is a content generation platform for several publishing channels. Users can create platform-specific drafts, choose a tone of voice, and work with subscription and usage limits.",
 features:["Generate content for Telegram, VC.ru, and X","Customize the tone and style of generated text","Run generation tasks asynchronously","Authenticate with JWT and Google OAuth","Manage subscriptions and usage limits"],
 stack:["React 19","Vite","Tailwind CSS","Django","Django REST Framework","Celery","Redis","PostgreSQL","OpenAI API","Docker"],
 github:"https://github.com/Na1x-dev/ai_content_helper",detailPage:"projects/ai-content-helper.html"}
];