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
  'brainflix':            'a YouTube-like video streaming platform built during BrainStation',
  'website':              "my personal portfolio website — the one you're on right now",
  'penny':                'a personal finance tracker to manage and visualise spending',
  'launchpad':            'a job application tracker to stay on top of your search',
  'bookmate':             'a Tinder-style book matching app — swipe to find your next read (BrainStation capstone project)',
  'bandsite':             'a promotional website built for a fictional band (BrainStation)',
  'salesforce-dashboard': 'a Salesforce REST API integration — OAuth 2.0 auth, live CRM data, and a filterable dashboard UI',
};

// fallback languages for repos that are new/empty (no code pushed yet)
const PROJECT_LANGUAGES_FALLBACK = {
  'salesforce-dashboard': ['JavaScript', 'React', 'CSS'],
};

// only show these repos (in this order)
const PINNED_PROJECTS = ['website', 'bookmate', 'bandsite'];

// ────────────────────────────────────────────────

// init lucide icons
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  document.getElementById('year').textContent = new Date().getFullYear();
  initMusicCarousel();
  initPlayButtons();
  initPhotoStack();
  initBento();
});

// ───── record player carousel ─────
function initMusicCarousel() {
  const cards = document.querySelectorAll('.music-card');
  const dots  = document.querySelectorAll('.carousel-dots .dot');
  if (!cards.length) return;
  let current = 0;

  function goTo(n) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    stopPreview();
    current = ((n % cards.length) + cards.length) % cards.length;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
  }

  document.querySelector('.prev-btn').addEventListener('click', () => goTo(current - 1));
  document.querySelector('.next-btn').addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
}

// ───── song preview playback via iTunes API ─────
const previewCache = {};
let previewAudio = null;
let activePlayBtn = null;

function stopPreview() {
  if (previewAudio) previewAudio.pause();
  const btn = document.querySelector('.play-pause-btn');
  if (btn) btn.classList.remove('playing');
  activePlayBtn = null;
}

async function getPreviewUrl(trackId) {
  if (previewCache[trackId]) return previewCache[trackId];
  try {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${trackId}`);
    const data = await res.json();
    const url = data.results?.[0]?.previewUrl;
    if (url) previewCache[trackId] = url;
    return url || null;
  } catch { return null; }
}

function initPlayButtons() {
  const btn = document.querySelector('.play-pause-btn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const activeCard = document.querySelector('.music-card.active');
    if (!activeCard) return;
    const trackId = activeCard.dataset.track;

    if (activePlayBtn === btn && previewAudio && !previewAudio.paused) {
      stopPreview();
      return;
    }

    stopPreview();
    btn.classList.add('loading');
    const url = await getPreviewUrl(trackId);
    btn.classList.remove('loading');

    if (!url) { btn.title = 'preview not available'; return; }

    previewAudio = new Audio(url);
    previewAudio.volume = 0.75;
    previewAudio.play().catch(() => {});
    btn.classList.add('playing');
    activePlayBtn = btn;

    previewAudio.addEventListener('ended', () => {
      btn.classList.remove('playing');
      activePlayBtn = null;
    });
  });
}

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
    const filtered = PINNED_PROJECTS
      .map(name => repos.find(r => r.name.toLowerCase() === name.toLowerCase()))
      .filter(Boolean);

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
      const apiLangs = Object.keys(languageResults[i]);
      const langs = apiLangs.length
        ? apiLangs
        : (PROJECT_LANGUAGES_FALLBACK[repo.name.toLowerCase()] || []);
      const langHtml = langs.map(l => `<span class="lang-chip">${escapeHtml(l)}</span>`).join('');
      return `
        <div class="card project-card">
          <h3>${escapeHtml(repo.name)}</h3>
          <p>${escapeHtml(PROJECT_DESCRIPTIONS[repo.name.toLowerCase()] || repo.description || 'a little something i made ✿')}</p>
          ${langHtml ? `<div class="lang-chips">${langHtml}</div>` : ''}
        </div>
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

// ───── bento box interactions ─────

const SECTION_CONTENT = {
  about: `
    <div class="modal-header">
      <span class="modal-emoji">👋</span>
      <h2>about me</h2>
    </div>
    <div class="card about-card">
      <p>Hi, I'm <b>Michelle</b>! 👋</p>
      <p>A tech enthusiast with a business mindset — I graduated from <b>Queen's University</b> with a degree in Commerce, and I'm currently studying at <b>Carnegie Mellon</b> for my M.S. in Software Management.</p>
      <p>I'm passionate about the intersection of technology and business — most recently as a <b>Solutions Engineer</b>, translating complex product capabilities into real customer value. Now at <b>CMU</b> pursuing my M.S. in Software Management, I'm increasingly drawn to <b>product</b> — defining what gets built, for whom, and why.</p>
      <p>When I'm not working, you'll find me hunting down the next great restaurant on Beli, experimenting in the kitchen, or soaking up the sun ☀️</p>
      <p>✉️ <a href="mailto:michelleannabelmah@gmail.com">michelleannabelmah@gmail.com</a> — let's connect!</p>
    </div>
  `,
  currently: `
    <div class="modal-header">
      <span class="modal-emoji">📍</span>
      <h2>currently</h2>
    </div>
    <div class="card facts">
      <h3>right now</h3>
      <ul class="facts-list">
        <li><i data-lucide="graduation-cap"></i> MSSM student @ CMU</li>
        <li><i data-lucide="briefcase"></i> seeking summer 2027 internships</li>
        <li><i data-lucide="map-pin"></i> sf bay area, ca</li>
        <li><i data-lucide="search"></i> open to: solutions engineering, APM / PM, TPM, TAM</li>
        <li><i data-lucide="flag"></i> canadian 🍁 · tn visa eligible</li>
      </ul>
    </div>
  `,
  education: `
    <div class="modal-header">
      <span class="modal-emoji">🎓</span>
      <h2>education</h2>
    </div>
    <div class="timeline">
      <div class="t-item">
        <div class="t-dot"></div>
        <div class="card">
          <div class="t-head">
            <h3>Carnegie Mellon University</h3>
            <span class="t-date">aug 2026 – dec 2027</span>
          </div>
          <p class="t-sub">M.S. in Software Management · College of Engineering</p>
          <p>MS candidate focusing on the intersection of software systems and business strategy.</p>
          <p class="t-detail">coursework: architecture and programming principles, product management, foundations of software management, integrated thinking for innovation</p>
        </div>
      </div>
      <div class="t-item">
        <div class="t-dot"></div>
        <div class="card">
          <div class="t-head">
            <h3>BrainStation</h3>
            <span class="t-date">mar 2024 – jun 2024</span>
          </div>
          <p class="t-sub">Software Engineering Diploma</p>
          <p>admitted through the code to career program, receiving a scholarship valued at $16,000.</p>
          <p class="t-detail">coursework: html, css, sass, javascript, react, node.js, mysql</p>
        </div>
      </div>
      <div class="t-item">
        <div class="t-dot"></div>
        <div class="card">
          <div class="t-head">
            <h3>Queen's University</h3>
            <span class="t-date">sep 2019 – jun 2023</span>
          </div>
          <p class="t-sub">Bachelor of Commerce · Smith School of Business</p>
          <p>graduated with first class honours (highest distinction) — dean's honour list all years, queen's university excellence scholarship recipient (94% avg) · canada's premier business school (&lt;6% acceptance rate).</p>
          <p class="t-detail">coursework: data management &amp; analytics, fintech &amp; innovation, ai &amp; analytics, project management</p>
          <p class="t-detail">exchange semester at yonsei university, seoul 🇰🇷 · winter 2022</p>
        </div>
      </div>
    </div>
  `,
  experience: `
    <div class="modal-header">
      <span class="modal-emoji">💼</span>
      <h2>experience</h2>
    </div>
    <div class="timeline">
      <div class="t-item">
        <div class="t-dot"></div>
        <div class="card">
          <div class="t-head">
            <h3>Solutions Engineer <span class="muted">@ Organimi</span></h3>
            <span class="t-date">mar 2026 – aug 2026</span>
          </div>
          <ul>
            <li>Led technical discovery and solution design for enterprise, commercial, and SMB accounts, leveraging LogRocket to identify UI/UX friction points and architecting custom schemas to map unstructured data into structured organizational hierarchies</li>
            <li>Partnered with Product and Engineering to define requirements and launch a global search feature end-to-end, translating customer and market needs into a product roadmap and hosting a customer-facing webinar to drive adoption</li>
            <li>Diagnosed and resolved technical onboarding blockers by analyzing Zendesk support trends and session data, reducing manual troubleshooting time by 15% and ensuring high-integrity data flow for prospective clients</li>
            <li>Synthesized field insights from Zendesk and LogRocket into actionable product feedback, collaborating with Product teams to refine internal data flows and improve end-to-end customer onboarding</li>
          </ul>
          <div class="exp-tools">
            <span class="tool-chip">LogRocket</span>
            <span class="tool-chip">Zendesk</span>
            <span class="tool-chip">REST APIs</span>
            <span class="tool-chip">Webhooks</span>
            <span class="tool-chip">SSO / SFTP</span>
            <span class="tool-chip">Figma</span>
          </div>
        </div>
      </div>
      <div class="t-item">
        <div class="t-dot"></div>
        <div class="card">
          <div class="t-head">
            <h3>GTM, Team Lead <span class="muted">@ Salesforce</span></h3>
            <span class="t-date">jun 2024 – mar 2026</span>
          </div>
          <ul>
            <li>Partnered with Enterprise AEs to drive technical qualification for Pharma accounts, utilizing usage-signal analysis and data trends to identify $4.7M in expansion ACV</li>
            <li>Spearheaded data-driven health monitoring, identifying churn risks by analyzing customer engagement metrics across a complex, regulated enterprise portfolio</li>
            <li>Managed cross-functional workstreams between Sales and Product to resolve operational bottlenecks in complex, regulated data deployments</li>
            <li>Consistently ranked on the #1 GTM team in North America for performance</li>
          </ul>
          <div class="exp-tools">
            <span class="tool-chip">Salesforce CRM</span>
            <span class="tool-chip">SQL</span>
            <span class="tool-chip">Data Analytics</span>
            <span class="tool-chip">Technical Demos</span>
          </div>
        </div>
      </div>
      <div class="t-item">
        <div class="t-dot"></div>
        <div class="card">
          <div class="t-head">
            <h3>Product &amp; Operations <span class="muted">@ The Daebak Company</span></h3>
            <span class="t-date">jun 2023 – mar 2024</span>
          </div>
          <ul>
            <li>Coordinated cross-functional workflows between product, marketing, and operations teams to align on priorities and accelerate execution of key initiatives</li>
            <li>Supported data-driven product decisions by conducting SEO analysis and customer research, identifying conversion bottlenecks and contributing to a 10% improvement in website conversion rates</li>
          </ul>
          <div class="exp-tools">
            <span class="tool-chip">Google Analytics</span>
            <span class="tool-chip">SEO</span>
            <span class="tool-chip">Notion</span>
            <span class="tool-chip">Airtable</span>
          </div>
        </div>
      </div>
    </div>
  `,
  projects: `
    <div class="modal-header">
      <span class="modal-emoji">🛠️</span>
      <h2>projects</h2>
    </div>
    <p class="section-sub"><a href="https://github.com/michelleamah" target="_blank" rel="noopener">see all on github →</a></p>
    <div class="projects-grid">
      <div class="card project-card">
        <h3>bookmate</h3>
        <p>a Tinder-style book matching app — swipe to find your next read. built as my BrainStation capstone project with a full-stack architecture and live API integration.</p>
        <div class="lang-chips">
          <span class="lang-chip">React</span>
          <span class="lang-chip">Node.js</span>
          <span class="lang-chip">MySQL</span>
          <span class="lang-chip">Express</span>
        </div>
        <a href="https://github.com/michelleamah/bookmate" target="_blank" rel="noopener" class="project-link">view on github →</a>
      </div>
      <div class="card project-card">
        <h3>website</h3>
        <p>this portfolio — designed and built from scratch. no frameworks, no templates. just HTML, CSS, and a lot of iteration.</p>
        <div class="lang-chips">
          <span class="lang-chip">HTML</span>
          <span class="lang-chip">CSS</span>
          <span class="lang-chip">JavaScript</span>
        </div>
        <a href="https://github.com/michelleamah/website" target="_blank" rel="noopener" class="project-link">view on github →</a>
      </div>
      <div class="card project-card">
        <h3>bandsite</h3>
        <p>a responsive promotional website for a fictional band, pulling live show data from an external API and rendering it dynamically.</p>
        <div class="lang-chips">
          <span class="lang-chip">HTML</span>
          <span class="lang-chip">CSS</span>
          <span class="lang-chip">JavaScript</span>
        </div>
        <a href="https://github.com/michelleamah/bandsite" target="_blank" rel="noopener" class="project-link">view on github →</a>
      </div>
    </div>
  `,
  contact: `
    <div class="modal-header">
      <span class="modal-emoji">✉️</span>
      <h2>say hi</h2>
    </div>
    <p style="color: var(--muted); margin-bottom: 1.5rem;">i'd love to chat about roles in solutions engineering, product management, or anything at the intersection of technology and real user impact! :)</p>
    <div class="contact-buttons">
      <a href="mailto:michelleannabelmah@gmail.com" class="btn btn-primary">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        email me
      </a>
      <a href="https://www.linkedin.com/in/michelleamah/" target="_blank" rel="noopener" class="btn btn-ghost">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        linkedin
      </a>
      <a href="https://github.com/michelleamah" target="_blank" rel="noopener" class="btn btn-ghost">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        github
      </a>
    </div>
  `,
};

function initBento() {
  const overlay = document.getElementById('bentoOverlay');

  // close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCell();
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCell();
  });
}

let _lastPickedCell = null;

function openCell(cell) {
  const section = cell.dataset.section;
  const emojiEl = cell.querySelector('.cell-emoji');
  const emoji = emojiEl ? emojiEl.textContent : '';

  _lastPickedCell = cell;
  cell.classList.add('picked');

  animateChopsticksTo(cell, emoji, () => {
    cell.classList.remove('picked');
    _lastPickedCell = null;
    showBentoModal(section);
  });
}

function openSection(section) {
  showBentoModal(section);
}

function animateChopsticksTo(cell, emoji, callback) {
  const layer  = document.getElementById('chopLayer');
  const emojiEl = document.getElementById('chopEmoji');
  const chopA  = document.getElementById('chopA');
  const chopB  = document.getElementById('chopB');

  const rect = cell.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top  + rect.height / 2;

  layer.style.display = 'block';

  // snap chopsticks just above the cell with no transition first
  chopA.style.transition = 'none';
  chopB.style.transition = 'none';
  chopA.style.left = (cx - 12) + 'px';
  chopA.style.top  = (cy - 96) + 'px';
  chopB.style.left = (cx +  6) + 'px';
  chopB.style.top  = (cy - 96) + 'px';
  chopA.style.transform = 'rotate(-15deg)';
  chopB.style.transform = 'rotate(15deg)';

  // show emoji at cell center
  emojiEl.textContent = emoji;
  emojiEl.style.left = (cx - 14) + 'px';
  emojiEl.style.top  = (cy - 14) + 'px';
  emojiEl.style.opacity = '0';

  requestAnimationFrame(() => {
    // re-enable transitions
    chopA.style.transition = '';
    chopB.style.transition = '';

    // close chopsticks and float emoji
    setTimeout(() => {
      emojiEl.style.opacity = '1';
      chopA.style.transform = 'rotate(-4deg)';
      chopB.style.transform = 'rotate(4deg)';
    }, 60);

    // lift emoji upward
    setTimeout(() => {
      emojiEl.style.top = (cy - 58) + 'px';
    }, 200);

    // fade out and trigger callback
    setTimeout(() => {
      emojiEl.style.opacity = '0';
    }, 400);

    setTimeout(() => {
      layer.style.display = 'none';
      // reset chops
      chopA.style.transform = 'rotate(-15deg)';
      chopB.style.transform = 'rotate(15deg)';
      callback();
    }, 540);
  });
}

function showBentoModal(section) {
  const overlay = document.getElementById('bentoOverlay');
  const body    = document.getElementById('modalBody');

  body.innerHTML = SECTION_CONTENT[section] || '<p style="color:var(--muted)">coming soon…</p>';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // re-init lucide icons injected into modal
  if (window.lucide) lucide.createIcons();
}

function closeCell() {
  const overlay = document.getElementById('bentoOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ───── outtakes stacked card flip ─────
function initPhotoStack() {
  const stack = document.querySelector('.photo-stack');
  if (!stack) return;
  let cards = Array.from(stack.querySelectorAll('.photo-card'));
  if (!cards.length) return;
  let busy = false;

  function restack() {
    cards.forEach((c, i) => c.style.zIndex = i + 1);
  }
  restack();

  stack.addEventListener('click', () => {
    if (busy) return;
    busy = true;
    const top = cards[cards.length - 1];
    top.classList.add('flying');

    setTimeout(() => {
      top.style.transition = 'none';
      top.classList.remove('flying');
      cards = [top, ...cards.slice(0, -1)];
      restack();
      requestAnimationFrame(() => requestAnimationFrame(() => {
        top.style.transition = '';
        busy = false;
      }));
    }, 480);
  });
}
