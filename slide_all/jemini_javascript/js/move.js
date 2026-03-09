const Slider = (() => {
  const config = {
    containerSelector: '.slide_list',
    itemSelector: '.slide_list > li',
    prevBtnSelector: '.prev',
    nextBtnSelector: '.next',
    toggleBtnSelector: '.btn_toggle',
    dotSelector: '.dot_indicator',
    thumbSelector: '.thumb_indicator',
    counterSelector: '.page_counter',
	progressSelector: '.progress_bar',
    duration: 450,
    interval: 3000,
    autoPlay: true
  };

  let state = {
    container: null, items: [], dots: [], thumbs: [], counter: null, progressBar: null,
    currentIndex: 1, isMoving: false, itemWidth: 0, timer: null,
    isPlaying: config.autoPlay, originalCount: 0, isDragging: false, startX: 0
  };

  const init = () => {
    state.container = document.querySelector(config.containerSelector);
    state.counter = document.querySelector(config.counterSelector);
	state.progressBar = document.querySelector(config.progressSelector);
    const originals = document.querySelectorAll(config.itemSelector);
    if (!state.container || originals.length === 0) return;

    state.originalCount = originals.length;

    // Infinite Loop Clones
    state.container.appendChild(originals[0].cloneNode(true));
    state.container.insertBefore(originals[state.originalCount - 1].cloneNode(true), state.container.firstChild);

    state.items = state.container.children;
    updateLayout();
    resetPos(false);
    createIndicators(originals);
    setupEvents();
    
    if (state.isPlaying) startAuto();
    loadImg(state.currentIndex);
    updateUI(state.currentIndex);
  };

  const createIndicators = (originals) => {
    const dotWrap = document.querySelector(config.dotSelector);
    const thumbWrap = document.querySelector(config.thumbSelector);
    originals.forEach((item, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.onclick = () => goTo(i + 1);
      dotWrap?.appendChild(dot);
      state.dots.push(dot);

      const thumb = document.createElement('button');
      thumb.className = 'thumb_item';
      const src = item.querySelector('img').dataset.src || item.querySelector('img').src;
      thumb.innerHTML = `<img src="${src}">`;
      thumb.onclick = () => goTo(i + 1);
      thumbWrap?.appendChild(thumb);
      state.thumbs.push(thumb);
    });
  };

  const animate = (targetIdx, speed = config.duration) => {
    if (state.isMoving) return;
    state.isMoving = true;
    loadImg(targetIdx);
    
    state.container.style.transition = `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    state.container.style.transform = `translate3d(${-targetIdx * state.itemWidth}px, 0, 0)`;

    state.currentIndex = targetIdx;
    updateUI(targetIdx);

    setTimeout(() => {
      if (state.currentIndex === 0) state.currentIndex = state.originalCount;
      else if (state.currentIndex === state.originalCount + 1) state.currentIndex = 1;
      resetPos(false);
      state.isMoving = false;
    }, speed);
  };

  const updateUI = (idx) => {
    const realIdx = (idx - 1 + state.originalCount) % state.originalCount;
    // Update Indicators
    [state.dots, state.thumbs].forEach(list => {
      list.forEach((el, i) => el.classList.toggle('active', i === realIdx));
    });
    // Update Counter
    if (state.counter) state.counter.innerText = `${realIdx + 1} / ${state.originalCount}`;
  };
  // --- Progress Bar Logic ---
  const updateProgress = (active) => {
    if (!state.progressBar) return;
    state.progressBar.style.transition = 'none';
    state.progressBar.style.transform = 'scaleX(0)';
    
    if (active) {
      // Small timeout to allow the browser to process the 'none' transition reset
      setTimeout(() => {
        state.progressBar.style.transition = `transform ${config.interval-200}ms linear`;
        state.progressBar.style.transform = 'scaleX(1)';
      }, 50);
    }
  };

  const resetPos = (anim = false) => {
    state.container.style.transition = anim ? `transform ${config.duration}ms` : 'none';
    state.container.style.transform = `translate3d(${-state.currentIndex * state.itemWidth}px, 0, 0)`;
  };

  const loadImg = (idx) => {
    const img = state.items[idx]?.querySelector('img[data-src]');
    if (img) { img.src = img.dataset.src; img.removeAttribute('data-src'); img.style.opacity = '1'; }
  };

  const startAuto = () => { stopAuto(); updateProgress(true); state.timer = setInterval(() => animate(state.currentIndex + 1), config.interval); };
  const stopAuto = () => {clearInterval(state.timer); updateProgress(false);}
  const goTo = (idx) => { animate(idx); if (state.isPlaying) startAuto(); };

  const setupEvents = () => {
    document.querySelector(config.prevBtnSelector).onclick = () => { animate(state.currentIndex - 1); if (state.isPlaying) startAuto(); };
    document.querySelector(config.nextBtnSelector).onclick = () => { animate(state.currentIndex + 1); if (state.isPlaying) startAuto(); };
    
    document.querySelector(config.toggleBtnSelector).onclick = (e) => {
      state.isPlaying = !state.isPlaying;
      e.target.classList.toggle('paused', !state.isPlaying);
      state.isPlaying ? startAuto() : stopAuto();
    };

    // Hover Pause Logic
    state.container.onmouseenter = () => { if (state.isPlaying) stopAuto(); };
    state.container.onmouseleave = () => { if (state.isPlaying) startAuto(); };

    // Pointer Drag
    state.container.onpointerdown = (e) => {
      if (state.isMoving) return;
      state.isDragging = true; state.startX = e.pageX;
      state.startOffset = -state.currentIndex * state.itemWidth;
      state.container.style.transition = 'none'; stopAuto();
    };
    window.onpointermove = (e) => {
      if (!state.isDragging) return;
      state.container.style.transform = `translate3d(${state.startOffset + (e.pageX - state.startX)}px, 0, 0)`;
    };
    window.onpointerup = (e) => {
      if (!state.isDragging) return;
      state.isDragging = false;
      const diff = e.pageX - state.startX;
      Math.abs(diff) > 50 ? animate(diff > 0 ? state.currentIndex - 1 : state.currentIndex + 1) : resetPos(true);
      if (state.isPlaying) startAuto();
    };

    window.onresize = () => { updateLayout(); resetPos(false); };
    state.container.ondragstart = (e) => e.preventDefault();
  };

  const updateLayout = () => {
    state.itemWidth = state.container.parentElement.offsetWidth;
    Array.from(state.items).forEach(el => el.style.width = state.itemWidth + 'px');
    state.container.style.width = (state.itemWidth * state.items.length) + 'px';
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', Slider.init);