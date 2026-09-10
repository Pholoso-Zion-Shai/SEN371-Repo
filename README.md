# CampusHub

CampusHub is a full-stack campus booking and e-commerce platform. Students can browse campus resources, create validated bookings, view their booking history, browse products, and create authenticated orders. The frontend uses React, React Router, and Vite. The backend uses Node.js, Express, MongoDB, Mongoose, bcrypt, and JWT authentication.

## Run locally

Install Node.js 20+ (npm included), then run:

```bash
npm install
npm run dev
```

In a second terminal, start the API:

```bash
cd backend
npm install
npm start
```

Copy `backend/.env.example` to `backend/.env` and provide a reachable MongoDB connection string and a long random `JWT_SECRET`. The API reports a degraded health status until MongoDB is connected.

For a production check:

```bash
npm run build
```

## Routes

- `/` student dashboard
- `/resources` resource browser
- `/booking/:id` booking calendar and confirmation flow
- `/bookings` upcoming bookings
- `/store` campus store
- `/cart` shopping cart
- `/checkout` multi-step checkout
- `/profile` profile preferences
- `/admin` admin dashboard
- `/admin/resources`, `/admin/users`, `/admin/analytics` admin sections

## API endpoints

- `GET/POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/resources`, with admin-only create, update, and delete operations
- `GET /api/products`, with admin-only product creation
- Authenticated `GET/POST/PATCH /api/bookings`
- Authenticated `GET/POST /api/orders`
- `GET /api/health` reports API and database readiness

The frontend retains mock data as a development fallback when the API is unavailable, but replaces it with API data when the backend and database are connected.
