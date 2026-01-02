import processBackground from '@/assets/process-background.svg';

const LandingProcess = () => {
  return (
    <section className="relative overflow-hidden">
      <img 
        src={processBackground} 
        alt="My UX Process - AI-Augmented, Human-Led"
        className="w-full h-auto"
      />
    </section>
  );
};

export default LandingProcess;