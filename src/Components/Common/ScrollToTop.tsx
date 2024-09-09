import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTop: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6">
      <button 
        onClick={handleScrollToTop}
        type="button"
        className="bg-green-500 text-white rounded-full p-3 md:p-4 focus:outline-none hover:bg-green-600 transition-all duration-300 ease-in-out"
        aria-label='scrolltotop'
      >
        <FontAwesomeIcon icon={faArrowUp} size="lg" />
      </button>
    </div>
  );
};

export default ScrollToTop;
