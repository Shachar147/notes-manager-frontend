import React from 'react';

interface IconProps {
  name: string; // e.g., 'trash', 'copy', 'plus', 'envelope', 'lock'
  className?: string;
  style?: React.CSSProperties;
  size?: 'lg' | '2x' | '3x' | '4x' | '5x';
}

const Icon: React.FC<IconProps> = ({ name, className = '', style, size }) => {
  const sizeClass = size ? `fa-${size}` : '';
  return <i className={`fa fa-${name} ${sizeClass} ${className}`.trim()} style={style} aria-hidden="true" />;
};

export default Icon; 