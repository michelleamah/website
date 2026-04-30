# michelle's portfolio ♡

a soft pastel personal site — built with plain html/css/js so it's easy to edit by hand.

## ✿ how to edit

| what you want to change | where to edit |
| --- | --- |
| your name, intro, taglines | `index.html` — top of the file |
| about me text & "currently" facts | `index.html` → `#about` section |
| schools | `index.html` → `#education` section |
| jobs / experience | `index.html` → `#experience` (duplicate `.t-item` blocks) |
| skills chips | `index.html` → `#skills` |
| social links (github, linkedin, ig…) | search the file for `YOUR-USERNAME` and replace |
| github projects auto-load | open `script.js`, set `GITHUB_USERNAME` |
| colors / fonts / spacing | `styles.css` — top of the file has all the colors |

### add your photo
replace the `<img src="...">` inside `.photo-frame` (in `index.html`) with your own image. drop the file in `/assets/` and use `src="assets/me.jpg"`.

### add background music
drop a file at `assets/music.mp3` — the music button in the top right will play it. (you can also change the path in `index.html` inside `<audio>`.)

### add your resume
drop a pdf at `assets/resume.pdf` — the download button will work automatically.

### add gifs / stickers
just `<img src="assets/your-gif.gif" />` anywhere in the html ♡

## ✿ light / dark mode
the toggle in the top right swaps the theme — your choice is remembered between visits.
both modes use a different pastel palette, edited at the top of `styles.css` (the `:root` and `[data-theme="dark"]` blocks).

## ✿ deploying to your domain

easiest options (all free, all support custom domains):

### option 1: netlify (drag & drop)
1. zip this folder
2. go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the zip in
3. in site settings → domain management → add your custom domain → follow their dns instructions

### option 2: vercel
1. push this folder to a github repo
2. go to [vercel.com](https://vercel.com), import the repo
3. add your domain in project settings → domains

### option 3: github pages
1. create a github repo, push these files
2. settings → pages → deploy from `main` branch
3. settings → custom domain → enter your domain + add a CNAME record at your registrar

once it's live, refresh dns (~5 min) and you're done ♡

## ✿ file structure
```
/
├── index.html      ← all the content
├── styles.css      ← all the styling + colors
├── script.js       ← theme toggle, music, github fetch
└── assets/         ← put images, gifs, music, resume.pdf here
```

made with ♡
