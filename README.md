# Posh Properties

A small property listings app. Browse a grid of high-end properties, search them, and open any listing to flick through its photos, floorplans and EPC graphs.

Built with React Router v7 (framework mode), React 19 and TypeScript. Styling is plain CSS modules on top of a small set of design tokens, no UI library.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

Other scripts:

```bash
npm run build    
npm start          
npm run typecheck  
npm run lint       
```

## What it does

- Grid of property cards that goes from 1 to 4 columns depending on screen width
- Search box that filters the listings. It's debounced (500ms) so it isn't hitting the loader on every keystroke
- Click a card to open the details page, with tabs for Photos, Floorplan and EPC (a tab only shows up if there's something to show)
- Gallery has prev/next buttons, thumbnails and left/right arrow key support
- Broken or missing images fall back to a "coming soon" placeholder
- Some floorplans are PDFs, so those show as a "PDF" tile with a link that opens the file in a new tab
- Bookmark icon on each card (local state only, nothing is saved)

## How it works

### Routes

There are two pages, both defined in `app/routes.ts` and wrapped in a shared layout (the header and page container):

- `/` is the property grid
- `/properties/:propertyId` is the details page for one property

### Loading data

Each route has a `loader` that fetches the property data on the server, so pages arrive with their data already in the HTML. The data comes from `/property-data.json` by default. To use a real API, set `PROPERTIES_API_URL` and the loaders will fetch from that instead.

Because the fetch happens on the server, you won't see it in the browser's Network tab. You'll only see the page request, plus `.data` requests when navigating between pages.

### Search

The search term lives in the URL as `?q=...`. The search box waits 500ms after you stop typing, then updates the URL, and the home loader filters the list to match. That means searches can be bookmarked or shared, survive a refresh, and work with the browser back button.

### Details page

The details page reads the property id from the URL. If there's no property with that id, it returns a 404 and shows the error page. The "Back" button is a normal link that takes you to the grid with your search still applied.

### Rendering

Pages are server-rendered. If you'd rather run it as a client-only SPA, set `ssr: false` in `react-router.config.ts` and turn the loaders into `clientLoader`s.

## Project structure

```
app/
  root.tsx                  # HTML shell, global CSS, error boundary
  routes.ts                 # route config
  routes/
    layout.tsx              # header + container, renders the child route
    home.tsx                # property grid, loader filters by ?q=
    property.tsx            # details page, loader looks up by :propertyId
  components/               # Header, Searchbox, PropertyCard, Details
  hooks/
    useDebounce.ts
  lib/
    properties.server.ts    # server-only data fetching and search
    images.ts               # image base URL + fallback image
  types/
    property.ts             # types for the API response
public/
  property-data.json        # default data source
```

Each component has its own `*.module.css` next to it.

## Known issues / things to tidy up

- A couple of properties have `null` for bathrooms or receptions, so the details page shows "null baths". Should hide those instead
- Bookmarks are local state per card, so they reset on refresh
- No tests yet