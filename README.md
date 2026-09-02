# HeriTej Pulse

A responsive heritage-events discovery dashboard built with React, Redux Toolkit, React Router, Tailwind CSS, and mock data.

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` to create a production build.

## Features

- Twenty mock heritage events with responsive cards, lazy-loaded images, bookmarking, and sharing.
- Combined search, city, category, price, status, language, and sorting filters. Choices are reflected in the `/events` query string.
- Event detail pages with organizer information, related events, free registration, and paid-event payment confirmation.
- Client-side registration validation and generated confirmation IDs.
- Admin review at `/admin/events`: search, status filtering, approval, and rejection with a required stored reason. Only approved events show on the public listing.

## State management

Redux Toolkit slices keep event records/statuses, filters, bookmarks, registrations, and admin state separate. UI-only state such as an open modal or form input remains local to its component.

## Performance choices

- Route-level code splitting with `React.lazy` and `Suspense`.
- `React.memo` for event cards and `useMemo` for public/admin filtered lists.
- Debounced public search and native lazy-loaded event images.

## Limitations

This is a mock frontend: registrations and moderation live only for the running browser session, and payment URLs are placeholders. Deploy the repository to Vercel or Netlify for a live link.
