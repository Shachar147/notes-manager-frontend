import React from 'react';
import { getClasses } from '../../../utils/class-utils';
import type { TextColor } from '../text/text';
import type { FontAwesomeIconName } from './font-awesome-names';

interface IconProps {
  name: FontAwesomeIconName; // e.g., 'trash', 'copy', 'plus', 'envelope', 'lock'
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'lg' | '2x' | '3x' | '4x' | '5x';
  color?: TextColor;
}

const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  style,
  size,
  color = 'black',
}) => {
  const sizeClass = size ? `fa-${size}` : '';
  const colorClass = color !== 'black' ? `notes-color-${color}` : '';

  const combinedClassName = getClasses(
    `fa fa-${name}`,
    sizeClass,
    colorClass,
    className
  );

  const iconStyle =
    color !== 'black' ? { color: `var(--notes-${color})`, ...style } : style;

  return (
    <i className={combinedClassName} style={iconStyle} aria-hidden="true" />
  );
};

export default Icon;
