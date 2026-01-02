import processBackground from '@/assets/process-background.svg';

const LandingProcess = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        <img 
          src={processBackground} 
          alt="My UX Process - AI-Augmented, Human-Led"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default LandingProcess;