import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTop:React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button 
        onClick={handleScrollToTop}
        type="button"
        className="bg-green-500 text-white rounded-full p-2 focus:outline-none hover:bg-green-600"
        aria-label='scrolltotop'
      >
        <FontAwesomeIcon icon={faArrowUp} size="lg" />
      </button>
    </div>
  );
};

export default ScrollToTop;
