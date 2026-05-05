/* =========================================================
 * bipul.in — Linux desktop + Android phone (vanilla JS)
 * ========================================================= */
(function () {
  'use strict';

  /* ---------------- Helpers ---------------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k === 'style' && typeof v === 'object') {
        // Object.assign on CSSStyleDeclaration drops custom props (--var) silently.
        // Use setProperty for --vars, direct assignment for camelCase / kebab-case.
        for (const [sk, sv] of Object.entries(v)) {
          if (sk.startsWith('--')) n.style.setProperty(sk, sv);
          else n.style[sk] = sv;
        }
      }
      else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) n.setAttribute(k, v);
    }
    for (const k of kids.flat()) {
      if (k == null || k === false) continue;
      n.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    }
    return n;
  };
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  /* =========================================================
  /* =========================================================
   * SVG ICON LIBRARY (Yaru / Material-style line icons)
   * ========================================================= */
  const ICONS = {
    /* App glyphs — clean filled icons that read well at small sizes */
    about:      `<path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-3.7 0-9 1.85-9 5.5V21h18v-1.25c0-3.65-5.3-5.5-9-5.5Z"/>`,
    career:     `<path d="M9.5 4h5A2.5 2.5 0 0 1 17 6.5V8h3.5A1.5 1.5 0 0 1 22 9.5v9A1.5 1.5 0 0 1 20.5 20h-17A1.5 1.5 0 0 1 2 18.5v-9A1.5 1.5 0 0 1 3.5 8H7V6.5A2.5 2.5 0 0 1 9.5 4Zm0 2a.5.5 0 0 0-.5.5V8h6V6.5a.5.5 0 0 0-.5-.5h-5Z"/>`,
    projects:   `<path d="M12 2 8.5 7v8h7V7L12 2Zm0 6.5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 12 8.5ZM8.5 12 5 17v3h3.5v-2L7 18.5l1.5-2v-2.5Zm7 0v2.5l1.5 2L15.5 18v2H19v-3l-3.5-5ZM10 17h4l-1 5h-2l-1-5Z"/>`,
    skills:     `<path d="M22.7 6.3 19.4 9.6l-3-3 3.3-3.3a5 5 0 0 0-6.4 6.5L4 19.1l1.9 1.9 9.3-9.3a5 5 0 0 0 6.5-6.4ZM5.5 18.6a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z"/>`,
    talks:      `<path d="M12 14.5a4 4 0 0 0 4-4V5.5a4 4 0 0 0-8 0v5a4 4 0 0 0 4 4Zm6.5-4a6.5 6.5 0 0 1-13 0H4a8 8 0 0 0 7 7.93V21h2v-2.57A8 8 0 0 0 20 10.5Z"/>`,
    adventures: `<path d="M14 4 8 14H4l6-10ZM14 4l8 16H10l-1.5-3 3-3 2 2L14 4ZM3 16l3 4H0l3-4Z"/>`,
    contact:    `<path d="M21.4 3.6a1 1 0 0 0-1.1-.2L3.4 10.4a1 1 0 0 0 .1 1.9l6.4 1.8 1.8 6.4a1 1 0 0 0 1.9.1l6.9-16.9a1 1 0 0 0-.1-1.1ZM12.7 17l-1-3.6 5.4-5.4-7.6 5L6.5 12 18 7.4Z"/>`,
    now:        `<g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5.6 9.6a9 9 0 0 1 12.8 0M2.6 6.6a13.2 13.2 0 0 1 18.8 0M8.5 12.6a4.5 4.5 0 0 1 7 0"/></g><circle cx="12" cy="17" r="2"/>`,
    /* Tray + util glyphs */
    role:       `<path d="M9.5 4h5A2.5 2.5 0 0 1 17 6.5V8h3.5A1.5 1.5 0 0 1 22 9.5v9A1.5 1.5 0 0 1 20.5 20h-17A1.5 1.5 0 0 1 2 18.5v-9A1.5 1.5 0 0 1 3.5 8H7V6.5A2.5 2.5 0 0 1 9.5 4Zm0 2a.5.5 0 0 0-.5.5V8h6V6.5a.5.5 0 0 0-.5-.5h-5Z"/>`,
    award:      `<path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4.6 3.7 5.6l-1.4 7.4a.6.6 0 0 0 .9.6L12 19.7l2.8 1.9a.6.6 0 0 0 .9-.6l-1.4-7.4A6 6 0 0 0 18 8a6 6 0 0 0-6-6Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/>`,
    edu:        `<path d="M12 3 1 8l11 5 9-4.1V15h2V8L12 3Zm-7 8.2v3.5l7 3.2 7-3.2v-3.5l-7 3.2-7-3.2Z"/>`,
    github:     `<path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.94 0-1.31.47-2.39 1.24-3.23-.13-.31-.54-1.54.12-3.21 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.67.25 2.9.12 3.21.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/>`,
    x:          `<path d="M18.244 2H21.5l-7.5 8.572L23 22h-6.5l-5.084-6.516L5.5 22H2.244l8.06-9.211L1 2h6.656l4.59 5.93L18.244 2zM17 20h1.6L7.1 4H5.4L17 20z"/>`,
    linkedin:   `<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.5 18v-8h-3v8h3ZM7 8.6a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM18.5 18v-4.6c0-2.4-1.3-3.5-3-3.5-1.4 0-2 .8-2.4 1.3V10h-3v8h3v-4.4c0-1.2.6-2 1.7-2 1 0 1.5.7 1.5 2V18h2.2Z"/>`,
    email:      `<path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.5l8 5 8-5V8H4Zm0 2.6V16h16v-5.4l-7.5 4.7a1 1 0 0 1-1 0L4 10.6Z"/>`,
    search:     `<path d="M10.5 2a8.5 8.5 0 0 1 6.7 13.7l5.1 5.1-1.4 1.4-5.1-5.1A8.5 8.5 0 1 1 10.5 2Zm0 2a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z"/>`,
  };
  const svg = (key, size = 22) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" aria-hidden="true">${ICONS[key] || ''}</svg>`;

  // Helper: render an app's icon as an HTML string (used when we need raw HTML
  // for the dock button which carries gradient bg via CSS already)
  const appIconHTML = (app, size = 22) => svg(app.ico, size);

  /* =========================================================
   * APPS
   * Each app has c1 + c2:
   *  - on Mobile (Android): only c1 is used as a solid circular background
   *  - on Desktop (Ubuntu): c1 \u2192 c2 is rendered as a gradient squircle
   * ========================================================= */
  const APPS = {
    about:      { title: 'About Me',   ico: 'about',      c1: '#7C5BC9', c2: '#5B3FAA', build: pageAbout },
    experience: { title: 'Career',     ico: 'career',     c1: '#3F8FE0', c2: '#1565C0', build: pageExperience },
    projects:   { title: 'Projects',   ico: 'projects',   c1: '#F2774B', c2: '#E95420', build: pageProjects },
    skills:     { title: 'Skills',     ico: 'skills',     c1: '#4FB870', c2: '#2E7D32', build: pageSkills },
    speaking:   { title: 'Talks',      ico: 'talks',      c1: '#F2A03B', c2: '#E07B0F', build: pageSpeaking },
    adventures: { title: 'Adventures', ico: 'adventures', c1: '#34BFC8', c2: '#00838F', build: pageAdventures },
    contact:    { title: 'Contact',    ico: 'contact',    c1: '#E16091', c2: '#B0306A', build: pageContact },
    now:        { title: 'Right Now',  ico: 'now',        c1: '#3FCC9D', c2: '#048864', build: pageNow },
  };

  const DOCK_APPS = ['about', 'projects', 'experience', 'contact'];

  /* =========================================================
   * PAGE BUILDERS (friendly, no code dumps)
   * ========================================================= */
  function pageAbout(host) {
    host.appendChild(el('section', { class: 'page__hero', html: `
      <div>
        <h1>Hi, I'm Bipul Raman 👋</h1>
        <p>I do Engineering at <strong>Microsoft</strong>, based in
        <strong>India</strong>. I build large-scale software that
        runs on the cloud — the kind of services that quietly power things
        millions of people use every day.</p>
      </div>
      <div class="page__hero__avatar"><div><img class="page__hero__avatar__img" src="assets/bipul.webp" alt="Bipul Raman" loading="lazy" decoding="async" onload="this.classList.add('is-loaded')" onerror="this.remove()"/><span>BR</span></div></div>
    ` }));

    host.appendChild(section('Quick facts',
      el('div', { class: 'chips' },
        chip('📍 India'),
        chip('💼 Microsoft'),
        chip('🛠️ 12+ years engineering'),
        chip('🌐 Cloud + AI'),
        chip('🎤 Speaker'),
        chip('🟢 Open to collaborate'),
      )));

    host.appendChild(section('What I love doing',
      el('div', { class: 'prose', html: `
        <p>I enjoy turning fuzzy, messy problems into <strong>simple, reliable
        systems</strong>. A lot of my work blends <strong>cloud infrastructure</strong>
        with <strong>AI</strong> to make products feel smarter and easier to use.</p>
        <p>Outside work I love <strong>music</strong>, <strong>high-altitude
        treks</strong>, and giving back to my school's alumni community. I'm
        also a guest speaker at universities — if your campus would like a
        talk, I'd be happy to chat.</p>
      `}),
    ));

    host.appendChild(section('In numbers',
      el('div', { class: 'stats' },
        stat('12+', 'Years building'),
        stat('85+', 'GitHub repos'),
        stat('1,100+', 'Commits / yr'),
        stat('5,364m', 'Highest trek'),
      )));

    host.appendChild(el('blockquote', { class: 'quote', html:
      `"My driving force is an unwavering passion for technology — a constant
       source of motivation in my daily endeavors."`
    }));
  }

  function pageExperience(host) {
    host.appendChild(el('section', { class: 'page__hero', html: `
      <div>
        <h1>Career & milestones 💼</h1>
        <p>A real timeline — schools, jobs, awards and a few proud
        moments — pulled straight from my own milestone log.</p>
      </div>
      <div class="page__hero__avatar"><div><img class="page__hero__avatar__img" src="assets/bipul.webp" alt="Bipul Raman" loading="lazy" decoding="async" onload="this.classList.add('is-loaded')" onerror="this.remove()"/><span>BR</span></div></div>
    ` }));

    // Real milestones from bipul.in/timeline (most recent first)
    const items = [
      { kind: 'role',  role: 'Engineering',                       org: 'Microsoft',                                 date: 'Present',
        desc: 'Designing and building hyper-scale cloud services with AI built in. Leading mission-critical programs from idea to launch.' },
      { kind: 'award', role: 'Beacon Award',                       org: 'Microsoft',                                 date: 'Oct 2023',
        desc: 'For building an OpenAI-powered recommendation engine.' },
      { kind: 'award', role: 'Beacon Award',                       org: 'Microsoft',                                 date: 'Mar 2022',
        desc: 'For building search capabilities on a global portal.' },
      { kind: 'role',  role: 'Joined Microsoft IDC',               org: 'Experiences & Devices, Microsoft India',    date: 'Jan 2021',
        desc: 'Internal move to Microsoft India Development Center — Experiences & Devices Engineering Group.' },
      { kind: 'award', role: 'Better Together Award',              org: 'Microsoft',                                 date: 'Aug 2020',
        desc: 'For leading and delivering a very complex project for a US GSIB bank.' },
      { kind: 'award', role: 'Star Consultant Award',              org: 'Microsoft',                                 date: 'Dec 2019',
        desc: 'For proactively mitigating several risks on a highly complex project during the COVID period.' },
      { kind: 'award', role: 'First Runner-Up · MW Garage Hackathon', org: 'Microsoft',                              date: 'Aug 2019',
        desc: 'Modern Work Garage Hackathon — built a cost-effective analytical solution.' },
      { kind: 'award', role: 'Best Consultant Award',              org: 'Microsoft',                                 date: 'Jun 2019',
        desc: 'Recognised as best-performing Consultant across multiple projects.' },
      { kind: 'award', role: 'Better Together Award',              org: 'Microsoft',                                 date: 'Jul 2018',
        desc: 'For leading a complex, high-risk digital transformation programme.' },
      { kind: 'award', role: 'Best Project Team Award',            org: 'Microsoft',                                 date: 'Jul 2018',
        desc: 'With the team, for delivering a mission-critical public-sector project.' },
      { kind: 'award', role: 'Super Rookie Award',                 org: 'Microsoft',                                 date: 'Jan 2018',
        desc: 'For high performance and several automation tools that boosted team efficiency right after joining.' },
      { kind: 'role',  role: 'Joined Microsoft',                   org: 'Microsoft',                                 date: 'Aug 2016',
        desc: '"From One Day to Day One" — joining Microsoft as a full-time employee. A dream come true.' },
      { kind: 'award', role: 'Mphasis Hackathon Winner',           org: 'Mphasis',                                   date: 'Nov 2014',
        desc: 'Built a chatbot to simplify job search over Facebook.' },
      { kind: 'award', role: 'Summit Award Winner',                org: 'Mphasis',                                   date: 'Sep 2013',
        desc: 'For impactful contribution to the project.' },
      { kind: 'role',  role: 'Software Engineer',                  org: 'Mphasis',                                   date: 'Jul 2013',
        desc: 'First job — joined Mphasis as a Software Engineer.' },
      { kind: 'edu',   role: 'Bachelor of Engineering',            org: 'Electrical & Electronics Engineering',      date: 'Mar 2013',
        desc: 'Graduated with a Bachelor\u2019s degree in Electrical & Electronics Engineering.' },
      { kind: 'edu',   role: 'Internship at HAL',                  org: 'Aircraft Research & Design Centre, HAL',    date: 'Sep 2012',
        desc: 'Three-month internship working on an automation project.' },
      { kind: 'award', role: 'Paper at National Conference',       org: 'National-level technical conference',       date: 'Mar 2012',
        desc: 'Second paper presented at a national-level technical conference.' },
      { kind: 'award', role: 'Paper at National Conference',       org: 'National-level technical conference',       date: 'Jan 2012',
        desc: 'First paper presented at a national-level technical conference.' },
      { kind: 'edu',   role: 'Industrial Training',                org: 'NTPC Badarpur',                             date: 'Jan 2011',
        desc: 'Industrial training at the National Thermal Power Corporation (NTPC) Badarpur.' },
      { kind: 'edu',   role: 'Schooling',                          org: 'Jawahar Navodaya Vidyalaya',                date: '2004 – 2008',
        desc: 'Selected through a competitive entrance test. Free residential education up to Class 12.' },
    ];

    const tl = el('div', { class: 'timeline' });
    for (const t of items) {
      tl.appendChild(el('div', { class: 'tl tl--' + t.kind },
        el('div', { class: 'tl__head' },
          el('span', { class: 'tl__kind tl__kind--' + t.kind, title: kindTitle(t.kind), 'aria-label': kindTitle(t.kind), html: svg(t.kind, 12) }),
          el('div', { class: 'tl__role' }, t.role),
          el('div', { class: 'tl__org'  }, '@ ' + t.org),
          el('div', { class: 'tl__date' }, t.date),
        ),
        el('div', { class: 'tl__desc' }, t.desc),
      ));
    }
    host.appendChild(section('Timeline', tl));

    host.appendChild(section('Beyond the day job', el('div', { class: 'cards' },
      el('div', { class: 'card' },
        el('div', { class: 'card__head' },
          el('div', { class: 'card__title' }, 'Founder & Leader'),
          el('span', { class: 'card__lang' }, 'Community'),
        ),
        el('p', { class: 'card__desc' }, 'Navodaya Vidyalaya Alumni Association — leading a national alumni network, education programmes and student mentorship.'),
      ),
      el('div', { class: 'card' },
        el('div', { class: 'card__head' },
          el('div', { class: 'card__title' }, 'Guest Speaker'),
          el('span', { class: 'card__lang' }, 'Speaking'),
        ),
        el('p', { class: 'card__desc' }, 'Talks at universities & colleges on AI/ML, cloud, digital transformation and building a tech career.'),
      ),
    )));
  }

  function kindTitle(kind) {
    if (kind === 'award') return 'Award';
    if (kind === 'edu')   return 'Education';
    return 'Role';
  }

  function pageProjects(host) {
    host.appendChild(el('section', { class: 'page__hero', html: `
      <div>
        <h1>Things I've built 🚀</h1>
        <p>A few of my favourite open-source projects. Most of them solve a
        small problem I had myself — and they happen to be useful for
        others too.</p>
      </div>
      <div class="page__hero__avatar"><div><img class="page__hero__avatar__img" src="assets/bipul.webp" alt="Bipul Raman" loading="lazy" decoding="async" onload="this.classList.add('is-loaded')" onerror="this.remove()"/><span>BR</span></div></div>
    ` }));

    const projects = [
      { name: 'UI-Test-Agent', lang: 'TypeScript',
        desc: 'A VS Code extension that lets you test websites in plain English. Tell it what to check and it drives a real Chrome browser to verify everything for you.',
        url: 'https://github.com/BipulRaman/UI-Test-Agent', tag: 'Developer tools' },
      { name: 'AppNest', lang: 'Rust',
        desc: 'A tiny dashboard for developers to launch, monitor and manage all their local apps in one place. Just 2 MB. No heavy installer.',
        url: 'https://github.com/BipulRaman/AppNest', tag: 'Productivity' },
      { name: 'LocalChat', lang: 'Rust',
        desc: 'A private team chat that lives entirely on your office or home WiFi. Channels, replies, calls, file sharing — and nothing ever leaves the network.',
        url: 'https://github.com/BipulRaman/LocalChat', tag: 'Communication' },
      { name: 'LANPics', lang: 'Web',
        desc: 'Drop your photos and videos into a folder, start the server, and the whole house can browse the album from any phone, tablet or TV.',
        url: 'https://github.com/BipulRaman/LANPics', tag: 'Home & family' },
      { name: 'CorrelationId', lang: 'C# / .NET',
        desc: 'A small library that helps developers track a single request as it travels through many services. Used by .NET teams to debug faster.',
        url: 'https://github.com/BipulRaman/CorrelationId', tag: 'Library' },
      { name: 'DemoMCP', lang: 'C# / .NET',
        desc: 'A clean reference example showing how to build a Model Context Protocol server in .NET — handy for anyone integrating with AI agents.',
        url: 'https://github.com/BipulRaman/DemoMCP', tag: 'AI / Agents' },
    ];
    const grid = el('div', { class: 'cards' });
    for (const p of projects) {
      grid.appendChild(el('a', { class: 'card', href: p.url, target: '_blank', rel: 'noopener' },
        el('div', { class: 'card__head' },
          el('div', { class: 'card__title' }, p.name),
          el('span', { class: 'card__lang' }, p.lang),
        ),
        el('p', { class: 'card__desc' }, p.desc),
        el('div', { class: 'card__foot' },
          el('span', {}, p.tag),
          el('span', {}, '↗ View on GitHub'),
        ),
      ));
    }
    host.appendChild(section('Featured work', grid));

    host.appendChild(section('More on GitHub', el('div', { class: 'btnrow' },
      el('a', { class: 'btn btn--primary', href: 'https://github.com/BipulRaman?tab=repositories', target: '_blank' }, '🐙 Browse all 85+ repos'),
    )));
  }

  function pageSkills(host) {
    host.appendChild(el('section', { class: 'page__hero', html: `
      <div>
        <h1>Skills & toolkit 🛠️</h1>
        <p>What I reach for when I sit down to build something. The list is
        long but here are the headlines.</p>
      </div>
      <div class="page__hero__avatar"><div><img class="page__hero__avatar__img" src="assets/bipul.webp" alt="Bipul Raman" loading="lazy" decoding="async" onload="this.classList.add('is-loaded')" onerror="this.remove()"/><span>BR</span></div></div>
    ` }));

    const skills = [
      { name: 'Cloud (Azure)',     pct: 92, lvl: 'Expert' },
      { name: 'C# / .NET',         pct: 95, lvl: 'Expert' },
      { name: 'TypeScript / JS',   pct: 88, lvl: 'Strong' },
      { name: 'System design',     pct: 90, lvl: 'Expert' },
      { name: 'AI / LLMs',         pct: 82, lvl: 'Strong' },
      { name: 'Rust',              pct: 70, lvl: 'Solid' },
      { name: 'Distributed sys',   pct: 90, lvl: 'Expert' },
      { name: 'Developer tooling', pct: 88, lvl: 'Strong' },
    ];
    const wrap = el('div', { class: 'skills' });
    for (const s of skills) {
      const fill = el('div', { class: 'skill__fill' });
      wrap.appendChild(el('div', { class: 'skill' },
        el('div', {}, s.name),
        el('div', { class: 'skill__bar' }, fill),
        el('div', { class: 'skill__lvl' }, s.lvl),
      ));
      requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = s.pct + '%'; }));
    }
    host.appendChild(section('Where I shine', wrap));

    host.appendChild(section('Areas I work in', el('div', { class: 'chips' },
      chip('☁️ Cloud architecture'),
      chip('🤖 AI & LLM apps'),
      chip('🔌 APIs & services'),
      chip('🚀 Performance'),
      chip('📦 NuGet libraries'),
      chip('🧪 Reliability'),
      chip('🔐 Security basics'),
      chip('🛠️ DX tooling'),
    )));
  }

  function pageSpeaking(host) {
    host.appendChild(el('section', { class: 'page__hero', html: `
      <div>
        <h1>Talks & teaching 🎤</h1>
        <p>I love sharing what I learn. Over the years I've given guest
        lectures at universities, colleges and schools across India.</p>
      </div>
      <div class="page__hero__avatar"><div><img class="page__hero__avatar__img" src="assets/bipul.webp" alt="Bipul Raman" loading="lazy" decoding="async" onload="this.classList.add('is-loaded')" onerror="this.remove()"/><span>BR</span></div></div>
    ` }));

    host.appendChild(section('Topics I cover', el('div', { class: 'topics' },
      topic('🤖', 'AI / Machine Learning', 'modern stacks, agents, prompts'),
      topic('☁️', 'Cloud Computing',       'Azure, scale, cost, design'),
      topic('🚀', 'Digital Transformation','practical, outcome-driven plays'),
      topic('🎯', 'Career Development',    'building a career that lasts'),
    )));

    host.appendChild(section('Social leadership',
      el('div', { class: 'prose', html: `
        <p>I'm the <strong>Founder & Leader</strong> of the
        <strong>Navodaya Vidyalaya Alumni Association</strong>. We work to:</p>
        <ul>
          <li>Strengthen the alumni community across India</li>
          <li>Run social impact programs in education</li>
          <li>Mentor and uplift students from under-served backgrounds</li>
          <li>Represent the alumni voice at national forums</li>
        </ul>`
      }),
    ));

    host.appendChild(section('Want me to speak?', el('div', { class: 'btnrow' },
      el('a', { class: 'btn btn--primary', href: 'mailto:hello@bipul.in' }, '✉️ Reach out'),
      el('a', { class: 'btn', href: 'https://www.linkedin.com/in/bipulraman', target: '_blank' }, '💼 Connect on LinkedIn'),
    )));
  }

  function pageAdventures(host) {
    host.appendChild(el('section', { class: 'page__hero', html: `
      <div>
        <h1>Beyond the keyboard 🏔️</h1>
        <p>I love the outdoors. Mountains, in particular, have a way of
        putting everything into perspective.</p>
      </div>
      <div class="page__hero__avatar"><div><img class="page__hero__avatar__img" src="assets/bipul.webp" alt="Bipul Raman" loading="lazy" decoding="async" onload="this.classList.add('is-loaded')" onerror="this.remove()"/><span>BR</span></div></div>
    ` }));

    host.appendChild(section('Highlights', el('div', { class: 'advs' },
      adv('🏔️', '6,476 m', 'Mera Peak',          'Nepal · 21,247 ft'),
      adv('🏕️', '5,364 m', 'Everest Base Camp',   'Nepal · 17,598 ft'),
      adv('🪂', '~4,000 m', 'Skydive',             'San Diego, USA'),
      adv('🎻', '∞',       'Music',               'Listening + playing'),
    )));

    host.appendChild(section('What I do for fun',
      el('div', { class: 'prose', html: `
        <p>I delight in a wide range of pursuits — listening to and playing
        <strong>musical instruments</strong>, exploring new tech, and
        contributing to social causes.</p>
        <p>My passion for travel takes me to <strong>towering heights</strong>:
        I've trekked at extreme altitudes in the Himalayas, including Mera
        Peak (6,476 m) and Mt. Everest Base Camp (5,364 m). I've also
        skydived in San Diego — and would happily do it again.</p>
      `}),
    ));
  }

  function pageContact(host) {
    host.appendChild(el('section', { class: 'page__hero', html: `
      <div>
        <h1>Let's talk 📨</h1>
        <p>Open to interesting projects, guest lectures, mentorship, and
        good conversations. Pick whichever channel feels easiest.</p>
      </div>
      <div class="page__hero__avatar"><div><img class="page__hero__avatar__img" src="assets/bipul.webp" alt="Bipul Raman" loading="lazy" decoding="async" onload="this.classList.add('is-loaded')" onerror="this.remove()"/><span>BR</span></div></div>
    ` }));

    host.appendChild(section('Find me online', el('div', { class: 'btnrow' },
      el('a', { class: 'btn btn--primary', href: 'https://github.com/BipulRaman', target: '_blank' }, '🐙 GitHub'),
      el('a', { class: 'btn', href: 'https://www.linkedin.com/in/bipulraman', target: '_blank' }, '💼 LinkedIn'),
      el('a', { class: 'btn', href: 'https://x.com/BipulRaman', target: '_blank' }, '𝕏 Twitter / X'),
      el('a', { class: 'btn', href: 'mailto:hello@bipul.in' }, '✉️ Email'),
    )));

    host.appendChild(section('Best for…', el('div', { class: 'prose', html: `
      <ul>
        <li><strong>GitHub</strong> — open-source collaboration & code</li>
        <li><strong>LinkedIn</strong> — professional intros & opportunities</li>
        <li><strong>X / Twitter</strong> — short questions & ideas</li>
        <li><strong>Email</strong> — speaking & longer enquiries</li>
      </ul>
    `})));
  }

  function pageNow(host) {
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    host.appendChild(el('section', { class: 'page__hero', html: `
      <div>
        <h1>What I'm up to right now 📡</h1>
        <p>A live snapshot of the things on my desk this month.</p>
      </div>
      <div class="page__hero__avatar"><div><img class="page__hero__avatar__img" src="assets/bipul.webp" alt="Bipul Raman" loading="lazy" decoding="async" onload="this.classList.add('is-loaded')" onerror="this.remove()"/><span>BR</span></div></div>
    ` }));

    host.appendChild(section('Currently', el('div', { class: 'prose', html: `
      <ul>
        <li>🏗️ Building <strong>AI-powered developer tools</strong></li>
        <li>🦀 Exploring <strong>Rust</strong> for ultra-light local apps</li>
        <li>🧪 Tinkering with <strong>AI agents</strong> and integrations</li>
        <li>🎤 Prepping a talk on <em>agentic developer tools</em></li>
        <li>📚 Reading papers on long-context language models</li>
        <li>🥾 Planning the next high-altitude trek</li>
      </ul>
      <p style="color:var(--text-dim);font-size:12px;margin-top:8px">Last updated: ${date}</p>
    `})));
  }

  /* ---------- small builder helpers ---------- */
  function section(title, ...children) {
    const s = el('section', { class: 'page__section' }, el('h2', {}, title));
    for (const c of children) s.appendChild(c);
    return s;
  }
  function chip(text) {
    return el('span', { class: 'chip' }, el('span', { class: 'chip__dot' }), text);
  }
  function stat(num, lbl) {
    return el('div', { class: 'stat' },
      el('div', { class: 'stat__num' }, num),
      el('div', { class: 'stat__lbl' }, lbl));
  }
  function adv(icn, alt, name, sub) {
    return el('div', { class: 'adv' },
      el('div', { class: 'adv__icn' }, icn),
      el('div', { class: 'adv__alt' }, alt),
      el('div', { class: 'adv__name' }, name),
      el('div', { class: 'adv__sub' }, sub));
  }
  function topic(icn, name, sub) {
    return el('div', { class: 'topic' },
      el('div', { class: 'topic__icn' }, icn),
      el('div', {},
        el('div', { style: 'font-weight:600' }, name),
        el('div', { style: 'font-size:11px;color:var(--text-mute)' }, sub)));
  }

  /* =========================================================
   * THEME
   * Site is hard-locked to a single dark theme — styles/main.css
   * defines all tokens directly on :root. No JS toggle needed.
   * ========================================================= */
  function toast(text) {
    document.querySelectorAll('.toast').forEach((t) => t.remove());
    const t = el('div', { class: 'toast' }, text);
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .25s'; }, 1200);
    setTimeout(() => t.remove(), 1600);
  }

  /* =========================================================
   * CLOCKS
   * ========================================================= */
  function fmtTime(d, withDate) {
    let h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const s = d.getSeconds().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (h === 0) h = 12;
    if (!withDate) return `${h}:${m}:${s} ${ampm}`;
    const wd = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
    const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
    return `${wd} ${mo} ${d.getDate()}\u2003\u2003${h}:${m}:${s} ${ampm}`;
  }
  function fmtDateLong(d) {
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  /* =========================================================
   * LINUX DESKTOP — window manager
   * ========================================================= */
  const lxState = {
    z: 10,
    open: new Map(), // appId -> { winEl, dockEl }
  };

  function buildLinux() {
    // Desktop icons + activities grid
    const icons = $('#lxIcons');
    const overview = $('#lxOverviewGrid');
    icons.innerHTML = ''; overview.innerHTML = '';
    for (const [id, app] of Object.entries(APPS)) {
      icons.appendChild(makeLxIcon(id, app));
      overview.appendChild(makeLxIcon(id, app, true));
    }

    // Dock
    const dock = $('#lxDock');
    dock.innerHTML = '';
    for (const id of DOCK_APPS) {
      const app = APPS[id];
      const b = el('button', {
        class: 'lx__dock__btn',
        'data-tip': app.title,
        title: app.title,
        'aria-label': app.title,
        style: { '--c1': app.c1, '--c2': app.c2 },
        onclick: (e) => openLxWindow(id, e),
        html: appIconHTML(app, 22),
      });
      b.dataset.app = id;
      dock.appendChild(b);
    }
    // Separator + "Show Applications" (Ubuntu launcher style)
    dock.appendChild(el('div', { class: 'lx__dock__sep' }));
    const showApps = el('button', {
      class: 'lx__dock__apps',
      id: 'lxShowApps',
      'aria-label': 'Show Applications',
      onclick: () => toggleOverview(),
    });
    const grid = el('span', { class: 'lx__dock__apps__grid' });
    for (let i = 0; i < 9; i++) grid.appendChild(el('span'));
    showApps.appendChild(grid);
    dock.appendChild(showApps);

    // Activities button
    $('#lxActivities').addEventListener('click', () => toggleOverview());
    // Click empty desktop / overview backdrop to close overview & deselect
    $('#lxOverview').addEventListener('click', (e) => {
      if (e.target === $('#lxOverview') || e.target.classList.contains('lx__overview__inner')) toggleOverview(false);
    });
    $('#lxDesktop').addEventListener('click', (e) => {
      if (e.target === $('#lxDesktop')) {
        $$('.lx__icon').forEach((i) => i.classList.remove('is-selected'));
      }
    });

    // Theme is fixed (single dark theme)

    // ---- System tray popover (GNOME-style social menu) ----
    const SOCIAL_LINKS = [
      { id: 'github',   title: 'GitHub',   url: 'https://github.com/BipulRaman',         color: '#24292E' },
      { id: 'x',        title: 'X',        url: 'https://x.com/BipulRaman',              color: '#000000' },
      { id: 'linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com/in/bipulraman', color: '#0A66C2' },
      { id: 'email',    title: 'Email',    url: 'mailto:hello@bipul.in',                 color: '#E95420' },
    ];

    const trayMenu = el('div', { class: 'lx__traymenu', id: 'lxTrayMenu', hidden: '' },
      el('div', { class: 'lx__traymenu__title' }, 'Find me on'),
      el('div', { class: 'lx__traymenu__grid' },
        ...SOCIAL_LINKS.map((s) => el('a', {
          class: 'lx__traymenu__tile',
          href: s.url,
          target: s.id === 'email' ? null : '_blank',
          rel: s.id === 'email' ? null : 'noopener noreferrer',
          'aria-label': s.title,
          style: { '--c': s.color },
          onclick: () => closeTrayMenu(),
        },
          el('span', { class: 'lx__traymenu__tile__icn', html: svg(s.id, 22) }),
          el('span', { class: 'lx__traymenu__tile__lbl' }, s.title),
        )),
      ),
    );
    $('.lx__panel').appendChild(trayMenu);

    const closeTrayMenu = () => trayMenu.setAttribute('hidden', '');
    const openTrayMenu  = () => { trayMenu.removeAttribute('hidden'); };
    const toggleTrayMenu = () => trayMenu.hasAttribute('hidden') ? openTrayMenu() : closeTrayMenu();

    // Make all tray buttons/icons open the popover
    $('#lxTray').addEventListener('click', (e) => {
      const t = e.target.closest('.lx__tray__btn, .lx__tray__icon');
      if (!t) return;
      e.stopPropagation();
      toggleTrayMenu();
    });
    document.addEventListener('click', (e) => {
      if (trayMenu.hasAttribute('hidden')) return;
      if (!trayMenu.contains(e.target) && !e.target.closest('#lxTray')) closeTrayMenu();
    });

    // Clock
    const tickClock = () => { $('#lxClock').textContent = fmtTime(new Date(), true); };
    tickClock();
    setInterval(tickClock, 1000);

    // Esc closes overview
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!$('#lxOverview').hasAttribute('hidden')) toggleOverview(false);
        if (!trayMenu.hasAttribute('hidden')) closeTrayMenu();
      }
    });
  }

  function makeLxIcon(id, app, isOverview) {
    const li = el(isOverview ? 'div' : 'li', {
      class: 'lx__icon',
      'data-app': id,
      style: { '--c1': app.c1, '--c2': app.c2 },
    },
      el('div', { class: 'lx__icon__img', html: svg(app.ico, 30) }),
      el('div', { class: 'lx__icon__lbl' }, app.title),
    );
    li.addEventListener('click', (e) => {
      $$('.lx__icon').forEach((i) => i.classList.remove('is-selected'));
      li.classList.add('is-selected');
      openLxWindow(id, e);
      if (isOverview) toggleOverview(false);
    });
    return li;
  }

  function toggleOverview(force) {
    const ov = $('#lxOverview');
    const open = force ?? ov.hasAttribute('hidden');
    if (open) ov.removeAttribute('hidden'); else ov.setAttribute('hidden', '');
  }

  function openLxWindow(id, sourceEvent) {
    const app = APPS[id]; if (!app) return;

    // Already open → focus + bring to front
    if (lxState.open.has(id)) {
      const { winEl } = lxState.open.get(id);
      winEl.classList.remove('is-min');
      focusWindow(winEl);
      return;
    }

    // Origin point (for nice scale-from-icon animation)
    const desktop = $('#lxDesktop');
    const dRect = desktop.getBoundingClientRect();
    let ox = 50, oy = 70;
    if (sourceEvent && sourceEvent.currentTarget) {
      const r = sourceEvent.currentTarget.getBoundingClientRect();
      ox = ((r.left + r.width / 2 - dRect.left) / dRect.width) * 100;
      oy = ((r.top + r.height / 2 - dRect.top) / dRect.height) * 100;
    }

    // Initial size — scale to viewport (~92% wide, ~92% tall) with sensible caps
    const offset = lxState.open.size * 28;
    const w = Math.max(720, Math.min(1500, Math.round(dRect.width  * 0.92)));
    const h = Math.max(560, Math.min(1000, Math.round(dRect.height * 0.92)));
    const left = Math.max(20, (dRect.width  - w) / 2 + offset);
    const top  = Math.max(10, (dRect.height - h) / 2 - 10 + offset);

    const winEl = el('article', {
      class: 'win',
      style: {
        left: left + 'px',
        top: top + 'px',
        width: w + 'px',
        height: h + 'px',
        '--ox': ox + '%',
        '--oy': oy + '%',
      },
    });

    // Window control glyphs — proper SVG, sit perfectly inside circular buttons
    const winIcon = {
      min:   `<svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true"><path fill="currentColor" d="M3 8.5h10v1H3z"/></svg>`,
      max:   `<svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.4" d="M3.7 3.7h8.6v8.6H3.7z"/></svg>`,
      rest:  `<svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.4" d="M5.7 5.7h6.6v6.6H5.7z M3.7 3.7h6.6v2 M3.7 3.7v6.6h2"/></svg>`,
      close: `<svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true"><path fill="currentColor" d="M12.3 4.4 11.6 3.7 8 7.3 4.4 3.7l-.7.7L7.3 8l-3.6 3.6.7.7L8 8.7l3.6 3.6.7-.7L8.7 8z"/></svg>`,
    };

    const minBtn   = el('button', { class: 'win__btn win__btn--min',   title: 'Minimize',  'aria-label': 'Minimize', html: winIcon.min });
    const maxBtn   = el('button', { class: 'win__btn win__btn--max',   title: 'Maximize',  'aria-label': 'Maximize', html: winIcon.max });
    const closeBtn = el('button', { class: 'win__btn win__btn--close', title: 'Close',     'aria-label': 'Close',    html: winIcon.close });

    const toggleMax = () => {
      winEl.classList.toggle('is-max');
      const maxed = winEl.classList.contains('is-max');
      maxBtn.innerHTML = maxed ? winIcon.rest : winIcon.max;
      maxBtn.title = maxed ? 'Restore' : 'Maximize';
      maxBtn.setAttribute('aria-label', maxBtn.title);
    };
    minBtn.addEventListener('click',   () => winEl.classList.add('is-min'));
    maxBtn.addEventListener('click',   toggleMax);
    closeBtn.addEventListener('click', () => closeLxWindow(id));

    const titleBar = el('header', { class: 'win__title' },
      el('div', { class: 'win__name' },
        el('span', { class: 'win__name__icon', style: { color: app.c1 }, html: svg(app.ico, 16) }),
        el('span', {}, app.title),
      ),
      el('div', { class: 'win__buttons' }, minBtn, maxBtn, closeBtn),
    );
    titleBar.addEventListener('dblclick', (e) => {
      if (e.target.closest('.win__btn')) return;
      toggleMax();
    });
    makeDraggable(winEl, titleBar);

    const body = el('div', { class: 'win__body' });
    const page = el('div', { class: 'page' });
    app.build(page);
    body.appendChild(page);

    winEl.appendChild(titleBar);
    winEl.appendChild(body);
    $('#lxWindows').appendChild(winEl);

    // Track + dock indicator
    let dockEl = $$('#lxDock .lx__dock__btn').find((b) => b.dataset.app === id);
    if (!dockEl) {
      dockEl = el('button', {
        class: 'lx__dock__btn is-running',
        'data-tip': app.title,
        title: app.title,
        'aria-label': app.title,
        style: { '--c1': app.c1, '--c2': app.c2 },
        onclick: () => openLxWindow(id),
        html: appIconHTML(app, 22),
      });
      dockEl.dataset.app = id;
      // Insert above the separator + show-apps button
      const sep = $('#lxDock .lx__dock__sep');
      $('#lxDock').insertBefore(dockEl, sep);
    } else {
      dockEl.classList.add('is-running');
    }
    lxState.open.set(id, { winEl, dockEl });

    focusWindow(winEl);
    winEl.addEventListener('mousedown', () => focusWindow(winEl));

    // Update URL hash so the page can be deep-linked / shared
    if (location.hash !== '#' + id) {
      history.replaceState(null, '', '#' + id);
    }
  }

  function focusWindow(winEl) {
    $$('.win').forEach((w) => w.classList.remove('is-active'));
    winEl.classList.add('is-active');
    winEl.style.zIndex = String(++lxState.z);
    // Highlight the matching dock entry
    const id = [...lxState.open.entries()].find(([, v]) => v.winEl === winEl)?.[0];
    $$('#lxDock .lx__dock__btn').forEach((b) => b.classList.remove('is-active'));
    if (id) {
      const dockEl = lxState.open.get(id)?.dockEl;
      if (dockEl) dockEl.classList.add('is-active');
    }
  }

  function closeLxWindow(id) {
    const entry = lxState.open.get(id); if (!entry) return;
    entry.winEl.style.transition = 'transform .18s ease, opacity .18s ease';
    entry.winEl.style.transform = 'scale(.85)';
    entry.winEl.style.opacity = '0';
    setTimeout(() => entry.winEl.remove(), 180);
    if (DOCK_APPS.includes(id)) {
      entry.dockEl.classList.remove('is-running');
      entry.dockEl.classList.remove('is-active');
    } else {
      entry.dockEl?.remove();
    }
    lxState.open.delete(id);

    // Sync URL hash: if no windows remain, clear it; otherwise reflect the
    // top-most still-open window so the address bar matches what's visible.
    if (location.hash === '#' + id) {
      const remaining = [...lxState.open.keys()];
      const next = remaining[remaining.length - 1];
      history.replaceState(null, '', next ? '#' + next : location.pathname);
    }
  }

  function makeDraggable(winEl, handle) {
    let sx = 0, sy = 0, ox = 0, oy = 0, dragging = false;
    handle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.win__btn')) return;
      if (winEl.classList.contains('is-max')) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      // Read the actual inline offsets (relative to .lx__windows / desktop area)
      ox = parseFloat(winEl.style.left) || winEl.offsetLeft;
      oy = parseFloat(winEl.style.top)  || winEl.offsetTop;
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const newLeft = ox + (e.clientX - sx);
      const newTop  = Math.max(0, oy + (e.clientY - sy));     // don't drag above the desktop area
      winEl.style.left = newLeft + 'px';
      winEl.style.top  = newTop  + 'px';
    });
    document.addEventListener('mouseup', () => {
      if (dragging) document.body.style.userSelect = '';
      dragging = false;
    });
  }

  /* =========================================================
   * ANDROID PHONE
   * ========================================================= */
  const andState = {
    recents: [], // [{id, time}]
  };

  function buildAndroid() {
    // Build app grid (all apps)
    const grid = $('#andAppgrid');
    grid.innerHTML = '';
    for (const [id, app] of Object.entries(APPS)) {
      const b = el('button', {
        class: 'and__app',
        onclick: (e) => openAndApp(id, e),
      },
        el('span', { class: 'and__app__icn', style: { '--c1': app.c1, '--c2': app.c2 }, html: svg(app.ico, 30) }),
        el('span', { class: 'and__app__lbl' }, app.title),
      );
      grid.appendChild(b);
    }

    // Build dock (4 favourite apps, no labels)
    const dock = $('#andDock');
    dock.innerHTML = '';
    for (const id of DOCK_APPS) {
      const app = APPS[id]; if (!app) continue;
      const b = el('button', {
        class: 'and__app',
        onclick: (e) => openAndApp(id, e),
        title: app.title,
        'aria-label': app.title,
      },
        el('span', { class: 'and__app__icn', style: { '--c1': app.c1, '--c2': app.c2 }, html: svg(app.ico, 30) }),
        el('span', { class: 'and__app__lbl' }, app.title),
      );
      dock.appendChild(b);
    }

    // Clocks (status bar + shade only — no big home clock anymore)
    const tickAnd = () => {
      const d = new Date();
      $('#andTime').textContent = fmtTime(d);
      $('#andShadeTime').textContent = fmtTime(d);
      const dateLong = fmtDateLong(d);
      $('#andShadeDate').textContent = dateLong;
    };
    tickAnd();
    setInterval(tickAnd, 1000);

    // App bar
    $('#andAppBack').addEventListener('click', closeAndApp);
    $('#andAppShare').addEventListener('click', shareAnd);

    // Tap status to open shade
    $('.and__status').addEventListener('click', () => toggleAndShade());

    // Quick actions
    $$('.and__qa').forEach((b) => b.addEventListener('click', () => doQuickAction(b.dataset.action)));
    $('#andShadeClose').addEventListener('click', () => toggleAndShade(false));
    // Tap the dim backdrop (anywhere outside the shade panel) to close it
    $('#andShade').addEventListener('click', (e) => {
      if (e.target === $('#andShade')) toggleAndShade(false);
    });

    // Search pill — opens universal search (apps + shortcuts)
    $('#andSearch').addEventListener('click', () => openAndSearch());
    $('#andSearchBack').addEventListener('click', () => closeAndSearch());
    $('#andSearchClear').addEventListener('click', () => {
      const i = $('#andSearchInput'); i.value = ''; i.focus(); renderAndSearch('');
    });
    $('#andSearchInput').addEventListener('input', (e) => renderAndSearch(e.target.value));
    $('#andSearchInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = $('#andSearchBody .and__sresult');
        if (first) first.click();
      }
    });

    // Gesture pill — swipe up = home (or close app/shade)
    let gestureY = null;
    const startGesture = (y) => { gestureY = y; };
    const moveGesture = (y) => {
      if (gestureY == null) return;
      const dy = gestureY - y;       // positive when swiping up
      if (dy > 60) {
        gestureY = null;
        if (!$('#andRecentsOverlay').hasAttribute('hidden')) $('#andRecentsOverlay').setAttribute('hidden', '');
        else if ($('#andAppview').classList.contains('is-open')) closeAndApp();
        else if ($('#andShade').classList.contains('is-open')) toggleAndShade(false);
      }
    };
    $('#and').addEventListener('touchstart', (e) => {
      // Top edge → shade ; bottom edge → gesture handle area
      if (e.touches[0].clientY < 60) gestureY = -e.touches[0].clientY; // negative marks shade-mode
      else if (e.touches[0].clientY > window.innerHeight - 80) startGesture(e.touches[0].clientY);
    }, { passive: true });
    $('#and').addEventListener('touchmove', (e) => {
      if (gestureY == null) return;
      if (gestureY < 0) {
        // shade mode (top swipe down)
        const startY = -gestureY;
        if (e.touches[0].clientY - startY > 40) { toggleAndShade(true); gestureY = null; }
      } else {
        moveGesture(e.touches[0].clientY);
      }
    }, { passive: true });
    $('#and').addEventListener('touchend', () => { gestureY = null; });

    // Esc closes things
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!$('#andSearchView').hasAttribute('hidden')) closeAndSearch();
        else if (!$('#andRecentsOverlay').hasAttribute('hidden')) $('#andRecentsOverlay').setAttribute('hidden', '');
        else if ($('#andAppview').classList.contains('is-open')) closeAndApp();
        else if ($('#andShade').classList.contains('is-open')) toggleAndShade(false);
      }
    });

    // Recents clear → wipe + close back to home
    $('#andRecentsClear').addEventListener('click', () => {
      andState.recents = [];
      renderAndRecents();
      $('#andRecentsOverlay').setAttribute('hidden', '');
    });
  }

  function openAndApp(id, sourceEvent) {
    const app = APPS[id]; if (!app) return;
    const view = $('#andAppview');
    const body = $('#andAppBody');
    const title = $('#andAppTitle');
    const bar = $('.and__appbar');

    // Origin for scale animation
    if (sourceEvent && sourceEvent.currentTarget) {
      const r = sourceEvent.currentTarget.getBoundingClientRect();
      const x = (r.left + r.width / 2) / window.innerWidth * 100;
      const y = (r.top + r.height / 2) / window.innerHeight * 100;
      view.style.setProperty('--ox', x + '%');
      view.style.setProperty('--oy', y + '%');
    }

    // Material You: tint the app view with the app's primary colours
    // (the appbar background stays neutral surface, but the body uses
    //  --app-c1 / --app-c2 to colour accents, hero, primary buttons, etc.)
    bar.style.setProperty('--app-c', `linear-gradient(90deg, ${app.c1}, ${app.c2})`);
    bar.style.background = '';
    view.style.setProperty('--app-c1', app.c1);
    view.style.setProperty('--app-c2', app.c2);

    body.innerHTML = '';
    title.textContent = app.title;
    const page = el('div', { class: 'page' });
    app.build(page);
    body.appendChild(page);

    view.classList.add('is-open');
    view.setAttribute('aria-hidden', 'false');

    // Track in recents (de-dupe, most recent first)
    andState.recents = [{ id, time: Date.now() }, ...andState.recents.filter((r) => r.id !== id)].slice(0, 6);

    // Update URL hash
    history.replaceState(null, '', '#' + id);
  }

  function closeAndApp() {
    const view = $('#andAppview');
    view.classList.remove('is-open');
    view.setAttribute('aria-hidden', 'true');
    setTimeout(() => { $('#andAppBody').innerHTML = ''; }, 250);
    history.replaceState(null, '', location.pathname);
  }

  function toggleAndShade(force) {
    const s = $('#andShade');
    const open = force ?? !s.classList.contains('is-open');
    s.classList.toggle('is-open', open);
    s.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function showAndRecents() {
    renderAndRecents();
    $('#andRecentsOverlay').removeAttribute('hidden');
  }

  /* ---------- Universal search (Pixel Launcher style) ---------- */
  // External shortcuts the user can launch from search.
  // Keywords let "gh", "code", "twitter", "mail" etc. all hit the right thing.
  const AND_SHORTCUTS = [
    { id: 'github',   title: 'GitHub',   sub: 'github.com/BipulRaman',         icon: 'github',   color: '#24292E', kw: ['gh','code','repo','open source'],
      run: () => window.open('https://github.com/BipulRaman', '_blank', 'noopener') },
    { id: 'x',        title: 'X',        sub: 'x.com/BipulRaman',              icon: 'x',        color: '#000000', kw: ['twitter','tweet','social'],
      run: () => window.open('https://x.com/BipulRaman', '_blank', 'noopener') },
    { id: 'linkedin', title: 'LinkedIn', sub: 'linkedin.com/in/bipulraman',    icon: 'linkedin', color: '#0A66C2', kw: ['profile','work','social'],
      run: () => window.open('https://www.linkedin.com/in/bipulraman', '_blank', 'noopener') },
    { id: 'email',    title: 'Email',    sub: 'hello@bipul.in',                icon: 'email',    color: '#E95420', kw: ['mail','contact','reach'],
      run: () => { window.location.href = 'mailto:hello@bipul.in'; } },
    { id: 'share',    title: 'Share this site', sub: 'Send bipul.in to a friend', icon: 'contact', color: '#7C5BC9', kw: ['link','copy','send'],
      run: () => shareAnd() },
  ];

  function openAndSearch() {
    const v = $('#andSearchView');
    v.removeAttribute('hidden');
    v.setAttribute('aria-hidden', 'false');
    const i = $('#andSearchInput');
    i.value = '';
    renderAndSearch('');
    // Slight delay so the keyboard opens reliably after the overlay paints
    setTimeout(() => i.focus(), 60);
  }
  function closeAndSearch() {
    const v = $('#andSearchView');
    v.setAttribute('hidden', '');
    v.setAttribute('aria-hidden', 'true');
    $('#andSearchInput').blur();
  }

  function renderAndSearch(rawQuery) {
    const q = (rawQuery || '').trim().toLowerCase();
    $('#andSearchClear').toggleAttribute('hidden', q.length === 0);
    const body = $('#andSearchBody');
    body.innerHTML = '';

    // Build pool: apps + shortcuts
    const appsPool = Object.entries(APPS).map(([id, app]) => ({
      kind: 'app', id, title: app.title, sub: 'Section', icon: app.ico,
      c1: app.c1, c2: app.c2, kw: [],
      run: () => { closeAndSearch(); openAndApp(id); },
    }));
    const shortPool = AND_SHORTCUTS.map((s) => ({
      kind: 'shortcut', id: s.id, title: s.title, sub: s.sub, icon: s.icon,
      color: s.color, kw: s.kw, run: () => { s.run(); closeAndSearch(); },
    }));

    // Empty query → suggestions: all apps + shortcuts
    let results;
    if (!q) {
      results = [...appsPool, ...shortPool];
      body.appendChild(renderSearchSection('Sections', appsPool));
      body.appendChild(renderSearchSection('Shortcuts', shortPool));
      return;
    }

    // Filter + rank
    const score = (item) => {
      const t = item.title.toLowerCase();
      if (t === q) return 100;
      if (t.startsWith(q)) return 80;
      if (t.includes(q)) return 60;
      if (item.kw.some((k) => k.includes(q) || q.includes(k))) return 40;
      if (item.sub && item.sub.toLowerCase().includes(q)) return 30;
      return 0;
    };
    results = [...appsPool, ...shortPool]
      .map((it) => ({ it, s: score(it) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.it);

    if (results.length === 0) {
      body.appendChild(el('div', { class: 'and__sempty' },
        el('div', { class: 'and__sempty__icn', html: svg('search', 28) }),
        el('div', { class: 'and__sempty__title' }, 'No matches'),
        el('div', { class: 'and__sempty__sub' }, `Nothing found for "${rawQuery}"`),
      ));
      return;
    }
    body.appendChild(renderSearchSection('Results', results));
  }

  function renderSearchSection(label, items) {
    const wrap = el('section', { class: 'and__ssection' },
      el('div', { class: 'and__ssection__lbl' }, label),
    );
    const list = el('div', { class: 'and__sresults' });
    for (const it of items) {
      const iconStyle = it.kind === 'app'
        ? { '--c1': it.c1, '--c2': it.c2 }
        : { '--c1': it.color, '--c2': it.color };
      list.appendChild(el('button', {
        class: 'and__sresult',
        type: 'button',
        onclick: () => it.run(),
      },
        el('span', { class: 'and__sresult__icn', style: iconStyle, html: svg(it.icon, 22) }),
        el('span', { class: 'and__sresult__txt' },
          el('span', { class: 'and__sresult__name' }, it.title),
          el('span', { class: 'and__sresult__sub' }, it.sub),
        ),
        el('span', { class: 'and__sresult__chev', html:
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 6l6 6-6 6V6z"/></svg>' }),
      ));
    }
    wrap.appendChild(list);
    return wrap;
  }

  function renderAndRecents() {
    const list = $('#andRecentsList');
    list.innerHTML = '';
    if (andState.recents.length === 0) {
      list.appendChild(el('div', {
        style: 'text-align:center;color:var(--text-dim);font-size:13px;padding:40px 0',
      }, 'No recent apps. Tap an app on the home screen to open it.'));
      return;
    }
    for (const r of andState.recents) {
      const app = APPS[r.id]; if (!app) continue;
      list.appendChild(el('div', {
        class: 'and__recents__card',
        onclick: () => {
          $('#andRecentsOverlay').setAttribute('hidden', '');
          openAndApp(r.id);
        },
      },
        el('div', { class: 'and__recents__icon', style: { '--c1': app.c1, '--c2': app.c2 }, html: svg(app.ico, 24) }),
        el('div', { class: 'and__recents__info' },
          el('div', { class: 'and__recents__name' }, app.title),
          el('div', { class: 'and__recents__sub' },  'Opened recently'),
        ),
        el('div', { class: 'and__recents__close', onclick: (e) => {
          e.stopPropagation();
          andState.recents = andState.recents.filter((x) => x.id !== r.id);
          renderAndRecents();
        }}, '×'),
      ));
    }
  }

  function doQuickAction(action) {
    if (action === 'github') return window.open('https://github.com/BipulRaman', '_blank');
    if (action === 'x') return window.open('https://x.com/BipulRaman', '_blank');
    if (action === 'linkedin') return window.open('https://www.linkedin.com/in/bipulraman', '_blank');
    if (action === 'email') return window.location.href = 'mailto:hello@bipul.in';
    if (action === 'share') return shareAnd();
  }

  async function shareAnd() {
    const url = location.href;
    const title = document.title;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else { await navigator.clipboard.writeText(url); toast('Link copied'); }
    } catch (_) {}
  }

  /* =========================================================
   * INIT
   * ========================================================= */
  function init() {
    buildLinux();
    buildAndroid();

    // Hash deep-linking — open the matching window/app on load AND when the
    // hash changes later (address bar edits, internal '#' links, back/forward).
    const routeFromHash = () => {
      const hash = location.hash.replace('#', '');
      if (!hash || !APPS[hash]) return;
      if (isMobile()) openAndApp(hash);
      else openLxWindow(hash);
    };
    setTimeout(routeFromHash, 100);
    window.addEventListener('hashchange', routeFromHash);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
