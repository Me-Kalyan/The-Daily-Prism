# THE DAILY PRISM

**A modern editorial news platform built with Next.js 16, React 19, and Tailwind CSS 4.**

Inspired by Swiss design principles — bold typography, high contrast, solid colors, and hard shadows. No glassmorphism. No soft shadows. Just clean, functional design.

---

## ✦ Features

| Feature | Description |
|---------|-------------|
| **Bilingual Support** | Full English & Telugu (తెలుగు) language support |
| **Dark Mode** | System-aware theme with manual toggle |
| **Live Wire** | Real-time news updates with timeline UI |
| **Fact Check** | Dedicated fact-checking articles with verdict stamps |
| **Responsive** | Mobile-first design across all breakpoints |
| **Swiss Design** | Mondrian-inspired Bento grid, hard shadows, solid colors |

---

## ⚡ Tech Stack

```
Next.js 16.1.1      →  App Router, Server Components
React 19.2.3        →  React Compiler enabled
Tailwind CSS 4      →  Modern CSS-first configuration
Framer Motion       →  Smooth animations & transitions
Lucide React        →  Consistent iconography
TypeScript 5        →  Full type safety
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Me-Kalyan/The-Daily-Prism.git

# Navigate to the project
cd The-Daily-Prism

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── [lang]/              # Language-specific routes (en/te)
│   │   ├── [category]/      # Category pages (politics, tech, etc.)
│   │   ├── live/            # Live Wire news feed
│   │   ├── search/          # Search functionality
│   │   └── page.tsx         # Homepage
│   ├── api/
│   │   └── dashboard/       # Dashboard data API
│   └── globals.css          # Swiss design system tokens
├── components/
│   ├── article/             # Article readers & layouts
│   ├── gallery/             # Masonry gallery
│   ├── hero/                # Bento grid hero
│   ├── layout/              # Header, Footer, TickerTape
│   ├── news/                # News cards (Stacked, Feed, Verdict)
│   ├── video/               # Cinematic video player
│   └── widgets/             # Dashboard, Polls, Timeline
└── lib/
    ├── data/                # Sample news data
    ├── dateUtils.ts         # Date formatting utilities
    └── urlUtils.ts          # URL generation helpers
```

---

## 🎨 Design System

### Typography
- **Headlines:** Archivo Black (uppercase)
- **Body:** Public Sans
- **Telugu Headlines:** Ramabhadra
- **Telugu Body:** Mandali

### Color Palette
| Category | Color |
|----------|-------|
| Politics | `#2563EB` |
| Markets | `#059669` |
| Tech | `#7C3AED` |
| Opinion | `#D97706` |
| Breaking | `#DC2626` |

### Effects
- **Hard Shadow:** `4px 4px 0px 0px rgba(0,0,0,1)`
- **Borders:** 2px solid black/white
- **No gradients, no blur, no rounded corners**

---

## 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📄 License

MIT License — feel free to use this project for learning and inspiration.

---

<p align="center">
  <strong>THE DAILY PRISM</strong><br/>
  <sub>Modern Editorial News Platform</sub>
</p>
