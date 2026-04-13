// =============================================
// АНАЛИЗ РЕЗУЛЬТАТОВ ДИАГНОСТИКИ ДЫХАНИЯ
// Адаптировано из breathing-lead-bot/modules/analysis/verse_analysis.js
// для клиентского JS (без Node.js / module.exports)
// =============================================

(function (global) {

  // --- Переводы ---
  var TRANSLATIONS = {
    'chronic_stress': 'хронический стресс и напряжение',
    'anxiety': 'повышенная тревожность и панические атаки',
    'insomnia': 'проблемы со сном и бессонница',
    'breathing_issues': 'проблемы с дыханием и одышка',
    'high_pressure': 'повышенное давление',
    'fatigue': 'хроническая усталость',
    'headaches': 'частые головные боли',
    'concentration_issues': 'проблемы с концентрацией',
    'back_pain': 'боли в шее, плечах и спине',
    'digestion_issues': 'проблемы с пищеварением',
    'hyperactivity': 'гиперактивность и невнимательность',
    'separation_anxiety': 'страх разлуки с родителями',
    'sleep_problems': 'проблемы с засыпанием',
    'nightmares': 'беспокойный сон и кошмары',
    'tantrums': 'частые истерики и капризы',
    'aggression': 'агрессивное поведение',
    'social_difficulties': 'сложности в общении',
    'weak_immunity': 'частые простуды и слабый иммунитет',
    'prevention': 'профилактика и общее развитие',
    'general_wellness': 'общее оздоровление'
  };

  // --- Техники и отзывы по проблемам ---
  var ADULT_TECHNIQUES = {
    concentration_issues: { name: 'Антистресс-дыхание для ясности ума', reviews: ['Уходит «туман в голове»', 'Появляется лёгкость и приток энергии', 'Мысли становятся упорядоченнее', 'Учёба / работа идёт легче'] },
    chronic_stress:       { name: 'Антистресс-дыхание', reviews: ['Быстро уходит внутреннее напряжение', 'Появляется ясность и контроль', 'Легче справляться с дедлайнами', 'Улучшается эмоциональный фон'] },
    insomnia:             { name: 'Дыхание для глубокого сна (4-7-8)', reviews: ['Легче засыпаете', 'Сон становится глубже', 'Меньше ночных пробуждений', 'Утром чувствуете себя отдохнувшим'] },
    anxiety:              { name: 'Дыхание против тревоги', reviews: ['Тревога отступает', 'Появляется спокойствие', 'Легче контролировать мысли', 'Улучшается сон'] },
    high_pressure:        { name: 'Дыхание для нормализации давления', reviews: ['Давление приходит в норму', 'Головные боли уменьшаются', 'Улучшается самочувствие', 'Меньше зависимость от таблеток'] },
    breathing_issues:     { name: 'Техника восстановления дыхания', reviews: ['Дыхание становится свободнее', 'Проходит одышка', 'Увеличивается выносливость', 'Легче физическая активность'] },
    fatigue:              { name: 'Энергетическое дыхание', reviews: ['Появляется бодрость', 'Уходит сонливость', 'Повышается работоспособность', 'Меньше нужен кофе'] },
    headaches:            { name: 'Дыхание от головной боли', reviews: ['Боль уходит без таблеток', 'Напряжение в шее проходит', 'Улучшается концентрация', 'Меньше приступов мигрени'] },
    general_wellness:     { name: 'Базовое оздоровительное дыхание', reviews: ['Улучшается общее самочувствие', 'Больше энергии в течение дня', 'Лучше стрессоустойчивость', 'Повышается качество жизни'] }
  };

  var CHILD_TECHNIQUES = {
    hyperactivity:        { name: 'Воздушный шар', reviews: ['Меньше импульсивности', 'Легче выполнять задания', 'Улучшается самоконтроль', 'Ребёнок становится уравновешеннее'] },
    tantrums:             { name: 'Волшебный ветер', reviews: ['Меньше капризов', 'Легче успокаивается', 'Эмоции под контролем', 'Ребёнок становится послушнее'] },
    sleep_problems:       { name: 'Спящий мишка', reviews: ['Легче засыпает', 'Меньше кошмаров', 'Сон спокойнее', 'Утром бодрый'] },
    nightmares:           { name: 'Сонная сказка', reviews: ['Кошмары уходят', 'Сон становится спокойнее', 'Ребёнок не просыпается ночью', 'Утром выспавшийся и радостный'] },
    anxiety:              { name: 'Храбрый лев', reviews: ['Меньше страхов', 'Увереннее в себе', 'Легче идёт в садик/школу', 'Спокойнее реагирует на новое'] },
    separation_anxiety:   { name: 'Волшебная связь', reviews: ['Легче расстаётся с родителями', 'Меньше слёз при прощании', 'Увереннее себя чувствует', 'Быстрее адаптируется'] },
    aggression:           { name: 'Спокойный дракон', reviews: ['Меньше вспышек гнева', 'Легче контролирует эмоции', 'Реже конфликтует', 'Лучше общается с другими'] },
    concentration_issues: { name: 'Внимательная сова', reviews: ['Лучше концентрируется', 'Меньше отвлекается', 'Легче делает уроки', 'Улучшается успеваемость'] },
    breathing_issues:     { name: 'Лёгкое дыхание дельфина', reviews: ['Дышит свободнее', 'Меньше простуд', 'Больше выносливости', 'Активнее играет'] },
    weak_immunity:        { name: 'Сильный богатырь', reviews: ['Реже болеет', 'Быстрее выздоравливает', 'Больше энергии', 'Крепче здоровье'] },
    social_difficulties:  { name: 'Дружелюбный дельфин', reviews: ['Легче находит друзей', 'Увереннее в общении', 'Меньше конфликтов', 'Лучше работает в группе'] },
    prevention:           { name: 'Здоровое дыхание', reviews: ['Укрепляется иммунитет', 'Больше энергии', 'Лучше развивается', 'Спокойнее и счастливее'] },
    general_wellness:     { name: 'Весёлое дыхание', reviews: ['Ребёнок становится спокойнее', 'Лучше сосредотачивается', 'Улучшается поведение', 'Родители отмечают прогресс'] }
  };

  // --- Приоритет проблем (для identifyPrimaryIssue) ---
  var ADULT_ISSUE_PRIORITY = {
    chronic_stress: 90, anxiety: 85, insomnia: 80, high_pressure: 75,
    breathing_issues: 70, fatigue: 60, headaches: 50,
    concentration_issues: 45, back_pain: 30, digestion_issues: 20
  };

  var CHILD_ISSUE_PRIORITY = {
    breathing_issues: 100, anxiety: 95, separation_anxiety: 90,
    nightmares: 85, sleep_problems: 80, hyperactivity: 75,
    aggression: 70, concentration_issues: 65, tantrums: 60,
    social_difficulties: 55, weak_immunity: 50, prevention: 30
  };

  // --- Профили по должности ---
  var OCCUPATION_PROFILES = {
    office_work: 'Стрессовое дыхание офисного работника',
    home_work:   'Домашний стресс и изоляция',
    student:     'Учебный стресс и перегрузки',
    maternity_leave: 'Материнское выгорание',
    physical_work:   'Физический стресс и усталость',
    management:  'Руководящий стресс и ответственность',
    retired:     'Возрастные изменения дыхания'
  };

  var LOAD_TEXT_MAP = {
    student:        'учёба', office_work: 'офисная работа',
    management:     'руководящая должность', physical_work: 'физический труд',
    home_work:      'работа дома', maternity_leave: 'декрет', retired: 'пенсия'
  };

  var AGE_TEXT_MAP = {
    '18-30': 'молодом возрасте', '31-45': 'возрасте 31–45 лет',
    '46-60': 'зрелом возрасте (46–60 лет)', '60+': 'зрелом возрасте (60+ лет)',
    '3-4':  'возрасте 3–4 лет',  '5-6':  'возрасте 5–6 лет',
    '7-8':  'возрасте 7–8 лет',  '9-10': 'возрасте 9–10 лет',
    '11-12':'возрасте 11–12 лет','13-15':'возрасте 13–15 лет',
    '16-17':'возрасте 16–17 лет'
  };

  // =========================================
  // КЛАСС АНАЛИЗА
  // =========================================
  function BreathingAnalysis() {}

  BreathingAnalysis.prototype.analyze = function (answers) {
    var isChild = answers.age_group === 'for_child';
    return isChild ? this._analyzeChild(answers) : this._analyzeAdult(answers);
  };

  // --- ВЗРОСЛЫЕ ---
  BreathingAnalysis.prototype._analyzeAdult = function (answers) {
    var urgency   = this._urgencyScore(answers);
    var readiness = this._readinessScore(answers);
    var fit       = this._fitScore(answers);
    var total     = Math.round(urgency * 0.4 + readiness * 0.35 + fit * 0.25);
    var segment   = total >= 80 ? 'HOT' : total >= 60 ? 'WARM' : 'COLD';
    var issue     = this._primaryIssue(answers, ADULT_ISSUE_PRIORITY);
    var profileName = OCCUPATION_PROFILES[answers.occupation] ||
      (answers.stress_level >= 8 ? 'Критический стресс и напряжение' :
       answers.stress_level >= 6 ? 'Высокий стресс и перегрузки' : 'Профилактика и оздоровление');

    return {
      isChild: false,
      segment: segment,
      primaryIssue: issue,
      profileName: profileName,
      scores: { urgency: urgency, readiness: readiness, fit: fit, total: total },
      message: this._buildAdultMessage(answers, segment, issue)
    };
  };

  BreathingAnalysis.prototype._urgencyScore = function (d) {
    var s = (d.stress_level || 0) * 4;
    var criticals = ['chronic_stress','anxiety','insomnia','high_pressure','breathing_issues'];
    if (Array.isArray(d.current_problems)) {
      d.current_problems.forEach(function(p){ if(criticals.indexOf(p) > -1) s += 15; });
    }
    var bfMap = { constantly:20, often:15, sometimes:10, rarely:5, never:0 };
    s += bfMap[d.breathing_frequency] || 0;
    if (d.shallow_breathing === 'yes_often') s += 10;
    else if (d.shallow_breathing === 'sometimes') s += 5;
    var occRisk = { office_work:10, student:8, maternity_leave:12, physical_work:5 };
    s += occRisk[d.occupation] || 0;
    var ageMul = { '18-30':0.8, '31-45':1.0, '46-60':1.2, '60+':1.3 };
    s *= (ageMul[d.age_group] || 1.0);
    return Math.min(Math.round(s), 100);
  };

  BreathingAnalysis.prototype._readinessScore = function (d) {
    var s = 20;
    var expMap = { never:20, few_times:25, theory_only:18, sometimes:15, regularly:10, expert:8 };
    s += expMap[d.breathing_experience] || 15;
    var timeMap = { '3-5_minutes':30, '10-15_minutes':25, '20-30_minutes':15, '30+_minutes':10 };
    s += timeMap[d.time_commitment] || 20;
    var specificGoals = ['quick_relaxation','stress_resistance','reduce_anxiety','improve_sleep','increase_energy','normalize_pressure'];
    if (Array.isArray(d.main_goals)) {
      d.main_goals.forEach(function(g){ if(specificGoals.indexOf(g) > -1) s += 12; });
    }
    if (d.breathing_method === 'mouth') s += 8;
    if (d.shallow_breathing === 'yes_often') s += 10;
    return Math.min(s, 100);
  };

  BreathingAnalysis.prototype._fitScore = function (d) {
    var s = 30;
    var strengths = ['chronic_stress','anxiety','insomnia','high_pressure','fatigue','concentration_issues'];
    if (Array.isArray(d.current_problems)) {
      d.current_problems.forEach(function(p){ if(strengths.indexOf(p) > -1) s += 10; });
    }
    var occFit = { office_work:15, home_work:12, student:10, maternity_leave:15, retired:8 };
    s += occFit[d.occupation] || 5;
    var ageFit = { '18-30':5, '31-45':15, '46-60':12, '60+':8 };
    s += ageFit[d.age_group] || 8;
    return Math.min(s, 100);
  };

  // --- ДЕТИ ---
  BreathingAnalysis.prototype._analyzeChild = function (answers) {
    var urgency   = this._childUrgency(answers);
    var readiness = this._childReadiness(answers);
    var fit       = this._childFit(answers);
    var total     = Math.round(urgency * 0.5 + readiness * 0.3 + fit * 0.2);
    var segment   = total >= 75 ? 'HOT' : total >= 55 ? 'WARM' : 'COLD';
    var issue     = this._primaryIssue(answers, CHILD_ISSUE_PRIORITY, 'child_problems_detailed');

    return {
      isChild: true,
      segment: segment,
      primaryIssue: issue,
      profileName: 'Ребёнок: ' + (TRANSLATIONS[issue] || issue),
      scores: { urgency: urgency, readiness: readiness, fit: fit, total: total },
      message: this._buildChildMessage(answers, segment, issue)
    };
  };

  BreathingAnalysis.prototype._childUrgency = function (d) {
    var s = 0;
    var ageMap = { '3-4':20,'5-6':15,'7-8':12,'9-10':10,'11-12':8,'13-15':15,'16-17':18 };
    s += ageMap[d.child_age_detail] || 10;
    var critical = ['breathing_issues','anxiety','separation_anxiety','nightmares','aggression','hyperactivity'];
    if (Array.isArray(d.child_problems_detailed)) {
      d.child_problems_detailed.forEach(function(p){ if(critical.indexOf(p)>-1) s+=20; });
    }
    return Math.min(Math.round(s), 100);
  };

  BreathingAnalysis.prototype._childReadiness = function (d) {
    var s = 30;
    var invMap = { mother:25, father:20, both_parents:30, grandparent:15, child_independent:10 };
    s += invMap[d.child_parent_involvement] || 15;
    return Math.min(s, 100);
  };

  BreathingAnalysis.prototype._childFit = function (d) {
    var s = 40;
    var ageFit = { '3-4':10,'5-6':20,'7-8':25,'9-10':30,'11-12':25,'13-15':15,'16-17':20 };
    s += ageFit[d.child_age_detail] || 20;
    var strengths = ['anxiety','hyperactivity','sleep_problems','concentration_issues','aggression','separation_anxiety'];
    if (Array.isArray(d.child_problems_detailed)) {
      d.child_problems_detailed.forEach(function(p){ if(strengths.indexOf(p)>-1) s+=12; });
    }
    return Math.min(s, 100);
  };

  // --- Основная проблема ---
  BreathingAnalysis.prototype._primaryIssue = function (answers, priorityMap, field) {
    field = field || 'current_problems';
    var list = answers[field];
    if (!Array.isArray(list) || list.length === 0) {
      // Попробуем priority_problem
      if (answers.priority_problem) return answers.priority_problem;
      return 'general_wellness';
    }
    var top = 'general_wellness', max = 0;
    list.forEach(function(p){
      var pri = priorityMap[p] || 0;
      if (pri > max) { max = pri; top = p; }
    });
    return top;
  };

  // --- Текст результата для взрослого ---
  BreathingAnalysis.prototype._buildAdultMessage = function (answers, segment, issue) {
    var tech     = ADULT_TECHNIQUES[issue] || ADULT_TECHNIQUES.general_wellness;
    var ageText  = AGE_TEXT_MAP[answers.age_group] || 'вашем возрасте';
    var loadText = LOAD_TEXT_MAP[answers.occupation] || 'ваш ритм жизни';
    var timeText = segment === 'HOT' ? 'Уже через 1–2 минуты' : 'Уже через 2–3 минуты';

    return {
      techniqueName: tech.name,
      tagline: 'Специально подобрана под ваш возраст, ' + loadText + ' и уровень стресса.',
      speed:   timeText + ' практики падает напряжение, нормализуется дыхание и активируется зона мозга, отвечающая за восстановление.',
      reviews: tech.reviews,
      why: 'В ' + ageText + ' нервная система реагирует на стресс особым образом. Эта техника выравнивает дыхательный ритм, снижает уровень кортизола, улучшает кровоснабжение мозга и быстро возвращает ясность и энергию — физиологически обоснованный инструмент именно под ваш тип нагрузки (' + loadText + ').',
      cta: segment === 'HOT' ? 'Вам нужна помощь — не откладывайте!' : 'Вы уже на правильном пути.'
    };
  };

  // --- Текст результата для ребёнка ---
  BreathingAnalysis.prototype._buildChildMessage = function (answers, segment, issue) {
    var tech    = CHILD_TECHNIQUES[issue] || CHILD_TECHNIQUES.general_wellness;
    var ageText = AGE_TEXT_MAP[answers.child_age_detail] || 'возрасте ребёнка';

    return {
      techniqueName: tech.name,
      tagline: 'Специально подобрана под возраст ребёнка (' + ageText.replace('возрасте ','') + ') и его особенности.',
      speed:   'Уже через 3–5 минут игры ребёнок становится спокойнее, лучше сосредотачивается и легче управляет эмоциями.',
      reviews: tech.reviews,
      why: 'В ' + ageText + ' нервная система очень пластична. Игровые дыхательные практики снижают возбуждение, учат контролировать эмоции через игру, нормализуют дыхательный ритм и развивают внимание. Это безопасный и эффективный инструмент.',
      cta: 'Вы делаете важный шаг для здоровья ребёнка.'
    };
  };

  // --- Лейбл сегмента ---
  BreathingAnalysis.prototype.segmentLabel = function (segment) {
    return { HOT: 'Высокий', WARM: 'Средний', COLD: 'Начальный' }[segment] || 'Средний';
  };

  // --- Экспорт ---
  global.BreathingAnalysis = BreathingAnalysis;

})(window);
