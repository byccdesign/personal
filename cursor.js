
    /* =========================
    CUSTOM CURSOR
    ========================= */
    const cursor = document.querySelector(".cursor");
    const ring = document.querySelector(".cursor-ring");

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    if (cursor && ring) {
      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      });

      function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        requestAnimationFrame(animateRing);
      }

      animateRing();

      const hoverTargets = document.querySelectorAll(
        "a, button, .hover-target, [role='button']"
      );

      hoverTargets.forEach((target) => {
        target.addEventListener("mouseenter", () => {
          cursor.classList.add("active");
          ring.classList.add("active");
        });

        target.addEventListener("mouseleave", () => {
          cursor.classList.remove("active");
          ring.classList.remove("active");
        });
      });
    }

    /* =========================
    TEXT LOOP
    ========================= */

    const textLoops = document.querySelectorAll('[data-text-loop]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    textLoops.forEach((loop) => {
      const texts = (loop.dataset.texts || loop.textContent || '')
        .split('|')
        .map((text) => text.trim())
        .filter(Boolean);

      if (!texts.length) return;

      const interval = Number(loop.dataset.interval) || 2200;
      let currentIndex = 0;
      let currentItem = document.createElement('span');
      currentItem.className = 'about-text-loop__item';
      currentItem.textContent = texts[currentIndex];
      loop.textContent = '';
      loop.appendChild(currentItem);
      loop.style.width = `${currentItem.offsetWidth}px`;

      if (texts.length < 2 || prefersReducedMotion.matches) return;

      window.setInterval(() => {
        if (document.hidden) return;

        const previousItem = currentItem;
        currentIndex = (currentIndex + 1) % texts.length;

        const nextItem = document.createElement('span');
        nextItem.className = 'about-text-loop__item is-entering';
        nextItem.textContent = texts[currentIndex];
        loop.appendChild(nextItem);

        loop.style.width = `${nextItem.offsetWidth}px`;
        previousItem.classList.add('is-leaving');

        window.setTimeout(() => {
          previousItem.remove();
          nextItem.classList.remove('is-entering');
          currentItem = nextItem;
        }, 560);
      }, interval);
    });

    const featuredWork = document.querySelector('.featured-work[data-case-study-url]');
    const floatingCaseTooltip = document.querySelector('.floating-case-tooltip');

    if (featuredWork) {
      let pointerStartX = 0;
      let pointerStartY = 0;
      let pointerMoved = false;

      function moveCaseTooltip(event) {
        if (!floatingCaseTooltip) return;
        floatingCaseTooltip.textContent = featuredWork.dataset.tooltip || 'View Case Study';
        floatingCaseTooltip.style.setProperty('--tooltip-x', `${event.clientX}px`);
        floatingCaseTooltip.style.setProperty('--tooltip-y', `${event.clientY}px`);
      }

      function showCaseTooltip() {
        floatingCaseTooltip?.classList.add('is-visible');
      }

      function hideCaseTooltip() {
        floatingCaseTooltip?.classList.remove('is-visible');
      }

      function centerCaseTooltip() {
        if (!floatingCaseTooltip) return;
        const rect = featuredWork.getBoundingClientRect();
        floatingCaseTooltip.textContent = featuredWork.dataset.tooltip || 'View Case Study';
        floatingCaseTooltip.style.setProperty('--tooltip-x', `${rect.left + rect.width / 2}px`);
        floatingCaseTooltip.style.setProperty('--tooltip-y', `${rect.top + 24}px`);
      }

      featuredWork.addEventListener('pointerenter', (event) => {
        moveCaseTooltip(event);
        showCaseTooltip();
      });

      featuredWork.addEventListener('pointermove', moveCaseTooltip);
      featuredWork.addEventListener('pointerleave', hideCaseTooltip);
      featuredWork.addEventListener('focus', () => {
        centerCaseTooltip();
        showCaseTooltip();
      });
      featuredWork.addEventListener('blur', hideCaseTooltip);

      featuredWork.addEventListener('pointerdown', (event) => {
        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
        pointerMoved = false;
      });

      featuredWork.addEventListener('pointermove', (event) => {
        const distanceX = Math.abs(event.clientX - pointerStartX);
        const distanceY = Math.abs(event.clientY - pointerStartY);
        pointerMoved = pointerMoved || distanceX > 8 || distanceY > 8;
      });

      featuredWork.addEventListener('click', (event) => {
        if (pointerMoved || event.target.closest('a, button')) return;
        window.location.href = featuredWork.dataset.caseStudyUrl;
      });

      featuredWork.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        window.location.href = featuredWork.dataset.caseStudyUrl;
      });
    }

    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    let copiedTimer;

    async function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }

    emailLinks.forEach((link) => {
      link.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = link.href.replace(/^mailto:/, '').split('?')[0];
        try {
          await copyText(decodeURIComponent(email));
        } catch (error) {
          window.location.href = link.href;
          return;
        }

        emailLinks.forEach((emailLink) => {
          emailLink.classList.remove('is-copied');
        });

        link.classList.add('is-copied');
        window.clearTimeout(copiedTimer);
        copiedTimer = window.setTimeout(() => {
          link.classList.remove('is-copied');
        }, 1400);
      });
    });

    /* =========================
    BRAND PROJECT MODAL
    ========================= */

    const brandProjectModal = document.querySelector('.brand-project-modal');
    const brandProjectTriggers = document.querySelectorAll('[data-project-modal]');

    if (brandProjectModal && brandProjectTriggers.length) {
      const modalPanel = brandProjectModal.querySelector('.brand-project-modal__panel');
      const closeButton = brandProjectModal.querySelector('.brand-project-modal__close');
      const modalTitle = brandProjectModal.querySelector('#brand-project-modal-title');
      const modalCategory = brandProjectModal.querySelector('.brand-project-modal__category');
      const modalDescription = brandProjectModal.querySelector('.brand-project-modal__description');
      const modalMeta = brandProjectModal.querySelector('.brand-project-modal__meta');
      const modalMedia = brandProjectModal.querySelector('.brand-project-modal__media');
      const modalVideo = modalMedia.querySelector('video');
      const modalImage = modalMedia.querySelector('img');
      const modalGallery = brandProjectModal.querySelector('.brand-project-modal__gallery');
      let activeProjectTrigger = null;

      function setModalContent(trigger) {
        modalTitle.textContent = trigger.dataset.projectTitle || '';
        modalCategory.textContent = trigger.dataset.projectCategory || '';
        modalDescription.textContent = trigger.dataset.projectDescription || '';
        modalMeta.textContent = trigger.dataset.projectMeta || '';

        const image = trigger.dataset.projectImage || '';
        const video = trigger.dataset.projectVideo || '';
        const alt = trigger.dataset.projectAlt || '';

        modalImage.src = image;
        modalImage.alt = alt;
        modalVideo.poster = image;
        modalMedia.classList.toggle('has-video', Boolean(video));

        modalVideo.pause();
        modalVideo.removeAttribute('src');

        if (video) {
          modalVideo.src = video;
          modalVideo.load();
        }

        modalGallery.innerHTML = '';

        let galleryItems = [];

        try {
          galleryItems = JSON.parse(trigger.dataset.projectGallery || '[]');
        } catch (error) {
          galleryItems = [];
        }

        galleryItems.forEach((item) => {
          if (!item.src) return;

          const galleryFigure = document.createElement('figure');
          galleryFigure.className = `brand-project-modal__gallery-item is-${item.layout || 'full'}`;

          const galleryImage = document.createElement('img');
          galleryImage.src = item.src;
          galleryImage.alt = item.alt || '';
          galleryImage.loading = 'lazy';

          galleryFigure.appendChild(galleryImage);
          modalGallery.appendChild(galleryFigure);
        });
      }

      function openBrandProjectModal(trigger) {
        activeProjectTrigger = trigger;
        setModalContent(trigger);
        document.body.classList.add('brand-modal-open');
        brandProjectModal.classList.add('is-open');
        brandProjectModal.setAttribute('aria-hidden', 'false');
        closeButton.focus({ preventScroll: true });

        if (modalVideo.src) {
          modalVideo.play().catch(() => {});
        }
      }

      function closeBrandProjectModal() {
        brandProjectModal.classList.remove('is-open');
        brandProjectModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('brand-modal-open');
        modalVideo.pause();

        if (activeProjectTrigger) {
          activeProjectTrigger.focus({ preventScroll: true });
        }
      }

      brandProjectTriggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          openBrandProjectModal(trigger);
        });

        trigger.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          openBrandProjectModal(trigger);
        });
      });

      closeButton.addEventListener('click', closeBrandProjectModal);

      brandProjectModal.addEventListener('click', (event) => {
        if (event.target === brandProjectModal || event.target === modalPanel) {
          closeBrandProjectModal();
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !brandProjectModal.classList.contains('is-open')) return;
        closeBrandProjectModal();
      });
    }


    /* =========================
    NAV SCROLL EFFECT
    ========================= */

    const navbar = document.getElementById('navbar');
    const backToTop = document.querySelector('.back-to-top');

    function updateScrollControls() {
      const hasScrolled = window.scrollY > 50;

    if (hasScrolled) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

      if (backToTop) {
        backToTop.classList.toggle('is-visible', window.scrollY > 500);
      }
    }

    window.addEventListener('scroll', updateScrollControls);
    updateScrollControls();

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    /* =========================
    CASE STUDY ANCHOR RAIL
    ========================= */

    const caseAnchorLinks = [...document.querySelectorAll('.case-anchor-nav a[href^="#"]')];

    if (caseAnchorLinks.length) {
      const caseAnchorSections = caseAnchorLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

      function setActiveCaseAnchor(id) {
        caseAnchorLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }

      const caseAnchorObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCaseAnchor(entry.target.id);
          }
        });
      }, {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0
      });

      caseAnchorSections.forEach((section) => {
        caseAnchorObserver.observe(section);
      });

      if (caseAnchorSections[0]) {
        setActiveCaseAnchor(caseAnchorSections[0].id);
      }
    }

    /* =========================
    CASE STUDY MODALS
    ========================= */

    const modalOpenButtons = [...document.querySelectorAll('[data-modal-open]')];
    let activeModalTrigger = null;

    modalOpenButtons.forEach((button) => {
      const modal = document.getElementById(button.dataset.modalOpen);

      if (!modal || typeof modal.showModal !== 'function') {
        return;
      }

      button.addEventListener('click', () => {
        activeModalTrigger = button;
        modal.showModal();
        document.body.classList.add('modal-open');
      });
    });

    document.querySelectorAll('.ewa-modal').forEach((modal) => {
      const closeButtons = modal.querySelectorAll('[data-modal-close]');

      closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
          modal.close();
        });
      });

      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.close();
        }
      });

      modal.addEventListener('close', () => {
        document.body.classList.remove('modal-open');

        if (activeModalTrigger) {
          activeModalTrigger.focus();
          activeModalTrigger = null;
        }
      });
    });

    /* =========================
    MOBILE NAVIGATION
    ========================= */

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobileNavQuery = window.matchMedia('(max-width: 768px)');

    function setNavOpen(isOpen) {
      if (!navToggle || !navLinks) {
        return;
      }

      document.body.classList.toggle('nav-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        setNavOpen(!document.body.classList.contains('nav-open'));
      });

      navLinks.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          setNavOpen(false);
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          setNavOpen(false);
        }
      });

      mobileNavQuery.addEventListener('change', (event) => {
        if (!event.matches) {
          setNavOpen(false);
        }
      });
    }

    /* =========================
    NOTES TYPEWRITER
    ========================= */

    const typewriterLines = [...document.querySelectorAll('[data-typewriter-text]')];

    if (typewriterLines.length) {
      const title = typewriterLines[0].closest('.notes-hero__title');

      typewriterLines.forEach((line) => {
        line.textContent = '';
      });

      async function typeLine(line) {
        const text = line.dataset.typewriterText || '';

        for (let i = 0; i <= text.length; i += 1) {
          line.textContent = text.slice(0, i);
          await new Promise(resolve => setTimeout(resolve, 58));
        }
      }

      async function runNotesTypewriter() {
        for (const line of typewriterLines) {
          await typeLine(line);
          await new Promise(resolve => setTimeout(resolve, 180));
        }

        if (title) {
          title.classList.add('is-complete');
        }
      }

      setTimeout(runNotesTypewriter, 320);
    }

    /* =========================
    PAGE TRANSITIONS
    ========================= */

    document.body.classList.add('page-transition-enter');
    requestAnimationFrame(() => {
      document.body.classList.remove('page-transition-enter');
    });

    window.addEventListener('pageshow', () => {
      document.body.classList.remove('page-transition-exit');
      document.body.classList.remove('page-transition-enter');
    });

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');

      if (!link) {
        return;
      }

      const url = new URL(link.href, window.location.href);
      const isSamePageHash =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash;

      const shouldSkipTransition =
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target ||
        link.hasAttribute('download') ||
        link.href.startsWith('mailto:') ||
        link.href.startsWith('tel:') ||
        url.origin !== window.location.origin ||
        isSamePageHash;

      if (shouldSkipTransition) {
        return;
      }

      event.preventDefault();
      document.body.classList.add('page-transition-exit');

      window.setTimeout(() => {
        window.location.href = url.href;
      }, 100);
    });

    /* =========================
    DRAGGABLE PAPER STACK
    ========================= */

    const draggablePapers = document.querySelectorAll('.about-hero__paper');
    let topPaperZ = 10;

    draggablePapers.forEach((paper) => {
      const dragState = {
        isDragging: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0
      };

      paper.addEventListener('pointerdown', (event) => {
        dragState.isDragging = true;
        dragState.startX = event.clientX - dragState.currentX;
        dragState.startY = event.clientY - dragState.currentY;

        paper.classList.add('is-dragging');
        paper.style.zIndex = String(topPaperZ++);
        paper.setPointerCapture(event.pointerId);
      });

      paper.addEventListener('pointermove', (event) => {
        if (!dragState.isDragging) {
          return;
        }

        dragState.currentX = event.clientX - dragState.startX;
        dragState.currentY = event.clientY - dragState.startY;

        paper.style.setProperty('--drag-x', `${dragState.currentX}px`);
        paper.style.setProperty('--drag-y', `${dragState.currentY}px`);
      });

      function stopDragging(event) {
        if (!dragState.isDragging) {
          return;
        }

        dragState.isDragging = false;
        paper.classList.remove('is-dragging');

        if (paper.hasPointerCapture(event.pointerId)) {
          paper.releasePointerCapture(event.pointerId);
        }
      }

      paper.addEventListener('pointerup', stopDragging);
      paper.addEventListener('pointercancel', stopDragging);
    });

    /* =========================
    ABOUT HERO PARALLAX
    ========================= */

    const aboutHero = document.querySelector('.about-hero');
    const aboutPapers = [...document.querySelectorAll('.about-hero__paper')];

    if (aboutHero && aboutPapers.length) {
      const clampParallax = (n, min, max) => Math.max(min, Math.min(max, n));
      const layerStrengths = [
        { x: -8, y: -10, scroll: 0.14 },
        { x: 7, y: -8, scroll: 0.1 },
        { x: -5, y: 9, scroll: 0.07 },
        { x: 12, y: 12, scroll: 0.16 }
      ];
      let pointerX = 0;
      let pointerY = 0;
      let targetX = 0;
      let targetY = 0;

      aboutHero.addEventListener('mousemove', (event) => {
        const rect = aboutHero.getBoundingClientRect();
        targetX = clampParallax((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
        targetY = clampParallax((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
      });

      aboutHero.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
      });

      function updateAboutHeroParallax() {
        const rect = aboutHero.getBoundingClientRect();
        const scrollAmount = clampParallax(-rect.top, 0, rect.height);

        pointerX += (targetX - pointerX) * 0.08;
        pointerY += (targetY - pointerY) * 0.08;

        aboutPapers.forEach((paper, index) => {
          const strength = layerStrengths[index] || layerStrengths[layerStrengths.length - 1];
          const parallaxX = pointerX * strength.x;
          const parallaxY = pointerY * strength.y - scrollAmount * strength.scroll;

          paper.style.setProperty('--parallax-x', `${parallaxX}px`);
          paper.style.setProperty('--parallax-y', `${parallaxY}px`);
        });

        requestAnimationFrame(updateAboutHeroParallax);
      }

      updateAboutHeroParallax();
    }

    // Calculate the actual path length and set CSS variable
    const cOutline = document.querySelector('.c-outline, #c-outline');
    if (cOutline) {
      const pathLength = cOutline.getTotalLength();
      
      // Match the dash to the real path length so the outline draws cleanly.
      document.documentElement.style.setProperty('--path-length', pathLength);
      cOutline.style.setProperty('--path-length', pathLength);
      
      cOutline.style.strokeDasharray = pathLength;
      cOutline.style.strokeDashoffset = pathLength;
    }

    // subtle mouse parallax
    const hero = document.querySelector('.hero');
    const center = document.querySelector('.center-content');
    const svg = document.querySelector('.c-wrapper svg');

    if (hero && center && svg) {
      hero.addEventListener('mousemove', (e) => {

        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);

        center.style.transform = `translate(${x * 12}px, ${y * 12}px)`;

        svg.style.transform =
          `translate(${x * 20}px, ${y * 20}px)`;
      });

      hero.addEventListener('mouseleave', () => {

        center.style.transform = `translate(0px, 0px)`;
        svg.style.transform = `translate(0px,0px)`;
      });
    }

    /* =========================
    SCROLL ANIMATIONS
    ========================= */

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el);
    });

    /* =========================
    PARALLAX SKILLS STORY
    ========================= */

    const skillsStory = document.getElementById('skills-story');

    if (skillsStory) {
      const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
      const lerp = (a, b, t) => a + (b - a) * t;

      const skillsOrb = document.getElementById('skillsOrbSystem');
      const skillsChapter = document.getElementById('skillsChapter');
      const skillsChapterTitle = document.getElementById('skillsChapterTitle');
      const skillsChapterText = document.getElementById('skillsChapterText');
      const skillsFinal = document.getElementById('skillsFinal');
      const skillsWave = document.getElementById('skillsWave');
      const skillsEnvironment = document.getElementById('skillsEnvironment');
      const skillsIntroCopy = document.getElementById('skillsIntroCopy');
      const skillsScene = document.querySelector('.skills-scene');
      const skillsNodes = ['skillStrategy', 'skillService', 'skillEnterprise', 'skillCreative', 'skillSystems']
        .map(id => document.getElementById(id))
        .filter(Boolean);
      const skillsPaths = ['skillPath1', 'skillPath2', 'skillPath3', 'skillPath4', 'skillPath5']
        .map(id => document.getElementById(id))
        .filter(Boolean);
      const skillsLabels = [...document.querySelectorAll('.skills-label')];
      const skillsSteps = [1, 2, 3, 4, 5]
        .map(i => document.getElementById(`skillStep${i}`))
        .filter(Boolean);

      const skillsChapters = [
        {
          title: 'Design is never just UI.',
          text: 'Every interface is connected to a business decision, a user journey, a system constraint, and a story.'
        },
        {
          title: 'Strategy connects everything.',
          text: 'Research, data, growth, and customer context shape the decisions behind the experience.'
        },
        {
          title: 'Systems make ideas scalable.',
          text: 'Components, accessibility, and documentation turn one-off design work into repeatable product quality.'
        },
        {
          title: 'Story gives systems meaning.',
          text: 'Art direction brings clarity, emotion, and momentum to product experiences.'
        }
      ];

      function setSkillsActiveStep(index) {
        skillsSteps.forEach((step, i) => {
          step.classList.toggle('active', i === index);
        });
      }

      function revealSkillNode(node, amount) {
        node.style.setProperty('--nodeOpacity', amount);
        node.style.setProperty('--nodeScale', lerp(0.5, 1, amount));
      }

      function revealSkillPath(path, amount) {
        path.style.setProperty('--pathOpacity', amount * 0.85);
        path.style.setProperty('--dash', lerp(120, 0, amount));
      }

      function updateSkillsStory() {
        const rect = skillsStory.getBoundingClientRect();
        const scrollable = skillsStory.offsetHeight - window.innerHeight;
        const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;

        if (skillsOrb) {
          skillsOrb.style.setProperty('--zoom', lerp(1.18, 0.82, progress));
          skillsOrb.style.setProperty('--tilt', `${lerp(0, 9, progress)}deg`);
        }

        if (skillsWave) {
          skillsWave.style.setProperty('--waveY', `${progress * 80}px`);
        }

        if (skillsEnvironment) {
          skillsEnvironment.style.setProperty('--gridMove', `${progress * -140}px`);
          skillsEnvironment.style.setProperty('--gridScale', lerp(1, 1.4, progress));
          skillsEnvironment.style.setProperty('--envOpacity', lerp(0.12, 0.42, progress));
        }

        const finalStepAmount = clamp((progress - 0.88) / 0.08, 0, 1);

        if (skillsScene) {
          skillsScene.style.setProperty('--sceneOpacity', lerp(1, 0.12, finalStepAmount));
        }

        if (skillsIntroCopy) {
          const introOpacity = clamp(1 - progress * 5.6, 0, 1);
          skillsIntroCopy.style.opacity = introOpacity;
          skillsIntroCopy.style.transform = `translateY(${progress * -40}px)`;
        }

        const revealAmounts = [
          clamp((progress - 0.05) / 0.12, 0, 1),
          clamp((progress - 0.18) / 0.12, 0, 1),
          clamp((progress - 0.30) / 0.12, 0, 1),
          clamp((progress - 0.45) / 0.12, 0, 1),
          clamp((progress - 0.58) / 0.12, 0, 1)
        ];

        skillsNodes.forEach((node, i) => revealSkillNode(node, revealAmounts[i] || 0));
        skillsPaths.forEach((path, i) => revealSkillPath(path, revealAmounts[i] || 0));

        const labelAmount = clamp((progress - 0.48) / 0.22, 0, 1);
        skillsLabels.forEach((label, i) => {
          const delay = (i % 4) * 0.08;
          label.style.setProperty('--skillOpacity', clamp(labelAmount - delay, 0, 1));
        });

        let chapterIndex = 0;
        if (progress > 0.38) chapterIndex = 1;
        if (progress > 0.58) chapterIndex = 2;
        if (progress > 0.72) chapterIndex = 3;
        const activeStepIndex = progress > 0.88 ? 4 : chapterIndex;

        if (skillsChapterTitle && skillsChapterText) {
          skillsChapterTitle.textContent = skillsChapters[chapterIndex].title;
          skillsChapterText.textContent = skillsChapters[chapterIndex].text;
        }

        if (skillsChapter) {
          const chapterFadeIn = clamp((progress - 0.2) / 0.08, 0, 1);
          const chapterFadeOut = clamp((0.86 - progress) / 0.06, 0, 1);
          const chapterOpacity = Math.min(chapterFadeIn, chapterFadeOut);
          skillsChapter.style.setProperty('--chapterOpacity', chapterOpacity);
          skillsChapter.style.setProperty('--chapterY', `${lerp(28, 0, chapterOpacity)}px`);
        }

        if (skillsFinal) {
          skillsFinal.style.setProperty('--finalOpacity', finalStepAmount);
          skillsFinal.style.setProperty('--finalY', `${lerp(50, 0, finalStepAmount)}px`);
        }

        setSkillsActiveStep(activeStepIndex);

        requestAnimationFrame(updateSkillsStory);
      }

      updateSkillsStory();

      skillsNodes.forEach((node, i) => {
        node.addEventListener('mouseenter', () => {
          skillsNodes.forEach(item => {
            item.style.filter = 'brightness(0.55)';
          });
          skillsPaths.forEach(path => {
            path.style.opacity = '0.1';
          });
          node.style.filter = 'brightness(1.22)';
          if (skillsPaths[i]) {
            skillsPaths[i].style.opacity = '1';
            skillsPaths[i].style.strokeWidth = '2.4';
          }
        });

        node.addEventListener('mouseleave', () => {
          skillsNodes.forEach(item => {
            item.style.filter = '';
          });
          skillsPaths.forEach(path => {
            path.style.opacity = '';
            path.style.strokeWidth = '';
          });
        });
      });
    }
