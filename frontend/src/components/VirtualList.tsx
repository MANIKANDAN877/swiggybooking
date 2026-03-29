import React from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

function VirtualList<T>({ items, itemHeight, height, renderItem, className = '' }: VirtualListProps<T>) {
  const visibleItems = items.slice(0, Math.ceil(height / itemHeight) + 2);
  
  if (items.length === 0) {
    return (
      <div className={`virtual-list-empty ${className}`}>
        <p>No items to display</p>
      </div>
    );
  }

  return (
    <div 
      className={`virtual-list ${className}`}
      style={{ height, overflow: 'auto' }}
    >
      {visibleItems.map((item, index) => (
        <div key={index} style={{ height: itemHeight }}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export default React.memo(VirtualList) as typeof VirtualList;
