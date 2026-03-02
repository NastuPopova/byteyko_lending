import React, { useState, useEffect } from 'react';
import { Quote, X, ChevronLeft, ChevronRight, Image as ImageIcon, CheckCircle, MessageCircle, Calendar, Star, ThumbsUp, Shield } from 'lucide-react';

const initialReviews = [
  {
    name: 'Любовь',
    surname: '',
    verified: true,
    telegramUsername: '@Liybov_Bardina',
    rating: 5,
    content: `Хочу оставить отзыв о прохождении курса техники дыхания у Александра. Раньше постоянно боролась с тревогой. Техники дыхания, которые я изучила на курсе, оказались простыми, но невероятно эффективными.`,
    fullContent: `Хочу оставить отзыв о прохождении курса техники дыхания у Александра. Раньше постоянно боролась с тревогой. Техники дыхания, которые я изучила на курсе, оказались простыми, но невероятно эффективными. Научившись правильно дышать, я почувствовала значительное облегчение. Научилась справляться с тревожностью. Каждый урок наполнен полезной информацией и практическими упражнениями, которые я смогу применять в повседневной жизни. Удивительно было как дыхание связано с нашими эмоциями. Теперь я могу управлять своим состоянием.`,
    results: {
      'улучшение сна': '80%',
      'снижение тревожности': '65%',
      'повышение энергии': '70%'
    },
    date: '9 февраля 2024',
    avatar: `${process.env.PUBLIC_URL}/reviews/luba.jpg`,
    image: `${process.env.PUBLIC_URL}/reviews/otviv1.jpg`,
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
    fullContent: `Методику правильного дыхания, освоила совсем недавно! Благодаря Александру, я узнала технику правильного дыхания, благотворное влияние на организм! Из видимых результатов, я вылечила аллергию на животных, от которой страдала всю жизнь, стала лучше себя чувствовать, навсегда забыла про головные боли! На мой взгляд достойный результат, точнее промежуточный.....дальше, чувствую, будет ещё интереснее!!!! Спасибо огромное за упражнения!!!!`,
    results: {
      'улучшение аллергии': '90%',
      'уменьшение головной боли': '100%',
      'общее самочувствие': '85%'
    },
    date: '15 марта 2024',
    avatar: `${process.env.PUBLIC_URL}/reviews/ALEXENDRA.jpg`,
    image: `${process.env.PUBLIC_URL}/reviews/otziv2.jpg`,
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
    fullContent: `Никогда не думал, что правильное дыхание может так сильно повлиять на качество жизни. После курса я заметил значительное улучшение в своей физической форме и выносливости. Особенно помогает при занятиях спортом. Техники, которым научил Александр, действительно работают. Моя производительность в спортзале выросла на 40%, а восстановление стало намного быстрее.`,
    results: {
      'улучшение производительности': '40%',
      'скорость восстановления': '60%',
      'снижение стресса': '75%'
    },
    date: '1 марта 2024',
    likes: 15,
    courseDuration: '3 месяца'
  }
];

const VerificationButton = ({ onVerify }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const botToken = '7849599077:AAH96ZuPF0GGJPcAbWsHgSJgs7-IXa0z1I8';
  const botUsername = 'breathing_otziv_bot';

  const handleVerification = async () => {
    setIsVerifying(true);
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem('verificationCode', code);
    window.open(`https://t.me/breathing_otziv_bot?start=${code}`, '_blank');
    checkVerificationStatus(code);
  };

  const checkVerificationStatus = async (code) => {
    let attempts = 0;
    const maxAttempts = 100;
    let botWindow = null;
    const checkStatus = async () => {
      try {
        await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?offset=-1`);
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
        const data = await response.json();
        if (data.ok) {
          const update = data.result.find(update => {
            const messageText = update.message?.text || '';
            return messageText.includes(code);
          });
          if (update) {
            const username = update.message.from.username || `user${update.message.from.id}`;
            localStorage.setItem('isVerified', 'true');
            localStorage.setItem('telegramUsername', username);
            onVerify(username);
            setIsVerifying(false);
            setTimeout(() => { if (botWindow && !botWindow.closed) botWindow.close(); }, 1000);
            return;
          }
          if (attempts < maxAttempts) { attempts++; setTimeout(checkStatus, 3000); }
          else { setIsVerifying(false); alert('Время верификации истекло. Попробуйте еще раз.'); if (botWindow && !botWindow.closed) botWindow.close(); }
        } else { setIsVerifying(false); alert('Ошибка проверки. Попробуйте позже.'); if (botWindow && !botWindow.closed) botWindow.close(); }
      } catch (error) { setIsVerifying(false); alert('Ошибка соединения.'); if (botWindow && !botWindow.closed) botWindow.close(); }
    };
    botWindow = window.open(`https://t.me/breathing_otziv_bot?start=${code}`, '_blank');
    checkStatus();
  };

  return (
    <button onClick={handleVerification} disabled={isVerifying} className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
      <MessageCircle className="h-5 w-5" />
      {isVerifying ? 'Проверка...' : 'Подтвердить через Telegram'}
    </button>
  );
};

const ReviewForm = ({ onSubmit, onClose }) => {
  const [isVerified, setIsVerified] = useState(() => localStorage.getItem('isVerified') === 'true');
  const [telegramUsername, setTelegramUsername] = useState(() => localStorage.getItem('telegramUsername') || '');
  const [formData, setFormData] = useState({ name: '', surname: '', rating: 5, content: '', avatar: null, image: null, results: { 'улучшение сна': '0', 'снижение стресса': '0', 'повышение энергии': '0' } });

  const handleVerification = (username) => {
    setIsVerified(true);
    setTelegramUsername(username);
    const notification = document.querySelector('[role="alert"]');
    if (notification) notification.remove();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerified) { alert('Пожалуйста, подтвердите свою личность через Telegram'); return; }
    onSubmit({ ...formData, verified: true, telegramUsername, date: new Date().toLocaleDateString('ru-RU'), likes: 0, fullContent: formData.content });
    localStorage.removeItem('isVerified');
    localStorage.removeItem('telegramUsername');
    setIsVerified(false);
    setTelegramUsername('');
    setFormData({ name: '', surname: '', rating: 5, content: '', avatar: null, image: null, results: { 'улучшение сна': '0', 'снижение стресса': '0', 'повышение энергии': '0' } });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">Верификация отзыва</span>
        </div>
        <p className="text-sm text-yellow-600 mb-4">Для публикации отзыва необходимо подтвердить свою личность через Telegram</p>
        {isVerified ? (
          <div className="flex items-center gap-2 text-green-600"><CheckCircle className="h-5 w-5" /><span>Подтверждено через {telegramUsername}</span></div>
        ) : (
          <VerificationButton onVerify={handleVerification} />
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Имя</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200" required /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Фамилия</label><input type="text" value={formData.surname} onChange={(e) => setFormData({ ...formData, surname: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200" required /></div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Оценка</label>
        <div className="flex gap-2">{[1,2,3,4,5].map((star) => (<button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })} className="focus:outline-none"><Star className={`h-8 w-8 ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} /></button>))}</div>
      </div>
      <div><label className="block text-sm font-medium text-gray-700 mb-2">Ваш отзыв</label><textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 h-32" required /></div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Оцените результаты (в процентах)</label>
        <div className="grid gap-4">{Object.entries(formData.results).map(([key, value]) => (<div key={key} className="flex items-center gap-4"><label className="text-sm text-gray-600 flex-1">{key}</label><input type="number" min="0" max="100" value={value} onChange={(e) => setFormData({ ...formData, results: { ...formData.results, [key]: e.target.value } })} className="w-24 px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200" /><span className="text-sm text-gray-500">%</span></div>))}</div>
      </div>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Ваша фотография (аватар)</label><input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })} className="w-full" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Фото отзыва (опционально)</label><input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="w-full" /></div>
      </div>
      <button type="submit" className="w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors">Опубликовать отзыв</button>
    </form>
  );
};

const ReviewCard = ({ review, onClick, onImageClick }) => (
  <div onClick={onClick} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 h-full flex flex-col">
    <div className="flex items-center mb-4">
      <div className="relative">
        {review.avatar ? (
          <div className="w-14 h-14 rounded-full overflow-hidden"><img src={review.avatar} alt={`Аватар ${review.name}`} className="w-full h-full object-cover" onError={(e) => { e.target.src = `${process.env.PUBLIC_URL}/images/default-avatar.jpg`; }} /></div>
        ) : (
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center"><span className="text-xl font-bold text-white">{review.name[0]}</span></div>
        )}
        {review.verified && (<div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg"><CheckCircle className="h-3 w-3 text-white" /></div>)}
      </div>
      <div className="ml-3 flex-1">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">{review.name}{review.verified && (<span className="text-xs text-teal-600 flex items-center"><MessageCircle className="h-3 w-3 mr-1" />{review.telegramUsername}</span>)}</h3>
        <div className="flex items-center mt-1">{[...Array(5)].map((_, i) => (<Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />))}<span className="text-xs text-gray-500 ml-2">• {review.courseDuration}</span></div>
      </div>
    </div>
    <p className="text-gray-600 text-sm line-clamp-4 mb-4 flex-grow">{review.content}</p>
    {review.results && (
      <div className="grid grid-cols-2 gap-2 mb-4">{Object.entries(review.results).map(([key, value]) => (<div key={key} className="bg-teal-50 rounded-lg p-2 text-center"><div className="text-base font-bold text-teal-700">{value}</div><div className="text-xs text-teal-600">{key}</div></div>))}</div>
    )}
    <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
      <span className="text-teal-600 text-xs font-medium">Нажмите, чтобы прочитать полностью</span>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 text-gray-500 hover:text-teal-600 transition-colors"><ThumbsUp className="h-4 w-4" /><span className="text-xs">{review.likes}</span></button>
        {review.image && (<button onClick={(e) => { e.stopPropagation(); onImageClick(review.image); }} className="flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors"><ImageIcon className="h-4 w-4" /><span className="text-xs font-medium">Фото</span></button>)}
      </div>
    </div>
  </div>
);

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [displayedReviews, setDisplayedReviews] = useState(3);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const showNext = () => { if (!isAnimating) { setIsAnimating(true); setCurrentIndex((prev) => (prev + 1) % reviews.length); } };
  const showPrev = () => { if (!isAnimating) { setIsAnimating(true); setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length); } };

  useEffect(() => {
    if (isAnimating) { const timer = setTimeout(() => setIsAnimating(false), 500); return () => clearTimeout(timer); }
  }, [isAnimating]);

  const handleSubmitReview = async (reviewData) => {
    try {
      const avatarUrl = reviewData.avatar ? URL.createObjectURL(reviewData.avatar) : null;
      const imageUrl = reviewData.image ? URL.createObjectURL(reviewData.image) : null;
      const newReview = {
        ...reviewData, avatar: avatarUrl, image: imageUrl,
        results: {
          'улучшение сна': reviewData.results['улучшение сна'].includes('%') ? reviewData.results['улучшение сна'] : `${reviewData.results['улучшение сна']}%`,
          'снижение стресса': reviewData.results['снижение стресса'].includes('%') ? reviewData.results['снижение стресса'] : `${reviewData.results['снижение стресса']}%`,
          'повышение энергии': reviewData.results['повышение энергии'].includes('%') ? reviewData.results['повышение энергии'] : `${reviewData.results['повышение энергии']}%`
        }
      };
      setReviews(prevReviews => [newReview, ...prevReviews]);
      setShowReviewForm(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) { alert('Произошла ошибка при публикации отзыва.'); }
  };

  const SuccessMessage = () => (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
      <div className="flex items-center"><svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span>Спасибо! Ваш отзыв успешно опубликован</span></div>
    </div>
  );

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-primary-100 to-white">
      {showSuccessMessage && <SuccessMessage />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-teal-100 rounded-full mb-4"><Quote className="h-8 w-8 text-teal-600" /></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Отзывы участников</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Реальные истории людей, которые изменили свою жизнь с помощью правильного дыхания</p>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, displayedReviews).map((review, index) => (<ReviewCard key={index} review={review} onClick={() => setSelectedReview(review)} onImageClick={(image) => setSelectedImage(image)} />))}
          </div>
          <div className="mt-12 text-center">
            {reviews.length > 3 && (displayedReviews === 3 ? (
              <button onClick={() => setDisplayedReviews(reviews.length)} className="inline-flex items-center gap-2 bg-white text-teal-600 font-semibold px-8 py-4 rounded-full border-2 border-teal-600 hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl">Больше историй от наших клиентов<ChevronRight className="h-5 w-5" /></button>
            ) : (
              <button onClick={() => setDisplayedReviews(3)} className="inline-flex items-center gap-2 bg-white text-teal-600 font-semibold px-8 py-4 rounded-full border-2 border-teal-600 hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl">Показать меньше<ChevronLeft className="h-5 w-5" /></button>
            ))}
          </div>
        </div>

        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {reviews.map((review, index) => (<div key={index} className="w-full flex-shrink-0 px-4"><ReviewCard review={review} onClick={() => setSelectedReview(review)} onImageClick={(image) => setSelectedImage(image)} /></div>))}
            </div>
          </div>
          <button onClick={showPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10" disabled={isAnimating}><ChevronLeft className="h-6 w-6 text-teal-600" /></button>
          <button onClick={showNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10" disabled={isAnimating}><ChevronRight className="h-6 w-6 text-teal-600" /></button>
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (<button key={index} onClick={() => { if (!isAnimating) setCurrentIndex(index); }} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-teal-600 w-6' : 'bg-teal-200'}`} />))}
          </div>
        </div>

        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedReview(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedReview(null)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"><X className="h-6 w-6 text-gray-500" /></button>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-teal-600 p-0.5"><div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center text-2xl font-bold text-teal-600">{selectedReview.name[0]}</div></div>
                  <div className="ml-4"><h3 className="text-xl font-semibold text-gray-900">{selectedReview.name}</h3><p className="text-gray-600">{selectedReview.date}</p></div>
                </div>
                <div className="prose prose-lg max-w-none"><p className="text-gray-600 whitespace-pre-line">{selectedReview.fullContent}</p></div>
              </div>
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedImage(null)} />
            <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"><X className="h-6 w-6 text-white" /></button>
              <img src={selectedImage} alt="Скриншот отзыва" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
            </div>
          </div>
        )}

        <div className="mt-16 text-center space-y-6">
          <div className="inline-block bg-teal-100 text-teal-800 px-6 py-3 rounded-full font-medium text-lg">Более 50 успешных учеников</div>
          <div><button onClick={() => setShowReviewForm(true)} className="bg-teal-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-teal-700 transition-colors">Оставить отзыв</button></div>
        </div>

        {showReviewForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowReviewForm(false)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowReviewForm(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"><X className="h-6 w-6 text-gray-500" /></button>
              <div className="p-8"><h3 className="text-2xl font-bold text-gray-900 mb-6">Оставить отзыв</h3><ReviewForm onSubmit={handleSubmitReview} onClose={() => setShowReviewForm(false)} /></div>
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