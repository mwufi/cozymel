import Image from 'next/image';
import React from 'react';

interface PolaroidProps {
  width: number;
  height: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Polaroid: React.FC<PolaroidProps> = ({ width, height, style, children }) => {
  return (
    <div className="relative inline-block rounded-lg p-5 pb-9" style={{
      borderImageSlice: '27 27 102 27',
      borderImageWidth: '20px 20px 102px 20px',
      borderImageRepeat: 'stretch stretch',
      borderImageSource: 'url("/frame.png")',
      ...style
    }}>
      {children}
    </div>
  );
};

export default Polaroid;
