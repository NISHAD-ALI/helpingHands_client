import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '/src/Styles/NotificationComponent.css';

interface Notification {
  message: string;
  id: number;
}

interface NotificationComponentProps {
  notifications: Notification[];
  removeNotification: (id: number) => void;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({ notifications, removeNotification }) => {
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
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      <TransitionGroup>
        {notifications.map((notification) => (
          <CSSTransition key={notification.id} timeout={500} classNames="slide">
            <div className="bg-white bg-opacity-90 text-black w-80 sm:w-96 p-4 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform translate-x-0">
              <h3 className="text-xl font-semibold mb-2">Hey there!</h3>
              <p className="mt-2">New Message: <strong>{notification.message}</strong></p>
              <button
                className="absolute top-2 right-2 text-red-600 hover:text-red-500 focus:outline-none"
                onClick={() => handleClose(notification.id)}
                aria-label="Close notification"
              >
                <FontAwesomeIcon icon={faTimesCircle} size="lg" />
              </button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default NotificationComponent;
