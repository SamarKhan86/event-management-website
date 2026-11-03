# WAYFARER

> **Every Journey Begins Somewhere.**
> A responsive event-discovery and registration website for the K Explore Web Designing assignment.

## Overview

WAYFARER presents official KIIT event listings in an atmospheric editorial interface. Visitors can browse events, search by keyword, filter by broad discovery category, inspect an individual event page, and submit a clearly labelled browser-local demonstration registration.

The site is built with plain HTML5, CSS3, and vanilla JavaScript modules—no framework, build step, or backend is required.

## Current catalogue

The catalogue intentionally contains only four genuine KIIT listings:

1. International Conference on Advanced Materials and Manufacturing Engineering (ICAMME 2026)
2. International Conference on Innovations in Technology for Humanity (IIHTC 2026)
3. DHARTI 2026
4. 51st All India Sociological Conference

Each event retains its official title, source URL, classification, dates, venue, and supplied KIIT poster. Cards use concise display titles for readability, while detail pages retain the full official title.

## Features

- Light parchment theme by default, with a persisted dark-theme toggle
- Responsive homepage, event cards, detail views, and registration form
- Five broad discovery categories with accurate counts, including empty categories:
  - Technology & Innovation
  - Arts & Culture
  - Gaming & Interactive
  - Music & Performance
  - Society & Humanities
- Combined keyword search and category filtering, sorting, reset action, and no-results state
- Clickable event posters, titles, and detail actions
- Dynamic `event.html?id=<event-id>` detail pages with official KIIT links
- Client-side registration validation and duplicate-submission protection
- Browser-local demo registration storage using `localStorage`
- Countdown displays and reduced-motion-aware transitions

## Project structure

```text
Event_Management_Website/
├── index.html                  # Homepage, category browsing, and event discovery
├── event.html                  # Event detail and registration view
├── css/                        # Base tokens, layout, components, responsive rules
├── js/
│   ├── data/events.js          # Single event data source
│   ├── modules/                # Theme, search/filter, storage, registration, countdown
│   └── pages/                  # Homepage and event-detail controllers
├── assets/images/
│   ├── events/                 # Four KIIT event posters used by the site
│   └── ui/                     # WAYFARER logos, favicon, and theme imagery
└── KIIT_Events_Images/         # Original supplied KIIT poster files
```

## Run locally

Use a local server because the site uses JavaScript ES modules.

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). VS Code Live Server also works.

## Registration note

Registrations are a college-project demonstration only. They are saved in the current browser under local storage and are not sent to KIIT, an organiser, or any external service. Use the official KIIT link on an event detail page for real event information or registration.

## Credits

- Official event posters and listing links: [KIIT Deemed to be University](https://kiit.ac.in/events/)
- Typography: Cinzel and Inter via Google Fonts
- WAYFARER logo and favicon: bundled project assets
