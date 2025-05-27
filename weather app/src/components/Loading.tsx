import { useState, useEffect } from 'react';

const Loadingscreen = ({ oncomplete }: { oncomplete: () => void }) => {
  const [text, setText] = useState<string>('');
  const fulltext = 'Weather';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fulltext.substring(0, i));
      i++;

      if (i > fulltext.length) {
        clearInterval(interval);
        setTimeout(() => {
          oncomplete();
        }, 1000);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [oncomplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center">
      <div className="mb-4 text-4xl font-bold">
        {text}
        <span className="text-[#a3bc00] ml-1">X</span>
      </div>

      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};

export default Loadingscreen;
