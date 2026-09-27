# Flow: install as an offline Mac app

## 1. Put it online once (Vercel)
In Terminal, inside this folder:

    npx vercel deploy --prod

Log in with your Vercel account when asked and accept the defaults.
It prints a URL like https://flow-xxxx.vercel.app

## 2. Install it
- Chrome: open the URL, then click the install icon at the right end of the address bar
  (or menu > Cast, save and share > Install page as app).
- Safari: open the URL, then File > Add to Dock.

Flow now has its own Dock icon and window. Open it once while online so it caches;
after that it runs with Wi-Fi off.

## Your data
- Saved automatically inside the app on this Mac.
- Settings (bottom left) > Export backup: keep that .json file somewhere safe.
- Clearing all site data for that URL in the browser deletes your tasks. The backup is your safety net.

## Updating the app later
Change files, bump SHELF in sw.js (flow-shell-v1 -> v2), redeploy.
The installed app picks it up the next time it opens while online. Your data is untouched.
