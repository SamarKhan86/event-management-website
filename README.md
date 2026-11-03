# WAYFARER — Event Discovery & Management Website

> **K Explore — Web Designing Assignment**  
> **Product Name:** WAYFARER  
> **Tagline:** *“Every Journey Begins Somewhere.”*  
> **Technology Stack:** HTML5, CSS3, Vanilla JavaScript (ES Modules)  

---

## 1. Project Overview

**WAYFARER** is a responsive event discovery and registration web application developed for the *K Explore — Web Designing* curriculum assignment. The platform enables visitors to discover upcoming academic symposiums and creative cultural events, search and filter the catalogue, inspect in-depth event information, and complete an event registration workflow.

The visual direction follows an **Atmospheric Editorial** aesthetic influenced by quiet fantasy world-building and Japanese-inspired ink/parchment refinement, balancing atmospheric visual design with practical, accessible web usability.

---

## 2. Technology Stack & Principles

In strict accordance with the assignment specifications, the application is built without complex frameworks, compilers, or heavy dependencies:

* **HTML5:** Semantic landmark architecture (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), descriptive headings (`<h1>`–`<h3>`), and accessible form controls with explicit labels and ARIA attributes.
* **CSS3:** Custom properties (CSS variables) for theme tokens, CSS Grid and Flexbox for responsive layouts, clamp-based fluid typography, subtle transitions, and media queries across mobile, tablet, and desktop viewports. Respects `prefers-reduced-motion`.
* **Vanilla JavaScript (ES Modules):** Modular browser-native JavaScript with separation of concerns between data exports, state filtering, DOM manipulation, form validation, and Local Storage persistence. No bundlers or build steps required.

---

## 3. Features Implemented

### 3.1 Mandatory Requirements
* **Homepage Hero Section:** Atmospheric introductory banner with brand wordmark, tagline, and call-to-action buttons.
* **Explore by Category:** Nine data-driven category tiles with custom line icons and dynamic event counts.
* **Featured Event Showcase:** Dedicated spotlight highlighting premier upcoming symposiums with integrated countdown timers and direct registration actions.
* **Upcoming Events Discovery:** Responsive card grid displaying event poster, title, date range, venue, category badge, and concise description.
* **Live Search & Category Filtering:** Real-time text search (evaluating titles, descriptions, venues, and categories) combined with category dropdown filtering and sort options (Earliest, Furthest, Alphabetical).
* **Clear & Empty States:** One-click filter reset action and an informative empty state when no events match the search criteria.
* **Dynamic Event Detail View (`event.html?id=<event-id>`):** Reads the event identifier directly from the URL query string, rendering full event descriptions, schedule times, venues, and official links.
* **Not-Found Fallback State:** Graceful error handling for missing or invalid event query IDs, offering a one-click return to the catalogue.
* **Participant Registration:** Form pre-linked to the active event, collecting Full Name, Email Address, and Phone Number.
* **JavaScript Input Validation:** Field-level accessible error feedback validating name length and characters, RFC-compliant email structure, and universal phone number formatting.
* **Duplicate Submission Guard:** Disables the submit button during processing with an animated loading indicator to prevent multiple submissions.
* **Registration Confirmation:** Displays an accessible confirmation receipt detailing registration ID, participant data, event title, and timestamp.
* **Fully Responsive Design:** Tested without horizontal overflow across mobile (360px, 390px), tablet (768px), and desktop (1024px, 1440px) viewports.

### 3.2 Bonus Challenges (BR-01 to BR-04)
1. **Dark & Light Mode (BR-01):** Primary dark atmospheric theme paired with a warm parchment-and-ink light theme. Managed via CSS custom properties and saved to `localStorage` (`wayfarer_theme_v1`).
2. **Event Countdown Timers (BR-02):** Real-time countdown calculation updating days, hours, minutes, and seconds until event commencement, with safeguards preventing negative countdowns.
3. **Subtle Transitions & Animations (BR-03):** Micro-interactions on buttons, category cards, and image zoom on hover. Completely respects operating system reduced-motion settings.
4. **Local Storage Registration Management (BR-04):** Stores valid demo registrations in browser `localStorage` (`wayfarer_registrations_v1`), detecting duplicate email submissions and allowing participants to register additional attendees.

---

## 4. Event Catalogue & Data Provenance

The catalogue utilizes a curated 9-event hybrid structure, maintaining transparency regarding event origins:

### 4.1 Four Verified KIIT Academic Conferences
Accurately verified from the official KIIT event calendar (`https://kiit.ac.in/events/`), utilizing original posters provided in `KIIT_Events_Images/`:
1. **ICAMME 2026** (Dec 4–5, 2026) — *School of Mechanical Engineering, KIIT* (Category: Technology & Engineering)
2. **IIHTC 2026** (Dec 17, 2026 – Feb 19, 2027) — *Campus-6 Auditorium, KIIT* (Category: Technology & Society)
3. **DHARTI 2026** (Dec 18–20, 2026) — *School of Liberal Studies, KIIT* (Category: Digital Humanities)
4. **51st All India Sociological Conference** (Dec 27–29, 2026) — *Department of Sociology, KIIT* (Category: Social Sciences)

*Note: Verified listings display a `KIIT LISTING` badge and link directly to the official KIIT conference portal for official paper submissions and faculty registration.*

### 4.2 Five Curated K Explore Demonstration Concepts
Fictional demonstration events reflecting student interests in technology, music, gaming, and cinema:
1. **Signal & Silence** (Jan 9, 2027) — Creative Technology
2. **Afterglow at Eight** (Jan 15, 2027) — Indie Music
3. **The Last Checkpoint** (Jan 16, 2027) — Gaming & Interactive
4. **Frames in the Moonlight** (Jan 23, 2027) — Anime & Film
5. **Lanterns After Dusk** (Feb 6, 2027) — Japanese Pop Culture

*Note: Concept events display a `K EXPLORE CONCEPT` badge and are explicitly designated as demonstration concepts.*

---

## 5. Repository Structure

```text
Event_Management_Website/
│
├── index.html                  # Homepage with Hero, Categories, Featured & Events Discovery
├── event.html                  # Dynamic Event Detail & Registration Page
├── README.md                   # Public project documentation & viva explanation
├── .gitignore                  # Git ignore rules protecting private files
│
├── KIIT_Events_Images/         # Original supplied KIIT conference posters
│   ├── 51st ALL INDIA SOCIOLOGICAL CONFERENCE.jpeg
│   ├── DHARTI-Conference-Poster.jpeg
│   ├── International Conference on Advanced Materials and Manufacturing Engineering.jpg
│   └── International Conference on Innovations in Technology for Humanity – IIHTC 2026.jpg
│
├── assets/
│   └── images/
│       ├── events/             # Web-optimized event posters & banners
│       └── ui/                 # Dark & light theme background imagery
│
├── css/
│   ├── base.css                # CSS variables, typography, reset, ornamental dividers
│   ├── layout.css              # Header, navigation, hero, section grids, footer
│   ├── components.css          # Cards, buttons, forms, badges, countdown, modals
│   └── responsive.css          # Breakpoints (360px, 390px, 768px, 992px, 1200px)
│
└── js/
    ├── data/
    │   └── events.js           # Single source of truth for all 9 event records
    ├── modules/
    │   ├── countdown.js        # Real-time event countdown timer calculation
    │   ├── registration.js     # Form input handling, submit guards, confirmation UI
    │   ├── search-filter.js    # Keyword search, category filtering, sort algorithms
    │   ├── storage.js          # Safe Local Storage wrapper with quota handling
    │   └── theme.js            # Dark/light theme switcher with persistence
    ├── pages/
    │   ├── home.js             # Homepage controller, category tiles & event cards
    │   └── event-detail.js     # Query string lookup (?id=...), detail renderer
    └── utils/
        └── validation.js       # Pure validation functions for name, email, and phone
```

---

## 6. Local Setup & Execution Instructions

Because the project uses standard native **JavaScript ES Modules** (`import` / `export`), modern web browsers require pages to be served over an HTTP protocol rather than raw `file://` URIs.

### Option A: Using Python (Recommended)
Python is typically pre-installed on modern operating systems.
1. Open terminal/PowerShell in the project root directory:
   ```bash
   cd Event_Management_Website
   ```
2. Start the local server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```text
   http://localhost:8000
   ```

### Option B: Using VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click `index.html` in the file explorer.
3. Select **"Open with Live Server"**.

### Option C: Using Node.js
If you have Node.js installed:
```bash
npx serve .
```

---

## 7. Demonstration Storage Limitation

> **Important Evaluation Note:**  
> The registration system uses browser **Local Storage** (`localStorage`). Submissions are preserved exclusively inside the visitor's local web browser for academic evaluation. No external network request or notification email is dispatched. For actual KIIT academic conference registration, visitors are directed to the official KIIT web portals linked on each official event page.

---

## 8. Asset Credits

* **Official KIIT Posters:** Kalinga Institute of Industrial Technology (KIIT Deemed to be University), Bhubaneswar ([kiit.ac.in](https://kiit.ac.in/events/)).
* **Atmospheric Photography:** Free-to-use photography from [Unsplash](https://unsplash.com) under the Unsplash License (Attribution: Johannes Plenio, Michael Discenza, Florian Olivo, Felix Mooneeram, Susann Schuster).
* **Typography:** *Cinzel* display serif and *Inter* clean sans-serif sourced via Google Fonts.
