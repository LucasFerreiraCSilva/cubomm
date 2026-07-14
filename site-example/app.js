// Controle simples de montagem, progresso e exibição de tempo
(() => {
  const startBtn = document.getElementById('start');
  const resetBtn = document.getElementById('reset');
  const progressEl = document.getElementById('progress');
  const timeEl = document.getElementById('time');
  const hideCheckbox = document.getElementById('hide-time');
  const finishedEl = document.getElementById('finished');

  let timer = null;
  let startTime = 0;
  let elapsed = 0;
  let progress = 0;
  const duration = 10000; // 10s de montagem simulada

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function updateUI() {
    progressEl.style.width = `${progress}%`;

    const nowElapsed = elapsed + (timer ? Date.now() - startTime : 0);
    timeEl.textContent = formatTime(nowElapsed);

    // Lógica de ocultar: se checkbox marcado e montagem não finalizada, manter oculto
    const isHidden = hideCheckbox.checked && progress < 100;
    timeEl.style.visibility = isHidden ? 'hidden' : 'visible';

    if (progress >= 100) {
      finishedEl.classList.remove('hidden');
      // garantir que o tempo final fique visível quando terminar
      timeEl.style.visibility = 'visible';
      stopTimer();
    } else {
      finishedEl.classList.add('hidden');
    }
  }

  function tick() {
    const now = Date.now();
    const delta = now - startTime;
    progress = Math.min(100, Math.floor((elapsed + delta) / duration * 100));
    updateUI();
  }

  function startTimer() {
    if (timer) return;
    startTime = Date.now();
    timer = setInterval(tick, 100);
  }

  function stopTimer() {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
    elapsed = duration; // fixar tempo final
    progress = 100;
    updateUI();
  }

  function resetAll() {
    stopTimer();
    elapsed = 0;
    progress = 0;
    timeEl.textContent = '00:00';
    timeEl.style.visibility = hideCheckbox.checked ? 'hidden' : 'visible';
    finishedEl.classList.add('hidden');
    progressEl.style.width = '0%';
  }

  startBtn.addEventListener('click', () => {
    resetAll();
    startTimer();
  });

  resetBtn.addEventListener('click', resetAll);

  // Persistir preferência de ocultar tempo no localStorage
  const STORAGE_KEY = 'cubomm.hideTime';
  // Carregar preferência salva
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) hideCheckbox.checked = saved === '1';
  } catch (e) {}

  hideCheckbox.addEventListener('change', () => {
    try { localStorage.setItem(STORAGE_KEY, hideCheckbox.checked ? '1' : '0'); } catch (e) {}
    updateUI();
  });

  // UI inicial
  updateUI();
})();
