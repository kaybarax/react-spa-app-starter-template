## Your app's views, here in this directory.

A note on state: component working state that should survive navigation/reloads lives in the
stores (`src/app/stores`). Server data — anything fetched from an API — should go through
TanStack Query instead; it handles loading/error states, caching, and refetching for you.
See `page-5-server-data-example.tsx` for the wired-up pattern. The app runs fully serverless;
TanStack Query is simply the blessed option for whenever a server comes into play.
