# Habit Tracker Frontend

A React + Vite frontend for the Habit Tracker application. Build and track your daily habits with a responsive, fast UI.

## Overview

This is the client-side application for Habit Tracker. It provides a clean interface to:
- Create and manage habits
- Mark habits as completed each day
- View your habit streaks
- Delete habits

**Tech Stack**: React 19, Vite, Tailwind CSS, Axios

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the `frontend/` directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
   
   For production/Render deployment, use the backend service URL:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:5173`.

## Available Scripts

- **`npm run dev`** — Start the development server with hot module reload (HMR)
- **`npm run build`** — Build for production (outputs to `dist/`)
- **`npm run preview`** — Preview the production build locally
- **`npm run lint`** — Run ESLint to check code quality

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── HabitCard.jsx      # Individual habit card component
│   ├── api.js                 # Axios API client
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styles
│   ├── index.css              # Global styles
│   └── main.jsx               # React entry point
├── public/                    # Static assets
├── index.html                 # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── eslint.config.js          # ESLint configuration
└── package.json
```

## Key Components

### `App.jsx`
Main app component that:
- Fetches and displays all habits for a user
- Handles creating new habits
- Passes delete/update callbacks to habit cards
- Shows loading/empty states

### `HabitCard.jsx`
Individual habit card that:
- Displays habit name, category, priority, and streak
- Provides "✓ Done" button to mark habit as completed
- Provides "Delete" button to remove the habit
- Handles optimistic UI updates and error handling

### `api.js`
Axios HTTP client configured with:
- Base URL from `VITE_API_URL` environment variable
- 5-second request timeout
- Request/response logging for debugging
- Error interceptors

## Styling

This project uses **Tailwind CSS** for styling:
- Utility-first CSS framework
- Configured in `tailwind.config.js`
- Compiled via PostCSS in `postcss.config.js`
- No extra CSS file needed — use Tailwind classes directly in JSX

Common Tailwind utilities used:
- `flex`, `gap`, `p-4` — Layout and spacing
- `bg-sky-300`, `bg-slate-200` — Colors
- `rounded-lg`, `shadow` — Borders and effects
- `hover:`, `active:` — Interactive states

## Environment Variables

### Development
```
VITE_API_URL=http://localhost:5000/api
```

### Production (Render)
```
VITE_API_URL=https://habit-backend.onrender.com/api
```

**Note**: Environment variables in Vite are read at build time. If you change `VITE_API_URL` after building, you must rebuild and redeploy.

## Development Workflow

1. Start the backend (see `Backend/README.md` or root README)
2. Start the frontend with `npm run dev`
3. Make changes to components — they'll hot-reload in the browser
4. Use the browser DevTools Console to see API logs and errors
5. Check the Network tab to debug API calls

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory. The build:
- Minifies and bundles JavaScript
- Optimizes images
- Applies Tailwind CSS purging (removes unused styles)
- Generates source maps (if enabled)

### Deploy to Render

1. Set `VITE_API_URL` to your backend URL in the Render Static Site environment
2. Set Build Command: `npm ci && npm run build`
3. Set Publish Directory: `dist`
4. Render will automatically build and serve the static files

## Debugging

### Console Logs
API client logs all requests and responses with `[api]` prefix:
```
[api] request post /checkins
[api] response error Network Error
```

Component logs use `[HabitCard]` prefix:
```
[HabitCard] handleCheck start <habitId>
[HabitCard] addCheckin response {...}
```

### Network Tab
- Open DevTools → Network tab
- Perform an action (e.g., click "Done")
- Watch requests to `http://localhost:5000/api/...` or deployed backend
- Check response status and body

### Common Issues

**"Could not mark as done" alert**
- Check backend is running and reachable
- Verify `VITE_API_URL` points to correct backend
- Check browser Network tab for failed requests
- Check backend logs for errors

**Stale data after deploy**
- Frontend is static; if you changed backend URL, rebuild frontend
- Hard-refresh browser (Ctrl+Shift+R on Windows)
- Clear browser cache if needed

## Code Style

- ESLint configuration in `eslint.config.js`
- Run `npm run lint` to check for style issues
- Use functional components and React hooks
- Keep components simple and single-responsibility

## Performance Notes

- React 19 with automatic batching for better rendering
- Vite's ES module imports for fast dev reload
- Tailwind's JIT (Just-in-Time) compilation
- Axios timeout (5s) prevents hung requests

## Future Enhancements

- Add user authentication UI
- Habit analytics and charts
- Advanced filtering and sorting
- Theme customization (dark mode)
- Offline support (PWA)

---

See the root README for full project documentation and deployment instructions.
