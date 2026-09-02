# Architecture

## Folder structure

- `src/components`: reusable event, common, admin, and registration UI.
- `src/pages`: route-level listing, detail, registration, and admin screens.
- `src/redux/slices`: isolated Redux Toolkit domains.
- `src/data/mockEvent.js`: the 20-event mock data source.
- `src/utils`: filtering and form validation utilities.

## Components and routes

`/events` uses `EventFilters` and memoized `EventCard` components. `/events/:id` reads the chosen event from Redux and provides registration/payment actions and related events. `/register/:id` is restricted to upcoming free events. `/admin/events` is the moderation workspace.

## Store structure

- `events`: source event list and review status.
- `filters`: public list filter values and sort settings.
- `bookmarks`: bookmarked event IDs.
- `registrations`: submitted free-event registrations.
- `admin`: admin-specific metadata/logging.

## Filtering logic

`filterEvents` applies every selected predicate to the same event list; `sortEvents` then sorts the resulting list. Public pages first limit source events to `approved` status. The filters component debounces the search string and serializes selected values to the URL.

## Admin review flow

Pending records can be approved or rejected. Approval updates `events.status` to `approved`, making the event visible on the public list. Rejection requires a reason, which is stored on the event and shown in the admin table.

## Registration flow

The detail page routes only upcoming free events to the registration screen. The form validates required name, email, ten-digit mobile number, and at least one participant. On success it stores a confirmed registration in Redux and displays a generated confirmation ID.

## Why this approach

Redux holds data that must be shared between routes, while component state handles short-lived UI details. This prevents prop drilling, keeps transitions predictable, and makes the mocked data layer easy to replace with API calls later.
