import React, { useEffect } from 'react';

interface Notification {
  message: string;
  id: number;
}

interface NotificationComponentProps {
  notifications: Notification[];
  removeNotification: (id: number) => void;
  name: string;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({ notifications, removeNotification, name }) => {
  useEffect(() => {
    const timerIds = notifications.map(notification => {
      return setTimeout(() => {
        removeNotification(notification.id);
      }, 10000);
    });

    return () => {
      timerIds.forEach(timerId => clearTimeout(timerId));
    };
  }, [notifications, removeNotification]);

  const handleClose = (id: number) => {
    removeNotification(id);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {notifications.map((notification) => (
        <div key={notification.id} className="bg-white bg-opacity-85 text-black w-96 h-48 p-4 mb-2 rounded shadow-md br-3 transition-opacity duration-1000 relative">
          <h3 className="text-3xl font-semibold mb-2">Hey there!</h3>
          <p className="text-center">New Message: <strong>{notification.message}</strong></p>
          <button
            className="absolute top-2 right-2 text-white hover:text-red-500 focus:outline-none"
            onClick={() => handleClose(notification.id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationComponent;
