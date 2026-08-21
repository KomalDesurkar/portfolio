/* ==========================================================================
   KOMAL DESURKAR — CINEMATIC DIGITAL EXPERIENCE SCRIPT
   Libraries: Lenis Smooth Scroll + GSAP ScrollTrigger + HTML5 Canvas Node Engine
   ========================================================================== */

// Always start at the very top on page load
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.clearScrollMemory();
    ScrollTrigger.refresh();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Force top before anything starts
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  // 1. Initialize Lenis Smooth Scroll Engine
  const lenis = initSmoothScroll();

  // 2. Custom Magnetic Dynamic Cursor & Spotlight
  initCursorAndSpotlight();

  // 2.5 Initialize Text Rotator
  initTextRotator();

  // 3. Cinematic Entrance Intro Sequence (GSAP)
  initCinematicIntro();

  // 4. Documentary Storytelling Scroll (GSAP ScrollTrigger)
  initDocumentaryScroll();

  // 5. Horizontal Pinned Projects Exhibits
  initHorizontalProjects();

  // 6. Interactive Skills Constellation Canvas
  initSkillsConstellation();

  // 7. Pinned Timeline Progress
  initPinnedTimeline();

  // 8. Achievements Counter Animation
  initAchievementCounters();

  // 9. Interactive Command Terminal (Contact)
  initInteractiveTerminal();

  // 10. Magnetic Button Hover Physics
  initMagneticButtons();

  // Final scroll reset after all ScrollTriggers are set up
  setTimeout(() => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.clearScrollMemory();
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, 100);
});

/* -------------------------------------------------------------------------- */
/* 1. Lenis Smooth Scroll Integration                                         */
/* -------------------------------------------------------------------------- */
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return null;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Synchronize GSAP ScrollTrigger with Lenis
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);
  }

  return lenis;
}

/* -------------------------------------------------------------------------- */
/* 2. Custom Magnetic Liquid Cursor & Ambient Spotlight                       */
/* -------------------------------------------------------------------------- */
function initCursorAndSpotlight() {
  const dot = document.querySelector('.custom-cursor-dot');
  const follower = document.querySelector('.custom-cursor-follower');
  const spotlight = document.getElementById('ambient-spotlight');

  if (!dot || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    if (spotlight) {
      spotlight.style.background = `radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.06), transparent 80%)`;
    }
  });

  function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state triggers
  const hoverables = document.querySelectorAll('a, button, .project-exhibit, .achieve-card, .cmd-shortcut-tag, .constellation-container');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* -------------------------------------------------------------------------- */
/* 3. Cinematic Landing Intro Sequence                                        */
/* -------------------------------------------------------------------------- */
function initCinematicIntro() {
  if (typeof gsap === 'undefined') return;

  const laser = document.querySelector('.intro-laser-line');
  const heroWrapper = document.querySelector('.hero-main-wrapper');
  const letters = document.querySelectorAll('.hero-name-title .letter');
  const roleSub = document.querySelector('.hero-role-sub');
  const actions = document.querySelector('.hero-actions-group');
  const scrollIndicator = document.querySelector('.scroll-explore-indicator');

  const jobTitle = document.querySelector('.hero-job-title');

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // Phase 1: Glowing laser line expands horizontally
  tl.to(laser, { width: '80vw', duration: 1.2, delay: 0.3 })
    .to(laser, { opacity: 0, duration: 0.4 })
    .to(heroWrapper, { opacity: 1, scale: 1, duration: 1 }, '-=0.2')
    // Phase 2: Letter-by-letter reveal
    .to(letters, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      stagger: 0.045,
      ease: 'back.out(1.7)'
    }, '-=0.8')
    // Phase 3: Job title badge
    .to(jobTitle, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    // Phase 4: Subtitle and buttons reveal
    .to(roleSub, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .to(actions, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
    .to(scrollIndicator, { opacity: 1, duration: 1 }, '-=0.4');
}

/* -------------------------------------------------------------------------- */
/* 3.5 Text Rotator Logic                                                     */
/* -------------------------------------------------------------------------- */
function initTextRotator() {
  const texts = [
    "ASSOCIATE BUSINESS ANALYST",
    "SAAS B2B SPECIALIST",
    "DATA ANALYST",
    "SQL EXPERT"
  ];
  
  const inner = document.getElementById('text-rotate-inner');
  if (!inner || typeof gsap === 'undefined') return;

  let currentIndex = 0;
  const rotationInterval = 3000;
  const staggerDuration = 0.03;

  function createChars(text) {
    inner.innerHTML = '';
    const chars = Array.from(text);
    return chars.map((char) => {
      const span = document.createElement('span');
      span.className = 'rotate-char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      inner.appendChild(span);
      return span;
    });
  }

  function animateText() {
    const chars = createChars(texts[currentIndex]);
    
    // Animate In
    gsap.fromTo(chars,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.6,
        stagger: { amount: staggerDuration * chars.length, from: "end" },
        ease: 'back.out(1.7)'
      }
    );

    // Schedule Out Animation
    setTimeout(() => {
      gsap.to(chars, {
        y: '-120%',
        opacity: 0,
        duration: 0.6,
        stagger: { amount: staggerDuration * chars.length, from: "end" },
        ease: 'back.in(1.7)',
        onComplete: () => {
          currentIndex = (currentIndex + 1) % texts.length;
          animateText();
        }
      });
    }, rotationInterval - 600); // subtract out animation duration roughly
  }
  
  // Wait a bit for intro animation to finish before starting
  setTimeout(animateText, 2500); 
}

/* -------------------------------------------------------------------------- */
/* 4. Documentary Storytelling Section (Scroll-Driven)                         */
/* -------------------------------------------------------------------------- */
function initDocumentaryScroll() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const phrases = document.querySelectorAll('.doc-phrase');
  const bgCards = document.querySelectorAll('.doc-bg-card');

  phrases.forEach((phrase, idx) => {
    gsap.to(phrase, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: phrase,
        start: 'top 75%',
        end: 'top 35%',
        scrub: true
      }
    });
  });

  bgCards.forEach((card) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'top 40%',
        scrub: 1
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Horizontal Pinned Projects Exhibits                                      */
/* -------------------------------------------------------------------------- */
function initHorizontalProjects() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const pinSection = document.querySelector('.section-projects-pin');
  const track = document.querySelector('.projects-track');
  if (!pinSection || !track) return;

  gsap.to(track, {
    xPercent: -66.666, // 3 Viewports width
    ease: 'none',
    scrollTrigger: {
      trigger: pinSection,
      pin: true,
      scrub: 1,
      snap: 1 / 2, // Snap to exhibit stops
      end: () => `+=${track.offsetWidth}`
    }
  });

  // 3D Perspective Tilt on Mouse Move
  const stages = document.querySelectorAll('.exhibit-preview-stage');
  stages.forEach(stage => {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      stage.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.02)`;
    });

    stage.addEventListener('mouseleave', () => {
      stage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Interactive Skills Constellation Canvas Node Network                    */
/* -------------------------------------------------------------------------- */
function initSkillsConstellation() {
  const canvas = document.getElementById('constellation-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;
  let width = (canvas.width = container.offsetWidth);
  let height = (canvas.height = container.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = container.offsetWidth;
    height = canvas.height = container.offsetHeight;
  });

  const skillNodes = [
    { name: 'SQL', category: 'Data & Analytics', level: '92%', exp: 'Complex Queries, CTEs, Joins, Aggregations', x: 0.15, y: 0.3, vx: 0.3, vy: -0.2 },
    { name: 'Power BI', category: 'Reporting', level: '90%', exp: 'DAX Data Models & Executive Dashboards', x: 0.3, y: 0.2, vx: -0.2, vy: 0.3 },
    { name: 'Stakeholder Mgmt', category: 'Strategy', level: '95%', exp: 'Cross-functional alignment & client presentations', x: 0.5, y: 0.15, vx: 0.2, vy: -0.1 },
    { name: 'Python', category: 'Data Science', level: '85%', exp: 'EDA, Pandas, Statistical Analysis', x: 0.7, y: 0.25, vx: 0.25, vy: -0.15 },
    { name: 'Process Mapping', category: 'Process', level: '92%', exp: 'As-Is / To-Be workflows & BPMN', x: 0.85, y: 0.4, vx: -0.1, vy: 0.2 },
    { name: 'BRD / FRD', category: 'Requirements', level: '95%', exp: 'Business & Functional Spec Documentation', x: 0.2, y: 0.6, vx: -0.15, vy: -0.25 },
    { name: 'Jira & Scrum', category: 'Methodology', level: '96%', exp: 'Sprint Planning, User Stories, Backlog Grooming', x: 0.4, y: 0.7, vx: 0.2, vy: 0.2 },
    { name: 'Data Mapping', category: 'Architecture', level: '90%', exp: 'API integrations, Data transformations & Schema', x: 0.6, y: 0.75, vx: -0.2, vy: -0.2 },
    { name: 'Postman', category: 'API Testing', level: '88%', exp: 'JSON Schemas, REST Endpoint Validation', x: 0.8, y: 0.65, vx: -0.3, vy: -0.1 },
    { name: 'UAT Execution', category: 'Testing', level: '95%', exp: 'Test Scenario Matrices & Defect Triage', x: 0.5, y: 0.5, vx: 0.1, vy: 0.25 },
    { name: 'Advanced Excel', category: 'Analytics', level: '90%', exp: 'VLOOKUP, Pivot Tables, Macro Logic', x: 0.1, y: 0.8, vx: -0.2, vy: 0.15 }
  ];

  const nodes = skillNodes.map(n => ({
    ...n,
    px: n.x * width,
    py: n.y * height,
    radius: 7,
    active: false
  }));

  let mouse = { x: -1000, y: -1000 };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  const inspectCard = document.getElementById('node-inspect-card');

  canvas.addEventListener('click', () => {
    const hoveredNode = nodes.find(n => {
      const dx = mouse.x - n.px;
      const dy = mouse.y - n.py;
      return Math.sqrt(dx * dx + dy * dy) < 25;
    });

    if (hoveredNode && inspectCard) {
      document.getElementById('inspect-title').textContent = hoveredNode.name;
      document.getElementById('inspect-cat').textContent = hoveredNode.category;
      document.getElementById('inspect-level').textContent = `Proficiency: ${hoveredNode.level}`;
      document.getElementById('inspect-desc').textContent = hoveredNode.exp;
      inspectCard.classList.add('active');
    }
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Update positions
    nodes.forEach(n => {
      n.px += n.vx * 0.4;
      n.py += n.vy * 0.4;

      if (n.px < 40 || n.px > width - 40) n.vx *= -1;
      if (n.py < 40 || n.py > height - 40) n.vy *= -1;

      // Mouse proximity interaction
      const dx = mouse.x - n.px;
      const dy = mouse.y - n.py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        n.px -= (dx / dist) * 1.5;
        n.py -= (dy / dist) * 1.5;
      }
    });

    // Draw connecting lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].px - nodes[j].px;
        const dy = nodes[i].py - nodes[j].py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 220) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].px, nodes[i].py);
          ctx.lineTo(nodes[j].px, nodes[j].py);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.35 * (1 - dist / 220)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const dx = mouse.x - n.px;
      const dy = mouse.y - n.py;
      const isHovered = Math.sqrt(dx * dx + dy * dy) < 25;

      ctx.beginPath();
      ctx.arc(n.px, n.py, isHovered ? 11 : n.radius, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#ffffff' : '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = isHovered ? 20 : 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label text
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillStyle = isHovered ? '#ffffff' : '#94a3b8';
      ctx.fillText(n.name, n.px + 14, n.py + 4);
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* -------------------------------------------------------------------------- */
/* 7. Pinned Timeline Progress                                                */
/* -------------------------------------------------------------------------- */
function initPinnedTimeline() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const fill = document.querySelector('.timeline-progress-fill');
  const section = document.querySelector('.section-timeline');

  if (!fill || !section) return;

  gsap.to(fill, {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top 50%',
      end: 'bottom 80%',
      scrub: true
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 8. Achievements Counter Animation                                          */
/* -------------------------------------------------------------------------- */
function initAchievementCounters() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const nums = document.querySelectorAll('.achieve-num');
  nums.forEach(num => {
    const target = parseInt(num.getAttribute('data-target'), 10);
    const suffix = num.getAttribute('data-suffix') || '';

    gsap.to(num, {
      innerText: target,
      duration: 2,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: num,
        start: 'top 85%',
        once: true
      },
      onUpdate: function () {
        num.textContent = Math.ceil(this.targets()[0].innerText) + suffix;
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 9. Interactive Command Terminal (Contact)                                  */
/* -------------------------------------------------------------------------- */
function initInteractiveTerminal() {
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');
  if (!input || !body) return;

  const commands = {
    help: 'Available commands:\n • resume     - View and download latest ATS-optimized PDF resume\n • hire       - Send direct contact & recruitment request\n • about      - View Komal Desurkar profile summary\n • projects   - List portfolio case studies\n • skills     - Display core technical skill tree\n • experience - View career timeline & education\n • linkedin   - Open LinkedIn profile\n • github     - Open GitHub portfolio\n • clear      - Clear terminal output screen',
    resume: 'Opening official ATS PDF Resume: Komal_Desurkar_Resume.pdf ...',
    about: 'Komal Desurkar | Product Analyst & Associate Business Analyst @ Envision Beyond India Pvt. Ltd.\nLocation: Bengaluru, Karnataka\nSpecializations: PRD/BRD/FRD Documentation, Product Analytics, SaaS e-Invoicing B2B Delivery, SQL Analytics, Power BI Dashboards, Agile/Scrum UAT Execution.',
    projects: '1. SaaS e-Invoicing B2B Platform (15% Delivery Speed Improvement)\n2. Customer Churn Analysis (10% Reduction across 7k+ Telecom Records)\n3. Pizza Sales Market Analysis (18% Promotional Efficiency Boost)',
    skills: 'Core Competencies:\n- Product & Project Delivery: Agile/Scrum, Sprint Planning, PRD/BRD/FRD, Jira, UAT\n- SQL (PostgreSQL, MySQL, CTEs, Window Functions): 92%\n- Power BI & DAX: 90%\n- Python (EDA / Pandas): 85%\n- REST APIs & Postman Testing: 90%\n- UAT Scenario Execution: 95%',
    experience: '• May 2025 - Present: Associate Business Analyst (Product & Project Delivery) @ Envision Beyond India\n• Jan 2025 - Jul 2025: Data Science Trainee @ AlmaBetter\n• 2023 - 2024: M.Sc in Mathematics @ K.L.E Society\n• 2019 - 2022: B.Sc (PCM) @ Govindram Seksaria Science College',
    hire: 'Initiating Recruitment Contact Intent...\nDirect Email: komaldesurkar15@gmail.com\nPhone: +91 9886157539\nLocation: Bengaluru, India (Open to Remote / On-Site)\nStatus: Ready for interview discussions!',
    linkedin: 'Opening LinkedIn Profile: https://linkedin.com/in/komaldesurkar ...',
    github: 'Opening GitHub Portfolio: https://github.com/komaldesurkar ...'
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';

      if (cmd === '') return;

      const cmdLine = document.createElement('div');
      cmdLine.className = 'terminal-line-output';
      cmdLine.innerHTML = `<span class="terminal-prompt-symbol">komal@portfolio:~$</span> ${cmd}`;
      body.appendChild(cmdLine);

      if (cmd === 'clear') {
        body.innerHTML = '';
        return;
      }

      const responseLine = document.createElement('div');
      responseLine.className = 'terminal-line-output';
      
      if (commands[cmd]) {
        responseLine.innerHTML = `<span class="highlight">${commands[cmd]}</span>`;
      } else {
        responseLine.innerHTML = `<span style="color: #f43f5e;">Command not recognized: '${cmd}'. Type <span class="highlight">'help'</span> for list of commands.</span>`;
      }

      body.appendChild(responseLine);
      body.scrollTop = body.scrollHeight;

      if (cmd === 'hire' || cmd === 'email') {
        window.location.href = 'mailto:komaldesurkar15@gmail.com?subject=Associate%20Business%20Analyst%20Opportunity';
      } else if (cmd === 'resume' || cmd === 'cv' || cmd === 'download') {
        window.open('Komal_Desurkar_Resume.pdf', '_blank');
      }
    }
  });

  // Shortcut tags
  document.querySelectorAll('.cmd-shortcut-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const cmd = tag.getAttribute('data-cmd');
      input.value = cmd;
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 10. Magnetic Button Hover Physics                                          */
/* -------------------------------------------------------------------------- */
function initMagneticButtons() {
  const btns = document.querySelectorAll('.magnetic-btn, .nav-cta-btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}
