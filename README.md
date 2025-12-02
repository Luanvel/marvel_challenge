# Marvel Challenge

Web application to explore and manage heroes favorites. Built with **Next.js 15 (REACT)**, **Tailwind CSS**, and **Jest** for testing.

This application is deployed at Vercel. Click [here](https://marvel-challenge-smoky.vercel.app/) and try it!

---

## 📚 Project Context

The original challenge required building an application using the **Marvel API**.  
However, throughout development the following issues appeared:

### Marvel API — Sunset / Deprecated

- The official Marvel API is no longer functional, making it impossible to complete the challenge as initially defined.

### SuperHeroAPI — Image Protection (403 Errors)

A second attempt was made using **https://superheroapi.com/**.

- Although data loads correctly, **images are protected** and needed browser-only verification.
- Requests for images return **403 Forbidden**

### Final API Used: https://akabab.github.io/superhero-api/api/

- The UI was adapted to remain as close as possible to the original Marvel-inspired design while using this alternative dataset.

## How to run the application locally

### Prerequisites

- Node.js 18+ installed
- npm

### Installation and setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the project root:

   ```env
   SUPERHERO_API_BASEURL=https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api
   ```

   In this case, we don't need an apikey :)

4. **Run development server**

   ```bash
   npm run dev
   ```

   The application will normally be available at [http://localhost:3000](http://localhost:3000)

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## Architecture and Structure

### Folder structure

```
marvel-challenge/
├── app/                          # Next.js App
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Global layout
│   └── characters/[id]/          # Detail page by ID
│       └── page.tsx              # Hero detail
│
├── components/                   # Reusable React components
│   ├── DetailFavoriteButton.tsx  # Heart Button for toggling favorites on detail page
│   ├── FavoriteHeroesList.tsx    # List of favorite hero cards
│   ├── Header.tsx                # Header with favorites counter
│   ├── HeroCard.tsx              # Individual hero card
│   ├── HeroesList.tsx            # Grid of hero cards
│   └── SearchBar.tsx             # Search bar
│
├── lib/                          # Server-side logic (APIs, utilities)
│   └── superheroApi.ts           # Function for data fetching
│
├── styles/                       # SCSS styles
│   ├── globals.scss              # Global styles
│   ├── header.scss               # Header component styles
│   ├── hero-card.scss            # Hero card component styles
│   ├── hero-detail.scss          # Hero detail page styles
│   ├── hero-list.scss            # List of herocards component style
│   ├── searchbar.scss            # Search bar component styles
│   └── detail.scss               # Detail page styles
│
├── types/                        # TypeScript types
│   └── superheroInterface.ts     # SuperHeroInterface definition
│
├── utils/                        # Utilities
│   └── storage.ts                # Favorites management with localStorage
│
├── __tests__/                    # Tests with Jest + React Testing Library
│   └── app/
│       └── HeroCard.test.tsx     # Example test
│
├── jest.config.js                # Jest configuration
├── jest.setup.ts                 # Testing Library setup
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## Main components

#### **Header**

- Displays application logo/title
- Shows total number of favorites
- Subscribes to changes in `utils/storage`

#### **SearchBar**

- Input to search heroes by name
- Displays total search results
- Sends query params via GET to server

#### **HeroCard**

- Individual hero card
- Image, name, and favorite button
- Syncs favorite state with `subscribeFavorites`
- Link to detail page

#### **HeroesList**

- Responsive HeroCard grid starting with 2 columns on mobile and scaling up dynamically on larger breakpoints
- Filters heroes by search, if not, recieve 50 random heroes
- Uses `useMemo` for optimization

#### **Detail (page.tsx in /characters/[id])**

- Complete hero information
- "OTHER HEROES" section with horizontal slider

---

## Testing

### Run tests

```bash
npm test             # Run all tests once
npm run test:watch   # Watch mode
```

### Test structure

- Location: `__tests__/`
- Framework: **Jest** + **React Testing Library**
- Mocks: `@/utils/storage`, `next/image`, `next/link`

---

## Design

- The design was created by BEMOBILE, originally designed for a Marvel Heroes app
- All the design is responsive and can be accessed through desktop, tablets or mobile phones

---

### Important!!

- **Favorites** are stored locally in `localStorage`, only frontend here :)
- In development, some browser extensions can cause hydration warnings — incognito mode is recommended
