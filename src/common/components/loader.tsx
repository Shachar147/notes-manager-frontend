import React from 'react';
import { CircularProgress } from '@mui/material';
import Text from './text';
import styles from './loader.module.css';

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
      case 'small': return 24;
      case 'large': return 48;
      default: return 32;
    }
  };

  return (
    <div className={`${styles.loader} ${className}`}>
      <CircularProgress size={getSpinnerSize()} />
      <Text variant="body" color="gray-5">
        {text}
      </Text>
    </div>
  );
}

export default Loader; 