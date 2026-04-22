import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Send, CheckCircle, Loader, Check } from 'lucide-react';
import { sendPurchaseIntent } from '../utils/telegramNotify';

const STEPS = { CONFIRM: 'confirm', CONTACTS: 'contacts', SUCCESS: 'success' };

const plans = [
  {
    id: 'trial',
    badge: 'Начните здесь',
    badgeColor: '#2D6A4F',
    badgeBg: '#D8F3DC',
    title: 'Пробное занятие',
    subtitle: 'Почувствуйте результат за 40 минут',
    price: '1 500',
    unit: '₽ за занятие',
    features: [
      'Замер контрольной паузы до и после',
      'Практика расслабления по Бутейко',
      'Снятие симптома прямо на занятии',
      'Домашнее задание и личная обратная связь',
    ],
  },
  {
    id: 'intensive',
    badge: 'Быстрый результат',
    badgeColor: '#7B4F00',
    badgeBg: '#FFF3CD',
    title: 'Недельный интенсив',
    subtitle: '7 дней подряд — формируем привычку правильного дыхания',
    price: '14 000',
    unit: '₽ за неделю',
    features: [
      '7 занятий по 30 минут каждый день',
      'Контроль правильности выполнения в реальном времени',
      'Поддержка в Telegram между занятиями',
      'Ежедневное отслеживание КП — видите прогресс каждый день',
    ],
  },
  {
    id: 'course',
    badge: 'Лучший выбор',
    badgeColor: '#1a3a5c',
    badgeBg: '#DBEAFE',
    title: 'Курс 5 занятий',
    subtitle: 'Полная программа метода Бутейко под личным контролем',
    price: '25 000',
    unit: '₽ за курс',
    features: [
      '5 занятий по 60 минут раз в неделю',
      'Полная программа упражнений метода',
      'Отслеживание КП в динамике',
      'Поддержка в Telegram между занятиями',
      'Видеозаписи всех занятий',
    ],
  },
];

// ──── Диалог подтверждения закрытия ──────────────────────────────────────────
const CloseConfirmDialog = ({ onStay, onExit }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '1.25rem',
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(2px)',
    }}
  >
    <div style={{
      background: '#fff',
      borderRadius: '1rem',
      boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
      margin: '1rem',
      padding: '1.5rem',
      maxWidth: '320px',
      width: '100%',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🤔</div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
        Уверены, что хотите выйти?
      </h3>
      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.25rem' }}>
        Введённые данные не сохранятся
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onStay}
          style={{
            flex: 1, padding: '0.75rem', borderRadius: '10px',
            border: '2px solid #059669', color: '#059669',
            fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
            background: '#fff', transition: 'background 150ms',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
        >
          Остаться
        </button>
        <button
          onClick={onExit}
          style={{
            flex: 1, padding: '0.75rem', borderRadius: '10px',
            border: 'none', background: '#f3f4f6', color: '#374151',
            fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
            transition: 'background 150ms',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
          onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
        >
          Выйти
        </button>
      </div>
    </div>
  </div>
);

// ──── Основной компонент ──────────────────────────────────────────────────────
const PurchaseModal = ({ initialPlan, onClose }) => {
  const [step, setStep] = useState(STEPS.CONFIRM);
  const [selectedPlan, setSelectedPlan] = useState(
    plans.find(p => p.id === initialPlan?.id) || plans[0]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ telegram: '', phone: '', email: '' });
  const [visible, setVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Анимация появления
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // Блокировка скролла страницы
  useEffect(() => {
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'scroll';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Закрытие по Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (showConfirm) {
          setShowConfirm(false);
        } else if (step !== STEPS.SUCCESS) {
          handleCloseRequest();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step, showConfirm]);

  // Запрос закрытия — показываем подтверждение если не SUCCESS
  const handleCloseRequest = () => {
    if (step === STEPS.SUCCESS) {
      doClose();
    } else {
      setShowConfirm(true);
    }
  };

  const doClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.telegram.trim()) {
      setError('Укажите Telegram для связи');
      return;
    }
    setLoading(true);
    setError('');
    const ok = await sendPurchaseIntent({ plan: selectedPlan, contacts: form });
    setLoading(false);
    if (ok) {
      setStep(STEPS.SUCCESS);
    } else {
      setError('Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.');
    }
  };

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: `rgba(0,0,0,${visible ? '0.6' : '0'})`,
    backdropFilter: `blur(${visible ? '4px' : '0'})`,
    transition: 'background-color 250ms ease, backdrop-filter 250ms ease',
  };

  const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: '1.25rem',
    boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
    width: '100%',
    maxWidth: '480px',
    maxHeight: '90vh',
    overflowY: 'auto',
    transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
    opacity: visible ? 1 : 0,
    transition: 'transform 250ms cubic-bezier(0.16,1,0.3,1), opacity 250ms ease',
    position: 'relative',
  };

  return (
    <div
      style={overlayStyle}
      onClick={(e) => { if (e.target === e.currentTarget) handleCloseRequest(); }}
    >
      <div style={modalStyle}>

        {/* Диалог подтверждения выхода */}
        {showConfirm && (
          <CloseConfirmDialog
            onStay={() => setShowConfirm(false)}
            onExit={() => { setShowConfirm(false); doClose(); }}
          />
        )}

        {/* Шапка */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '2px' }}>
              {step === STEPS.CONFIRM && 'Шаг 1 из 2 — Выбор продукта'}
              {step === STEPS.CONTACTS && 'Шаг 2 из 2 — Контактные данные'}
              {step === STEPS.SUCCESS && 'Готово'}
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              {step === STEPS.SUCCESS ? '🎉 Заявка отправлена!' : 'Оформление заявки'}
            </h3>
          </div>
          {step !== STEPS.SUCCESS && (
            <button
              onClick={handleCloseRequest}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#9ca3af', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
              aria-label="Закрыть"
            >
              <X size={22} />
            </button>
          )}
        </div>

        <div style={{ padding: '1.5rem' }}>

          {/* ШАГ 1: Выбор продукта */}
          {step === STEPS.CONFIRM && (
            <div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '1.25rem', background: '#f3f4f6', borderRadius: '10px', padding: '4px' }}>
                {plans.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlan(p)}
                    style={{
                      flex: 1,
                      padding: '6px 4px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      border: 'none',
                      borderRadius: '7px',
                      cursor: 'pointer',
                      transition: 'all 180ms ease',
                      backgroundColor: selectedPlan.id === p.id ? '#fff' : 'transparent',
                      color: selectedPlan.id === p.id ? '#059669' : '#6b7280',
                      boxShadow: selectedPlan.id === p.id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    {p.title}
                  </button>
                ))}
              </div>

              <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem', border: '1px solid #d1fae5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: 0 }}>{selectedPlan.title}</h4>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px',
                    borderRadius: '999px', whiteSpace: 'nowrap', marginLeft: '8px',
                    color: selectedPlan.badgeColor, backgroundColor: selectedPlan.badgeBg
                  }}>
                    {selectedPlan.badge}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.75rem' }}>{selectedPlan.subtitle}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '1.875rem', fontWeight: 800, color: '#059669' }}>{selectedPlan.price}</span>
                  <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{selectedPlan.unit}</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedPlan.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: '#374151' }}>
                    <Check size={16} style={{ color: '#10b981', marginTop: '2px', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setStep(STEPS.CONTACTS)}
                style={{
                  width: '100%', padding: '0.875rem', borderRadius: '12px',
                  background: '#059669', color: '#fff', fontWeight: 700,
                  fontSize: '1rem', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'background 180ms ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#047857'}
                onMouseLeave={e => e.currentTarget.style.background = '#059669'}
              >
                Продолжить <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* ШАГ 2: Контакты */}
          {step === STEPS.CONTACTS && (
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Оставьте контакты — я свяжусь с вами, чтобы подтвердить занятие и договориться об оплате.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f9fafb', borderRadius: '8px', padding: '10px 14px', marginBottom: '1.25rem', border: '1px solid #e5e7eb' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Выбранный продукт</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{selectedPlan.title}</div>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#059669' }}>{selectedPlan.price} {selectedPlan.unit}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                    Telegram <span style={{ color: '#ef4444' }}>*</span>
                    <span style={{ fontWeight: 400, color: '#9ca3af' }}> (например: @username)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="@ваш_username"
                    value={form.telegram}
                    onChange={e => { setForm({ ...form, telegram: e.target.value }); setError(''); }}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem',
                      border: error && !form.telegram.trim() ? '1.5px solid #ef4444' : '1.5px solid #e5e7eb',
                      outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                      transition: 'border-color 150ms',
                    }}
                    onFocus={e => e.target.style.borderColor = '#059669'}
                    onBlur={e => e.target.style.borderColor = error && !form.telegram.trim() ? '#ef4444' : '#e5e7eb'}
                    autoFocus
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                    Телефон <span style={{ fontWeight: 400, color: '#9ca3af' }}>(необязательно)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 900 000-00-00"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem',
                      border: '1.5px solid #e5e7eb', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                    }}
                    onFocus={e => e.target.style.borderColor = '#059669'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                    Email <span style={{ fontWeight: 400, color: '#9ca3af' }}>(необязательно)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.ru"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem',
                      border: '1.5px solid #e5e7eb', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                    }}
                    onFocus={e => e.target.style.borderColor = '#059669'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              {error && (
                <div style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '0.75rem', padding: '8px 12px', background: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                  ⚠️ {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => { setStep(STEPS.CONFIRM); setError(''); }}
                  style={{
                    flex: '0 0 auto', padding: '0.875rem 1rem', borderRadius: '12px',
                    border: '1.5px solid #e5e7eb', background: '#fff', color: '#6b7280',
                    fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <ChevronLeft size={16} /> Назад
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1, padding: '0.875rem', borderRadius: '12px',
                    background: loading ? '#6ee7b7' : '#059669',
                    color: '#fff', fontWeight: 700, fontSize: '1rem',
                    border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'background 180ms',
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#047857'; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#059669'; }}
                >
                  {loading
                    ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Отправка...</>
                    : <><Send size={18} /> Отправить заявку</>
                  }
                </button>
              </div>
            </form>
          )}

          {/* ШАГ 3: Успех */}
          {step === STEPS.SUCCESS && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Заявка получена!</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '6px' }}>
                Вы оставили заявку на: <strong style={{ color: '#111827' }}>{selectedPlan.title}</strong>
              </p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '2rem', lineHeight: 1.5 }}>
                Я свяжусь с вами в Telegram в ближайшее время для подтверждения.
              </p>
              <button
                onClick={doClose}
                style={{
                  width: '100%', padding: '0.875rem', borderRadius: '12px',
                  background: '#10b981', color: '#fff', fontWeight: 700,
                  fontSize: '1rem', border: 'none', cursor: 'pointer',
                  transition: 'background 180ms',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#059669'}
                onMouseLeave={e => e.currentTarget.style.background = '#10b981'}
              >
                Отлично, жду! 👋
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default PurchaseModal;
