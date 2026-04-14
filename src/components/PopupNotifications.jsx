import React, { useState, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  BookOpen,
  Clock,
  Heart,
  Brain,
  Moon,
  Battery,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import SidebarNotificationsMenu from './SidebarNotificationsMenu';

const names = [
  'Анна', 'Мария', 'Елена', 'Ольга', 'Наталья',
  'Александр', 'Дмитрий', 'Михаил', 'Сергей', 'Андрей',
  'Ирина', 'Татьяна', 'Светлана', 'Екатерина', 'Юлия',
  'Павел', 'Максим', 'Артем', 'Владимир', 'Игорь'
];

const notificationTypes = {
  success: { icon: <CheckCircle className="text-emerald-500" />, bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', progressColor: 'bg-emerald-500' },
  info:    { icon: <Info className="text-blue-500" />,           bgColor: 'bg-blue-50',    borderColor: 'border-blue-200',    progressColor: 'bg-blue-500'    },
  warning: { icon: <AlertTriangle className="text-amber-500" />, bgColor: 'bg-amber-50',   borderColor: 'border-amber-200',   progressColor: 'bg-amber-500'   },
};

const notificationTemplates = [
  { icon: <Users className="text-blue-500" />,   template: 'NAME начал(а) курс дыхательных практик',                    type: 'info'    },
  { icon: <TrendingUp className="text-emerald-500" />, template: 'NAME улучшил(а) качество сна на PERCENT%',             type: 'success' },
  { icon: <Heart className="text-emerald-500" />, template: 'NAME отметил(а) снижение тревожности на PERCENT%',       type: 'success' },
  { icon: <Brain className="text-blue-500" />,    template: 'NAME освоил(а) технику диафрагмального дыхания',    type: 'info'    },
  { icon: <Moon className="text-emerald-500" />,  template: 'NAME улучшил(а) качество засыпания на PERCENT%',         type: 'success' },
  { icon: <Battery className="text-amber-500" />, template: 'NAME отмечает повышение энергии на PERCENT%',           type: 'warning' },
  { icon: <BookOpen className="text-blue-500" />, template: 'NAME приступил(а) к изучению продвинутых техник', type: 'info'    },
];

const NOTIFICATION_DURATION = 5000;

const generateNotification = () => {
  const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
  const name    = names[Math.floor(Math.random() * names.length)];
  const percent = Math.floor(Math.random() * 30) + 40;
  return {
    id: Date.now() + Math.random(),
    icon: template.icon,
    text: template.template.replace('NAME', name).replace('PERCENT', percent),
    time: 'только что',
    type: template.type,
    createdAt: Date.now(),
  };
};

const NotificationItem = ({ notification, onRemove, index }) => {
  const [progress, setProgress] = useState(100);
  const name    = notification.text.split(' ')[0];
  const initial = name ? name[0].toUpperCase() : '';

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed   = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / NOTIFICATION_DURATION) * 100);
      setProgress(remaining);
      if (remaining === 0) { clearInterval(timer); onRemove(notification.id); }
    }, 10);
    return () => clearInterval(timer);
  }, [notification.id, onRemove]);

  return (
    <div
      className={`relative overflow-hidden bg-white shadow-lg rounded-xl transform transition-all duration-500 flex items-center hover:shadow-xl ${
        index === 0 ? 'opacity-100 translate-x-0 scale-100' : 'opacity-90 translate-x-10 scale-95'
      }`}
      style={{ width: '300px', minHeight: '60px' }}
    >
      <div className="flex-shrink-0 w-8 h-8 mx-3 bg-teal-500 rounded-full flex items-center justify-center text-white font-medium">
        {initial}
      </div>
      <div className="flex-grow py-2 pr-2">
        <p className="text-sm text-gray-800 line-clamp-2">{notification.text}</p>
        <span className="text-xs text-gray-500">{notification.time}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
        <div className="h-full bg-teal-500 transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

const PopupNotifications = ({ hidden = false }) => {
  const [activeNotifications, setActiveNotifications] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({
    browserNotifications: true,
    soundNotifications: false,
    maxNotificationsPerDay: 3,
  });
  const [notificationsToday, setNotificationsToday] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) setNotificationSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) setNotificationsToday(0);
    }, 60000);
    return () => clearInterval(id);
  }, []);

  const addNotification = () => {
    if (notificationsToday >= notificationSettings.maxNotificationsPerDay) return;
    const n = generateNotification();
    setActiveNotifications(prev => [n, ...prev].slice(0, 2));
    setNotificationsToday(prev => prev + 1);
  };

  useEffect(() => {
    if (notificationsToday < notificationSettings.maxNotificationsPerDay) {
      const t = setTimeout(addNotification, 10000);
      const i = setInterval(() => {
        setTimeout(addNotification, Math.floor(Math.random() * 20000) + 40000);
      }, 60000);
      return () => { clearTimeout(t); clearInterval(i); };
    }
  }, [notificationsToday, notificationSettings.maxNotificationsPerDay]);

  const removeNotification = (id) => {
    setActiveNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      {/* Уведомления скрываются пока открыта анкета */}
      {!hidden && (
        <div className="fixed bottom-4 right-4 z-50 space-y-4">
          {notificationSettings.browserNotifications && activeNotifications.map((n, i) => (
            <NotificationItem key={n.id} notification={n} onRemove={removeNotification} index={i} />
          ))}
        </div>
      )}

      {/* Меню настроек уведомлений тоже скрываем во время анкеты */}
      {!hidden && (
        <SidebarNotificationsMenu
          notificationSettings={notificationSettings}
          onSettingsChange={(s) => {
            setNotificationSettings(s);
            if (!s.browserNotifications) setActiveNotifications([]);
          }}
        />
      )}
    </>
  );
};

export default PopupNotifications;
