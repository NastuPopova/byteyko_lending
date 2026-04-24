import React, { useState, useEffect } from 'react';
import { Quote, X, ChevronLeft, ChevronRight, Image as ImageIcon, CheckCircle, MessageCircle, Star, ThumbsUp, Shield } from 'lucide-react';

const PROXY_URL = 'https://buteyko-api.bothost.tech';

const initialReviews = [
  {
    name: 'Любовь',
    surname: '',
    verified: true,
    telegramUsername: '@Liybov_Bardina',
    rating: 5,
    content: `Хочу оставить отзыв о прохождении курса техники дыхания у Александра. Раньше постоянно боролась с тревогой. Техники дыхания, которые я изучила на курсе, оказались простыми, но невероятно эффективными.`,
    fullContent: `Хочу оставить отзыв о прохождении курса техники дыхания у Александра. Раньше постоянно боролась с тревогой. Техники дыхания, которые я изучила на курсе, оказались простыми, но невероятно эффективными. Научившись правильно дышать, я почувствовала значительное облегчение. Научилась справляться с тревожностью. Каждый урок наполнен полезной информацией и практическими упражнениями, которые я смогу применять в повседневной жизни. Теперь я могу управлять своим состоянием.`,
    results: { 'улучшение сна': '80%', 'снижение стресса': '65%', 'повышение энергии': '70%' },
    date: '9 февраля 2024',
    avatar: `${process.env.PUBLIC_URL}/reviews/luba.jpg`,
    image: '',
    likes: 24,
    courseDuration: '2 месяца'
  },
  {
    name: 'Александра',
    surname: '',
    verified: true,
    telegramUsername: '@alex_iv',
    rating: 4,
    content: `Методику правильного дыхания, освоила совсем недавно! Благодаря Александру, я узнала технику правильного дыхания, благотворное влияние на организм!`,
    fullContent: `Методику правильного дыхания, освоила совсем недавно! Благодаря Александру, я узнала технику правильного дыхания, благотворное влияние на организм! Из видимых результатов, я вылечила аллергию на животных, от которой страдала всю жизнь, стала лучше себя чувствовать, навсегда забыла про головные боли! Спасибо огромное за упражнения!`,
    results: { 'улучшение сна': '90%', 'снижение стресса': '85%', 'повышение энергии': '80%' },
    date: '15 марта 2024',
    avatar: `${process.env.PUBLIC_URL}/reviews/ALEXENDRA.jpg`,
    image: '',
    likes: 18,
    courseDuration: '1 месяц'
  },
  {
    name: 'Дмитрий',
    surname: '',
    verified: true,
    telegramUsername: '@dim_sok',
    rating: 5,
    content: `Никогда не думал, что правильное дыхание может так сильно повлиять на качество жизни. После курса я заметил значительное улучшение в своей физической форме и выносливости.`,
    fullContent: `Никогда не думал, что правильное дыхание может так сильно повлиять на качество жизни. После курса я заметил значительное улучшение в своей физической форме и выносливости. Особенно помогает при занятиях спортом. Техники, которым научил Александр, действительно работают.`,
    results: { 'улучшение сна': '40%', 'снижение стресса': '75%', 'повышение энеджии': '60%' },
    date: '1 марта 2024',
    avatar: null,
    image: '',
    likes: 15,
    courseDuration: '3 месяца'
  }
];

// ─── Верификация через прокси ───
const VerificationButton = ({ onVerify }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusText, setStatusText] = useState('Подтвердить через Telegram');

  const handleVerification = async () => {
    setIsVerifying(true);
    setStatusText('Ожидаем подтверждения...');

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    sessionStorage.setItem('verificationCode', code);

    window.open(`https://t.me/breathing_otziv_bot?start=${code}`, '_blank');

    // Проверяем статус верификации через прокси
    let attempts = 0;
    const maxAttempts = 40; // 2 минуты

    const checkStatus = async () => {
      try {
        const res = await fetch(`${PROXY_URL}/verify-telegram?code=${code}`);
        const data = await res.json();
        if (data.verified) {
          sessionStorage.setItem('isVerified', 'true');
          sessionStorage.setItem('telegramUsername', data.username || '');
          onVerify(data.username || '');
          setIsVerifying(false);
          return;
        }
      } catch (_) {}

      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkStatus, 3000);
      } else {
        setIsVerifying(false);
        setStatusText('Подтвердить через Telegram');
        alert('Время верификации истекло. Перейдите в бот и отправьте команду /start.');
      }
    };

    setTimeout(checkStatus, 3000);
  };

  return (
    <button
      onClick={handleVerification}
      disabled={isVerifying}
      className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-60"
    >
      <MessageCircle className="h-5 w-5" />
      {statusText}
    </button>
  );
};

// ─── Форма отзыва ───
const ReviewForm = ({ onSubmit, onClose }) => {
  const [isVerified, setIsVerified] = useState(() => sessionStorage.getItem('isVerified') === 'true');
  const [telegramUsername, setTelegramUsername] = useState(() => sessionStorage.getItem('telegramUsername') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', surname: '', rating: 5, content: '',
    results: { 'улучшение сна': '0', 'снижение стресса': '0', 'повышение энергии': '0' }
  });

  const handleVerification = (username) => {
    setIsVerified(true);
    setTelegramUsername(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) { alert('Пожалуйста, подтвердите свою личность через Telegram'); return; }
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        telegramUsername,
        rating: formData.rating,
        content: formData.content,
        results: {
          'улучшение сна':     `${formData.results['улучшение сна']}%`,
          'снижение стресса':  `${formData.results['снижение стресса']}%`,
          'повышение энергии': `${formData.results['повышение энергии']}%`,
        }
      };

      const res = await fetch(`${PROXY_URL}/submit-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.ok) {
        sessionStorage.removeItem('isVerified');
        sessionStorage.removeItem('telegramUsername');
        onSubmit(); // сообщаем родителю об успехе
        onClose();
      } else {
        alert('Ошибка при отправке. Попробуйте ещё раз.');
      }
    } catch (_) {
      alert('Ошибка соединения. Проверьте интернет.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Блок верификации */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">Верификация отзыва</span>
        </div>
        <p className="text-sm text-yellow-600 mb-4">Для публикации отзыва необходимо подтвердить свою личность через Telegram</p>
        {isVerified ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>Подтверждено через {telegramUsername}</span>
          </div>
        ) : (
          <VerificationButton onVerify={handleVerification} />
        )}
      </div>

      {/* Имя */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Фамилия</label>
          <input type="text" value={formData.surname} onChange={(e) => setFormData({ ...formData, surname: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200" />
        </div>
      </div>

      {/* Оценка */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Оценка</label>
        <div className="flex gap-2">
          {[1,2,3,4,5].map((star) => (
            <button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })} className="focus:outline-none">
              <Star className={`h-8 w-8 ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Текст отзыва */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ваш отзыв</label>
        <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 h-32" required />
      </div>

      {/* Результаты */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Оцените результаты (в процентах)</label>
        <div className="grid gap-4">
          {Object.entries(formData.results).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <label className="text-sm text-gray-600 flex-1">{key}</label>
              <input type="number" min="0" max="100" value={value}
                onChange={(e) => setFormData({ ...formData, results: { ...formData.results, [key]: e.target.value } })}
                className="w-24 px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200" />
              <span className="text-sm text-gray-500">%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-60"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить на модерацию'}
      </button>

      <p className="text-xs text-gray-400 text-center">ℹ️ Отзыв появится на сайте после проверки модератором</p>
    </form>
  );
};

// ─── Карточка отзыва ───
const ReviewCard = ({ review, onClick, onImageClick }) => (
  <div onClick={onClick} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 h-full flex flex-col">
    <div className="flex items-center mb-4">
      <div className="relative">
        {review.avatar ? (
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img src={review.avatar} alt={`Аватар ${review.name}`} className="w-full h-full object-cover"
              onError={(e) => { e.target.src = `${process.env.PUBLIC_URL}/images/default-avatar.jpg`; }} />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
            <span className="text-xl font-bold text-white">{review.name[0]}</span>
          </div>
        )}
        {review.verified && (
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg">
            <CheckCircle className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
      <div className="ml-3 flex-1">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          {review.name}
          {review.verified && (
            <span className="text-xs text-teal-600 flex items-center">
              <MessageCircle className="h-3 w-3 mr-1" />{review.telegramUsername}
            </span>
          )}
        </h3>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
          {review.courseDuration && <span className="text-xs text-gray-500 ml-2">• {review.courseDuration}</span>}
        </div>
      </div>
    </div>
    <p className="text-gray-600 text-sm line-clamp-4 mb-4 flex-grow">{review.content}</p>
    {review.results && (
      <div className="grid grid-cols-2 gap-2 mb-4">
        {Object.entries(review.results).map(([key, value]) => (
          <div key={key} className="bg-teal-50 rounded-lg p-2 text-center">
            <div className="text-base font-bold text-teal-700">{value}</div>
            <div className="text-xs text-teal-600">{key}</div>
          </div>
        ))}
      </div>
    )}
    <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
      <span className="text-teal-600 text-xs font-medium">Нажмите, чтобы прочитать полностью</span>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 text-gray-500 hover:text-teal-600 transition-colors">
          <ThumbsUp className="h-4 w-4" /><span className="text-xs">{review.likes}</span>
        </button>
        {review.image && (
          <button onClick={(e) => { e.stopPropagation(); onImageClick(review.image); }} className="flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors">
            <ImageIcon className="h-4 w-4" /><span className="text-xs font-medium">Фото</span>
          </button>
        )}
      </div>
    </div>
  </div>
);

// ─── Главный компонент ───
const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [displayedReviews, setDisplayedReviews] = useState(3);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const reviews = initialReviews; // статичные отзывы; новые идут через модерацию

  const showNext = () => { if (!isAnimating) { setIsAnimating(true); setCurrentIndex((prev) => (prev + 1) % reviews.length); } };
  const showPrev = () => { if (!isAnimating) { setIsAnimating(true); setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length); } };

  useEffect(() => {
    if (isAnimating) { const timer = setTimeout(() => setIsAnimating(false), 500); return () => clearTimeout(timer); }
  }, [isAnimating]);

  // вызывается из ReviewForm после успешной отправки
  const handleSubmitSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-primary-100 to-white">

      {/* Тоаст об успехе */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-xl z-50 animate-fade-in-down max-w-sm">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Спасибо за отзыв!</p>
              <p className="text-sm text-green-100 mt-1">Он отправлен на модерацию и появится на сайте после проверки.</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-teal-100 rounded-full mb-4"><Quote className="h-8 w-8 text-teal-600" /></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Отзывы участников</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Реальные истории людей, которые изменили свою жизнь с помощью правильного дыхания</p>
        </div>

        {/* Десктоп — сетка */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, displayedReviews).map((review, index) => (
              <ReviewCard key={index} review={review} onClick={() => setSelectedReview(review)} onImageClick={(img) => setSelectedImage(img)} />
            ))}
          </div>
          <div className="mt-12 text-center">
            {reviews.length > 3 && (
              displayedReviews === 3 ? (
                <button onClick={() => setDisplayedReviews(reviews.length)} className="inline-flex items-center gap-2 bg-white text-teal-600 font-semibold px-8 py-4 rounded-full border-2 border-teal-600 hover:bg-teal-50 transition-all duration-300 shadow-lg">
                  Больше историй от наших клиентов <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button onClick={() => setDisplayedReviews(3)} className="inline-flex items-center gap-2 bg-white text-teal-600 font-semibold px-8 py-4 rounded-full border-2 border-teal-600 hover:bg-teal-50 transition-all duration-300 shadow-lg">
                  <ChevronLeft className="h-5 w-5" /> Показать меньше
                </button>
              )
            )}
          </div>
        </div>

        {/* Мобайл — карусель */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <ReviewCard review={review} onClick={() => setSelectedReview(review)} onImageClick={(img) => setSelectedImage(img)} />
                </div>
              ))}
            </div>
          </div>
          <button onClick={showPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg z-10" disabled={isAnimating}><ChevronLeft className="h-6 w-6 text-teal-600" /></button>
          <button onClick={showNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg z-10" disabled={isAnimating}><ChevronRight className="h-6 w-6 text-teal-600" /></button>
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button key={index} onClick={() => { if (!isAnimating) setCurrentIndex(index); }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-teal-600 w-6' : 'bg-teal-200'}`} />
            ))}
          </div>
        </div>

        {/* Модал полного отзыва */}
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedReview(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedReview(null)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X className="h-6 w-6 text-gray-500" /></button>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-2xl font-bold text-white">{selectedReview.name[0]}</div>
                  <div className="ml-4"><h3 className="text-xl font-semibold text-gray-900">{selectedReview.name}</h3><p className="text-gray-600">{selectedReview.date}</p></div>
                </div>
                <p className="text-gray-600 whitespace-pre-line">{selectedReview.fullContent}</p>
              </div>
            </div>
          </div>
        )}

        {/* Модал фото */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedImage(null)} />
            <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full"><X className="h-6 w-6 text-white" /></button>
              <img src={selectedImage} alt="Фото отзыва" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
            </div>
          </div>
        )}

        {/* CTA + кнопка */}
        <div className="mt-16 text-center space-y-6">
          <div className="inline-block bg-teal-100 text-teal-800 px-6 py-3 rounded-full font-medium text-lg">Более 50 успешных учеников</div>
          <div>
            <button onClick={() => setShowReviewForm(true)} className="bg-teal-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-teal-700 transition-colors">
              Оставить отзыв
            </button>
          </div>
        </div>

        {/* Модал формы */}
        {showReviewForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowReviewForm(false)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowReviewForm(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X className="h-6 w-6 text-gray-500" /></button>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Оставить отзыв</h3>
                <ReviewForm onSubmit={handleSubmitSuccess} onClose={() => setShowReviewForm(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const styles = `
  @keyframes fade-in-down {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-down { animation: fade-in-down 0.5s ease-out; }
`;
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Reviews;
