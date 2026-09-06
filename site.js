(() => {
  'use strict';
  const gate = document.getElementById('gate');
  const portfolio = document.getElementById('portfolio');
  const input = document.getElementById('pw-input');
  const error = document.getElementById('pw-error');
  function unlock() {
    gate.hidden = true;
    portfolio.hidden = false;
    document.querySelectorAll('iframe[data-src]').forEach(frame => {
      frame.src = frame.dataset.src;
      frame.removeAttribute('data-src');
    });
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) requestAnimationFrame(() => target.scrollIntoView());
    }
  }
  try { if (sessionStorage.getItem('unlocked') === 'true') unlock(); } catch (_) {}
  document.getElementById('gate-form').addEventListener('submit', event => {
    event.preventDefault();
    if (input.value === 'Houdini2025') {
      try { sessionStorage.setItem('unlocked', 'true'); } catch (_) {}
      input.value = '';
      error.textContent = '';
      unlock();
      const main = document.getElementById('main');
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    } else {
      error.textContent = 'Incorrect password. Please try again.';
      input.value = '';
      input.focus();
    }
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const copy = document.getElementById('copy-reel');
  let timer;
  if (copy) copy.addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText('https://drive.google.com/file/d/15Wshj1lpkQBLh-7AZ3jENdFcqkd1Y3ts/view');
      status.textContent = 'Link copied';
    } catch (_) { status.textContent = 'Use Open reel to copy its address.'; }
    timer = setTimeout(() => { status.textContent = ''; }, 4000);
  });
})();
