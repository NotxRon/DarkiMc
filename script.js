// ---- DOM ELEMENT SELECTORS Matrix ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// ---- MOBILE NAVIGATION OVERLAYS ----
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open'); // Aligned with styles.css active selector
  });

  // Close menu on link selection
  document.querySelectorAll('.nav-link, .nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
}

// ---- NAVBAR SCROLL CONTROLS ----
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    if (navbar) navbar.classList.add('scrolled');
    if (backToTop) backToTop.classList.add('visible');
  } else {
    if (navbar) navbar.classList.remove('scrolled');
    if (backToTop) backToTop.classList.remove('visible');
  }
});

// ---- CORE SYSTEM: COPY ACTIONS ----
function copyIP() {
  const ipAddress = "play.fabelmc.net";
  navigator.clipboard.writeText(ipAddress).then(() => {
    showNotification("Server IP copied to clipboard: " + ipAddress, "success");
  }).catch(err => {
    // Fallback execution stack
    const fallbackTextArea = document.createElement('textarea');
    fallbackTextArea.value = ipAddress;
    document.body.appendChild(fallbackTextArea);
    fallbackTextArea.select();
    try {
      document.execCommand('copy');
      showNotification("Server IP copied!", "success");
    } catch (e) {
      console.error("Failed to copy IP string context.", err);
    }
    document.body.removeChild(fallbackTextArea);
  });
}

function copyDiscord() {
  const discordLink = "https://discord.gg/fabelmc";
  navigator.clipboard.writeText(discordLink).then(() => {
    showNotification("Discord invite link copied!", "success");
  }).catch(err => {
    console.error("Link context tracking failure: ", err);
  });
}

// ---- INTERACTIVE ACCORDION FAQ LOGIC ----
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== faqItem) item.classList.remove('active');
    });

    faqItem.classList.toggle('active');
  });
});

// ---- SMART INTERSECTION COUNTERS & EFFECTS ----
function animateCounter(element, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Native Visibility Observer
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const appObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      if (entry.target.classList.contains('stat-number')) {
        const targetVal = parseInt(entry.target.getAttribute('data-target')) || 0;
        if (targetVal > 0) animateCounter(entry.target, targetVal);
      }
    }
  });
}, observerOptions);

// ---- REVENUE & RECRUITMENT SIMULATORS ----
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Dispatching...';
    submitBtn.disabled = true;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      contactForm.reset();
      showNotification('Message logged! Our administrators will reach out via email shortly.', 'success');
    } catch (error) {
      submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Transmission Error';
      showNotification('Submission vector failure. Verify inputs.', 'error');
    }
    
    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 3000);
  });
}

// ---- APP NOTIFICATION HUB ----
function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `notification notification-${type}`;
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  toast.style.cssText = `
    position: fixed; top: 24px; right: 24px;
    background: rgba(14, 4, 36, 0.95); color: #fff;
    padding: 16px 24px; border-radius: 6px;
    border: 1px solid rgba(138, 43, 226, 0.3);
    border-left: 4px solid ${type === 'success' ? '#2ecc71' : '#d63031'};
    backdrop-filter: blur(12px); z-index: 10000;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    transform: translateX(120%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.style.transform = 'translateX(0)');
  
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ---- SMOOTH OFFSET LINK ENGINE ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const targetOffset = targetElement.offsetTop - 80;
      window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    }
  });
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- HARDWARE ACCELERATED EFFECTS ----
window.addEventListener('scroll', () => {
  const scrollOffset = window.pageYOffset;
  const heroMedia = document.querySelector('.hero-video');
  if (heroMedia) {
    heroMedia.style.transform = `translateY(${scrollOffset * -0.4}px) translateZ(0)`;
  }
});

function updateLiveNetworkStatus() {
  const counts = [
    Math.floor(Math.random() * 80) + 740, // Survival Range
    Math.floor(Math.random() * 40) + 280, // LifeSteal Range
    Math.floor(Math.random() * 20) + 120  // KitPvP Range
  ];
  document.querySelectorAll('.player-count span').forEach((el, index) => {
    if (counts[index]) el.textContent = `${counts[index]} Players Online`;
  });
}

// ---- LIFE CYCLE ENGINE INITIALIZATION ----
document.addEventListener('DOMContentLoaded', () => {
  updateLiveNetworkStatus();
  setInterval(updateLiveNetworkStatus, 25000);

  document.querySelectorAll('[data-aos], .stat-number[data-target]').forEach(el => {
    appObserver.observe(el);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    }
  });
});

// Structural image fallback arrays
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.borderColor = 'rgba(214,48,49,0.4)';
    console.warn(`Asset rendering vector bypassed: ${this.src}`);
  });
});

console.log(`%c🎮 FABEL MC ARCHITECTURE ONLINE 🎮`, "color: #a94eff; font-size: 16px; font-weight: bold;");
