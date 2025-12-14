# EngWeb Admin Panel

A modern admin panel built with Next.js and Material-UI for managing users.

## Features

- User list with search and filtering
- Role-based filtering (Learner/Teacher)
- Status-based filtering (Active/Inactive/Banned)
- Pagination support
- Responsive sidebar navigation
- Clean, modern UI design

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Next.js 14
- React 18
- Material-UI (MUI) 5
- TypeScript
- Emotion (for CSS-in-JS)

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with theme provider
│   ├── page.tsx         # User list page
│   └── globals.css      # Global styles
├── components/
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Header.tsx       # Top header
│   └── ThemeProvider.tsx # MUI theme configuration
└── package.json
```

