import React, { useState } from 'react';
import { Brain, Activity, Heart, Stethoscope, UserCircle2, Award, FlaskConical } from 'lucide-react';
import '../styles/ScienceBlock.css';

const buteikoPhoto = process.env.PUBLIC_URL + '/images/Buteiko.jpg';

const ScienceBlock = () => {
  const [activeTab, setActiveTab] = useState('about');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabs = [
    {
      id: 'about',
      title: 'Метод Бутейко',
      icon: <UserCircle2 size={24} />,
      content: (
        <div className="buteiko-about">
          <div className="buteiko-hero">
            <div className="buteiko-photo-wrap">
              <img src={buteikoPhoto} alt="Константин Павлович Бутейко" className="buteiko-photo" />
              <div className="buteiko-photo-caption">К.П. Бутейко<br /><span>1923 – 2003</span></div>
            </div>
            <div className="buteiko-intro">
              <h3>Константин Павлович Бутейко</h3>
              <p className="buteiko-subtitle">Советский врач-физиолог, кандидат медицинских наук, автор революционного метода лечения болезней через нормализацию дыхания</p>
              <p>
                В 1952 году Бутейко открыл связь между хронической гипервентиляцией (избыточным дыханием)
                и развитием более <strong>179 заболеваний</strong>. Избыточное дыхание приводит к дефициту
                углекислого газа (CO₂) в крови — гипокапнии, которая нарушает транспорт кислорода
                к тканям и запускает цепочку патологических реакций.
              </p>
              <p>
                Метод направлен на нормализацию дыхания, восстановление баланса CO₂ и O₂,
                что устраняет первопричину заболеваний, а не только их симптомы.
              </p>
            </div>
          </div>

          <div className="buteiko-stats">
            <div className="buteiko-stat-card">
              <div className="bstat-number">179</div>
              <div className="bstat-label">нозологических единиц</div>
              <div className="bstat-desc">заболеваний, при которых эффективен метод</div>
            </div>
            <div className="buteiko-stat-card highlight">
              <div className="bstat-number">96,69%</div>
              <div className="bstat-label">эффективность</div>
              <div className="bstat-desc">по данным официальной государственной апробации</div>
            </div>
            <div className="buteiko-stat-card">
              <div className="bstat-number">с 1952</div>
              <div className="bstat-label">года</div>
              <div className="bstat-desc">более 70 лет клинического применения по всему миру</div>
            </div>
            <div className="buteiko-stat-card">
              <div className="bstat-number">10 935</div>
              <div className="bstat-label">пациентов</div>
              <div className="bstat-desc">пролечено только за 1990 год по официальной статистике</div>
            </div>
          </div>

          <div className="buteiko-diseases">
            <h4>Области применения метода</h4>
            <div className="diseases-grid">
              <div className="disease-category">
                <div className="disease-icon"><Activity size={22} color="#4cdfff" /></div>
                <div>
                  <strong>Респираторные</strong>
                  <p>Астма, бронхит, аллергии, синусит, ХОБЛ, апноэ сна</p>
                </div>
              </div>
              <div className="disease-category">
                <div className="disease-icon"><Heart size={22} color="#4cdfff" /></div>
                <div>
                  <strong>Сердечно-сосудистые</strong>
                  <p>Гипертония, аритмия, стенокардия, атеросклероз</p>
                </div>
              </div>
              <div className="disease-category">
                <div className="disease-icon"><Brain size={22} color="#4cdfff" /></div>
                <div>
                  <strong>Нервные и психические</strong>
                  <p>Стресс, тревога, бессонница, панические атаки, депрессия</p>
                </div>
              </div>
              <div className="disease-category">
                <div className="disease-icon"><FlaskConical size={22} color="#4cdfff" /></div>
                <div>
                  <strong>Обменные и эндокринные</strong>
                  <p>Диабет, ожирение, нарушения иммунитета, хроническая усталость</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'approbation',
      title: 'Апробации',
      icon: <Award size={24} />,
      content: (
        <div className="approbation-block">
          <p className="approbation-intro">
            Метод Бутейко прошёл <strong>две государственные апробации</strong> в ведущих медицинских
            учреждениях СССР и официально признан Министерством здравоохранения.
          </p>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">1952</div>
              <div className="timeline-content">
                <h4>Открытие метода</h4>
                <p>К.П. Бутейко формулирует теорию болезней глубокого дыхания и начинает клинические наблюдения в Новосибирском Академгородке.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1968</div>
              <div className="timeline-content">
                <h4>I Государственная апробация</h4>
                <p>Проведена во Всесоюзном НИИ пульмонологии Минздрава СССР. Результаты подтвердили высокую эффективность метода при бронхиальной астме.</p>
                <div className="timeline-badge">ВНИИ пульмонологии, Минздрав СССР</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1981</div>
              <div className="timeline-content">
                <h4>II Государственная апробация</h4>
                <p>Проведена в Первом Московском государственном медицинском университете им. И.М. Сеченова. Подтверждена эффективность при широком спектре заболеваний.</p>
                <div className="timeline-badge">Первый МГМУ им. Сеченова</div>
              </div>
            </div>
            <div className="timeline-item primary">
              <div className="timeline-year">1985</div>
              <div className="timeline-content">
                <h4>Официальное признание Минздрава СССР</h4>
                <p>Издан приказ Министерства здравоохранения СССР о внедрении метода Бутейко в медицинскую практику для лечения бронхиальной астмы и других респираторных заболеваний.</p>
                <div className="timeline-badge highlight">Приказ Минздрава СССР</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1990</div>
              <div className="timeline-content">
                <h4>Доклад Всесоюзного семинара врачей</h4>
                <p>По итогам семинара опубликована официальная статистика применения метода.</p>
                <div className="approbation-result-grid">
                  <div className="approbation-result">
                    <span className="ar-number">10 935</span>
                    <span className="ar-label">пациентов пролечено за год</span>
                  </div>
                  <div className="approbation-result highlight">
                    <span className="ar-number">96,69%</span>
                    <span className="ar-label">получили улучшение состояния</span>
                  </div>
                  <div className="approbation-result">
                    <span className="ar-number">179</span>
                    <span className="ar-label">нозологических единиц</span>
                  </div>
                </div>
                <div className="timeline-badge">Всесоюзный семинар врачей-практиков</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1995+</div>
              <div className="timeline-content">
                <h4>Международное распространение</h4>
                <p>Метод применяется в клиниках России, Австралии, Великобритании, Новой Зеландии. Cochrane Review (2020) подтверждает снижение частоты приступов астмы на 50–70% и уменьшение потребности в ингаляторах.</p>
                <div className="timeline-badge">Cochrane Review 2020 · GINA</div>
              </div>
            </div>
          </div>

          <div className="research-info">
            <div className="info-icon">i</div>
            <p>
              Источники: официальная статистика <strong>buteykomoscow.ru</strong>, базы PubMed,
              Cochrane Library, клинические рекомендации GINA.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'mechanisms',
      title: 'Как это работает',
      icon: <Brain size={24} />,
      content: (
        <div className="science-cards">
          <div className="science-card">
            <div className="card-icon">
              <Brain size={60} color="#4cdfff" />
            </div>
            <h3>Влияние на нервную систему</h3>
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-value negative">-40%</div>
                <div className="stat-description">снижение стресса</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">+35%</div>
                <div className="stat-description">восстановление</div>
              </div>
            </div>
            <p>Нормализация CO₂ активирует блуждающий нерв («нерв спокойствия»), снижает тревожность и улучшает качество сна. Парасимпатическая нервная система переходит в режим восстановления.</p>
          </div>

          <div className="science-card">
            <div className="card-icon">
              <Activity size={60} color="#4cdfff" />
            </div>
            <h3>Биохимические изменения</h3>
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-value negative">-23%</div>
                <div className="stat-description">воспаление</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">+20%</div>
                <div className="stat-description">кислород в тканях</div>
              </div>
            </div>
            <p>Восстановление нормального уровня CO₂ стабилизирует pH крови, снижает окислительный стресс и повышает эффективность доставки кислорода к клеткам — эффект Вериго–Бора.</p>
          </div>
        </div>
      )
    },
    {
      id: 'research',
      title: 'Исследования',
      icon: <Activity size={24} />,
      content: (
        <div className="science-cards">
          <div className="science-card">
            <div className="card-icon">
              <Activity size={60} color="#4cdfff" />
            </div>
            <h3>Астма и дыхание</h3>
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-value negative">-50–70%</div>
                <div className="stat-description">частота приступов</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">96,8%</div>
                <div className="stat-description">улучшение при бронхите</div>
              </div>
            </div>
            <p>РКИ (Egyptian Journal of Chest Diseases, 2012; PMC, 2022) показывают снижение частоты приступов астмы на 50–70%, рост пиковой экспираторной скорости и сокращение потребности в ингаляторах.</p>
          </div>

          <div className="science-card">
            <div className="card-icon">
              <Heart size={60} color="#4cdfff" />
            </div>
            <h3>Сердце и давление</h3>
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-value negative">-10–15%</div>
                <div className="stat-description">артериальное давление</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">96,2%</div>
                <div className="stat-description">улучшение при гипертонии</div>
              </div>
            </div>
            <p>Исследования (Indian Journal of Physiotherapy, 2022) фиксируют снижение АД и частоты сердцебиения у пациентов с гипертонией после 4–6 недель практики. По официальной апробации 1990 года улучшение при гипертонии составило 96,2%.</p>
          </div>

          <div className="research-info">
            <div className="info-icon">i</div>
            <p><strong>Cochrane Review 2020</strong> подтверждает умеренное улучшение качества жизни и функции лёгких. Систематические обзоры (Australian Government Department of Health, 2015) рекомендуют метод как эффективное дополнение к стандартному лечению астмы, апноэ сна, ХОБЛ и тревожных расстройств.</p>
          </div>
        </div>
      )
    },
    {
      id: 'medicine',
      title: 'Признано медициной',
      icon: <Stethoscope size={24} />,
      content: (
        <div className="organizations-container">
          <h3>Признание медицинским сообществом</h3>
          <div className="org-logos">
            <div className="org-logo-item">
              <div className="org-logo-icon">
                <Stethoscope size={40} color="#4cdfff" />
              </div>
              <p>Минздрав СССР</p>
              <div className="status">Приказ о внедрении, 1985</div>
            </div>
            <div className="org-logo-item">
              <div className="org-logo-icon">
                <Heart size={40} color="#4cdfff" />
              </div>
              <p>GINA — Global Initiative for Asthma</p>
              <div className="status">Упомянут как немедикаментозная терапия</div>
            </div>
            <div className="org-logo-item">
              <div className="org-logo-icon">
                <Activity size={40} color="#4cdfff" />
              </div>
              <p>Cochrane Collaboration</p>
              <div className="status">Review 2020 — подтверждена польза</div>
            </div>
          </div>

          <div className="quote-block">
            <div className="quote-marks">&ldquo;</div>
            <p className="quote-text">
              Метод дыхательной гимнастики Бутейко — единственный в мире немедикаментозный метод,
              прошедший две государственные апробации и официально утверждённый Министерством
              здравоохранения для лечения бронхиальной астмы и сопутствующих заболеваний.
            </p>
            <div className="quote-source">По материалам официальных апробаций Минздрава СССР</div>
          </div>

          <div className="research-info">
            <div className="info-icon">!</div>
            <p>Метод рекомендуется как <strong>дополнение к стандартному лечению</strong>, а не его замена. Перед началом практики необходима консультация врача, особенно при хронических заболеваниях.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="science-block">
      <div className="container">
        <h2 className="section-title">Научное обоснование дыхательных практик</h2>

        <div className="science-tabs">
          <div className="tab-buttons">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                {tab.title}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {tabs.find(tab => tab.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScienceBlock;
