import styles from './EditUserBackButton.module.scss';
import backArrowIcon from '../../assets/icons/back-arrow.svg';
import backArrowMobileIcon from '../../assets/icons/back-arrow-mobile.svg';

interface EditUserBackButtonProps {
  onClick: () => void;
}

export const EditUserBackButton = ({ onClick }: EditUserBackButtonProps) => {
  return (
    <button type="button" className={styles.back} onClick={onClick}>
      <picture>
        <source media="(max-width: 768px)" srcSet={backArrowMobileIcon} />
        <img
          src={backArrowIcon}
          alt=""
          className={styles.backIcon}
          width="24"
          height="24"
          aria-hidden
        />
      </picture>
      <span>Назад</span>
    </button>
  );
};
