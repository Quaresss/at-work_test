import styles from './EditUserBackButton.module.scss';
import backArrowIcon from '../../assets/icons/back-arrow.svg';

interface EditUserBackButtonProps {
  onClick: () => void;
}

export const EditUserBackButton = ({ onClick }: EditUserBackButtonProps) => {
  return (
    <button type="button" className={styles.back} onClick={onClick}>
      <img
        src={backArrowIcon}
        alt=""
        className={styles.backIcon}
        width="24"
        height="24"
        aria-hidden
      />
      <span>Назад</span>
    </button>
  );
};
