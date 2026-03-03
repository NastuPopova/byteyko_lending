import React, { useState, useEffect, useRef } from 'react';
import { Bell, Send, BellOff } from 'lucide-react';

const SidebarNotificationsMenu = ({ notificationSettings, onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState('100vh');
  const [menuTop, setMenuTop] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    const calculatePosition = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        const navbarHeight = navbar.offsetHeight;
        setMenuTop(navbarHeight);
        setMenuHeight(`calc(100vh - ${navbarHeight}px)`);
      }
    };
    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    return () => window.removeEventListener('resize', calculatePosition);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleTelegramClick = () => {
    window.open('https://t.me/AS_Popov87', '_blank');
  };

  return (
    <>
      <div className="fixed top-36 md:top-40 right-4 flex flex-col gap-4 z-50">
        <button
          onClick={handleTelegramClick}
          className="w-12 h-12 bg-blue-500 text-white hover:bg-blue-600 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
        >
          <Send size={24} />
        </button>
        <button
          onClick={toggleMenu}
          className="w-12 h-12 bg-teal-600 text-white hover:bg-teal-700 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
        >
          {isOpen ? <BellOff size={24} /> : <Bell size={24} />}
        </button>
      </div>

      <div
        ref={menuRef}
        style={{ top: menuTop, height: menuHeight }}
        className={`fixed right-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-40 overflow-y-auto`}
      >
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Bell className="mr-2 text-teal-500" />
            Уведомления
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Уведомления в браузере</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notificationSettings.browserNotifications}
                  onChange={() => onSettingsChange({ ...notificationSettings, browserNotifications: !notificationSettings.browserNotifications })}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <span>Звуовые уведомления</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notificationSettings.soundNotifications}
                  onChange={() => onSettingsChange({ ...notificationSettings, soundNotifications: !notificationSettings.soundNotifications })}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Макс. уведомлений в день</span>
                <span>{notificationSettings.maxNotificationsPerDay}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={notificationSettings.maxNotificationsPerDay}
                onChange={(e) => onSettingsChange({ ...notificationSettings, maxNotificationsPerDay: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={toggleMenu}
          style={{ top: menuTop }}
          className="fixed inset-x-0 bottom-0 bg-black bg-opacity-50 z-30 transition-opacity"
        />
      )}

      <style jsx>{`
        .switch { position: relative; display: inline-block; width: 50px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: #14b8a6; }
        input:checked + .slider:before { transform: translateX(26px); }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; background: #14b8a6; border-radius: 50%; cursor: pointer; }
        input[type="range"]::-moz-range-thumb { width: 16px; height: 16px; background: #14b8a6; border-radius: 50%; cursor: pointer; }
      `}</style>
    </>
  );
};

export default SidebarNotificationsMenu;