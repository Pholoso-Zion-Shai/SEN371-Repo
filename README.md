# Campusly

A frontend-only Campus Booking & E-Commerce Platform built with React, React Router, and Vite. It uses local mock data and in-memory state for the booking and store flows.

## Run locally

Install Node.js 20+ (npm included), then run:

```bash
npm install
npm run dev
```

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

The app is intentionally backend-free. Replace the exports in `src/api/mockData.js` and the context/state layer with API calls when the backend is ready.
