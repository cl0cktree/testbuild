/**
 * Ultimate Optimized move.js (Bug Fixed)
 * - Fixed: NodeList cloneNode error
 * - Added: Sync Progress Bar, Lazy Loading, Infinite Loop, Dual Indicators, Page Counter
 */

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
    autoPlay: true,
    dragThreshold: 50
  };

  let state = {
    container: null, items: [], dots: [], thumbs: [], counter: null, progressBar: null,
    currentIndex: 1, isMoving: false, itemWidth: 0, timer: null,
    isPlaying: config.autoPlay, originalCount: 0, isDragging: false, startX: 0, startOffset: 0
  };

  const init = () => {
    state.container = document.querySelector(config.containerSelector);
    state.counter = document.querySelector(config.counterSelector);
    state.progressBar = document.querySelector(config.progressSelector);
    const originals = document.querySelectorAll(config.itemSelector);
    
    if (!state.container || originals.length === 0) return;

    state.originalCount = originals.length;

    // --- FIX: Cloning individual nodes instead of the NodeList ---
    const firstClone = originals[0].cloneNode(true);
    const lastClone = originals[state.originalCount - 1].cloneNode(true);
    
    state.container.appendChild(firstClone); // Add first slide to the end
    state.container.insertBefore(lastClone, state.container.firstChild); // Add last slide to the front

    state.items = state.container.children;
    state.container.style.touchAction = 'pan-y';
    state.container.style.willChange = 'transform'; 

    updateLayout();
    resetPos(false);
    createIndicators(originals);
    setupEvents();
    
    if (state.isPlaying) startAuto();
    loadImg(state.currentIndex);
    updateUI(state.currentIndex);
  };

  const updateProgress = (active) => {
    if (!state.progressBar) return;
    state.progressBar.style.transition = 'none';
    state.progressBar.style.transform = 'scaleX(0)';
    
    if (active && state.isPlaying) {
      state.progressBar.offsetWidth; // Force reflow
      state.progressBar.style.transition = `transform ${config.interval}ms linear`;
      state.progressBar.style.transform = 'scaleX(1)';
    }
  };

  const animate = (targetIdx, speed = config.duration) => {
    if (state.isMoving) return;
    state.isMoving = true;
    
    if (state.isPlaying) updateProgress(true);

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

  const resetPos = (anim = false) => {
    state.container.style.transition = anim ? `transform ${config.duration}ms` : 'none';
    state.container.style.transform = `translate3d(${-state.currentIndex * state.itemWidth}px, 0, 0)`;
  };

  const startAuto = () => { 
    stopAuto(); 
    if (!state.isPlaying) return;
    updateProgress(true);
    state.timer = setInterval(() => animate(state.currentIndex + 1), config.interval); 
  };

  const stopAuto = () => {
    clearInterval(state.timer);
    updateProgress(false);
  };

  const updateUI = (idx) => {
    const realIdx = (idx - 1 + state.originalCount) % state.originalCount;
    [state.dots, state.thumbs].forEach(list => {
      list.forEach((el, i) => el.classList.toggle('active', i === realIdx));
    });
    if (state.counter) state.counter.innerText = `${realIdx + 1} / ${state.originalCount}`;
  };

  const loadImg = (idx) => {
    const img = state.items[idx]?.querySelector('img[data-src]');
    if (img) { img.src = img.dataset.src; img.removeAttribute('data-src'); img.style.opacity = '1'; }
  };

  const setupEvents = () => {
    const triggerMove = (dir) => { animate(dir === 'next' ? state.currentIndex + 1 : state.currentIndex - 1); if (state.isPlaying) startAuto(); };

    document.querySelector(config.prevBtnSelector).onclick = () => triggerMove('prev');
    document.querySelector(config.nextBtnSelector).onclick = () => triggerMove('next');
    
    document.querySelector(config.toggleBtnSelector).onclick = (e) => {
      state.isPlaying = !state.isPlaying;
      e.target.classList.toggle('paused', !state.isPlaying);
      state.isPlaying ? startAuto() : stopAuto();
    };

    state.container.onmouseenter = () => { if (state.isPlaying) stopAuto(); };
    state.container.onmouseleave = () => { if (state.isPlaying) startAuto(); };

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

  const createIndicators = (originals) => {
    const dotWrap = document.querySelector(config.dotSelector);
    const thumbWrap = document.querySelector(config.thumbSelector);
    originals.forEach((item, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.onclick = () => { animate(i + 1); if (state.isPlaying) startAuto(); };
      dotWrap?.appendChild(dot);
      state.dots.push(dot);

      const thumb = document.createElement('button');
      thumb.className = 'thumb_item';
      const src = item.querySelector('img').dataset.src || item.querySelector('img').src;
      thumb.innerHTML = `<img src="${src}">`;
      thumb.onclick = () => { animate(i + 1); if (state.isPlaying) startAuto(); };
      thumbWrap?.appendChild(thumb);
      state.thumbs.push(thumb);
    });
  };

  const updateLayout = () => {
    state.itemWidth = state.container.parentElement.offsetWidth;
    Array.from(state.items).forEach(el => el.style.width = state.itemWidth + 'px');
    state.container.style.width = (state.itemWidth * state.items.length) + 'px';
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', Slider.init);