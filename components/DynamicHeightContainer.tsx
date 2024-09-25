'use client';

import React, { useEffect, useRef } from 'react';

const DynamicHeightContainer = ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const updateContainerHeight = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const childElements = container.children;
        let maxBottom = 0;

        for (let child of childElements) {
          const transform = window.getComputedStyle(child).transform;
          let translateY = 0;

          if (transform && transform !== 'none') {
            const matrix = new DOMMatrix(transform);
            translateY = matrix.m42; // m42 is the Y component of the transform matrix
          }

          const bottom = child.offsetTop + translateY + child.offsetHeight;
          if (bottom > maxBottom) {
            maxBottom = bottom;
          }
        }

        // Add some padding (e.g., 20px) to the maxBottom and use 1000px as the base
        const roundedMaxBottom = Math.ceil(maxBottom / 500) * 500;
        container.style.height = `max(${roundedMaxBottom}px, 100vh)`;
      }
    };

    updateContainerHeight();

    // If children can change dynamically, you might want to add a window resize listener
    window.addEventListener('resize', updateContainerHeight);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, [children]); // Re-run when children change

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh', // Initial height set to 100vh
        background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        position: 'relative'
      }}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};

export default DynamicHeightContainer;