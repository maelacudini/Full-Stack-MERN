import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import style from '../css/app.module.css';

const Backtotop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > window.innerHeight / 2) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showButton && (
        <ScrollLink className={`${style.backToTop}`} to={'navbar'} smooth={true} duration={300}>
          <i className="bi bi-arrow-up" />
        </ScrollLink>
      )}
    </>
  );
};

export default Backtotop;
