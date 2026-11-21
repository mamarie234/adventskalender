(() => {
  const data = window.CASE_DATA;
  const preview = new URLSearchParams(location.search).get('preview') === '1';
  const storageKey = 'akte24-progress-v2';
  let progress = {};
  try { progress = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (_) { progress = {}; }
  let activeDoor = null;
  const doorsEl = document.getElementById('doors');
  const modal = document.getElementById('door-modal');
  const answerInput = document.getElementById('puzzle-answer');
  const feedback = document.getElementById('puzzle-feedback');
  const letterReveal = document.getElementById('letter-reveal');
  const letterBoard = document.getElementById('letter-board');

  const positions = [];
  [24, 42, 60, 78].forEach(y => [21, 33, 45, 57, 69, 81].forEach(x => positions.push({x,y})));
  const normalize = value => String(value ?? '').toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
  const isUnlocked = day => preview || (new Date().getFullYear() > 2026 || (new Date().getFullYear() === 2026 && new Date().getMonth() === 11 && new Date().getDate() >= day));
  const save = () => { try { localStorage.setItem(storageKey, JSON.stringify(progress)); } catch (_) {} };

  function renderLetters() {
    letterBoard.innerHTML = '';
    data.doors.forEach(item => {
      const cell = document.createElement('div');
      cell.className = 'letter-cell' + (progress[item.day] ? '' : ' empty');
      cell.textContent = progress[item.day] ? item.letter : '·';
      cell.title = `Türchen ${item.day}`;
      letterBoard.appendChild(cell);
    });
    const solved = data.doors.filter(item => progress[item.day]).length;
    document.getElementById('progress-label').textContent = `${solved} / 24 Hinweise gelöst`;
  }

  function renderDoors() {
    doorsEl.innerHTML = '';
    data.doors.forEach((item, index) => {
      const pos = positions[index];
      const button = document.createElement('button');
      const unlocked = isUnlocked(item.day);
      button.type = 'button';
      button.className = 'door' + (progress[item.day] ? ' done' : '');
      button.style.left = `${pos.x}%`;
      button.style.top = `${pos.y}%`;
      button.textContent = progress[item.day] ? '✓' : String(item.day).padStart(2,'0');
      button.setAttribute('aria-label', `Türchen ${item.day}${progress[item.day] ? ', gelöst' : unlocked ? ', öffnen' : ', noch verschlossen'}`);
      button.disabled = !unlocked;
      button.addEventListener('click', () => openDoor(item));
      doorsEl.appendChild(button);
    });
    renderLetters();
  }

  function openDoor(item) {
    activeDoor = item;
    document.getElementById('modal-day').textContent = `BEWEISSTÜCK ${String(item.day).padStart(2,'0')} · ${String(item.day).padStart(2,'0')}. DEZEMBER`;
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-story').innerHTML = item.story;
    document.getElementById('modal-puzzle').textContent = item.puzzle;
    answerInput.value = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    letterReveal.hidden = !progress[item.day];
    document.getElementById('revealed-letter').textContent = item.letter;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    if (!progress[item.day]) setTimeout(() => answerInput.focus(), 80);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    activeDoor = null;
  }

  document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  document.getElementById('puzzle-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!activeDoor) return;
    if (normalize(answerInput.value) === normalize(activeDoor.answer)) {
      progress[activeDoor.day] = true;
      save();
      feedback.textContent = 'Richtig kombiniert. Ein weiteres Puzzleteil ist gesichert.';
      feedback.className = 'feedback success';
      letterReveal.hidden = false;
      document.getElementById('revealed-letter').textContent = activeDoor.letter;
      renderDoors();
    } else {
      feedback.textContent = 'Das passt noch nicht zur Akte. Prüfe die Angaben und versuche es erneut.';
      feedback.className = 'feedback error';
    }
  });

  document.getElementById('final-form').addEventListener('submit', event => {
    event.preventDefault();
    const result = document.getElementById('final-result');
    const solved = data.doors.every(item => progress[item.day]);
    result.hidden = false;
    if (!solved) {
      result.innerHTML = '<h3>Die Akte ist noch unvollständig.</h3><p>Es fehlen noch Beweisstücke. Löse zuerst alle 24 Türchen.</p>';
      return;
    }
    if (normalize(document.getElementById('final-code').value) === normalize(data.finalCode)) {
      result.innerHTML = `<h3>${data.finalTitle}</h3><p>${data.finalText}</p>`;
    } else {
      result.innerHTML = '<h3>Die Schlussfolgerung stimmt noch nicht.</h3><p>Ordne die 24 Buchstaben in der Reihenfolge der Türchen und versuche es erneut.</p>';
    }
  });

  renderDoors();
  if (preview) {
    const notice = document.createElement('div');
    notice.textContent = 'VORSCHAU-MODUS – alle Türchen sind zum Testen geöffnet.';
    notice.style.cssText = 'position:sticky;top:0;z-index:25;background:#7b3b37;color:#fff;text-align:center;padding:7px;font:10px DM Mono,monospace;letter-spacing:.08em';
    document.body.prepend(notice);
  }
})();
