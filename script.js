/* ════════════════════════════════════════════════
   ♡ portfolio interactions
   - theme toggle (saves to localStorage)
   - background music play/pause
   - github projects auto-fetch
   ════════════════════════════════════════════════ */

// ─── EDIT THIS ─── put your github username here so projects auto-load ♡
const GITHUB_USERNAME = 'michelleamah';

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
  const icon = themeToggle.querySelector('i');
  icon.setAttribute('data-lucide', mode === 'dark' ? 'sun' : 'moon');
  if (window.lucide) lucide.createIcons();
}

// ───── music toggle ─────
const musicBtn = document.getElementById('music-toggle');
const audio = document.getElementById('bg-music');
audio.volume = 0.3;

musicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      musicBtn.classList.add('playing');
      musicBtn.querySelector('i').setAttribute('data-lucide', 'pause');
      lucide.createIcons();
    }).catch(() => {
      // no music file yet — give a gentle hint
      musicBtn.title = 'add a file at assets/music.mp3 to enable ♪';
    });
  } else {
    audio.pause();
    musicBtn.classList.remove('playing');
    musicBtn.querySelector('i').setAttribute('data-lucide', 'music-2');
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

    grid.innerHTML = filtered.map(repo => `
      <a class="card project-card" href="${repo.html_url}" target="_blank" rel="noopener">
        <h3>${escapeHtml(repo.name)}</h3>
        <p>${escapeHtml(repo.description || 'a little something i made ✿')}</p>
        <div class="project-meta">
          ${repo.language ? `<span>● ${escapeHtml(repo.language)}</span>` : ''}
          <span>★ ${repo.stargazers_count}</span>
          <span>⑂ ${repo.forks_count}</span>
        </div>
        <span class="project-link">view on github →</span>
      </a>
    `).join('');
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
