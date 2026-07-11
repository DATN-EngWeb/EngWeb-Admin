# EngWeb Admin Panel

A modern admin panel built with Next.js and Material-UI for managing the NENS English learning platform — users, learning rules, and rewards.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** React 18
- **Styling:** MUI 5 + Emotion
- **HTTP Client:** Axios
- **Auth:** Cookie-based session + route protection middleware

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Features

- Authentication (login, forgot password, OTP verification, reset password)
- Route protection via middleware (redirects unauthenticated users to `/login`)
- User management with search, role/status filtering, and pagination
- Pending user approvals
- Rules management (quotas, XP bonuses, streak rewards, user levels, completion bonuses)
- User profile with password change and cover/avatar editing

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd engweb-admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env` and set `NEXT_PUBLIC_API_BASE_URL` to your backend API URL.

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start development server              |
| `npm run build` | Build production bundle               |
| `npm run start` | Start production server               |
| `npm run lint`  | Run ESLint checker (Next.js built-in) |

## Project Structure

```bash
engweb-admin/
├── app/ # App Router pages, layouts, and page-scoped components
├── components/ # Reusable UI components (Sidebar, Header, Pagination, ThemeProvider)
├── lib/
│   ├── api/ # API request wrappers (auth, users, rules)
│   ├── contexts/ # React context providers (AuthContext)
│   ├── theme/ # MUI theme setup
│   ├── types/ # Shared TypeScript types
│   └── utils/ # Utility functions (auth, jwt, users)
├── styles/ # Shared style objects, grouped by feature
├── public/assets # Static assets
├── .env # Environment configuration
├── middleware.ts # Route protection middleware
├── next.config.js # Next.js config
├── tsconfig.json # TypeScript config
└── package.json # Project scripts and dependencies
```

## Route Protection

`middleware.ts` guards all routes except `/login`, `/forgot-password`, `/verify-otp`, and `/reset-password`. Unauthenticated requests are redirected to `/login` (with the original path preserved as a `next` query param); authenticated users visiting `/login` are redirected back to `/`.

## Troubleshooting

### Port 3000 already in use

**Option 1:** Kill the process using port 3000

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Option 2:** Use a different port

```powershell
$env:PORT=3001; npm run dev
```

### Editor errors

Make sure your editor is using the workspace settings:

- In VS Code: `Ctrl+Shift+P` → "Preferences: Open Workspace Settings"
