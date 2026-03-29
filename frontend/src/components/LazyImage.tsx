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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getImageSources = (altText: string) => {
    const sources = [src]; // Start with original image
    
    // Add cuisine-specific food images
    if (altText.toLowerCase().includes('burger')) {
      sources.push('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800');
      sources.push('https://images.unsplash.com/photo-1561758039-d7a26a58a9e8?w=800');
      sources.push('https://images.unsplash.com/photo-1558020664-f485537a6752?w=800');
      sources.push('https://picsum.photos/300/200?random=burger1');
      sources.push('https://dummyimage.com/300x200/ff6b6b/ffffff&text=Burger');
    }
    if (altText.toLowerCase().includes('pizza')) {
      sources.push('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800');
      sources.push('https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800');
      sources.push('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800');
      sources.push('https://picsum.photos/300/200?random=pizza1');
      sources.push('https://dummyimage.com/300x200/ff9f43/ffffff&text=Pizza');
    }
    if (altText.toLowerCase().includes('biryani') || altText.toLowerCase().includes('indian')) {
      sources.push('https://images.unsplash.com/photo-1589302168068-9640c0c434b0?w=800');
      sources.push('https://images.unsplash.com/photo-1512058784702-7a5abfaacff8?w=800');
      sources.push('https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800');
      sources.push('https://images.unsplash.com/photo-1546833998-b9f371608892?w=800');
      sources.push('https://picsum.photos/300/200?random=indian1');
      sources.push('https://dummyimage.com/300x200/6c5ce7/ffffff&text=Biryani');
    }
    if (altText.toLowerCase().includes('chinese') || altText.toLowerCase().includes('wok')) {
      sources.push('https://images.unsplash.com/photo-1563243577-9b53b885e86f?w=800');
      sources.push('https://images.unsplash.com/photo-1529692277208-749649f7e66c?w=800');
      sources.push('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800');
      sources.push('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800');
      sources.push('https://picsum.photos/300/200?random=chinese1');
      sources.push('https://dummyimage.com/300x200/a29bfe/ffffff&text=Chinese');
    }
    if (altText.toLowerCase().includes('south') || altText.toLowerCase().includes('dosa')) {
      sources.push('https://images.unsplash.com/photo-1621510182287-b217b08d8f84?w=800');
      sources.push('https://images.unsplash.com/photo-1586473218118-2c5a4cb9a622?w=800');
      sources.push('https://images.unsplash.com/photo-1546833998-b9f371608892?w=800');
      sources.push('https://images.unsplash.com/photo-1601050690597-df056d7b5bda?w=800');
      sources.push('https://picsum.photos/300/200?random=south1');
      sources.push('https://dummyimage.com/300x200/55efc4/ffffff&text=South+Indian');
    }
    
    // Add generic food images as fallbacks
    const genericFoodImages = [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      'https://picsum.photos/300/200?random=1',
      'https://picsum.photos/300/200?random=2', 
      'https://picsum.photos/300/200?random=3',
      'https://picsum.photos/300/200?random=4',
      'https://picsum.photos/300/200?random=5',
      'https://dummyimage.com/300x200/ff6b6b/ffffff&text=Food',
      'https://dummyimage.com/300x200/4ecdc4/ffffff&text=Restaurant',
      'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Food+Image',
      'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=Restaurant+Photo'
    ];
    
    sources.push(...genericFoodImages);
    
    // Final fallback - simple colored div
    sources.push('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiM2Yzc1N2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKAnjwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==');
    
    return sources;
  };

  const imageSources = getImageSources(alt);
  const currentImageSrc = imageSources[currentImageIndex];

  const handleImageError = () => {
    console.warn(`Failed to load image: ${currentImageSrc}`);
    
    if (currentImageIndex < imageSources.length - 1) {
      // Try next image source
      setCurrentImageIndex(prev => prev + 1);
    } else {
      // All images failed, show error state
      setHasError(true);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    console.log(`Successfully loaded image: ${currentImageSrc}`);
  };

  return (
    <div ref={ref} className={`lazy-image-container ${className}`}>
      {inView && !hasError && (
        <img
          key={currentImageIndex} // Key ensures re-render when image source changes
          src={currentImageSrc}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
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
          <span>🍽️</span>
          <p>Image not available</p>
          <small>{alt}</small>
          <button 
            onClick={() => {
              setCurrentImageIndex(0);
              setHasError(false);
              setIsLoaded(false);
            }}
            className="retry-btn"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(LazyImage);
