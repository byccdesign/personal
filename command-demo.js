(() => {
  const demos = [...document.querySelectorAll('.command-demo')];
  if (!demos.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));
  const orbPoints = Array.from({ length: 132 }, (_, index) => {
    const y = 1 - (index / 131) * 2;
    const pointRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(angle) * pointRadius, y, z: Math.sin(angle) * pointRadius };
  });

  const drawOrb = (canvas, seconds) => {
    const context = canvas.getContext('2d');
    if (!context) return;

    const size = 32;
    const pixelRatio = Math.min(2, window.devicePixelRatio || 1);
    if (canvas.width !== size * pixelRatio || canvas.height !== size * pixelRatio) {
      canvas.width = size * pixelRatio;
      canvas.height = size * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    context.clearRect(0, 0, size, size);
    const rotation = seconds * 0.46;
    const cosine = Math.cos(rotation);
    const sine = Math.sin(rotation);
    const pulse = 1 + Math.sin(seconds * 1.45) * 0.035;
    const radius = size * 0.37 * pulse;

    orbPoints.map((point) => ({
      x: point.x * cosine - point.z * sine,
      y: point.y + Math.sin(seconds * 0.72 + point.x * 2.4) * 0.018,
      z: point.x * sine + point.z * cosine,
    })).sort((a, b) => a.z - b.z).forEach((point) => {
      const depth = (point.z + 1) / 2;
      const perspective = 0.9 + depth * 0.16;
      const x = size / 2 + point.x * radius * perspective;
      const y = size / 2 + point.y * radius * perspective;
      const dotRadius = 0.28 + depth * 0.48;
      const alpha = 0.17 + depth * 0.73;
      const red = Math.round(102 + depth * 16);
      const green = Math.round(116 + depth * 17);
      const blue = Math.round(224 + depth * 24);
      context.beginPath();
      context.arc(x, y, dotRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      context.fill();
    });
  };

  demos.forEach((demo) => {
    const query = demo.querySelector('.command-demo__query');
    const results = [...demo.querySelectorAll('.command-demo__result')];
    const canvas = demo.querySelector('.command-demo__orb');
    const flowNodes = [...demo.querySelectorAll('.command-demo__flow-node')];
    const flowEdges = [...demo.querySelectorAll('.command-demo__connections g')];
    const ideation = demo.querySelector('.command-demo__ideation');
    const mobileVideo = demo.querySelector('.command-demo__mobile-video');
    const perspectiveMode = demo.classList.contains('command-demo--perspective');
    const shouldUseVideo = () => Boolean(mobileVideo && !perspectiveMode);
    let runId = 0;
    let orbFrame = 0;
    let visible = false;

    const reset = () => {
      demo.classList.remove('is-generating', 'is-complete', 'is-flow-exiting', 'is-ideating', 'is-color-sorted', 'is-masonry', 'is-drawing', 'is-reordering', 'is-ideation-exiting', 'is-awaiting-command', 'is-command-opening');
      if (perspectiveMode) demo.classList.add('is-awaiting-command');
      query.textContent = '';
      results.forEach((result, index) => {
        result.classList.toggle('is-active', index === 0);
        result.classList.remove('is-filtered-out');
      });
      flowNodes.forEach((node) => node.classList.remove('is-created'));
      flowEdges.forEach((edge) => edge.classList.remove('is-connected'));
    };

    const showCompleteFlow = () => {
      reset();
      demo.classList.remove('is-awaiting-command', 'is-command-opening');
      demo.classList.add('is-complete');
      flowNodes.forEach((node) => node.classList.add('is-created'));
      flowEdges.forEach((edge) => edge.classList.add('is-connected'));
      if (ideation) demo.classList.add('is-ideating', 'is-color-sorted', 'is-masonry', 'is-drawing');
    };

    const animateOrb = (time) => {
      drawOrb(canvas, time / 1000);
      orbFrame = visible && !document.hidden && !reducedMotion.matches
        ? window.requestAnimationFrame(animateOrb)
        : 0;
    };

    const startOrb = () => {
      if (!orbFrame && visible && !document.hidden && !reducedMotion.matches) {
        orbFrame = window.requestAnimationFrame(animateOrb);
      }
    };

    const play = async () => {
      const currentRun = ++runId;
      const isCurrent = () => currentRun === runId && visible && !document.hidden && !reducedMotion.matches;
      reset();
      await wait(perspectiveMode ? 320 : 600);
      if (!isCurrent()) return;

      if (perspectiveMode) {
        demo.classList.add('is-command-opening');
        await wait(260);
        if (!isCurrent()) return;
        demo.classList.remove('is-awaiting-command', 'is-command-opening');
        await wait(210);
        if (!isCurrent()) return;
      }

      const phrase = 'process flow';
      for (let index = 1; index <= phrase.length; index += 1) {
        query.textContent = phrase.slice(0, index);
        const needle = query.textContent.toLowerCase();
        results.forEach((result) => {
          result.classList.toggle('is-filtered-out', !result.dataset.command.includes(needle));
        });
        await wait(index === 7 ? 120 : 48);
        if (!isCurrent()) return;
      }

      await wait(340);
      if (!isCurrent()) return;
      demo.classList.add('is-generating');
      await wait(620);
      if (!isCurrent()) return;
      demo.classList.remove('is-generating');
      demo.classList.add('is-complete');

      const buildSequence = [
        ['node', 'customer'],
        ['node', 'platform'],
        ['edge', 'e1'],
        ['node', 'account'],
        ['edge', 'e2'],
        ['node', 'financial'],
        ['edge', 'e3'],
        ['node', 'cardholder'],
        ['edge', 'e4'],
        ['node', 'external'],
        ['edge', 'e5'],
      ];

      for (const [type, id] of buildSequence) {
        const element = type === 'node'
          ? demo.querySelector(`[data-node="${id}"]`)
          : demo.querySelector(`[data-edge="${id}"]`);
        element?.classList.add(type === 'node' ? 'is-created' : 'is-connected');
        await wait(type === 'node' ? 160 : 230);
        if (!isCurrent()) return;
      }

      await wait(620);
      if (!isCurrent()) return;

      if (ideation) {
        demo.classList.add('is-flow-exiting');
        await wait(320);
        if (!isCurrent()) return;
        demo.classList.add('is-ideating');
        demo.classList.remove('is-flow-exiting', 'is-complete');
        await wait(760);
        if (!isCurrent()) return;

        demo.classList.add('is-reordering');
        await wait(130);
        if (!isCurrent()) return;
        demo.classList.add('is-color-sorted');
        demo.classList.remove('is-reordering');
        await wait(720);
        if (!isCurrent()) return;

        demo.classList.add('is-reordering');
        await wait(130);
        if (!isCurrent()) return;
        demo.classList.add('is-masonry');
        demo.classList.remove('is-reordering');
        await wait(780);
        if (!isCurrent()) return;

        demo.classList.add('is-drawing');
        await wait(1350);
        if (!isCurrent()) return;
        demo.classList.remove('is-drawing');
        await wait(460);
        if (!isCurrent()) return;
        demo.classList.add('is-ideation-exiting');
        await wait(320);
        if (!isCurrent()) return;
      } else {
        await wait(720);
        if (!isCurrent()) return;
      }

      reset();
      await wait(420);
      if (isCurrent()) play();
    };

    const setVisible = (nextVisible) => {
      visible = nextVisible;
      runId += 1;
      if (shouldUseVideo()) {
        if (orbFrame) window.cancelAnimationFrame(orbFrame);
        orbFrame = 0;
        reset();
        mobileVideo.playbackRate = perspectiveMode ? 1.35 : 1;
        mobileVideo.defaultPlaybackRate = perspectiveMode ? 1.35 : 1;
        if (visible) mobileVideo.play().catch(() => {});
        else mobileVideo.pause();
        return;
      }
      mobileVideo?.pause();
      if (visible) {
        startOrb();
        if (reducedMotion.matches) showCompleteFlow();
        else play();
      } else if (orbFrame) {
        window.cancelAnimationFrame(orbFrame);
        orbFrame = 0;
      }
    };

    drawOrb(canvas, 0.7);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.18,
      rootMargin: '80px 0px',
    });
    observer.observe(demo);

    const onMotionPreferenceChange = () => setVisible(visible);
    if (typeof reducedMotion.addEventListener === 'function') reducedMotion.addEventListener('change', onMotionPreferenceChange);
    else reducedMotion.addListener(onMotionPreferenceChange);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && orbFrame) {
        window.cancelAnimationFrame(orbFrame);
        orbFrame = 0;
      } else {
        startOrb();
        if (visible && !reducedMotion.matches) play();
      }
    });
  });
})();
