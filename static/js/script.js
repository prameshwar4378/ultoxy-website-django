    
    // Hero Section
    // Mobile menu toggle with animation
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    navbarToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('open');
      navbarToggle.classList.toggle('open');
      document.body.style.overflow = navbarMenu.classList.contains('open') ? 'hidden' : '';
    });
    Array.from(navbarMenu.querySelectorAll('a')).forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          navbarMenu.classList.remove('open');
          navbarToggle.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
    document.addEventListener('click', function(e) {
      if (
        window.innerWidth <= 900 &&
        navbarMenu.classList.contains('open') &&
        !navbarMenu.contains(e.target) &&
        !navbarToggle.contains(e.target)
      ) {
        navbarMenu.classList.remove('open');
        navbarToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Next level mouse move animation: trailing 3D dots + expanding energy waves
    const canvas = document.querySelector('.effect-canvas');
    let lastX = null, lastY = null;
    let trail = [];
    function createDot(x, y) {
      const dot = document.createElement('div');
      dot.className = 'trail-dot';
      dot.style.left = (x - 13) + 'px';
      dot.style.top = (y - 13) + 'px';
      dot.style.background = `radial-gradient(circle at 30% 30%, #00ffc6 0%, #ff6ec7 80%)`;
      canvas.appendChild(dot);
      if (lastX !== null && Math.abs(x - lastX) + Math.abs(y - lastY) > 32) {
        dot.classList.add('bounce');
      }
      setTimeout(() => {
        dot.style.opacity = "0";
        dot.style.filter = "blur(12px)";
      }, 580);
      setTimeout(() => {
        if (dot.parentNode) dot.parentNode.removeChild(dot);
      }, 850);
      trail.push(dot);
      if (trail.length > 30) {
        let old = trail.shift();
        if (old && old.parentNode) old.parentNode.removeChild(old);
      }
    }
    function createWave(x, y) {
      const wave = document.createElement('div');
      wave.className = 'energy-wave';
      wave.style.left = (x - 60) + 'px';
      wave.style.top = (y - 60) + 'px';
      canvas.appendChild(wave);
      setTimeout(() => {
        if (wave.parentNode) wave.parentNode.removeChild(wave);
      }, 900);
    }
    document.addEventListener('mousemove', (e) => {
      const { clientX: x, clientY: y } = e;
      createDot(x, y);
      if (lastX !== null && Math.abs(x - lastX) + Math.abs(y - lastY) > 110) {
        createWave(x, y);
      }
      lastX = x;
      lastY = y;
    });
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if (touch) {
        createDot(touch.clientX, touch.clientY);
      }
    }, {passive:true});
    function resizeCanvas() {
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Logo Animation
    const text = "Ultoxy";
    const directions = [
      {from: 'top left',    tx: -150, ty: -180, rz: 40, rx: 70, ry: -20, delay: 0},
      {from: 'bottom right',tx: 140,  ty: 160,  rz: -50,rx: -70,ry: 25,  delay: 80},
      {from: 'top',         tx: 0,    ty: -230, rz: 0,  rx: 100,ry: 0,   delay: 160},
      {from: 'left',        tx: -220, ty: 0,    rz: 20, rx: 0,  ry: 90,  delay: 940},
      {from: 'bottom',      tx: 0,    ty: 210,  rz: -20,rx: -90,ry: 0,   delay: 320},
      {from: 'right',       tx: 220,  ty: 0,    rz: 20, rx: 0,  ry: -90, delay: 400}
    ];
    const logo = document.getElementById('ultoxyLogo');
    let charEls = [];
    function animateLogo() {
      logo.innerHTML = "";
      charEls = [];
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = `ultoxy-char ${char.toLowerCase()}`;
        span.textContent = char;
        const d = directions[i % directions.length];
        span.style.transition = 'none';
        span.style.opacity = '0';
        span.style.transform =
          `translateX(${d.tx}px) translateY(${d.ty}px) scale(0.5) rotateZ(${d.rz}deg) rotateX(${d.rx}deg) rotateY(${d.ry}deg)`;
        logo.appendChild(span);
        charEls.push(span);
        setTimeout(() => {
          span.style.transition =
            'transform 1.2s cubic-bezier(.77,0,.18,1), opacity 1.2s';
          span.style.opacity = '1';
          span.style.transform =
            'translateX(0px) translateY(0px) scale(1) rotateZ(0deg) rotateX(0deg) rotateY(0deg)';
        }, d.delay + 400);
        setTimeout(() => {
          span.style.transition =
            'transform 0.38s cubic-bezier(.68,-0.55,.27,1.55)';
          span.style.transform =
            'translateY(-30px) scale(1.15) rotateZ(0deg) rotateX(0deg) rotateY(0deg)';
        }, d.delay + 1400);
        setTimeout(() => {
          span.style.transition =
            'transform 0.25s cubic-bezier(.68,-0.55,.27,1.55)';
          span.style.transform =
            'translateY(0px) scale(1) rotateZ(0deg) rotateX(0deg) rotateY(0deg)';
        }, d.delay + 1700);
      });
      const lastIndex = text.length - 1;
      const finalDelay =
        (directions[lastIndex % directions.length].delay + 1700) + 400;
      setTimeout(() => {
        charEls.forEach((span, i) => {
          setTimeout(() => {
            span.style.transition = 'opacity 0.6s cubic-bezier(.77,0,.18,1)';
            span.style.opacity = '0';
          }, i * 50);
        });
        setTimeout(animateLogo, 800);
      }, finalDelay + 5000);
    }
    animateLogo();












    // About us Section

    // Animated lines on canvas
  document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('aboutCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let lines = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Line class
    class Line {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 3 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.width = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.5 ? '#00ffc6' : '#ff6ec7';
        this.life = 0;
        this.maxLife = Math.random() * 100 + 50;
      }
      
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life++;
        
        // Reset if out of bounds or life exceeded
        if (this.x < -this.length || this.x > canvas.width + this.length ||
            this.y < -this.length || this.y > canvas.height + this.length ||
            this.life > this.maxLife) {
          this.reset();
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.opacity * (1 - this.life / this.maxLife);
        ctx.lineWidth = this.width;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
    
    // Create initial lines
    function createLines() {
      lines = [];
      const lineCount = Math.min(Math.floor(window.innerWidth / 20), 50);
      for (let i = 0; i < lineCount; i++) {
        lines.push(new Line());
      }
    }
    
    createLines();
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      lines.forEach(line => {
        line.update();
        line.draw();
      });
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Restart animation when section comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animationId) {
            animate();
          }
        } else {
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(document.getElementById('about'));
    
    // Enhanced fade-in animations
    const fadeElements = document.querySelectorAll(' .aboutus-features, .aboutus-cta, .aboutus-img-caption');
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
      el.style.animationPlayState = 'paused';
      fadeObserver.observe(el);
    });
  });









// === Technical Stacks Blurry Background ===
const blurBg = document.getElementById('tech-stack-blur-bg');
const blobs = [
  { class: 'tech-stack-blur-blob1', left: '8%', top: '12%', duration: 13, delay: 0 },
  { class: 'tech-stack-blur-blob2', left: '68%', top: '22%', duration: 16, delay: 2 },
  { class: 'tech-stack-blur-blob3', left: '47%', top: '56%', duration: 15, delay: 4 },
  { class: 'tech-stack-blur-blob4', left: '22%', top: '70%', duration: 18, delay: 6 },
  { class: 'tech-stack-blur-blob5', left: '82%', top: '69%', duration: 19, delay: 8 }
];
blobs.forEach((b) => {
  const el = document.createElement('div');
  el.className = 'tech-stack-blur-blob ' + b.class;
  el.style.left = b.left;
  el.style.top = b.top;
  el.style.animationDuration = b.duration + 's';
  el.style.animationDelay = b.delay + 's';
  blurBg.appendChild(el);
});

// Color animation for blobs
const blobColors = ['#00ffc6', '#ff6ec7', '#006cff'];
function lerpColor(a, b, t) {
  const ah = a.replace('#', ''), bh = b.replace('#', '');
  const ar = parseInt(ah.substring(0,2),16), ag = parseInt(ah.substring(2,4),16), ab = parseInt(ah.substring(4,6),16);
  const br = parseInt(bh.substring(0,2),16), bg = parseInt(bh.substring(2,4),16), bb = parseInt(bh.substring(4,6),16);
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr},${rg},${rb})`;
}
function animateBlobColors() {
  const t = Date.now() * 0.00013;
  document.querySelectorAll('.tech-stack-blur-blob').forEach((el, idx) => {
    const colorA = blobColors[idx % blobColors.length];
    const colorB = blobColors[(idx + 1) % blobColors.length];
    const smoothT = (Math.sin(t * 1.3 + idx) + 1) / 2;
    el.style.background = lerpColor(colorA, colorB, smoothT);
  });
  requestAnimationFrame(animateBlobColors);
}
animateBlobColors();

// === ICONS ===
// Use Bootstrap Icons instead of SVGs
const iconsList = [
  `<i class="bi bi-filetype-html"></i>`,
  `<i class="bi bi-filetype-css"></i>`,
  `<i class="bi bi-filetype-js"></i>`,
  `<i class="bi bi-bootstrap"></i>`,
  `<i class="bi bi-database"></i>`,
  `<i class="bi bi-cloud-fill"></i>`,
  `<i class="bi bi-github"></i>`,
  `<i class="bi bi-laptop"></i>`,
  `<i class="bi bi-phone"></i>`,
  `<i class="bi bi-server"></i>`
];

const ICONS_COUNT = 10;
const iconsArea = document.getElementById('tech-stack-icons-area');
const centerContent = document.getElementById('tech-stack-center-content');
let iconObjs = [];

function getCenterExclusionZone() {
  const containerRect = document.querySelector('.tech-stack-container').getBoundingClientRect();
  const centerRect = centerContent.getBoundingClientRect();
  return {
    left: centerRect.left - containerRect.left,
    top: centerRect.top - containerRect.top,
    right: centerRect.right - containerRect.left,
    bottom: centerRect.bottom - containerRect.top,
    width: centerRect.width,
    height: centerRect.height
  };
}
function getViewport() {
  const container = document.querySelector('.tech-stack-container');
  const rect = container.getBoundingClientRect();
  return { w: rect.width, h: rect.height };
}

class TechStackMovingIcon {
  constructor(iconHTML, area, size, angleOffset) {
    this.el = document.createElement('div');
    this.el.className = 'tech-stack-icon';
    this.el.innerHTML = iconHTML;
    area.appendChild(this.el);
    this.size = size;
    this.angleOffset = angleOffset;
    this.reset();
  }
  reset() {
    const vp = getViewport();
    const centerZone = getCenterExclusionZone();
    const iconHalf = this.size / 2;
    this.baseAngle = this.angleOffset !== undefined ? this.angleOffset : Math.random() * 2 * Math.PI;
    const centerDiag = Math.sqrt(centerZone.width*centerZone.width + centerZone.height*centerZone.height) / 2;
    const minR = centerDiag + iconHalf + 20;
    const maxR = Math.min(vp.w, vp.h) / 2 - iconHalf - 10;
    this.radius = minR + Math.random() * Math.max(0, maxR - minR);
    this.t = Math.random() * 1000;
    this.move(vp, centerZone);
  }
  move(bounds, centerZone) {
    this.t = this.t + 0.0028;
    const drift = Math.sin(this.t + this.baseAngle) * 0.12 + Math.cos(this.t * 0.8 + this.baseAngle) * 0.18;
    this.angle = this.baseAngle + drift;
    const rJitter = Math.sin(this.t * 0.7 + this.baseAngle) * 8;
    const r = this.radius + rJitter;
    const cx = centerZone.left + centerZone.width / 2;
    const cy = centerZone.top + centerZone.height / 2;
    const iconHalf = this.size / 2;
    this.x = cx + r * Math.cos(this.angle) - iconHalf;
    this.y = cy + r * Math.sin(this.angle) - iconHalf;
    this.x = Math.max(0, Math.min(bounds.w - this.size, this.x));
    this.y = Math.max(0, Math.min(bounds.h - this.size, this.y));
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
  resize(size) {
    this.size = size;
    this.el.style.width = size + 'px';
    this.el.style.height = size + 'px';
  }
}

function setupTechStackIcons() {
  iconsArea.innerHTML = '';
  iconObjs = [];
  const vp = getViewport();
  let size = 90;
  if (vp.w < 900) size = 76;
  if (vp.w < 600) size = 58;
  if (vp.w < 400) size = 46;
  const angleStep = (2 * Math.PI) / ICONS_COUNT;
  for (let i = 0; i < ICONS_COUNT; i++) {
    const iconHTML = iconsList[i % iconsList.length];
    const angle = i * angleStep + Math.random() * angleStep * 0.4;
    const icon = new TechStackMovingIcon(iconHTML, iconsArea, size, angle);
    iconObjs.push(icon);
  }
}
function animateTechStackIcons() {
  const vp = getViewport();
  let size = 90;
  if (vp.w < 900) size = 76;
  if (vp.w < 600) size = 58;
  if (vp.w < 400) size = 46;
  const centerZone = getCenterExclusionZone();
  for (const icon of iconObjs) {
    icon.resize(size);
    icon.move(vp, centerZone);
  }
  requestAnimationFrame(animateTechStackIcons);
}

window.addEventListener('resize', setupTechStackIcons);

function startIcons() {
  setupTechStackIcons();
  animateTechStackIcons();
  setTimeout(() => {
    for (const el of document.querySelectorAll('.tech-stack-icon')) {
      el.style.opacity = 0;
      el.style.transition = 'opacity 1s';
      setTimeout(() => { el.style.opacity = 1; }, 60 + Math.random() * 800);
    }
  }, 20);
}
window.addEventListener('load', startIcons);
setTimeout(startIcons, 200);
