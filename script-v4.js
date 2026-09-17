const SECTIONS = {
  about: `
    <div class="modal-header"><span>👋</span><h2>about me</h2></div>
    <div class="about-hero">
      <div class="about-photo"><img src="assets/profilepic.jpeg" alt="michelle mah" onerror="this.parentElement.innerHTML='<span style=\\'font-size:2rem;font-weight:700;color:rgba(255,255,255,0.9);font-family:Quicksand,sans-serif;letter-spacing:.05em\\'>MM</span>';this.parentElement.style.background='linear-gradient(135deg,#c8890a,#92400e)'" /></div>
      <div class="about-info">
        <h3>michelle mah</h3>
        <p class="role">m.s. software management @ carnegie mellon</p>
        <p class="tag">solutions engineer · sf bay area · seeking summer 2027 internships</p>
        <div class="about-links">
          <a href="assets/Michelle-Mah-Resume.pdf" target="_blank" rel="noopener">resume ↓</a>
          <a href="https://www.linkedin.com/in/michelleamah/" target="_blank" rel="noopener">linkedin →</a>
          <a href="https://github.com/michelleamah" target="_blank" rel="noopener">github →</a>
        </div>
      </div>
    </div>
    <div class="about-bio">
      <p>A tech enthusiast with a business mindset — I graduated from <strong>Queen's University</strong> with a degree in Commerce, and I'm currently studying at <strong>Carnegie Mellon</strong> for my M.S. in Software Management.</p>
      <p>I'm passionate about the intersection of technology and business — most recently as a <strong>Solutions Engineer</strong>, translating complex product capabilities into real customer value. Now at CMU, I'm increasingly drawn to <strong>product</strong> — defining what gets built, for whom, and why.</p>
      <p>When I'm not working, you'll find me hunting down the next great restaurant on Beli, experimenting in the kitchen, or soaking up the sun ☀️</p>
    </div>`,

  education: `
    <div class="modal-header"><span>🎓</span><h2>education</h2></div>
    <div class="timeline">
      <div class="t-item"><div class="t-dot"></div><div class="t-card">
        <div class="t-head"><h3>Carnegie Mellon University</h3><span class="t-date">aug 2026 – dec 2027</span></div>
        <p class="t-role">M.S. in Software Management · College of Engineering</p>
        <div class="t-body"><p>MS candidate focusing on the intersection of software systems and business strategy.</p></div>
      </div></div>
      <div class="t-item"><div class="t-dot"></div><div class="t-card">
        <div class="t-head"><h3>BrainStation</h3><span class="t-date">mar 2024 – jun 2024</span></div>
        <p class="t-role">Software Engineering Diploma</p>
        <div class="t-body"><p>Admitted through the Code to Career program, receiving a scholarship valued at $16,000.</p></div>
      </div></div>
      <div class="t-item"><div class="t-dot"></div><div class="t-card">
        <div class="t-head"><h3>Queen's University</h3><span class="t-date">sep 2019 – jun 2023</span></div>
        <p class="t-role">Bachelor of Commerce · Smith School of Business</p>
        <div class="t-body"><p>Graduated with first class honours — Dean's Honour List all years. Queen's University Excellence Scholarship (94% avg). Admitted to the Smith School of Business with a 7% acceptance rate.</p><p>Exchange at Yonsei University, Seoul 🇰🇷 · winter 2022.</p></div>
      </div></div>
    </div>`,

  experience: `
    <div class="modal-header"><span>💼</span><h2>experience</h2></div>
    <div class="timeline">
      <div class="t-item"><div class="t-dot"></div><div class="t-card">
        <div class="t-head"><h3>Solutions Engineer <span style="font-weight:400;color:var(--muted)">@ Organimi</span></h3><span class="t-date">mar 2026 – aug 2026</span></div>
        <div class="t-body"><ul>
          <li>Led technical discovery and solution design for enterprise, commercial, and SMB accounts</li>
          <li>Partnered with Product and Engineering to launch a global search feature end-to-end</li>
          <li>Reduced manual troubleshooting time by 15% by diagnosing onboarding blockers via Zendesk trends</li>
        </ul></div>
        <div class="chips"><span class="chip">LogRocket</span><span class="chip">Zendesk</span><span class="chip">REST APIs</span><span class="chip">SSO / SFTP</span><span class="chip">Figma</span></div>
      </div></div>
      <div class="t-item"><div class="t-dot"></div><div class="t-card">
        <div class="t-head"><h3>GTM, Team Lead <span style="font-weight:400;color:var(--muted)">@ Salesforce</span></h3><span class="t-date">jun 2024 – mar 2026</span></div>
        <div class="t-body"><ul>
          <li>Partnered with Enterprise AEs to drive technical qualification, identifying $4.7M in expansion ACV</li>
          <li>Spearheaded data-driven health monitoring across a regulated pharma portfolio</li>
          <li>Consistently ranked on the #1 GTM team in North America for performance</li>
        </ul></div>
        <div class="chips"><span class="chip">Salesforce CRM</span><span class="chip">SQL</span><span class="chip">Data Analytics</span></div>
      </div></div>
      <div class="t-item"><div class="t-dot"></div><div class="t-card">
        <div class="t-head"><h3>Product &amp; Operations <span style="font-weight:400;color:var(--muted)">@ The Daebak Company</span></h3><span class="t-date">jun 2023 – mar 2024</span></div>
        <div class="t-body"><ul>
          <li>Coordinated cross-functional workflows between product, marketing, and operations</li>
          <li>Contributed to a 10% improvement in website conversion rates via SEO analysis</li>
        </ul></div>
        <div class="chips"><span class="chip">Google Analytics</span><span class="chip">SEO</span><span class="chip">Notion</span></div>
      </div></div>
    </div>`,

  projects: `
    <div class="modal-header"><span>🛠️</span><h2>projects</h2></div>
    <div class="proj-list">
      <div class="proj-card">
        <h3>bookmate</h3>
        <div class="lang-chips"><span class="chip">React</span><span class="chip">Node.js</span><span class="chip">MySQL</span><span class="chip">Express</span></div>
        <p>A Tinder-style book matching app — swipe to find your next read. BrainStation capstone with full-stack architecture and live API integration.</p>
        <a class="proj-link" href="https://github.com/michelleamah" target="_blank" rel="noopener">view on github →</a>
      </div>
      <div class="proj-card">
        <h3>website</h3>
        <div class="lang-chips"><span class="chip">HTML</span><span class="chip">CSS</span><span class="chip">JavaScript</span></div>
        <p>The one you're on right now!</p>
        <a class="proj-link" href="https://github.com/michelleamah" target="_blank" rel="noopener">view on github →</a>
      </div>
      <div class="proj-card">
        <h3>bandsite</h3>
        <div class="lang-chips"><span class="chip">HTML</span><span class="chip">CSS</span><span class="chip">JavaScript</span></div>
        <p>A responsive promotional site for a fictional band, pulling live show data from an external API.</p>
        <a class="proj-link" href="https://github.com/michelleamah" target="_blank" rel="noopener">view on github →</a>
      </div>
    </div>`,

  contact: `
    <div class="modal-header"><span>✉️</span><h2>contact</h2></div>
    <div class="contact-table">
      <div class="contact-row"><span class="contact-lbl">linkedin</span><a class="contact-link" href="https://www.linkedin.com/in/michelleamah/" target="_blank" rel="noopener">michelleamah →</a></div>
      <div class="contact-row"><span class="contact-lbl">github</span><a class="contact-link" href="https://github.com/michelleamah" target="_blank" rel="noopener">@michelleamah →</a></div>
      <div class="contact-row"><span class="contact-lbl">email</span><span class="contact-val">michelleannabelmah@gmail.com</span></div>
    </div>
    <div class="contact-cta">currently seeking summer 2027 internships ✦</div>
    <p class="contact-note">I'd love to chat about roles in solutions engineering, product management, or anything at the intersection of technology and real user impact!</p>`,
};

function openCell(cell, section, emoji) {
  cell.classList.add('picked');
  animateChops(cell, emoji, () => {
    cell.classList.remove('picked');
    showModal(section);
  });
}

function animateChops(cell, emoji, cb) {
  const layer  = document.getElementById('chopLayer');
  const stickA = document.getElementById('stickA');
  const stickB = document.getElementById('stickB');
  const float  = document.getElementById('chopFloat');
  const tray   = document.getElementById('chopTray');

  const trayRect = tray.getBoundingClientRect();
  const cellRect = cell.getBoundingClientRect();

  const sx = trayRect.left + trayRect.width  / 2;
  const sy = trayRect.top  + 20;
  const ex = cellRect.left + cellRect.width  / 2;
  const ey = cellRect.top  + cellRect.height / 2;

  layer.style.display = 'block';
  tray.classList.add('animating');

  stickA.style.transition = 'none';
  stickB.style.transition = 'none';
  stickA.style.left = (sx - 9) + 'px'; stickA.style.top = (sy - 90) + 'px';
  stickB.style.left = (sx + 3) + 'px'; stickB.style.top = (sy - 90) + 'px';
  stickA.style.transform = 'rotate(0deg)';
  stickB.style.transform = 'rotate(0deg)';
  float.textContent = emoji;
  float.style.left = (ex - 8) + 'px';
  float.style.top  = (ey + 16) + 'px';
  float.style.opacity = '0';

  requestAnimationFrame(() => {
    stickA.style.transition = 'left 0.38s ease, top 0.38s ease';
    stickB.style.transition = 'left 0.38s ease, top 0.38s ease';
    stickA.style.left = (ex - 9) + 'px'; stickA.style.top = (ey - 90) + 'px';
    stickB.style.left = (ex + 3) + 'px'; stickB.style.top = (ey - 90) + 'px';

    // Open /\ after fly lands
    setTimeout(() => {
      stickA.style.transition = 'left 0.38s ease, top 0.38s ease, transform 0.25s ease';
      stickB.style.transition = 'left 0.38s ease, top 0.38s ease, transform 0.25s ease';
      stickA.style.transform = 'rotate(28deg)';
      stickB.style.transform = 'rotate(-28deg)';
    }, 400);

    // Close ||
    setTimeout(() => {
      float.style.opacity = '1';
      stickA.style.transform = 'rotate(0deg)';
      stickB.style.transform = 'rotate(0deg)';
    }, 650);

    // Lift
    setTimeout(() => {
      stickA.style.top = (ey - 90 - 52) + 'px';
      stickB.style.top = (ey - 90 - 52) + 'px';
      float.style.top  = (ey + 16 - 52) + 'px';
    }, 830);

    // Fade
    setTimeout(() => { float.style.opacity = '0'; }, 960);

    // Done
    setTimeout(() => {
      layer.style.display = 'none';
      tray.classList.remove('animating');
      stickA.style.transform = 'rotate(0deg)';
      stickB.style.transform = 'rotate(0deg)';
      cb();
    }, 1100);
  });
}

function showModal(section) {
  document.getElementById('modalBody').innerHTML = SECTIONS[section] || '';
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('overlay')) closeModal();
});
document.getElementById('closeBtn').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.getElementById('year').textContent = new Date().getFullYear();
