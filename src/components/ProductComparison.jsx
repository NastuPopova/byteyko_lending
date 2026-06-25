import React from 'react';
import '../styles/ProductComparison.css';

const YES  = () => <span className="yes-icon">✓</span>;
const NO   = () => <span className="no-icon">−</span>;
const PART = () => <span className="part-icon">◐</span>;

const rows = [
  {
    group: 'Основное',
    items: [
      {
        label: 'Цена',
        trial:     <strong>1 500 ₽</strong>,
        intensive: <strong>14 000 ₽</strong>,
        course:    <strong>25 000 ₽</strong>,
      },
      {
        label: 'Формат',
        trial:     'Видеозапись, онлайн',
        intensive: '7 занятий подряд, каждый день',
        course:    '5 персональных занятий 1:1',
      },
      {
        label: 'Длительность',
        trial:     '40 минут',
        intensive: '30 минут в день',
        course:    '45 минут каждое',
      },
      {
        label: 'Измерение КП',
        trial:     <NO />,
        intensive: 'Каждый день — отслеживаем динамику',
        course:    'На каждом занятии',
      },
      {
        label: 'Контроль выполнения',
        trial:     <YES />,
        intensive: 'Ежедневно — вижу и корректирую',
        course:    'На каждом занятии',
      },
      {
        label: 'Поддержка в Telegram',
        trial:     <YES />,
        intensive: 'Между занятиями в рабочее время',
        course:    'Между занятиями',
      },
    ],
  },
  {
    group: 'Для кого',
    items: [
      {
        label: '',
        trial:     'Первое знакомство с методом',
        intensive: 'Астма, гипертония, хронические симптомы каждый день',
        course:    'Стресс, общее оздоровление, системный подход',
      },
    ],
  },
  {
    group: 'Чего достигнете',
    items: [
      {
        label: '',
        trial:     'Познакомитесь с методом в удобное время',
        intensive: 'Сформируете привычку правильного дыхания за 7 дней',
        course:    'Осваиваете полный комплекс упражнений Бутейко',
      },
      {
        label: 'Снижение симптомов',
        trial:     'Понимание метода за одно занятие',
        intensive: 'Устойчивое улучшение за неделю',
        course:    'Глубокая работа с причиной',
      },
    ],
  },
];

const TELEGRAM_BOT = 'breathing_opros_bot';

const ProductComparison = () => {
  const go = (key) => {
    const links = {
      trial:     `https://t.me/${TELEGRAM_BOT}?start=websiteCtaTrial`,
      intensive: `https://t.me/${TELEGRAM_BOT}?start=websiteCtaIntensive`,
      course:    `https://t.me/${TELEGRAM_BOT}?start=websiteCtaCourse`,
    };
    window.open(links[key], '_blank');
  };

  return (
    <section className="products-comparison light-bg">
      <div className="container">
        <h2 className="section-title text-center">Выберите формат обучения методу Бутейко</h2>
        <p className="section-subtitle text-center">Официальный метод с государственной апробацией — от первого знакомства до глубокой проработки</p>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-header"></th>
                <th className="product-header">
                  <div className="product-badge badge-green">Начните здесь</div>
                  <div className="product-name">Видеоурок</div>
                  <div className="product-price">1 500 ₽</div>
                  <div className="product-meta">40 мин, онлайн</div>
                </th>
                <th className="product-header">
                  <div className="product-badge badge-amber">Быстрый результат</div>
                  <div className="product-name">Недельный интенсив</div>
                  <div className="product-price">14 000 ₽</div>
                  <div className="product-meta">7 дней × 30 мин</div>
                </th>
                <th className="product-header highlight">
                  <div className="bestseller-tag">Лучший выбор</div>
                  <div className="product-badge badge-blue">Системный результат</div>
                  <div className="product-name">Курс 5 занятий</div>
                  <div className="product-price">25 000 ₽</div>
                  <div className="product-meta">5 × 45 мин, раз в неделю</div>
                  <div className="product-note">5 000 ₽ / занятие</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((group) => (
                <React.Fragment key={group.group}>
                  <tr className="category-row">
                    <td colSpan="4">{group.group}</td>
                  </tr>
                  {group.items.map((row, i) => (
                    <tr key={i}>
                      <td className="feature-name">{row.label}</td>
                      <td>{row.trial}</td>
                      <td>{row.intensive}</td>
                      <td>{row.course}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              <tr className="action-row">
                <td></td>
                <td><button onClick={() => go('trial')} className="cta-button cta-small">Записаться</button></td>
                <td><button onClick={() => go('intensive')} className="cta-button cta-small">Начать интенсив</button></td>
                <td><button onClick={() => go('course')} className="cta-button cta-small cta-primary">Начать курс</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-footnote">
          <p>⁂ Результат зависит от систематичности практики и выполнения рекомендаций инструктора. Метод Бутейко — это не замена медицинского лечения, а дополнение к нему.</p>
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
