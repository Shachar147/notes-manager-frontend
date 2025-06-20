import React from 'react';
import { Icon } from './index';
import styles from './SidebarDrawer.module.css';
import { getClasses } from '../../utils/class-utils';

interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function SidebarDrawer({ open, onClose, children }: SidebarDrawerProps) {
  return (
    <>
      <div
        className={getClasses(styles.overlay, open && styles.open)}
        onClick={onClose}
      />
      <aside className={getClasses(styles.drawer, open && styles.open)}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <Icon name="times" size="small" />
        </button>
        <div className={styles.content}>{children}</div>
      </aside>
    </>
  );
}

export default SidebarDrawer;
