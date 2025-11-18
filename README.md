# Habit Tracker

A full-stack web application to help you build and track daily habits. Create habits, mark them as done each day, and watch your streak grow.

## Features

- **Create Habits**: Add new habits with name, category, and priority level.
- **Daily Check-in**: Mark habits as completed each day.
- **Streak Tracking**: See how many consecutive days you've completed each habit.
- **Habit Management**: Delete habits and their associated check-ins.
- **Responsive Design**: Works on desktop and mobile (Tailwind CSS).

## Project Structure

```
HabitTracker/
├── Backend/              # Node.js + Express + MongoDB
│   ├── config/
│   │   └── db.js        # MongoDB connection
│   ├── controllers/      # Request handlers
│   ├── models/          # MongoDB schemas (User, Habit, Checkin)
│   ├── routes/          # API endpoints
│   ├── server.js        # Express server entry point
│   └── package.json
│
├── frontend/            # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/  # React components (HabitCard, etc.)
│   │   ├── api.js       # Axios API client
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # React entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md            # This file
```

## Technology Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React 19, Vite, Tailwind CSS, Axios
- **Deployment**: Render (backend + frontend)

## Local Development

### Prerequisites

- Node.js 16+ and npm
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `Backend/` with:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/habitdb
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm run dev
   ```
   
   The backend will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `frontend/` with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173`.

5. Open http://localhost:5173 in your browser.

## API Endpoints

All endpoints are prefixed with `/api`.

### Habits
- `GET /habits/:userId` — Get all habits for a user
- `POST /habits` — Create a new habit
- `DELETE /habits/:id` — Delete a habit

### Check-ins
- `POST /checkins` — Mark a habit as done today
- `GET /checkins/streak/:habitId` — Get the current streak for a habit

### Users (if extended)
- `POST /users` — Create a new user

## Deployment to Render

See [Deployment Guide](#deployment-to-render) below for detailed step-by-step instructions.

### Quick Deploy Summary

1. Push your code to GitHub.
2. Create a Web Service on Render for the backend (root dir: `Backend`).
3. Create a Static Site on Render for the frontend (root dir: `frontend`).
4. Configure environment variables:
   - Backend: `MONGO_URI`, `FRONTEND_URL`
   - Frontend: `VITE_API_URL`
5. Deploy and test.

## Deployment Guide

### Prerequisites

- GitHub account with your repo pushed
- Render account (https://render.com)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

### Step 1: Prepare MongoDB

1. Create a free MongoDB Atlas cluster:
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up or log in
   - Create a new cluster (free tier available)

2. Create a database user:
   - Go to "Database Access" → "Add New User"
   - Set username and password
   - Click "Create User"

3. Get your connection string:
   - Go to "Database" → "Connect" → "Drivers"
   - Copy the connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/habitdb`
   - Replace `<username>`, `<password>`, and `habitdb` as needed

4. Whitelist IPs (for testing, allow 0.0.0.0/0):
   - Go to "Network Access" → "Add IP Address"
   - Add 0.0.0.0/0 (allow all IPs for development)
   - For production, restrict to Render's IP range

### Step 2: Deploy Backend

1. Sign in to Render (https://render.com)

2. Click "New" → "Web Service"

3. Connect your GitHub repository

4. Fill in the deployment form:
   - **Name**: `habit-backend` (or your choice)
   - **Environment**: Node
   - **Branch**: main
   - **Root Directory**: `Backend`
   - **Build Command**: `npm ci`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (for testing)

5. Add Environment Variables:
   - `MONGO_URI` = `mongodb+srv://<username>:<password>@cluster.mongodb.net/habitdb`
   - `FRONTEND_URL` = (you'll get the frontend URL after deploying frontend; update this later)

6. Click "Create Web Service"

7. Wait for deployment to complete. Note the service URL (e.g., `https://habit-backend.onrender.com`)

### Step 3: Deploy Frontend

1. In Render, click "New" → "Static Site"

2. Connect the same GitHub repository

3. Fill in the deployment form:
   - **Name**: `habit-frontend` (or your choice)
   - **Branch**: main
   - **Root Directory**: `frontend`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variable:
   - `VITE_API_URL` = `https://habit-backend.onrender.com/api` (use the backend URL from Step 2)

5. Click "Create Static Site"

6. Wait for deployment. Note the static site URL (e.g., `https://habit-frontend.onrender.com`)

### Step 4: Update Backend CORS

1. Go back to your backend Web Service on Render

2. Edit the Environment Variable `FRONTEND_URL`:
   - Change value to the frontend URL from Step 3 (e.g., `https://habit-frontend.onrender.com`)

3. Trigger a manual redeploy (or wait for next deployment if auto-deploy is enabled)

### Step 5: Test Live Deployment

1. Open the frontend URL in your browser
2. Create a habit
3. Click "✓ Done" — should update streak and save to DB
4. Click "Delete" — should remove the habit
5. Check browser Network tab if requests fail; check Render logs for errors

## Troubleshooting

### Backend not reachable (net::ERR_INTERNET_DISCONNECTED)
- Ensure backend service is running on Render (check logs)
- Verify `MONGO_URI` is correct and MongoDB is accessible
- Check `FRONTEND_URL` matches your frontend domain

### CORS errors
- Ensure `FRONTEND_URL` env var on backend matches your frontend domain exactly (including https)
- Redeploy backend after updating `FRONTEND_URL`

### Frontend shows old API URL
- Frontend is a static site; build-time env vars are baked into the JS
- If you change `VITE_API_URL`, you must trigger a new frontend build/deploy on Render
- Do not change `VITE_API_URL` after frontend is deployed unless you redeploy

### Database connection errors
- Verify MongoDB URI in `MONGO_URI` env var
- Check IP whitelist on MongoDB Atlas (add 0.0.0.0/0 for testing)
- Ensure username/password are URL-encoded if they contain special characters

## Development Notes

- **API Client**: `frontend/src/api.js` uses Axios with a 5s timeout. Logs requests/responses in the browser console.
- **State Management**: Component state with React hooks (no Redux).
- **Styling**: Tailwind CSS utilities; see `frontend/tailwind.config.js`.
- **Database**: Mongoose schemas in `Backend/models/`.

## Future Enhancements

- User authentication and multi-user support
- Habit analytics and charts
- Notifications for missed habits
- Dark mode toggle
- Mobile app (React Native)
- Habit categories and filtering

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## Support

For issues or questions, open a GitHub issue or contact the project maintainers.

---

**Happy habit tracking! 🎯**
