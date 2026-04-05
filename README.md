# Roadside History — PoC

A progressive web app (PWA) for discovering and documenting historical roadside markers.

## Running the PoC

This is a single-file HTML app. No build step required.

```bash
# Option 1: Python (simplest)
python3 -m http.server 8080
# Open http://localhost:8080

# Option 2: Node
npx serve .
# Open the URL shown

# Option 3: VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Open on Android: run the server on your computer, connect your phone to the same Wi-Fi,
and navigate to http://[YOUR-COMPUTER-IP]:8080. Tap "Add to Home Screen" to install as a PWA.

---

## Connecting Real Services (next step after PoC)

### 1. Supabase (database + auth)

1. Create a free account at https://supabase.com
2. Create a new project
3. Run the SQL below in the Supabase SQL editor to create the markers table
4. Copy your project URL and anon key from Settings > API
5. Add to this file:

```js
const SUPABASE_URL = 'https://xxxx.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

**Supabase SQL — markers table:**
```sql
create table markers (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subtitle text,
  body text,
  lat double precision not null,
  lng double precision not null,
  category text,
  tags text[],
  photos text[],
  condition text,
  status text default 'pending',
  submitted_by uuid references auth.users,
  date_submitted timestamptz default now(),
  historical_date text,
  sources text[],
  address text,
  visits integer default 0
);

-- Enable row-level security
alter table markers enable row level security;

-- Allow anyone to read approved markers
create policy "Public read approved" on markers for select using (status = 'approved');

-- Allow authenticated users to insert
create policy "Auth insert" on markers for insert with check (auth.uid() is not null);
```

### 2. Google Maps API

1. Go to https://console.cloud.google.com
2. Create a project → Enable Maps JavaScript API
3. Create an API key (restrict to your domain for production)
4. Replace the mock map section in index.html with:

```html
<div id="map-canvas"></div>
<script>
  function initMap() {
    const map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: { lat: 38.76, lng: -77.45 },
      zoom: 11,
      styles: [ /* dark map styles — see darkMapStyles.js */ ]
    });
    // Load markers from Supabase and add as markers
  }
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
```

### 3. Deploy (free options)

- **Netlify**: drag-and-drop the folder at https://netlify.com → instant HTTPS URL
- **Vercel**: `npx vercel` in this folder
- **GitHub Pages**: push to a repo → Settings > Pages

---

## Current PoC Features

- [x] Mock map with positioned marker pins (color-coded by category)
- [x] Marker list / explore view with search and category filters
- [x] Full marker detail view with slide-in animation
- [x] Multi-step submission form with GPS location capture
- [x] Peer review queue (approve / reject / skip)
- [x] User profile with points and badges
- [x] Stub markers (undocumented) with community call-to-action
- [x] PWA manifest (installable on Android home screen)
- [x] Toast notifications
- [x] Responsive mobile-first design

## Missing (requires real backend)

- [ ] Real Google Maps with satellite/street view
- [ ] Persistent database (Supabase)
- [ ] User authentication
- [ ] Photo upload to cloud storage
- [ ] Background GPS proximity push notifications (requires native app for true background)
- [ ] Email notifications for review outcomes

---

## File Structure

```
roadside-history/
├── index.html        ← Complete app (single file for PoC)
├── manifest.json     ← PWA manifest
└── README.md         ← This file
```

When handing off to developers, this single-file PoC maps directly to:
- React components (one per screen/view)
- Supabase client calls (replacing the mock `markers` array)
- Google Maps SDK (replacing the mock map)
- Firebase Cloud Messaging (for push notifications)
