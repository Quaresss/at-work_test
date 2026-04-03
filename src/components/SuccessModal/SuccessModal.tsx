import { useEffect } from 'react';
import styles from './SuccessModal.module.scss';

interface SuccessModalProps {
  onClose: () => void;
}

const AUTO_CLOSE_MS = 4000;

export const SuccessModal = ({ onClose }: SuccessModalProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, AUTO_CLOSE_MS);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
        <p className={styles.message}>Изменения сохранены!</p>
      </div>
    </div>
  );
};
