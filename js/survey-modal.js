// =============================================
// МОДАЛЬНОЕ ОКНО ДИАГНОСТИКИ ДЫХАНИЯ
// Часть 4 — сбор лидов + отправка через прокси
// =============================================

(function () {

  // --- Конфиг отправки ---
  // Токен бота НЕ хранится в клиентском коде.
  // Укажите URL вашего бота на bothost.ru, который принимает POST /notify-lead
  // Пример: 'https://my-bot.bothost.ru/notify-lead'
  var LEAD_ENDPOINT = 'https://REPLACE_WITH_YOUR_BOTHOST_URL/notify-lead';

  // --- HTML модалки ---
  var modalHTML = `
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

      <!-- Прогресс-бар -->
      <div class="diag-progress-wrap" id="diagProgressWrap" style="display:none">
        <div class="diag-progress-bar">
          <div class="diag-progress-fill" id="diagProgressFill" style="width:0%"></div>
        </div>
        <span class="diag-progress-label" id="diagProgressLabel">Шаг 1 из 16</span>
      </div>

      <!-- Контент -->
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

        <!-- ЭКРАН ВОПРОСОВ -->
        <div id="diagQuestions" class="diag-screen" style="display:none">
          <div class="diag-question-wrap">
            <p class="diag-q-text" id="diagQText"></p>
            <p class="diag-q-sub" id="diagQSub"></p>
            <div class="diag-options" id="diagOptions"></div>
            <div class="diag-multi-hint" id="diagMultiHint" style="display:none">
              <span id="diagSelectedCount">Выбрано: 0</span>
            </div>
            <div class="diag-nav">
              <button class="diag-btn-ghost" id="diagBackBtn" style="display:none">← Назад</button>
              <button class="diag-btn-primary diag-btn-next" id="diagNextBtn" style="display:none">Далее →</button>
            </div>
          </div>
        </div>

        <!-- ЭКРАН СБОРА КОНТАКТОВ -->
        <div id="diagLeadForm" class="diag-screen" style="display:none">
          <div class="diag-lead-wrap">
            <div class="diag-lead-icon">🎯</div>
            <h3 class="diag-lead-title">Ваш результат готов!</h3>
            <p class="diag-lead-desc">Укажите контакты — и мы покажем персональный результат и свяжемся с вами для консультации.</p>

            <form id="diagLeadFormEl" class="diag-lead-form" novalidate>

              <div class="diag-field">
                <label class="diag-label" for="leadName">Ваше имя <span class="diag-req">*</span></label>
                <input class="diag-input" type="text" id="leadName" name="name" placeholder="Например: Мария" required autocomplete="given-name">
                <span class="diag-field-error" id="errName"></span>
              </div>

              <div class="diag-field">
                <label class="diag-label" for="leadPhone">Телефон <span class="diag-req">*</span></label>
                <input class="diag-input" type="tel" id="leadPhone" name="phone" placeholder="+7 (999) 000-00-00" required autocomplete="tel">
                <span class="diag-field-error" id="errPhone"></span>
              </div>

              <div class="diag-field">
                <label class="diag-label" for="leadEmail">Email <span class="diag-req">*</span></label>
                <input class="diag-input" type="email" id="leadEmail" name="email" placeholder="you@example.com" required autocomplete="email">
                <span class="diag-field-error" id="errEmail"></span>
              </div>

              <div class="diag-field">
                <label class="diag-label" for="leadTg">Telegram (необязательно)</label>
                <input class="diag-input" type="text" id="leadTg" name="tg" placeholder="@username">
              </div>

              <button type="submit" class="diag-btn-primary diag-btn-submit" id="diagLeadSubmit">
                Получить результат →
              </button>

              <p class="diag-lead-privacy">🔒 Данные защищены · Не передаём третьим лицам · Без спама</p>
            </form>
          </div>
        </div>

        <!-- ЭКРАН РЕЗУЛЬТАТА -->
        <div id="diagResult" class="diag-screen" style="display:none">

          <!-- Значок и заголовок -->
          <div class="diag-res-header">
            <div class="diag-res-badge" id="diagResBadge">🎯</div>
            <h3 class="diag-res-title">Ваш персональный результат</h3>
            <p class="diag-res-profile" id="diagResProfile"></p>
          </div>

          <!-- Уровень нарушения -->
          <div class="diag-res-level" id="diagResLevel">
            <span class="diag-res-level-label">Уровень нарушения дыхания:</span>
            <span class="diag-res-level-value" id="diagResLevelValue">—</span>
          </div>

          <!-- Карточка техники -->
          <div class="diag-res-card">
            <div class="diag-res-card-top">
              <span class="diag-res-tag">Персональная техника Бутейко</span>
              <h4 class="diag-res-technique" id="diagResTechnique">—</h4>
              <p class="diag-res-tagline" id="diagResTagline"></p>
            </div>
            <p class="diag-res-speed" id="diagResSpeed"></p>
          </div>

          <!-- Отзывы (что отмечают) -->
          <div class="diag-res-reviews">
            <p class="diag-res-reviews-title">Клиенты отмечают:</p>
            <ul class="diag-res-reviews-list" id="diagResReviews"></ul>
          </div>

          <!-- Почему работает -->
          <div class="diag-res-why">
            <p class="diag-res-why-title">Почему это работает именно для вас</p>
            <p class="diag-res-why-text" id="diagResWhy"></p>
          </div>

          <!-- CTA -->
          <div class="diag-res-cta">
            <p class="diag-res-cta-note" id="diagResCta"></p>
            <a href="https://t.me/spokoinoe_dyhanie?start=website_result" target="_blank" rel="noopener noreferrer" class="diag-btn-primary diag-btn-tg">
              📲 Записаться на пробное занятие — 1 500 ₽
            </a>
            <p class="diag-res-final-note">Бесплатная консультация · Результат за 2 минуты</p>
          </div>

        </div>

      </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // --- Элементы ---
  var modal        = document.getElementById('diagnosisModal');
  var closeBtn     = document.getElementById('diagCloseBtn');
  var startBtn     = document.getElementById('diagStartBtn');
  var diagStart    = document.getElementById('diagStart');
  var diagQs       = document.getElementById('diagQuestions');
  var diagLeadForm = document.getElementById('diagLeadForm');
  var diagResult   = document.getElementById('diagResult');
  var progressWrap = document.getElementById('diagProgressWrap');
  var progressFill = document.getElementById('diagProgressFill');
  var progressLbl  = document.getElementById('diagProgressLabel');
  var qText        = document.getElementById('diagQText');
  var qSub         = document.getElementById('diagQSub');
  var optionsWrap  = document.getElementById('diagOptions');
  var multiHint    = document.getElementById('diagMultiHint');
  var selectedCnt  = document.getElementById('diagSelectedCount');
  var backBtn      = document.getElementById('diagBackBtn');
  var nextBtn      = document.getElementById('diagNextBtn');
  var leadFormEl   = document.getElementById('diagLeadFormEl');

  // --- Движок и кэш результата ---
  var engine = null;
  var currentId = null;
  var multiSelections = [];
  var cachedResult = null;

  // --- Утилиты ---
  function showScreen(el) {
    [diagStart, diagQs, diagLeadForm, diagResult].forEach(function(s) {
      s.style.display = 'none';
      s.classList.remove('diag-screen--active');
    });
    el.style.display = 'block';
    el.classList.add('diag-screen--active');
  }

  function updateProgress(id) {
    if (!engine) return;
    var p = engine.getProgress(id);
    progressFill.style.width = p.pct + '%';
    progressLbl.textContent = 'Шаг ' + p.current + ' из ' + p.total;
  }

  // --- Рендер вопроса ---
  function renderQuestion(id) {
    if (!id) { finishSurvey(); return; }
    currentId = id;
    var q = engine.getQuestion(id);
    if (!q) { finishSurvey(); return; }

    qText.textContent = q.text;
    qSub.textContent  = q.sub || '';
    qSub.style.display = q.sub ? 'block' : 'none';

    updateProgress(id);

    backBtn.style.display = (q.allowBack && engine.history.length >= 1) ? 'inline-flex' : 'none';
    nextBtn.style.display = 'none';

    optionsWrap.innerHTML = '';
    multiSelections = [];
    multiHint.style.display = 'none';
    selectedCnt.textContent = 'Выбрано: 0';

    if (q.type === 'scale')         renderScale(q);
    else if (q.type === 'multiple') renderMultiple(q);
    else                            renderSingle(q);

    optionsWrap.style.opacity = '0';
    setTimeout(function() {
      optionsWrap.style.transition = 'opacity 0.25s ease';
      optionsWrap.style.opacity = '1';
    }, 20);
  }

  function renderSingle(q) {
    q.options.forEach(function(opt) {
      var btn = document.createElement('button');
      btn.className = 'diag-option';
      btn.textContent = opt.label;
      btn.addEventListener('click', function() {
        engine.saveAnswer(q.id, opt.value);
        renderQuestion(engine.getNext(q.id));
      });
      optionsWrap.appendChild(btn);
    });
  }

  function renderMultiple(q) {
    multiHint.style.display = 'flex';
    q.options.forEach(function(opt) {
      var btn = document.createElement('button');
      btn.className = 'diag-option diag-option--multi';
      btn.textContent = opt.label;
      btn.dataset.value = opt.value;
      btn.addEventListener('click', function() {
        var idx = multiSelections.indexOf(opt.value);
        if (idx > -1) {
          multiSelections.splice(idx, 1);
          btn.classList.remove('diag-option--selected');
        } else {
          if (q.maxSelections && multiSelections.length >= q.maxSelections) return;
          multiSelections.push(opt.value);
          btn.classList.add('diag-option--selected');
        }
        selectedCnt.textContent = 'Выбрано: ' + multiSelections.length +
          (q.maxSelections ? ' (макс. ' + q.maxSelections + ')' : '');
        nextBtn.style.display = multiSelections.length >= (q.minSelections || 1) ? 'inline-flex' : 'none';
      });
      optionsWrap.appendChild(btn);
    });
    nextBtn.style.display = 'none';
    nextBtn.onclick = function() {
      if (multiSelections.length < (q.minSelections || 1)) return;
      engine.saveAnswer(q.id, multiSelections.slice());
      renderQuestion(engine.getNext(q.id));
    };
  }

  function renderScale(q) {
    var wrap = document.createElement('div');
    wrap.className = 'diag-scale';
    for (var i = q.min; i <= q.max; i++) {
      (function(val) {
        var btn = document.createElement('button');
        btn.className = 'diag-scale-btn';
        btn.textContent = val;
        btn.addEventListener('click', function() {
          engine.saveAnswer(q.id, val);
          renderQuestion(engine.getNext(q.id));
        });
        wrap.appendChild(btn);
      })(i);
    }
    optionsWrap.appendChild(wrap);
  }

  // --- Завершение анкеты: показываем форму лидов ---
  function finishSurvey() {
    progressWrap.style.display = 'none';

    if (typeof BreathingAnalysis !== 'undefined') {
      var analysis = new BreathingAnalysis();
      cachedResult = analysis.analyze(engine.answers);
      cachedResult._analysis = analysis;
    } else {
      cachedResult = null;
    }

    showScreen(diagLeadForm);
  }

  // --- Заполнение и показ экрана результата ---
  function showResult() {
    if (!cachedResult) {
      document.getElementById('diagResTechnique').textContent = 'Базовое носовое дыхание Бутейко';
      document.getElementById('diagResTagline').textContent = 'Персональная техника подобрана по вашим ответам.';
      showScreen(diagResult);
      return;
    }

    var result   = cachedResult;
    var analysis = cachedResult._analysis;
    var msg      = result.message;
    var segLabel = analysis.segmentLabel(result.segment);

    document.getElementById('diagResProfile').textContent = result.profileName;

    var levelEl = document.getElementById('diagResLevelValue');
    levelEl.textContent = segLabel;
    levelEl.className = 'diag-res-level-value diag-res-level--' + result.segment.toLowerCase();

    document.getElementById('diagResTechnique').textContent = '«' + msg.techniqueName + '»';
    document.getElementById('diagResTagline').textContent   = msg.tagline;
    document.getElementById('diagResSpeed').textContent     = msg.speed;
    document.getElementById('diagResWhy').textContent       = msg.why;
    document.getElementById('diagResCta').textContent       = msg.cta;
    document.getElementById('diagResBadge').textContent     = result.isChild ? '🧸' : '🎯';

    var reviewsList = document.getElementById('diagResReviews');
    reviewsList.innerHTML = '';
    msg.reviews.forEach(function(r) {
      var li = document.createElement('li');
      li.textContent = r;
      reviewsList.appendChild(li);
    });

    diagResult.style.opacity = '0';
    showScreen(diagResult);
    setTimeout(function() {
      diagResult.style.transition = 'opacity 0.4s ease';
      diagResult.style.opacity = '1';
    }, 30);
  }

  // --- Отправка лида через прокси-бот (токен только на сервере) ---
  function sendLeadToBot(lead, resultData) {
    var payload = {
      name:    lead.name,
      phone:   lead.phone,
      email:   lead.email,
      tg:      lead.tg || '',
      segment: resultData ? resultData.segment      : '',
      profile: resultData ? resultData.profileName  : '',
      tech:    resultData ? resultData.message.techniqueName : ''
    };

    fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function() {
      // Тихий fallback — не блокируем UX при ошибке сети
    });
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // --- Валидация формы лидов ---
  function validateLead() {
    var ok = true;

    var name  = document.getElementById('leadName').value.trim();
    var phone = document.getElementById('leadPhone').value.trim();
    var email = document.getElementById('leadEmail').value.trim();

    document.getElementById('errName').textContent  = '';
    document.getElementById('errPhone').textContent = '';
    document.getElementById('errEmail').textContent = '';

    if (!name) {
      document.getElementById('errName').textContent = 'Введите ваше имя';
      ok = false;
    }
    if (!phone || phone.replace(/\D/g,'').length < 10) {
      document.getElementById('errPhone').textContent = 'Введите корректный номер телефона';
      ok = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('errEmail').textContent = 'Введите корректный email';
      ok = false;
    }

    return ok;
  }

  // --- Сабмит формы лидов ---
  leadFormEl.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateLead()) return;

    var submitBtn = document.getElementById('diagLeadSubmit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем...';

    var lead = {
      name:  document.getElementById('leadName').value.trim(),
      phone: document.getElementById('leadPhone').value.trim(),
      email: document.getElementById('leadEmail').value.trim(),
      tg:    document.getElementById('leadTg').value.trim()
    };

    sendLeadToBot(lead, cachedResult);

    setTimeout(function() {
      showResult();
    }, 600);
  });

  // --- Открыть / закрыть ---
  function openDiag() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    showScreen(diagStart);
    progressWrap.style.display = 'none';
    cachedResult = null;
    leadFormEl.reset();
    ['errName','errPhone','errEmail'].forEach(function(id) {
      document.getElementById(id).textContent = '';
    });
  }

  function closeDiag() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // --- Старт анкеты ---
  startBtn.addEventListener('click', function() {
    if (typeof SurveyEngine === 'undefined') {
      alert('Ошибка загрузки анкеты. Пожалуйста, обновите страницу.');
      return;
    }
    engine = new SurveyEngine();
    var firstId = engine.start();
    progressWrap.style.display = 'flex';
    showScreen(diagQs);
    renderQuestion(firstId);
  });

  // --- Назад ---
  backBtn.addEventListener('click', function() {
    var prev = engine.goBack();
    if (prev) renderQuestion(prev);
  });

  // --- Закрытие ---
  closeBtn.addEventListener('click', closeDiag);
  modal.addEventListener('click', function(e) { if (e.target === modal) closeDiag(); });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeDiag();
  });

  // --- Открывать по data-open-diag ---
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-open-diag]')) openDiag();
  });

  window.DiagnosisModal = { open: openDiag, close: closeDiag };

})();
