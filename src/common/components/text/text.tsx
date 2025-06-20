import React from 'react';
import { getClasses } from '../../../utils/class-utils';

export type TextVariant =
  | 'body'
  | 'subhead'
  | 'caption'
  | 'secondary'
  | 'disabled'
  | 'headline-1'
  | 'headline-2'
  | 'headline-3'
  | 'headline-4'
  | 'headline-5'
  | 'headline-6';

export type TextColor =
  | 'black'
  | 'white'
  | 'red-1'
  | 'red-2'
  | 'red-3'
  | 'red-4'
  | 'red-5'
  | 'red-6'
  | 'orange-1'
  | 'orange-2'
  | 'orange-3'
  | 'orange-4'
  | 'orange-5'
  | 'orange-6'
  | 'yellow-1'
  | 'yellow-2'
  | 'yellow-3'
  | 'yellow-4'
  | 'yellow-5'
  | 'yellow-6'
  | 'green-1'
  | 'green-2'
  | 'green-3'
  | 'green-4'
  | 'green-5'
  | 'green-6'
  | 'blue-1'
  | 'blue-2'
  | 'blue-3'
  | 'blue-4'
  | 'blue-5'
  | 'blue-6'
  | 'indigo-1'
  | 'indigo-2'
  | 'indigo-3'
  | 'indigo-4'
  | 'indigo-5'
  | 'indigo-6'
  | 'purple-1'
  | 'purple-2'
  | 'purple-3'
  | 'purple-4'
  | 'purple-5'
  | 'purple-6'
  | 'gray-1'
  | 'gray-2'
  | 'gray-3'
  | 'gray-4'
  | 'gray-5'
  | 'gray-6'
  | 'dark-blue-1'
  | 'dark-blue-2'
  | 'dark-blue-3'
  | 'dark-blue-4'
  | 'dark-blue-5'
  | 'dark-blue-6';

interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function Text({
  variant = 'body',
  color = 'black',
  className = '',
  children,
  as: Component = 'span',
  ...props
}: TextProps) {
  const getVariantClass = (variant: TextVariant): string => {
    switch (variant) {
      case 'headline-1':
        return 'notes-headline-1';
      case 'headline-2':
        return 'notes-headline-2';
      case 'headline-3':
        return 'notes-headline-3';
      case 'headline-4':
        return 'notes-headline-4';
      case 'headline-5':
        return 'notes-headline-5';
      case 'headline-6':
        return 'notes-headline-6';
      case 'body':
        return 'notes-body';
      case 'subhead':
        return 'notes-subhead';
      case 'secondary':
        return 'notes-secondary';
      case 'disabled':
        return 'notes-disabled';
      case 'caption':
        return 'notes-caption';
      default:
        return 'notes-body';
    }
  };

  const getColorClass = (color: TextColor): string => {
    if (color === 'black') return '';
    return `notes-color-${color}`;
  };

  const variantClass = getVariantClass(variant);
  const colorClass = getColorClass(color);

  const combinedClassName = getClasses(variantClass, colorClass, className);

  return (
    <Component
      className={combinedClassName}
      style={color !== 'black' ? { color: `var(--notes-${color})` } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Text;
