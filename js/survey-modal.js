// =============================================
// МОДАЛЬНОЕ ОКНО ДИАГНОСТИКИ ДЫХАНИЯ
// Часть 1 — скелет, готов к наполнению анкетой
// =============================================

(function () {
  // --- Создаём HTML модалки динамически ---
  const modalHTML = `
  <div id="diagnosisModal" class="diag-overlay" role="dialog" aria-modal="true" aria-labelledby="diagModalTitle" style="display:none">
    <div class="diag-container">
      <button class="diag-close" id="diagCloseBtn" aria-label="Закрыть">&times;</button>

      <!-- Шапка -->
      <div class="diag-header">
        <div class="diag-logo">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="18" cy="18" r="18" fill="#0f7a82"/>
            <path d="M18 8 C14 8 11 11 11 14.5 C11 18 13 20 15 21.5 L15 26 C15 27.1 15.9 28 17 28 L19 28 C20.1 28 21 27.1 21 26 L21 21.5 C23 20 25 18 25 14.5 C25 11 22 8 18 8Z" fill="none" stroke="white" stroke-width="1.5"/>
            <path d="M15 17 C15.5 15.5 16.5 14.5 18 14 C19.5 14.5 20.5 15.5 21 17" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
            <line x1="18" y1="14" x2="18" y2="8" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <h2 id="diagModalTitle" class="diag-title">Бесплатная диагностика дыхания</h2>
          <p class="diag-subtitle">Метод Бутейко · 5–7 минут · Персональный результат</p>
        </div>
      </div>

      <!-- Прогресс-бар (скрыт до старта) -->
      <div class="diag-progress-wrap" id="diagProgressWrap" style="display:none">
        <div class="diag-progress-bar">
          <div class="diag-progress-fill" id="diagProgressFill" style="width:0%"></div>
        </div>
        <span class="diag-progress-label" id="diagProgressLabel">Шаг 1</span>
      </div>

      <!-- Контент-зона (стартовый экран / вопросы / результат) -->
      <div class="diag-content" id="diagContent">

        <!-- СТАРТОВЫЙ ЭКРАН -->
        <div id="diagStart" class="diag-screen diag-screen--active">
          <div class="diag-start-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="rgba(15,122,130,0.08)"/>
              <path d="M32 10 C24 10 18 16.5 18 23.5 C18 31 22 35 26 37.5 L26 50 C26 52.2 27.8 54 30 54 L34 54 C36.2 54 38 52.2 38 50 L38 37.5 C42 35 46 31 46 23.5 C46 16.5 40 10 32 10Z" fill="none" stroke="#0f7a82" stroke-width="2.5"/>
              <path d="M26 28 C27 25 29 23 32 22 C35 23 37 25 38 28" stroke="#0f7a82" stroke-width="2" stroke-linecap="round"/>
              <line x1="32" y1="22" x2="32" y2="10" stroke="#0f7a82" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h3 class="diag-start-title">Узнайте, как вы дышите по методу Бутейко</h3>
          <p class="diag-start-desc">Ответьте на несколько вопросов и получите персональные рекомендации. Полностью бесплатно.</p>
          <ul class="diag-start-list">
            <li>✓ Выявим скрытые нарушения дыхания</li>
            <li>✓ Определим ваш уровень контрольной паузы</li>
            <li>✓ Дадим конкретную технику под вашу ситуацию</li>
          </ul>
          <button class="diag-btn-primary" id="diagStartBtn">Начать диагностику →</button>
          <p class="diag-start-note">🔒 Без регистрации · Результат сразу</p>
        </div>

        <!-- ЭКРАН ВОПРОСОВ (заглушка, будет заполнен в Части 2) -->
        <div id="diagQuestions" class="diag-screen" style="display:none">
          <div class="diag-coming-soon">
            <div class="diag-spinner"></div>
            <p>Анкета загружается…</p>
            <p class="diag-coming-note">Полная версия анкеты появится в ближайшее время</p>
            <a href="https://t.me/spokoinoe_dyhanie" target="_blank" rel="noopener noreferrer" class="diag-btn-primary" style="margin-top:1.5rem;display:inline-block">
              👉 Пройти диагностику в Telegram
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
  `;

  // --- Вставляем в DOM ---
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // --- Элементы ---
  const modal       = document.getElementById('diagnosisModal');
  const closeBtn    = document.getElementById('diagCloseBtn');
  const startBtn    = document.getElementById('diagStartBtn');
  const diagStart   = document.getElementById('diagStart');
  const diagQs      = document.getElementById('diagQuestions');
  const progressWrap= document.getElementById('diagProgressWrap');

  // --- Открыть модалку ---
  function openDiag() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Сброс на стартовый экран
    diagStart.classList.add('diag-screen--active');
    diagQs.style.display = 'none';
    progressWrap.style.display = 'none';
  }

  // --- Закрыть модалку ---
  function closeDiag() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // --- Старт анкеты ---
  startBtn.addEventListener('click', () => {
    diagStart.classList.remove('diag-screen--active');
    diagStart.style.display = 'none';
    progressWrap.style.display = 'flex';
    diagQs.style.display = 'block';
  });

  // --- Закрытие ---
  closeBtn.addEventListener('click', closeDiag);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeDiag(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeDiag(); });

  // --- Вешаем на кнопку(-ки) с data-open-diag ---
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-diag]')) openDiag();
  });

  // Экспорт для будущих частей
  window.DiagnosisModal = { open: openDiag, close: closeDiag };

})();
