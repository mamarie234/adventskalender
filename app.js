(() => {
  const $ = (selector) => document.querySelector(selector);
  const doorsEl = $('#doors');
  const modal = $('#door-modal');
  const answerInput = $('#puzzle-answer');
  const feedback = $('#puzzle-feedback');
  const reveal = $('#letter-reveal');
  let activeDoor = null;

  const today = new Date();
  const currentMonth = today.getMonth(); // 0 = Januar, 11 = Dezember
  const currentDay = today.getDate();
  const preview = new URLSearchParams(location.search).has('preview');
  const isDecember = currentMonth === 11;
  const unlockedThrough = preview ? 24 : (isDecember ? currentDay : 0);
  const storageKey = 'akte24-progress-v1';
  const progress = JSON.parse(localStorage.getItem(storageKey) || '{}');

  function normalize(value) {
    return value.toLocaleUpperCase('de-DE').normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z0-9]/g, '');
  }

  function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }

  function renderDoors() {
    CASE_CONTENT.doors.forEach((door) => {
      const button = document.createElement('button');
      const unlocked = door.day <= unlockedThrough;
      const done = Boolean(progress[door.day]);
      button.className = `door${done ? ' done' : ''}`;
      button.type = 'button';
      button.disabled = !unlocked;
      button.setAttribute('aria-label', `Türchen ${door.day}${done ? ', erledigt' : unlocked ? ', öffnen' : ', noch verschlossen'}`);
      button.innerHTML = `<span class="door-number">${String(door.day).padStart(2, '0')}</span><span class="door-symbol">${done ? '✦' : unlocked ? '⌑' : '×'}</span><span class="door-label">${done ? 'GESICHERT' : unlocked ? 'ÖFFNEN' : 'VERSCHLOSSEN'}</span>`;
      if (unlocked) button.addEventListener('click', () => openDoor(door));
      doorsEl.appendChild(button);
    });
  }

  function openDoor(door) {
    activeDoor = door;
    $('#modal-day').textContent = `BEWEISSTÜCK ${String(door.day).padStart(2, '0')} · ${door.day}. DEZEMBER`;
    $('#modal-title').textContent = door.title;
    $('#modal-story').textContent = door.story;
    $('#modal-puzzle').textContent = door.puzzle;
    answerInput.value = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    const solved = Boolean(progress[door.day]);
    reveal.hidden = !solved;
    if (solved) $('#revealed-letter').textContent = progress[door.day];
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (!solved) setTimeout(() => answerInput.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeDoor = null;
  }

  modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  $('#puzzle-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!activeDoor) return;
    if (normalize(answerInput.value) === normalize(activeDoor.answer)) {
      progress[activeDoor.day] = activeDoor.letter;
      saveProgress();
      feedback.textContent = 'Richtig. Ein weiteres Beweisstück ist gesichert.';
      feedback.className = 'feedback good';
      $('#revealed-letter').textContent = activeDoor.letter;
      reveal.hidden = false;
      renderDoorsRefresh();
    } else {
      feedback.textContent = 'Das stimmt noch nicht. Sieh dir die Hinweise noch einmal genau an.';
      feedback.className = 'feedback';
    }
  });

  function renderDoorsRefresh() {
    doorsEl.innerHTML = '';
    renderDoors();
  }

  $('#final-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const entered = normalize($('#final-code').value);
    const expected = normalize(CASE_CONTENT.finalCode);
    const result = $('#final-result');
    result.hidden = false;
    if (entered.length !== 24) {
      result.innerHTML = '<h3>Unvollständige Beweiskette</h3><p>Der Code muss genau 24 Buchstaben enthalten.</p>';
    } else if (entered === expected) {
      result.innerHTML = `<h3>${escapeHtml(CASE_CONTENT.finalTitle)}</h3><p>${escapeHtml(CASE_CONTENT.finalText)}</p>`;
    } else {
      result.innerHTML = '<h3>Die Akte bleibt offen.</h3><p>Die Buchstaben ergeben noch nicht die richtige Lösung. Prüfe die Reihenfolge deiner 24 Hinweise.</p>';
    }
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  }

  renderDoors();
  if (!isDecember && !preview) {
    const hint = document.createElement('p');
    hint.className = 'calendar-hint';
    hint.style.justifyContent = 'center';
    hint.textContent = 'Vorschau für die Einrichtung: Ergänze ?preview=1 an die Adresse, um alle Türchen zu öffnen.';
    $('#kalender').appendChild(hint);
  }
})();
