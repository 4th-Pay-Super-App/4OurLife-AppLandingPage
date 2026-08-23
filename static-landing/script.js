(function() {
  'use strict';

  /* ========== STICKY NAV ========== */
  const navbar = document.getElementById('navbar');
  function updateNav() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ========== MOBILE MENU ========== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose = document.getElementById('menuClose');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  function openMenu() { mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; syncMenuState(); }
  function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; syncMenuState(); }

  function syncMenuState() {
    hamburger.setAttribute('aria-expanded', String(mobileMenu.classList.contains('open')));
  }

  hamburger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  /* ========== STATS COUNTER ========== */
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCounter(el, duration) {
    var target = parseFloat(el.dataset.target);
    var isDecimal = el.dataset.decimal === 'true';
    var suffix = el.dataset.suffix || '';
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = easeOutQuart(progress);
      var current = start + (target - start) * eased;
      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (isDecimal) {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      }
    }
    requestAnimationFrame(step);
  }

  var statsObserved = false;
  var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !statsObserved) {
        statsObserved = true;
        var counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach(function(counter) {
          animateCounter(counter, 1500);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  var statsBar = document.querySelector('.stats-grid');
  if (statsBar) statsObserver.observe(statsBar);

  /* ========== SCROLL REVEAL ========== */
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
  });

  /* ========== SMOOTH SCROLL FALLBACK ========== */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 20;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ========== MODALS ========== */
  var openModalId = null;
  var lastFocused = null;
  var FOCUSABLE = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

  function openModal(id) {
    if (openModalId) closeModal(openModalId);
    var modal = document.getElementById('modal-' + id);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    openModalId = id;
    var firstFocus = modal.querySelector(FOCUSABLE);
    if (firstFocus) firstFocus.focus();
  }

  function closeModal(id) {
    var modal = document.getElementById('modal-' + id);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    openModalId = null;
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  function closeAllModals() {
    if (openModalId) closeModal(openModalId);
  }

  document.querySelectorAll('[data-modal]').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      var id = this.getAttribute('data-modal');
      if (id) openModal(id);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        var id = overlay.id.replace('modal-', '');
        closeModal(id);
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var overlay = btn.closest('.modal-overlay');
      if (overlay) {
        var id = overlay.id.replace('modal-', '');
        closeModal(id);
      }
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeAllModals(); return; }
    /* Focus trap: keep Tab cycling inside the open modal */
    if (e.key !== 'Tab' || !openModalId) return;
    var modal = document.getElementById('modal-' + openModalId);
    if (!modal) return;
    var focusables = Array.prototype.slice.call(modal.querySelectorAll(FOCUSABLE)).filter(function(el) {
      return el.offsetParent !== null;
    });
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ========== HERO PHONE CAROUSEL ========== */
  (function initPhoneCarousel() {
    var carousel = document.getElementById('heroPhoneCarousel');
    if (!carousel) return;
    var track = carousel.querySelector('.phone-carousel-track');
    var dots = carousel.querySelectorAll('.phone-carousel-dots .dot');
    var slides = carousel.querySelectorAll('.phone-mockup.slide');
    var total = slides.length;
    if (!total) return;

    /* Screen-reader announcement of slide changes */
    var status = document.createElement('p');
    status.className = 'visually-hidden';
    status.setAttribute('aria-live', 'polite');
    carousel.appendChild(status);

    var current = 0;
    var interval = null;
    var delay = 5000;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === current);
      });
      var labelEl = slides[current].querySelector('.mockup-content span');
      status.textContent = 'Showing screen ' + (current + 1) + ' of ' + total + ': ' + (labelEl ? labelEl.textContent : '');
    }

    function next() { goTo(current + 1); }
    function start() { if (!interval) interval = setInterval(next, delay); }
    function stop() { if (interval) { clearInterval(interval); interval = null; } }

    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        var idx = parseInt(this.getAttribute('data-index'), 10);
        goTo(idx);
        stop();
        start();
      });
    });

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('touchstart', stop, { passive: true });
    carousel.addEventListener('touchend', function() { start(); }, { passive: true });

    start();
  })();

  /* ========== SUPABASE FORM SUBMISSION ========== */
  /* Fill these in once Supabase credentials are available (anon key is public-safe). */
  var SUPABASE_CONFIG = {
    url: '',            /* e.g. https://xxxx.supabase.co */
    anonKey: '',        /* public anon key */
    contactTable: 'contact_messages',
    waitlistTable: 'waitlist_signups'
  };

  var FALLBACK_MSG = 'Our form service is still being connected. In the meantime, please email us directly at hello@4ourlife.health — we reply within one business day.';

  function supabaseConfigured() {
    return !!(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
  }

  function supabaseInsert(table, payload) {
    return fetch(SUPABASE_CONFIG.url + '/rest/v1/' + table, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': 'Bearer ' + SUPABASE_CONFIG.anonKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload)
    }).then(function(res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
    });
  }

  /* ========== CONTACT FORM ========== */
  var contactForm = document.getElementById('contactForm');
  var contactStatus = document.getElementById('contactStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (contactStatus) contactStatus.textContent = 'Sending…';
      var payload = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        topic: document.getElementById('contact-topic').value,
        message: document.getElementById('contact-message').value,
        created_at: new Date().toISOString()
      };
      if (!supabaseConfigured()) {
        if (contactStatus) contactStatus.textContent = FALLBACK_MSG;
        contactForm.reset();
        return;
      }
      supabaseInsert(SUPABASE_CONFIG.contactTable, payload)
        .then(function() {
          if (contactStatus) contactStatus.textContent = 'Thank you for reaching out! We will get back to you shortly.';
          contactForm.reset();
        })
        .catch(function() {
          if (contactStatus) contactStatus.textContent = FALLBACK_MSG;
        });
    });
  }

  /* ========== WAITLIST FORM ========== */
  var waitlistForm = document.getElementById('waitlistForm');
  var waitlistStatus = document.getElementById('waitlistStatus');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (waitlistStatus) waitlistStatus.textContent = 'Adding you…';
      var payload = {
        email: document.getElementById('waitlist-email').value,
        created_at: new Date().toISOString()
      };
      if (!supabaseConfigured()) {
        if (waitlistStatus) waitlistStatus.textContent = FALLBACK_MSG;
        waitlistForm.reset();
        return;
      }
      supabaseInsert(SUPABASE_CONFIG.waitlistTable, payload)
        .then(function() {
          if (waitlistStatus) waitlistStatus.textContent = 'You are on the list! We will email you when early access opens.';
          waitlistForm.reset();
        })
        .catch(function() {
          if (waitlistStatus) waitlistStatus.textContent = FALLBACK_MSG;
        });
    });
  }

  /* ========== STICKY DOWNLOAD BAR (mobile) ========== */
  var stickyBar = document.getElementById('stickyDownload');
  var downloadSection = document.getElementById('download');
  if (stickyBar && downloadSection && 'IntersectionObserver' in window) {
    var stickyObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        /* Hide the bar when the full Download section is already on screen */
        stickyBar.classList.toggle('hidden', entry.isIntersecting);
      });
    }, { threshold: 0.1 });
    stickyObserver.observe(downloadSection);
  }

})();
