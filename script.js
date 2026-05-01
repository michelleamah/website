/* ════════════════════════════════════════════════
   ♡ portfolio interactions
   - theme toggle (saves to localStorage)
   - background music play/pause
   - github projects auto-fetch
   ════════════════════════════════════════════════ */

// ─── EDIT THIS ─── put your github username here so projects auto-load ♡
const GITHUB_USERNAME = 'michelleamah';

// real descriptions for each repo (keyed by repo name, case-insensitive)
const PROJECT_DESCRIPTIONS = {
  'brainflix':      'a YouTube-like video streaming platform built during BrainStation ✿',
  'website':        'my personal portfolio website — the one you\'re on right now ♡',
  'finance-tracker':'a personal finance tracker to manage and visualise spending',
  'job-tracker':    'a job application tracker to stay on top of your search',
  'bookmate':       'a Tinder-style book matching app — swipe to find your next read (BrainStation) ✿',
  'bandsite':       'a promotional website built for a fictional band (BrainStation)',
};

// how many projects to show (sorted by most recently updated)
const MAX_PROJECTS = 6;

// ────────────────────────────────────────────────

// init lucide icons
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  document.getElementById('year').textContent = new Date().getFullYear();
  loadGitHubProjects();
});

// ───── theme toggle ─────
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(mode) {
  root.dataset.theme = mode;
  const icon = themeToggle.querySelector('[data-lucide]');
  if (icon) icon.setAttribute('data-lucide', mode === 'dark' ? 'sun' : 'moon');
  if (window.lucide) lucide.createIcons();
}

// ───── music toggle ─────
const musicBtn = document.getElementById('music-toggle');
const audio = document.getElementById('bg-music');
const songLabel = document.getElementById('song-label');
audio.volume = 0.3;

musicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      musicBtn.classList.add('playing');
      const icon = musicBtn.querySelector('[data-lucide]');
      if (icon) icon.setAttribute('data-lucide', 'pause');
      songLabel.classList.add('visible');
      lucide.createIcons();
    }).catch(() => {
      musicBtn.title = 'add a file at assets/music.mp3 to enable ♪';
    });
  } else {
    audio.pause();
    musicBtn.classList.remove('playing');
    const icon = musicBtn.querySelector('[data-lucide]');
    if (icon) icon.setAttribute('data-lucide', 'music-2');
    songLabel.classList.remove('visible');
    lucide.createIcons();
  }
});

// ───── github projects ─────
async function loadGitHubProjects() {
  const grid = document.getElementById('projects-grid');
  if (GITHUB_USERNAME === 'YOUR-USERNAME') {
    grid.innerHTML = `
      <div class="card placeholder">
        ✿ set <code>GITHUB_USERNAME</code> in <b>script.js</b> to auto-load your repos ♡
      </div>`;
    return;
  }
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!res.ok) throw new Error('github api');
    const repos = await res.json();
    const filtered = repos
      .filter(r => !r.fork && !r.archived)
      .slice(0, MAX_PROJECTS);

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="card placeholder">no public repos yet ♡</div>`;
      return;
    }

    // fetch all languages for each repo in parallel
    const languageResults = await Promise.all(
      filtered.map(repo =>
        fetch(repo.languages_url)
          .then(r => r.ok ? r.json() : {})
          .catch(() => ({}))
      )
    );

    grid.innerHTML = filtered.map((repo, i) => {
      const langs = Object.keys(languageResults[i]);
      const langHtml = langs.length
        ? langs.map(l => `<span class="lang-chip">${escapeHtml(l)}</span>`).join('')
        : '';
      return `
        <a class="card project-card" href="${repo.html_url}" target="_blank" rel="noopener">
          <h3>${escapeHtml(repo.name)}</h3>
          <p>${escapeHtml(PROJECT_DESCRIPTIONS[repo.name.toLowerCase()] || repo.description || 'a little something i made ✿')}</p>
          ${langHtml ? `<div class="lang-chips">${langHtml}</div>` : ''}
          <span class="project-link">view on github →</span>
        </a>
      `;
    }).join('');
  } catch (e) {
    grid.innerHTML = `
      <div class="card placeholder">
        couldn't load github projects right now ♡ <br/>
        <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">visit github →</a>
      </div>`;
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[s]);
}
