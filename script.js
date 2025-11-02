// ====== SMOOTH SCROLL FOR NAV LINKS ======
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Close mobile menu if open
    document.querySelector('.nav-links').classList.remove('active');
  });
});

// ====== ACTIVE LINK HIGHLIGHT BASED ON SCROLL ======
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.scrollY + 100; // Adjusted offset

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    // Check if current scroll position is within this section
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = sectionId;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Special case for home section when at top
  if (window.scrollY === 0) {
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('.nav-links a[href="#home"]').classList.add('active');
  }
});

// ====== DARK / LIGHT MODE TOGGLE ======
const themeIcon = document.getElementById("theme-icon");

themeIcon.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    themeIcon.style.color = "white";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    themeIcon.style.color = "orange";
    localStorage.setItem("theme", "light");
  }
});

// ====== PERSIST THEME PREFERENCE ======
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-sun", "fa-moon");
    themeIcon.style.color = "white";
  }
  
  // Set home as active on page load
  document.querySelector('.nav-links a[href="#home"]').classList.add('active');
});

// ====== SCROLL REVEAL ANIMATION ======
const revealElements = document.querySelectorAll(
  '.hero-content, .hero-image, section h2, .skill-box, .project-card, .exp-card, .edu-card, .awards li'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.1, // Lower threshold for better detection
  rootMargin: '0px 0px -50px 0px' // Trigger animation slightly earlier
});

revealElements.forEach(el => {
  if (el) observer.observe(el);
});

// ====== RESPONSIVE NAVBAR TOGGLE (HAMBURGER MENU) ======
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle && navLinksContainer) {
  menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  });
});

// ====== FLOATING ACTION BUTTON ======
const socialFab = document.querySelector('.social-fab');
const fabToggle = document.querySelector('.fab-toggle');

if (fabToggle && socialFab) {
  fabToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    socialFab.classList.toggle('active');
  });

  // Close FAB when clicking outside
  document.addEventListener('click', (e) => {
    if (!socialFab.contains(e.target)) {
      socialFab.classList.remove('active');
    }
  });

  // Close FAB when clicking on a fab item
  document.querySelectorAll('.fab-item').forEach(item => {
    item.addEventListener('click', () => {
      socialFab.classList.remove('active');
    });
  });
}

// Image error handling
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.src = 'placeholder-image.svg';
    this.alt = 'Image not available';
  });
});

// Network status detection
window.addEventListener('online', () => {
  showToast('Connection restored', 'success');
});

window.addEventListener('offline', () => {
  showToast('You are offline', 'error');
});