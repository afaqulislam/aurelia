<div align="center">

# ✦ AURELIA

### *The Digital Luxury Experience*

**A production-grade, full-stack luxury fashion e-commerce platform built with React 19, Tailwind CSS 4, and Google Gemini AI.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express.js-Node-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![Deployed on Google Cloud](https://img.shields.io/badge/Deployed-Google_Cloud_Run-4285F4?style=flat-square&logo=googlecloud&logoColor=white)](https://aurelia-luxury-450274679900.asia-southeast1.run.app/)

<br/>

> *"Luxury Defined by Silence — Every interaction is intentional. Every detail, effortless."*

<br/>

### 🌐 [**View Live Demo →**](https://aurelia-luxury-450274679900.asia-southeast1.run.app/)

`https://aurelia-luxury-450274679900.asia-southeast1.run.app/`

<br/>

![AURELIA Preview](https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80&auto=format&fit=crop)

</div>

---

## Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Design System](#-design-system)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✦ Overview

AURELIA is a meticulously crafted digital flagship store that merges high-fashion editorial design with modern web performance. Inspired by the quiet sophistication of Milanese ateliers, it delivers a seamless, sensory-rich shopping experience across all devices — from 320px mobile screens to 4K desktop displays.

This platform demonstrates the convergence of **luxury UX design**, **full-stack engineering**, and **AI-powered personalization** in a single, cohesive production application — deployed live on **Google Cloud Run**.

---

## ✦ Live Demo

| Environment | URL | Status |
|-------------|-----|--------|
| **Production** | [aurelia-luxury-450274679900.asia-southeast1.run.app](https://aurelia-luxury-450274679900.asia-southeast1.run.app/) | ✅ Live |

> Deployed on **Google Cloud Run** — Asia Southeast region for optimal performance.

---

## ✦ Features

### 🛍️ Commerce
- **Curated Product Gallery** — High-contrast editorial grid showcasing artisanal garments with luxury descriptions
- **Artisanal Shopping Bag** — Slide-out cart drawer (`CartDrawer.tsx`) with real-time quantity adjustments and removal animations
- **The Sanctuary (Checkout)** — Multi-phase transaction flow with unique transaction ID generation and processing simulation
- **LocalStorage Persistence** — Cart state survives page refreshes and browser sessions

### 🤖 AI Intelligence
- **Elite Concierge System** — Floating AI assistant (`ChatConcierge.tsx`) powered by Google Gemini, trained on brand knowledge including signature Italian silk and hand-sourced cashmere
- **Secure API Proxy** — Gemini API key is hidden server-side via Express middleware — never exposed to the client
- **Contextual Styling Advice** — Personalized product recommendations and bespoke fashion guidance

### 🎨 Design & UX
- **Obsidian & Gold Aesthetic** — High-contrast dark mode palette with `#0A0A0A` base and `#C5A059` gold accents
- **Fluid Typography** — CSS `clamp()` scaling from 320px to 1440px+ without layout breaks
- **Glassmorphism Header** — 12px blur with gold-tinted borders, transitions from transparent to solid on scroll
- **Cinematic Animations** — Route transitions, staggered product reveals, and micro-interactions via Framer Motion

### 📱 Responsiveness
- **Mobile-First Architecture** — Tailwind `sm:`, `md:`, `lg:`, `xl:` prefix system throughout every component
- **Adaptive Navigation** — Hamburger menu with blur-effect backdrop on mobile (`Layout.tsx`)
- **44px Touch Targets** — WCAG-compliant interactive elements for all touchscreen devices
- **Adaptive Product Grid** — Shifts from 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- **Zero Horizontal Scroll** — Verified pixel-perfect reflow across all breakpoints

### 📄 Multi-Page Narrative

| Page | File | Description |
|------|------|-------------|
| **Home** | `Home.tsx` | Cinematic hero section with `clamp()` typography and product grid |
| **About** | `About.tsx` | Brand heritage and craftsmanship narrative |
| **Contact** | `Contact.tsx` | Bespoke client inquiry portal with form submission |
| **Checkout** | `Checkout.tsx` | Secure, multi-step payment environment |

---

## ✦ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 + TypeScript | Component architecture & type safety |
| **Build Tool** | Vite | Lightning-fast dev server & optimized bundling |
| **Styling** | Tailwind CSS 4.0 (`@theme`) | Utility-first responsive design system |
| **Routing** | React Router 7 | Multi-page client-side navigation |
| **Animations** | motion/react (Framer Motion) | Cinematic transitions & micro-interactions |
| **Icons** | Lucide React | Consistent, elegant iconography |
| **Backend** | Express.js + Node.js | API server, static serving & AI proxy |
| **AI Engine** | Google Gemini (`@google/genai`) | Intelligent concierge & personalization |
| **State** | React Hooks + LocalStorage | Global cart persistence |
| **Deployment** | Google Cloud Run | Containerized production hosting |

---

## ✦ Project Structure

```
aurelia/
├── 📁 src/                      # Main application source
│   ├── 📁 components/           # Reusable UI components
│   │   ├── CartDrawer.tsx       # Slide-out shopping bag & management
│   │   ├── ChatConcierge.tsx    # AI-powered concierge assistant
│   │   └── Layout.tsx           # Header, Footer, Navigation, Hamburger menu
│   │
│   ├── 📁 pages/                # Individual route views
│   │   ├── Home.tsx             # Hero landing & adaptive product grid
│   │   ├── About.tsx            # Brand narrative & atelier story
│   │   ├── Contact.tsx          # Concierge inquiry form
│   │   └── Checkout.tsx         # Order review & payment processing
│   │
│   ├── App.tsx                  # Route definitions & global state provider
│   ├── index.css                # Tailwind 4 @theme config & editorial styles
│   ├── main.tsx                 # React client entry point
│   └── types.ts                 # Project-wide TypeScript interfaces
│
├── 📁 public/                   # Static assets (favicons, manifest)
├── .env.example                 # Environment variables template
├── index.html                   # HTML shell & font injections
├── metadata.json                # Platform-level app configuration
├── package.json                 # Dependencies & npm scripts
├── server.ts                    # Express server, API routes & Gemini proxy
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite build & plugin configuration
```

### Key File Responsibilities

| File | Role |
|------|------|
| `src/components/Layout.tsx` | Backbone of the site — sticky glass-header, responsive hamburger menu, editorial footer |
| `src/pages/Home.tsx` | Fluid hero with `clamp()` typography, adaptive 1→4 column product grid |
| `server.ts` | Full-stack core — serves React build in production, securely proxies Gemini API calls |
| `src/index.css` | Tailwind 4 `@theme` directive — defines Obsidian/Gold palette and editorial fonts |
| `src/types.ts` | Shared TypeScript interfaces for Product, CartItem, and API responses |

---

## ✦ Getting Started

### Prerequisites

- Node.js `v18+`
- A [Google Gemini API Key](https://ai.google.dev/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/afaqulislam/aurelia.git
cd aurelia

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Add your GEMINI_API_KEY to .env
```

### Environment Variables

```env
# .env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Production Build

```bash
npm run build
npm start
```

---

## ✦ Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `obsidian` | `#0A0A0A` | Primary background |
| `gold` | `#C5A059` | Luxury accents & CTAs |
| `muted-gold` | `#A08040` | Secondary accent states |
| `white` | `#FFFFFF` | Typography & contrast |

### Typography

| Role | Font | Usage |
|------|------|-------|
| **Editorial** | Playfair Display | Headings, hero text, brand name |
| **Functional** | Inter | UI elements, body copy, labels |

### Responsive Breakpoints

| Breakpoint | Width | Layout Behavior |
|------------|-------|----------------|
| Mobile | `320px+` | Single column, hamburger nav |
| Tablet | `768px+` | 2-column product grid |
| Desktop | `1024px+` | 3–4 column grid, full navigation |
| Wide | `1440px+` | Max-width container, editorial spacing |

---

## ✦ API Reference

All endpoints served from the Express backend at `/api/`.

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/products` | Returns full product catalogue | None |
| `POST` | `/api/process-payment` | Simulates secure payment transaction | None |
| `POST` | `/api/contact-submit` | Handles client inquiry submissions | None |
| `POST` | `/api/chat` | Proxies to Gemini AI Concierge | Server-side key |

---

## ✦ Deployment

### Google Cloud Run *(Current — Production)*

```bash
# Build container
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/aurelia

# Deploy to Cloud Run
gcloud run deploy aurelia \
  --image gcr.io/YOUR_PROJECT_ID/aurelia \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key_here
```

**Live URL:** `https://aurelia-luxury-450274679900.asia-southeast1.run.app/`

### Alternative — Vercel + Render

```bash
# Frontend on Vercel
npm install -g vercel && vercel --prod

# Backend on Render
# Connect GitHub → Set build: npm run build → Start: npm start
```

---

## ✦ License

```
MIT License — © 2026 Afaq Ul Islam / Neofyx
```

Built with precision. Designed with intention.

---

<div align="center">

**AURELIA** · *Crafted at [Neofyx](https://neofyx.vercel.app)* · Built during [Google Build with AI 2026](https://www.geeksforgeeks.org/event/build-with-ai)

🌐 **[Live Demo](https://aurelia-luxury-450274679900.asia-southeast1.run.app/)** · 📧 **[Contact](mailto:afaqulislam707@gmail.com)**

</div>