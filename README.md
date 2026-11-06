# [sym_near_one.run] — SymNearOne Portfolio

A terminal-inspired developer portfolio featuring selected projects, bilingual content, and an interactive command line.

**Live site:** https://na1x-dev.github.io/sym_near_one/  
**GitHub:** https://github.com/Na1x-dev/sym_near_one

---

## Overview

This is a lightweight, responsive portfolio built with plain HTML, CSS, and JavaScript. It presents projects in a compact archive, gives each project its own detail page, and uses a terminal-style interface as a small interactive introduction.

The site is intentionally framework-free: there is no build step, package manager, or application server required.

## Features

- **Bilingual interface** — switch between English and Russian.
- **Responsive layout** — adapts to desktop, tablet, and mobile screens.
- **Project archive** — featured projects on the homepage and a complete project list.
- **Dedicated project pages** — descriptions, features, technology stacks, status, and source links.
- **Interactive terminal** — enter commands, browse previous commands with <kbd>↑</kbd> and <kbd>↓</kbd>, and clear the output.
- **Theme switcher** — use the default green accent or switch to pink; the selected theme is saved in the browser.
- **Small project glyphs** — simple icons that follow the active accent color.
- **Reduced-motion support** — respects the visitor's system accessibility preference.

## Terminal commands

Click the terminal input, type a command, and press <kbd>Enter</kbd>.

| Command | Description |
| --- | --- |
| `help` | Show available commands |
| `whoami` | About the developer |
| `stack` | Show the technology stack |
| `projects` | List projects |
| `open NAME` | Open a project detail page |
| `links` | Show GitHub, email, and LinkedIn links |
| `pink` | Switch to the pink accent theme |
| `green` | Restore the default theme |
| `glitch` | Trigger a short visual glitch effect |
| `matrix` | Show the Matrix-style rain effect |
| `hack the pentagon` | Run the harmless binary-output Easter egg |
| `date` | Show the current date and time |
| `clear` | Clear terminal output |

### Command history

- Press <kbd>↑</kbd> to recall the previous command.
- Press <kbd>↓</kbd> to move forward through the history and restore the text you were typing.
- History is kept for the current page session.

## Projects

The project list is maintained centrally in [`projects-data.js`](projects-data.js) and rendered on the homepage, archive, and detail pages.

| Project | Status | Repository |
| --- | --- | --- |
| TechMatcher | Released | [GitHub](https://github.com/Na1x-dev/TechMatcher) |
| AI Content Helper | In development | [GitHub](https://github.com/Na1x-dev/ai_content_helper) |
| Audio Visualizer Studio | In development | [GitHub](https://github.com/Na1x-dev/audio_visualizer) |
| ASCII Video Player | Released | [GitHub](https://github.com/Na1x-dev/ascii_video_player) |
| AstroTrails | Released | [GitHub](https://github.com/Na1x-dev/AstroTrails) |
| Digital Wedding | In development | [GitHub](https://github.com/Na1x-dev/WeddingCard) |
| Voice Avatar Studio | Released | [GitHub](https://github.com/Na1x-dev/VoiceAvatar) |

Project statuses and descriptions are part of the shared data file, so update them there rather than editing generated card markup.

## Tech stack

- **Structure:** HTML5
- **Styling:** CSS3, responsive layouts, CSS custom properties
- **Behavior:** Vanilla JavaScript (ES6+)
- **Browser APIs:** Local Storage for theme preference
- **Hosting:** GitHub Pages

## Run locally

No dependencies or build tools are needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/Na1x-dev/sym_near_one.git
   cd sym_near_one
   ```
2. Open `index.html` in your browser.

For a local HTTP server (useful when testing browser behavior), run one of:

```bash
# Python
python -m http.server 8000

# Node.js, if installed
npx serve .
```

Then visit http://localhost:8000.

## Project structure

```text
.
├── index.html              # Homepage and interactive terminal
├── projects.html           # Full project archive
├── projects-data.js        # Shared project content and metadata
├── script.js               # Rendering, language switcher, terminal behavior
├── style.css               # Layout, themes, responsive styles
├── projects/               # Individual project detail pages
└── sources/
    ├── favicon.svg
    └── icons/              # Interface icons
```

## Customization

- **Add or edit a project:** update `window.PORTFOLIO_PROJECTS` in `projects-data.js` and create its detail page in `projects/`.
- **Change profile links:** edit the `profileLinks` object in `script.js`.
- **Adjust colors and layout:** edit the CSS custom properties and component rules in `style.css`.
- **Add terminal commands:** extend the command handling in `script.js` and document the command in this README.

## Accessibility notes

The interface uses semantic page structure, accessible labels for terminal controls, live announcements for terminal output, and a reduced-motion stylesheet path. Keyboard users can operate the terminal and navigate its command history without a mouse.

---

Made with curiosity by **SymNearOne**.
