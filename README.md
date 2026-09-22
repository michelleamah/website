# michelleamah.com

Personal portfolio — a single-page bento grid of stats, experience, education, and projects. Plain HTML, CSS, and JavaScript; no build step, no dependencies.

## Structure

```
index.html      all content: hero, stat tiles, experience, education, toolkit, projects, contact
styles.css      all styling (palette tokens at the top in :root; grid spans under "bento grid")
script.js       footer year + count-up animation for the stat tiles
assets/         profilepic.jpeg, Michelle-Mah-Resume.pdf
CNAME           custom domain for GitHub Pages
```

## Editing

- **Everything on the page** lives in `index.html`, one `<section class="card">` per block
- **Stat tiles**: the `data-count` / `data-prefix` / `data-suffix` attributes on `.num` drive the count-up
- **Colors and fonts**: `:root` variables at the top of `styles.css`
- **Resume**: replace `assets/Michelle-Mah-Resume.pdf`. Copy the file in Finder — pasting a PDF through a text editor corrupts it.

## Deploying

Push to `main`; GitHub Pages deploys automatically. The site sits behind Cloudflare, which caches `styles.css` and `script.js` aggressively — after editing either one, bump the `?v=` number on its `<link>`/`<script>` tag in `index.html` so browsers fetch the new file.
