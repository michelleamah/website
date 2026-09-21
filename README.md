# michelleamah.com

Personal portfolio, styled as a bento box. Plain HTML, CSS, and JavaScript — no build step, no dependencies.

## Structure

```
index.html      bento grid: the five cells and their front-face text
styles.css      all styling (palette tokens at the top in :root)
script.js       modal content for each cell + the chopstick animation
assets/         profilepic.jpeg, Michelle-Mah-Resume.pdf
CNAME           custom domain for GitHub Pages
```

## Editing

- **Cell fronts** (labels, subtitles, proof points): `index.html`
- **Modal content** (about, education, experience, projects, contact): the `SECTIONS` object at the top of `script.js`
- **Colors and fonts**: `:root` variables at the top of `styles.css`
- **Resume**: replace `assets/Michelle-Mah-Resume.pdf`. Copy the file in Finder — pasting a PDF through a text editor corrupts it.

## Deploying

Push to `main`; GitHub Pages deploys automatically. The site sits behind Cloudflare, which caches `styles.css` and `script.js` aggressively — after editing either one, bump the `?v=` number on its `<link>`/`<script>` tag in `index.html` so browsers fetch the new file.
