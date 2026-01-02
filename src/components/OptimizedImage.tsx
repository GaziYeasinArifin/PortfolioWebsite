import { useState, useRef, useEffect, useCallback, memo } from 'react';
import placeholderSvg from '@/assets/placeholder-image.svg';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  objectPosition?: string;
  priority?: boolean;
}

const OptimizedImage = memo(({
  src,
  alt,
  className = '',
  objectFit = 'cover',
  objectPosition = 'center',
  priority = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px 0px', // Start loading 200px before entering viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Preload image when in view
  useEffect(() => {
    if (!isInView || hasError) return;

    const img = new Image();
    img.src = src;
    
    if (img.complete) {
      setIsLoaded(true);
    } else {
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isInView, src, hasError]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden"
    >
      {/* Placeholder - show while loading */}
      <img
        src={placeholderSvg}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 rounded-[4px] ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Actual image - only render when in view */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full transition-opacity duration-700 ease-out rounded-[4px] ${className} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectFit,
            objectPosition,
            willChange: isLoaded ? 'auto' : 'opacity',
          }}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
