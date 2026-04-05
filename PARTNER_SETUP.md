# Roadside History — PoC Setup Guide
## For your partner

---

## Option A — Easiest: Open the hosted link (60 seconds)

1. On your Android phone, open **Chrome**
2. Go to the URL your partner shared with you
3. Tap the **three-dot menu** (⋮) in the top-right corner
4. Tap **"Add to Home screen"**
5. Tap **"Add"** on the confirmation prompt
6. The app now appears on your home screen like a native app — tap it to open

That's it. No app store, no download, no account needed.

---

## Option B — Run it locally on your computer first (then share to phone)

### What you need
- A computer (Mac, Windows, or Linux)
- Python 3 installed (most Macs and Linux machines have it already)
  - Check: open Terminal and type `python3 --version`
  - If needed, download from https://python.org

### Steps

**1. Download the files**
Download the `roadside-history` folder your partner shared (as a zip or folder).

**2. Open Terminal / Command Prompt**
- Mac: open Spotlight (Cmd+Space), type "Terminal", press Enter
- Windows: press Win+R, type "cmd", press Enter

**3. Navigate to the folder**
```
cd path/to/roadside-history
```
(Replace `path/to/` with wherever you saved the folder)

**4. Start the local server**
```
python3 -m http.server 8080
```
You should see: `Serving HTTP on 0.0.0.0 port 8080`

**5. Open on your computer**
Open Chrome and go to: `http://localhost:8080`

**6. Open on your phone (same Wi-Fi network required)**
- Find your computer's local IP address:
  - Mac: System Preferences → Network → Wi-Fi → shows IP like `192.168.1.42`
  - Windows: open Command Prompt, type `ipconfig`, look for `IPv4 Address`
- On your Android phone, open Chrome and go to: `http://192.168.1.42:8080`
  (use your actual IP address)
- Tap ⋮ → **"Add to Home screen"** → **"Add"**

---

## What you're looking at

This is a **proof of concept** of the Roadside History app. The data shown is sample markers from northern Virginia. None of the submissions or changes you make are saved — everything resets when you refresh.

**Try these things:**
- **Map tab** — tap any pin to see the marker detail
- **Explore tab** — use the theme chips and "More filters" to filter by type, era, people, and tags
- **Add tab** — fill out the submission form (nothing is actually saved)
- **Review tab** — approve or reject the sample pending submissions
- **Detail view** — tap any People or Tags pill to jump straight to a filtered list

---

## Known limitations of this PoC

- Map shows a "For development purposes only" watermark — this is expected with a demo API key
- Location / GPS features require you to grant location permission when prompted
- Submissions and changes are not saved between sessions
- Background GPS alerts (the "approaching a marker" notification) are not yet built

---

## Questions?

Contact: [your name / email]
