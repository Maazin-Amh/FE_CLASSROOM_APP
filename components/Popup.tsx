import { useEffect, useState } from 'react';

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      setIsVisible(true);
      localStorage.setItem('hasSeenPopup', 'true');
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">Hallo, User👋🏼</h2>
        <p className="mb-4">Web Ini Masih Dalam Tahap Perkembangan Developer</p>
        <button
          onClick={closePopup}
          className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-600"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default Popup;
