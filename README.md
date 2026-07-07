# Kuladeep Roy — Portfolio Site

A single-file portfolio (`index.html`). No frameworks, no build step, no dependencies. Edit the HTML, refresh the browser, done.

---

## Deploy to Vercel (5 minutes)

**Option A — GitHub (recommended, auto-updates on every push)**
1. Create a new GitHub repo, e.g. `portfolio` (public or private).
2. Upload `index.html` to the repo (drag-and-drop on github.com works).
3. Go to [vercel.com](https://vercel.com) → sign in with GitHub → **Add New → Project**.
4. Import the `portfolio` repo → leave all settings as default → **Deploy**.
5. Your site is live at `portfolio-yourname.vercel.app`. Every future push to GitHub redeploys automatically.

**Option B — Drag and drop (fastest, no Git)**
1. Go to [vercel.com/new](https://vercel.com/new).
2. Drag this folder onto the page. Done.

**Custom domain (optional):** Vercel dashboard → your project → Settings → Domains.

---

## How to edit

Everything lives in `index.html`. Search for `EDIT:` comments — they mark every spot you'll want to change:

| What | Where |
|---|---|
| Colors | The `:root { ... }` block at the top of the `<style>` tag — 8 variables control the whole theme |
| Name, role, summary | The `<header class="hero">` section |
| Headline numbers | The `.facts` block in the hero |
| Add/remove a job | Copy or delete a `<div class="job">` block in `#experience` |
| Add/remove a project | Copy or delete an `<article class="project">` block in `#projects` |
| Skills text | The `#skills` section |
| Medium link | The `#writing` section — replace `@YOUR-MEDIUM-USERNAME` with your Medium handle |

## Connecting Medium

1. Create your profile at [medium.com](https://medium.com) if you haven't.
2. Your profile URL looks like `https://medium.com/@kuladeeproy`.
3. In `index.html`, find the Writing section and replace `https://medium.com/@YOUR-MEDIUM-USERNAME` with your real URL.
4. As you publish articles, you can also add individual article links as cards — copy the `.writing-card` block for each one.

## Tips

- Keep bullet points on the site shorter than your resume — recruiters skim.
- When you land a new project, add it to the top of the Projects grid so the freshest work leads.
- After every edit, open `index.html` in your browser locally to check before pushing.
