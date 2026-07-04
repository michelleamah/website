# Michelle Mah — Personal Portfolio

Personal portfolio site for [michelleamah.com](https://michelleamah.com), built with plain HTML, CSS, and JavaScript. No build tools or dependencies.

## File Structure

```
/
├── index.html      — all content and markup
├── styles.css      — all styling, theming, and layout
├── script.js       — theme toggle, music player, GitHub project fetch
└── assets/         — images, resume PDF, and audio file
```

## Editing Content

| Section | Location in index.html |
| --- | --- |
| Name, tagline, hero text | `#home` section |
| About me bio and currently card | `#about` section |
| Education | `#education` section |
| Work experience | `#experience` section |
| Skills | `#skills` section |
| Contact | `#contact` section |

**Colors and fonts** are defined as CSS variables at the top of `styles.css` (`:root` for light mode, `[data-theme="dark"]` for dark mode).

**GitHub projects** are auto-fetched from the GitHub API. The username and pinned repo list are configured at the top of `script.js`.

## Assets

- **Profile photo** — replace `assets/profilepic.jpeg`
- **Resume** — replace `assets/resume.pdf`
- **Background music** — replace `assets/music.mp3`

## Deployment

The site is deployed via GitHub Pages from the `main` branch with a custom domain configured via `CNAME`. Pushing to `main` triggers an automatic deploy.
