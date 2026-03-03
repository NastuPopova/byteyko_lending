import React from 'react';
import '../styles/ProductComparison.css';

const ProductComparison = () => {
  return (
    <section className="products-comparison light-bg">
      <div className="container">
        <h2 className="section-title text-center">Выберите формат обучения методу Бутейко</h2>
        <p className="section-subtitle text-center">Официальный метод с государственной апробацией — индивидуальное сопровождение</p>
        
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-header">Характеристики</th>
                {/* Стартовый комплект - закомментирован */}
                {/* <th className="product-header">
                  <div className="product-name">Стартовый комплект</div>
                  <div className="product-price">990₽</div>
                  <div className="old-price">2 600₽</div>
                  <div className="discount-badge">-62%</div>
                </th> */}
                <th className="product-header">
                  <div className="product-name">Разовая консультация</div>
                  <div className="product-price">5 000₽</div>
                  <div className="text-sm text-gray-600 mt-1">(1 занятие)</div>
                </th>
                <th className="product-header highlight">
                  <div className="bestseller-tag">Лучший выбор</div>
                  <div className="product-name">Пакет 5 занятий</div>
                  <div className="product-price">22 000₽</div>
                  <div className="old-price">25 000₽</div>
                  <div className="discount-badge">-3 000₽</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Основное содержание */}
              <tr>
                <td className="feature-name">Формат</td>
                <td>Персональная консультация 1:1</td>
                <td>5 персональных консультаций 1:1</td>
              </tr>
              <tr>
                <td className="feature-name">Длительность занятия</td>
                <td>60 минут</td>
                <td>60 минут каждое</td>
              </tr>
              <tr>
                <td className="feature-name">Обучение базовым техникам Бутейко</td>
                <td><span className="yes-icon">✓</span></td>
                <td><span className="yes-icon">✓</span></td>
              </tr>
              <tr>
                <td className="feature-name">Измерение контрольной паузы (CO₂)</td>
                <td><span className="yes-icon">✓</span></td>
                <td><span className="yes-icon">✓</span> + отслеживание динамики</td>
              </tr>
              <tr>
                <td className="feature-name">Персональный подбор упражнений</td>
                <td>Базовые рекомендации</td>
                <td>Полный индивидуальный план</td>
              </tr>
              <tr>
                <td className="feature-name">Поддержка между занятиями</td>
                <td><span className="no-icon">×</span></td>
                <td><span className="yes-icon">✓</span> в Telegram</td>
              </tr>
              
              {/* Для кого */}
              <tr className="category-row">
                <td colSpan="3">Для кого подходит</td>
              </tr>
              <tr>
                <td className="feature-name">Базовые состояния</td>
                <td colSpan="2">Астма, аллергия, тревога, стресс, давление, бессонница, панические атаки</td>
              </tr>
              <tr>
                <td className="feature-name">Хронические заболевания</td>
                <td><span className="partial-icon">◐</span> Первичная консультация</td>
                <td><span className="yes-icon">✓</span> Полное сопровождение</td>
              </tr>
              <tr>
                <td className="feature-name">Охват метода Бутейко</td>
                <td>Базовые принципы и первые техники</td>
                <td><strong>Полный комплекс упражнений</strong> — глубокая проработка</td>
              </tr>
              
              {/* Чего достигнете */}
              <tr className="category-row">
                <td colSpan="3">Чего достигнете</td>
              </tr>
              <tr>
                <td className="feature-name">Научитесь снимать острые симптомы</td>
                <td><span className="yes-icon">✓</span> Техники первой помощи (приступ, паника, давление)</td>
                <td><span className="yes-icon">✓</span> + работа с причинами</td>
              </tr>
              <tr>
                <td className="feature-name">Нормализация CO₂ (рост КП)</td>
                <td><span className="partial-icon">◐</span> Первые шаги</td>
                <td><span className="yes-icon">✓</span> Стабильная динамика</td>
              </tr>
              <tr>
                <td className="feature-name">Снижение дозы лекарств</td>
                <td><span className="partial-icon">◐</span> Понимание принципов</td>
                <td><span className="yes-icon">✓</span> Постепенное снижение под контролем</td>
              </tr>
              <tr>
                <td className="feature-name">Устранение причины болезней</td>
                <td><span className="partial-icon">◐</span></td>
                <td><span className="yes-icon">✓</span> Цель программы</td>
              </tr>
              <tr>
                <td className="feature-name">Сколько времени нужно заниматься</td>
                <td colSpan="2">Постепенно от 15 минут и выше, чтобы всегда быть в методе</td>
              </tr>
              
              {/* Кнопки покупки */}
              <tr className="action-row">
                <td></td>
                <td>
                  <a href="#consultation" className="cta-button cta-small">Забронировать</a>
                </td>
                <td>
                  <a href="#consultation" className="cta-button cta-small cta-primary">Начать обучение</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="table-footnote">
          <p>⁂ Результат зависит от систематичности практики и выполнения рекомендаций инструктора. Метод Бутейко — это не замена медицинского лечения, а дополнение к нему. Снижение дозы лекарств происходит постепенно по мере роста контрольной паузы и только под контролем лечащего врача.</p>
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
