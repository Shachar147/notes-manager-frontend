import React from 'react';
import Text from './text';
import styles from './loader.module.css';
import Icon from './icon';
import { getClasses } from '../../utils/class-utils';

interface LoaderProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

function Loader({ 
  text = 'Loading...', 
  size = 'medium',
  className = ''
}: LoaderProps) {
  const getSpinnerSize = () => {
    switch (size) {
      case 'small': return 'fa-lg';
      case 'large': return 'fa-3x';
      default: return 'fa-2x';
    }
  };

  return (
    <div className={`${styles.loader} ${className}`}>
      <Icon name="spinner" className={getClasses('fa-spin', getSpinnerSize())} />
      <Text variant="body" color="gray-5">
        {text}
      </Text>
    </div>
  );
}

export default Loader; 