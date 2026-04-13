// =============================================
// BREATHING ANALYSIS — клиентская версия VERSE
// Перенесён из modules/analysis/verse_analysis.js
// =============================================

(function () {

  function BreathingAnalysis() {
    this.segmentWeights      = { urgency: 0.4, readiness: 0.35, fit: 0.25 };
    this.childSegmentWeights = { urgency: 0.5, readiness: 0.3,  fit: 0.2  };
  }

  // ---- Публичный метод ----
  BreathingAnalysis.prototype.analyze = function(data) {
    var isChild = data.age_group === 'for_child';
    return isChild ? this._analyzeChild(data) : this._analyzeAdult(data);
  };

  // ---- Взрослый поток ----
  BreathingAnalysis.prototype._analyzeAdult = function(data) {
    var urgency   = this._urgency(data);
    var readiness = this._readiness(data);
    var fit       = this._fit(data);
    var total     = Math.round(urgency * 0.4 + readiness * 0.35 + fit * 0.25);
    var segment   = total >= 80 ? 'HOT_LEAD'
                  : total >= 60 ? 'WARM_LEAD'
                  : total >= 40 ? 'COLD_LEAD'
                  :               'NURTURE_LEAD';
    var issue     = this._primaryIssue(data);
    var profile   = this._profileName(data);
    var message   = this._buildMessage(data, segment, issue, profile);
    return { segment: segment, issue: issue, profileName: profile,
             scores: { urgency: urgency, readiness: readiness, fit: fit, total: total },
             message: message, isChild: false };
  };

  // ---- Детский поток ----
  BreathingAnalysis.prototype._analyzeChild = function(data) {
    var urgency   = this._childUrgency(data);
    var readiness = this._childReadiness(data);
    var fit       = this._childFit(data);
    var total     = Math.round(urgency * 0.5 + readiness * 0.3 + fit * 0.2);
    var segment   = total >= 75 ? 'HOT_LEAD'
                  : total >= 55 ? 'WARM_LEAD'
                  : total >= 35 ? 'COLD_LEAD'
                  :               'NURTURE_LEAD';
    var issue     = this._childIssue(data);
    var profile   = this._childProfileName(data);
    var message   = this._buildChildMessage(data, segment, issue, profile);
    return { segment: segment, issue: issue, profileName: profile,
             scores: { urgency: urgency, readiness: readiness, fit: fit, total: total },
             message: message, isChild: true };
  };

  // ---- Скоринг взрослых ----
  BreathingAnalysis.prototype._urgency = function(d) {
    var s = 0;
    var ageMult = { '18-30': 0.8, '31-45': 1.0, '46-60': 1.2, '60+': 1.3 };
    s += (d.stress_level || 0) * 4;
    var critical = ['panic_attacks','chronic_stress','anxiety','insomnia','high_pressure','breathing_issues'];
    if (Array.isArray(d.current_problems)) {
      d.current_problems.forEach(function(p) { if (critical.includes(p)) s += 15; });
    }
    if (Array.isArray(d.chronic_conditions) && !d.chronic_conditions.includes('none')) {
      d.chronic_conditions.forEach(function(c) {
        s += ['respiratory_diseases','cardiovascular_diseases','panic_disorder'].includes(c) ? 15 : 8;
      });
    }
    var panicMap = { panic_regular: 20, panic_sometimes: 12, panic_rarely: 5, panic_past: 3, panic_never: 0 };
    s += panicMap[d.panic_experience] || 0;
    var freqMap = { constantly: 20, often: 15, sometimes: 10, rarely: 5, never: 0 };
    s += freqMap[d.breathing_frequency] || 0;
    if (d.shallow_breathing === 'yes_often') s += 10;
    else if (d.shallow_breathing === 'sometimes') s += 5;
    var occMap = { office_work: 10, physical_work: 5, student: 8, maternity_leave: 12, retired: 3 };
    s += occMap[d.occupation] || 0;
    s *= (ageMult[d.age_group] || 1.0);
    return Math.min(Math.round(s), 100);
  };

  BreathingAnalysis.prototype._readiness = function(d) {
    var s = 20;
    var expMap = { never: 20, few_times: 25, theory_only: 18, sometimes: 15, regularly: 10, expert: 5 };
    s += expMap[d.breathing_experience] || 15;
    var timeMap = { '3-5_minutes': 30, '10-15_minutes': 25, '20-30_minutes': 15, '30+_minutes': 10 };
    s += timeMap[d.time_commitment] || 20;
    var specificGoals = ['reduce_anxiety','improve_sleep','normalize_pressure','increase_energy','quick_relaxation'];
    if (Array.isArray(d.main_goals)) {
      var cnt = d.main_goals.filter(function(g) { return specificGoals.includes(g); }).length;
      s += Math.min(cnt * 12, 25);
    }
    if (d.breathing_method === 'mouth') s += 8;
    if (d.shallow_breathing === 'yes_often') s += 10;
    else if (d.shallow_breathing === 'sometimes') s += 5;
    return Math.min(s, 100);
  };

  BreathingAnalysis.prototype._fit = function(d) {
    var s = 30;
    var strengths = ['chronic_stress','anxiety','insomnia','high_pressure','fatigue','concentration_issues'];
    if (Array.isArray(d.current_problems)) {
      d.current_problems.forEach(function(p) { if (strengths.includes(p)) s += 10; });
    }
    var goalStr = ['quick_relaxation','improve_sleep','reduce_anxiety','normalize_pressure','increase_energy'];
    if (Array.isArray(d.main_goals)) {
      d.main_goals.forEach(function(g) { if (goalStr.includes(g)) s += 8; });
    }
    var occMap = { office_work: 15, home_work: 12, student: 10, maternity_leave: 15, retired: 8 };
    s += occMap[d.occupation] || 5;
    var ageMap = { '18-30': 5, '31-45': 15, '46-60': 12, '60+': 8 };
    s += ageMap[d.age_group] || 8;
    return Math.min(s, 100);
  };

  // ---- Скоринг детей ----
  BreathingAnalysis.prototype._childUrgency = function(d) {
    var s = 0;
    var ageU = { '3-4':20,'5-6':15,'7-8':12,'9-10':10,'11-12':8,'13-15':15,'16-17':18 };
    s += ageU[d.child_age_detail] || 10;
    var critChild = ['breathing_issues','anxiety','separation_anxiety','nightmares','aggression','hyperactivity'];
    if (Array.isArray(d.child_problems_detailed)) {
      d.child_problems_detailed.forEach(function(p) { if (critChild.includes(p)) s += 20; });
    }
    var schedMap = { relaxed:0, moderate:5, busy:15, overloaded:25, intensive:35 };
    s += schedMap[d.child_schedule_stress] || 5;
    return Math.min(Math.round(s), 100);
  };

  BreathingAnalysis.prototype._childReadiness = function(d) {
    var s = 30;
    var invMap = { mother:25, father:20, both_parents:30, grandparent:15, child_independent:10, group_sessions:20 };
    s += invMap[d.child_parent_involvement] || 15;
    var motMap = { games_stories:25, reward_system:20, family_activities:25, digital_interactive:15, creative_tasks:20 };
    s += motMap[d.child_motivation_approach] || 15;
    var timeMap = { morning_routine:20, after_school:25, afternoon:15, before_sleep:30, stress_situations:35, weekends:15 };
    s += timeMap[d.child_time_availability] || 15;
    return Math.min(s, 100);
  };

  BreathingAnalysis.prototype._childFit = function(d) {
    var s = 40;
    var ageF = { '3-4':10,'5-6':20,'7-8':25,'9-10':30,'11-12':25,'13-15':15,'16-17':20 };
    s += ageF[d.child_age_detail] || 20;
    var strengths = ['anxiety','hyperactivity','sleep_problems','concentration_issues','aggression','separation_anxiety'];
    if (Array.isArray(d.child_problems_detailed)) {
      d.child_problems_detailed.forEach(function(p) { if (strengths.includes(p)) s += 12; });
    }
    var motF = { games_stories:25, reward_system:20, family_activities:30, creative_tasks:22 };
    s += motF[d.child_motivation_approach] || 15;
    return Math.min(s, 100);
  };

  // ---- Определение проблемы ----
  BreathingAnalysis.prototype._primaryIssue = function(d) {
    var prio = {
      anxiety:100, chronic_stress:90, panic_attacks:95,
      insomnia:80, high_pressure:75, breathing_issues:70,
      fatigue:60, headaches:50, concentration_issues:45
    };
    var top = 'general_wellness', max = 0;
    if (Array.isArray(d.current_problems)) {
      d.current_problems.forEach(function(p) {
        if ((prio[p] || 0) > max) { max = prio[p]; top = p; }
      });
    }
    if (top === 'general_wellness' && d.priority_problem) top = d.priority_problem;
    return top;
  };

  BreathingAnalysis.prototype._childIssue = function(d) {
    var prio = {
      breathing_issues:100, anxiety:95, separation_anxiety:90, nightmares:85,
      sleep_problems:80, hyperactivity:75, aggression:70,
      concentration_issues:65, tantrums:60, social_difficulties:55, weak_immunity:50, prevention:30
    };
    var top = 'general_wellness', max = 0;
    if (Array.isArray(d.child_problems_detailed)) {
      d.child_problems_detailed.forEach(function(p) {
        if ((prio[p] || 0) > max) { max = prio[p]; top = p; }
      });
    }
    return top;
  };

  // ---- Профиль ----
  BreathingAnalysis.prototype._profileName = function(d) {
    var map = {
      office_work:    'Стрессовое дыхание офисного работника',
      home_work:      'Домашний стресс и изоляция',
      student:        'Учебный стресс и перегрузки',
      maternity_leave:'Материнское выгорание',
      physical_work:  'Физический стресс и усталость',
      management:     'Руководящий стресс и ответственность',
      retired:        'Возрастные изменения дыхания'
    };
    if (map[d.occupation]) return map[d.occupation];
    var sl = d.stress_level || 0;
    if (sl >= 8) return 'Критический стресс и напряжение';
    if (sl >= 6) return 'Высокий стресс и перегрузки';
    if (sl >= 4) return 'Умеренный стресс';
    return 'Профилактика и оздоровление';
  };

  BreathingAnalysis.prototype._childProfileName = function(d) {
    var ageLabel = d.child_age_detail ? d.child_age_detail + ' лет' : 'Ребёнок';
    var issueLabel = {
      breathing_issues: 'проблемы с дыханием',
      anxiety: 'тревожность',
      hyperactivity: 'гиперактивность',
      sleep_problems: 'нарушения сна',
      nightmares: 'кошмары и беспокойный сон',
      concentration_issues: 'проблемы с концентрацией',
      aggression: 'агрессивное поведение',
      separation_anxiety: 'страх разлуки',
      prevention: 'профилактика'
    };
    var issue = Array.isArray(d.child_problems_detailed) && d.child_problems_detailed[0];
    return ageLabel + (issue ? ' · ' + (issueLabel[issue] || issue) : '');
  };

  // ---- Метка сегмента ----
  BreathingAnalysis.prototype.segmentLabel = function(seg) {
    return {
      HOT_LEAD:    'Высокий — требует внимания',
      WARM_LEAD:   'Средний — есть резервы',
      COLD_LEAD:   'Лёгкий — хорошая база',
      NURTURE_LEAD:'Минимальный — профилактика'
    }[seg] || '—';
  };

  // ---- Построение сообщения — взрослый ----
  BreathingAnalysis.prototype._buildMessage = function(data, segment, issue, profile) {
    var techniques = {
      anxiety:          ['Техника 4-7-8',         'Квадратное дыхание',       'Дыхание с подсчётом'],
      chronic_stress:   ['Когерентное дыхание',    'Box Breathing',            'Вечернее расслабление'],
      insomnia:         ['Дыхание 4-7-8 для сна',  'Прогрессивная релаксация', 'Лунное дыхание'],
      high_pressure:    ['Медленное глубокое',     'Резонансное дыхание 5-5',  'Релаксация по Джекобсону'],
      breathing_issues: ['Диафрагмальное дыхание', 'Носовое дыхание Бутейко', 'Полное йоговское'],
      fatigue:          ['Энергетическое дыхание', 'Дыхание Капалабхати',      'Ритмичное глубокое'],
      concentration_issues: ['Box Breathing',     'Нади Шодхана',             'Дыхание 4-4-4'],
      general_wellness: ['Носовое дыхание',        'Диафрагмальное дыхание',  'Контрольная пауза Бутейко']
    };

    var programs = {
      anxiety:          'Дыхание против паники',
      chronic_stress:   'Стресс-детокс',
      insomnia:         'Глубокий отдых',
      high_pressure:    'Дыхание для сердца',
      breathing_issues: 'Правильное дыхание',
      fatigue:          'Энергия через дыхание',
      concentration_issues: 'Фокус и ясность',
      general_wellness: 'Основы Бутейко'
    };

    var timelines = {
      HOT_LEAD:    'Первые результаты уже через 1–3 дня',
      WARM_LEAD:   'Заметные улучшения через 5–7 дней',
      COLD_LEAD:   'Устойчивый эффект через 2–3 недели',
      NURTURE_LEAD:'Поддерживающий эффект через месяц'
    };

    var reviews = {
      anxiety:          ['Паника ушла за неделю', 'Засыпаю без тревоги', 'Снизилась частота атак'],
      chronic_stress:   ['Стало легче дышать', 'Голова перестала болеть', 'Сон нормализовался'],
      insomnia:         ['Засыпаю за 10 минут', 'Просыпаюсь отдохнувшим', 'Кошмары исчезли'],
      high_pressure:    ['Давление снизилось за неделю', 'Пульс стал ровнее', 'Меньше головокружений'],
      breathing_issues: ['Одышка пропала', 'Дышу носом постоянно', 'Лёгкие открылись'],
      general_wellness: ['Больше энергии', 'Голова ясная', 'Стрессоустойчивость выросла']
    };

    var techs = techniques[issue] || techniques.general_wellness;
    var prog  = programs[issue]   || programs.general_wellness;
    var rev   = reviews[issue]    || reviews.general_wellness;

    var ctaBySegment = {
      HOT_LEAD:    'Александр Попов свяжется с вами в течение 24 часов для составления срочной программы.',
      WARM_LEAD:   'Запишитесь на пробное занятие и получите персональный план уже сегодня.',
      COLD_LEAD:   'Первое занятие покажет, насколько быстро вы можете улучшить своё дыхание.',
      NURTURE_LEAD:'Начните с бесплатной консультации — это ни к чему не обязывает.'
    };

    var whyMap = {
      anxiety:          'Гипервентиляция при тревоге снижает CO₂ и усиливает панику. Техника 4-7-8 восстанавливает баланс газов и успокаивает нервную систему за 2–3 минуты.',
      chronic_stress:   'Поверхностное дыхание при стрессе держит тело в режиме «бой или бегство». Когерентное дыхание активирует парасимпатику и выключает стресс-реакцию.',
      insomnia:         'Перед сном мозг «не отключается» из-за ускоренного дыхания. Замедление дыхания до 4–6 циклов в минуту запускает естественный сон.',
      high_pressure:    'Давление снижается при дыхании с частотой 5–6 циклов в минуту — резонансная частота сердечно-сосудистой системы.',
      breathing_issues: 'По методу Бутейко нос — единственный физиологический путь дыхания. Переход на носовое дыхание нормализует объём и частоту за 1–2 недели.',
      general_wellness: 'Большинство людей дышат неосознанно и неэффективно. Базовые техники Бутейко улучшают кислородный обмен и повышают общий тонус за 2–3 недели.'
    };

    return {
      techniqueName: techs[0],
      tagline:       'Подобрано по методу Бутейко специально для вашей ситуации.',
      speed:         '⏱ ' + (timelines[segment] || 'Первые результаты через 1–2 недели'),
      techniques:    techs,
      program:       prog,
      reviews:       rev,
      cta:           ctaBySegment[segment] || ctaBySegment.WARM_LEAD,
      why:           whyMap[issue] || whyMap.general_wellness
    };
  };

  // ---- Построение сообщения — ребёнок ----
  BreathingAnalysis.prototype._buildChildMessage = function(data, segment, issue, profile) {
    var techs = {
      breathing_issues: ['Игра «Воздушный шарик»', 'Дыхание-считалочка', 'Техника «Сонный мишка»'],
      anxiety:          ['Техника «Безопасное место»', 'Дыхание с любимой игрушкой', 'Семейное дыхание'],
      hyperactivity:    ['Игра «Стоп-дыхание»', 'Техника «Медленная черепаха»', 'Дыхательная пауза'],
      sleep_problems:   ['Дыхание «Спящий котик»', 'Вечерняя дыхательная сказка', 'Техника «Облачко»'],
      nightmares:       ['Дыхание «Тёплый свет»', 'Сказка-дыхание перед сном', 'Техника «Безопасное место»'],
      separation_anxiety:['Дыхание «Мамина рука»', 'Игра «Пузырь спокойствия»', 'Семейное обнимание с дыханием'],
      concentration_issues:['Дыхание «Умная пчёлка»','Box Breathing для детей','Дыхание перед уроком']
    };
    var reviews = {
      breathing_issues: ['Ребёнок дышит носом', 'Ночные пробуждения стали реже', 'Астма под контролем'],
      anxiety:          ['Тревожность снизилась', 'Ребёнок спокойнее засыпает', 'Меньше истерик'],
      hyperactivity:    ['Сидит на уроках спокойнее', 'Делает домашние задания сам', 'Конфликтов меньше'],
      sleep_problems:   ['Засыпает за 15 минут', 'Просыпается сам и в хорошем настроении', 'Снов-страхов нет']
    };
    var whyMap = {
      breathing_issues: 'У детей дыхательные нарушения часто связаны с тревогой и напряжением. Игровые техники снимают спазм и восстанавливают носовое дыхание мягко, без усилий.',
      anxiety:          'Детская тревожность напрямую связана с частым поверхностным дыханием. Замедление дыхания через игру успокаивает нервную систему ребёнка за 3–5 минут.',
      hyperactivity:    'Гиперактивные дети дышат быстро и поверхностно, что поддерживает перевозбуждение. Ритмичное дыхание переключает режим — с «газа» на «тормоз».',
      sleep_problems:   'Перед сном детский мозг продолжает обрабатывать впечатления дня. Медленное дыхание снижает активность и запускает засыпание за 10–15 минут.'
    };

    var t   = techs[issue]   || techs.anxiety;
    var rev = reviews[issue] || reviews.anxiety;
    var why = whyMap[issue]  || 'Дыхательные игры мягко успокаивают нервную систему ребёнка и формируют полезные привычки через удовольствие, а не усилие.';

    return {
      techniqueName: t[0],
      tagline:       'Игровая техника, адаптированная по возрасту ребёнка.',
      speed:         '⏱ Первые результаты через 3–7 дней',
      techniques:    t,
      program:       'Дыхательные приключения',
      reviews:       rev,
      cta:           'Александр Попов подготовит персональную детскую программу и свяжется с вами в течение 24 часов.',
      why:           why
    };
  };

  window.BreathingAnalysis = BreathingAnalysis;

})();
