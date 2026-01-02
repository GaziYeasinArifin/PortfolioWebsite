import { useState, useEffect } from 'react';
import processBg1 from '@/assets/process-bg-1.svg';
import processBg2 from '@/assets/process-bg-2.svg';

const images = [processBg1, processBg2];

const LandingProcess = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full -my-px overflow-hidden" style={{ margin: 0, padding: 0, border: 'none', outline: 'none' }}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt="My UX Process - AI-Augmented, Human-Led"
          style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
          className={`w-full h-auto block transition-opacity duration-1000 ease-in-out border-0 outline-0 ${
            index === 0 ? 'relative' : 'absolute inset-0'
          } ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </section>
  );
};

export default LandingProcess;
