import { useEffect } from 'react';
import crossIcon from '../../assets/icons/cross.svg';
import successIcon from '../../assets/icons/success.svg';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
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

  useBodyScrollLock();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
          <img src={crossIcon} alt="" className={styles.closeIcon} width={24} height={24} />
        </button>
        <img src={successIcon} alt="" className={styles.successIcon} width={84} height={84} />
        <p className={styles.message}>Изменения сохранены!</p>
      </div>
    </div>
  );
};
