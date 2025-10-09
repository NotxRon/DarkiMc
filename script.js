// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const copyIpBtn = document.getElementById('copy-ip');
const serverIp = document.getElementById('server-ip');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Back to Top Button
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Copy Server IP
copyIpBtn.addEventListener('click', async () => {
  const ip = serverIp.textContent;
  
  try {
    await navigator.clipboard.writeText(ip);
    
    // Visual feedback
    const originalIcon = copyIpBtn.innerHTML;
    copyIpBtn.innerHTML = '<i class="fas fa-check"></i>';
    copyIpBtn.style.color = 'var(--success-color)';
    
    // Show tooltip
    showTooltip(copyIpBtn, 'Copied!');
    
    setTimeout(() => {
      copyIpBtn.innerHTML = originalIcon;
      copyIpBtn.style.color = '';
    }, 2000);
    
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = ip;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      showTooltip(copyIpBtn, 'Copied!');
    } catch (err) {
      showTooltip(copyIpBtn, 'Failed to copy');
    }
    
    document.body.removeChild(textArea);
  }
});

// Tooltip Function
function showTooltip(element, message) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = message;
  tooltip.style.cssText = `
    position: absolute;
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
    z-index: 1000;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  `;
  
  document.body.appendChild(tooltip);
  
  const rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
  
  // Animate in
  requestAnimationFrame(() => {
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(0)';
  });
  
  // Remove after delay
  setTimeout(() => {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    }, 300);
  }, 2000);
}

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      
      // Animate counters when they come into view
      if (entry.target.classList.contains('stat-number')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
      }
    }
  });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

// Observe stat numbers
document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  observer.observe(el);
});

// Contact Form Handling
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  try {
    // Simulate form submission (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success feedback
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'var(--success-color)';
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    
  } catch (error) {
    // Error feedback
    submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
    submitBtn.style.background = 'var(--error-color)';
    
    showNotification('Failed to send message. Please try again.', 'error');
  }
  
  // Reset button after delay
  setTimeout(() => {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.style.background = '';
    submitBtn.disabled = false;
  }, 3000);
});

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 16px 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow-xl);
    z-index: 10000;
    max-width: 400px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  `;
  
  if (type === 'success') {
    notification.style.borderLeftColor = 'var(--success-color)';
    notification.style.borderLeftWidth = '4px';
  } else if (type === 'error') {
    notification.style.borderLeftColor = 'var(--error-color)';
    notification.style.borderLeftWidth = '4px';
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  requestAnimationFrame(() => {
    notification.style.transform = 'translateX(0)';
  });
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    closeNotification(notification);
  });
  
  // Auto close after 5 seconds
  setTimeout(() => {
    closeNotification(notification);
  }, 5000);
}

function closeNotification(notification) {
  notification.style.transform = 'translateX(100%)';
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroVideo) {
    const rate = scrolled * -0.5;
    heroVideo.style.transform = `translateY(${rate}px)`;
  }
});

// Dynamic Server Status (Mock)
function updateServerStatus() {
  const statusElements = document.querySelectorAll('.game-status');
  const playerCounts = document.querySelectorAll('.player-count span');
  
  // Mock player counts
  const mockCounts = [
    Math.floor(Math.random() * 100) + 800, // Survival
    Math.floor(Math.random() * 50) + 300,  // LifeSteal
    Math.floor(Math.random() * 30) + 150   // KitPvP
  ];
  
  playerCounts.forEach((element, index) => {
    if (mockCounts[index]) {
      element.textContent = `${mockCounts[index]} Players`;
    }
  });
}

// Update server status every 30 seconds
setInterval(updateServerStatus, 30000);

// Initialize AOS (Animate On Scroll) alternative
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  const animateOnScroll = () => {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('aos-animate');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  updateServerStatus();
  
  // Add loading animation to images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    
    if (img.complete) {
      img.style.opacity = '1';
    }
  });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
  
  // Enter key on copy button
  if (e.key === 'Enter' && e.target === copyIpBtn) {
    copyIpBtn.click();
  }
});

// Focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
  const focusableContent = element.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  document.addEventListener('keydown', function(e) {
    const isTabPressed = e.key === 'Tab';

    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
}

// Error handling for missing images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    console.warn(`Failed to load image: ${this.src}`);
  });
});

// Console easter egg
console.log(`
🎮 Welcome to MyServer! 🎮

Interested in our code? We're always looking for talented developers!
Join our Discord: Coming Soon
Email us: NotWorkPlace@gmail.com

Server IP: play.myserver.net
`);
