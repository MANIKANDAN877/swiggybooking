import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'https://via.placeholder.com/300x200?text=Loading...' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`lazy-image-container ${className}`}>
      {inView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      )}
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt={alt}
          className="lazy-image placeholder"
        />
      )}
      {hasError && (
        <div className="lazy-image-error">
          <span>📷</span>
          <p>Image not available</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(LazyImage);
