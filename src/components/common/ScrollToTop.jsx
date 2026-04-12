import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-22 right-5 z-40 w-14 h-14 rounded-full bg-white cursor-pointer border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-teal-700 hover:border-teal-300 transition-all hover:-translate-y-0.5"
      aria-label="Scroll to top"
    >
      <FiArrowUp size={18} />
    </button>
  ) : null;
}
