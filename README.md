# Kuladeep Roy Ganugapenta — Portfolio

Personal portfolio website built with HTML, Tailwind CSS, and vanilla JavaScript.

## File Structure

```
portfolio/
├── index.html      ← Main content — edit this for text/content changes
├── style.css       ← All custom styles — edit this for design changes
├── main.js         ← All JavaScript — animations, interactions
├── images/         ← Add your project screenshots here
│   ├── ai-image-retrieval.png
│   ├── k12-glm.png
│   ├── gun-violence-map.png
│   └── soil-moisture.png
└── README.md
```

## How to Edit on GitHub

### Changing text content
1. Click `index.html`
2. Click the pencil icon (Edit)
3. Use Ctrl+F to find the section you want to edit
4. Make your changes
5. Click "Commit changes"

### Quick edit guide

| What to change | Where to find it in index.html |
|---|---|
| Your name | Search for `Kuladeep Roy` |
| About bio | Search for `01 — About` |
| DXC experience bullets | Search for `02 — Experience` |
| Project descriptions | Search for `03 — Projects` |
| Education GPA | Search for `04 — Education` |
| Skill percentages | Search for `data-pct=` and change the number |
| Email address | Search for `kuladeeproy1@gmail.com` |
| GitHub link | Search for `github.com/kdeepr` |
| LinkedIn link | Search for `linkedin.com/in` |

### Adding a project image
1. Click **Add file → Upload files**
2. Upload your image to the `images/` folder
3. In `index.html`, find the project and update:
   ```html
   <img src="images/your-image-name.png" alt="Your description" />
   ```

### Changing skill levels
Find the skill bar you want to change and update `data-pct`:
```html
<div class="sk-fill" data-pct="90"></div>
```
Change `90` to any number 0–100.

## Deploy on Vercel

1. Push this repo to GitHub
2. Go to vercel.com → Add New Project
3. Import this repository
4. Leave all settings as default → Deploy

Every time you commit changes to GitHub, Vercel automatically redeploys in ~30 seconds.

## Tech Stack
- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- Google Fonts (Inter)
