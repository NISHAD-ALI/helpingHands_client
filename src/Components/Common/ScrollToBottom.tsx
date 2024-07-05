import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const ScrollToBottom: React.FC = () => {
  const handleScrollToBottom = () => {
    console.log("here")
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleScrollToBottom}
        className="bg-green-500 text-white rounded-full p-2 focus:outline-none hover:bg-green-600"
        aria-label="Scroll to bottom"
      >
        <FontAwesomeIcon icon={faArrowDown} size="lg" />
      </button>
    </div>
  );
};

export default ScrollToBottom;
