import { Outlet, useNavigate } from 'react-router';
import { useUsersStore } from '../../store/usersStore';
import favoriteIcon from '../../assets/icons/favorite.svg';
import notificationIcon from '../../assets/icons/notification.svg';
import logoMark from '../../assets/icons/logo-icon.svg';
import logoWordmark from '../../assets/icons/logo.svg';
import styles from './Layout.module.scss';

export const Layout = () => {
  const navigate = useNavigate();
  const users = useUsersStore((s) => s.users);
  const firstUser = users[0];

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button type="button" className={styles.logo} onClick={() => navigate('/')}>
            <img src={logoMark} alt="" className={styles.logoMark} width={24} height={24} />
            <img src={logoWordmark} alt="at-work" className={styles.logoWordmark} width={92} height={20} />
          </button>

          <div className={styles.headerRight}>
            <div className={styles.icons}>
              <button className={styles.iconBtn} aria-label="Избранное">
                <img src={favoriteIcon} alt="" className={styles.headerIcon} width={24} height={24} />
              </button>
              <button className={styles.iconBtn} aria-label="Уведомления">
                <img src={notificationIcon} alt="" className={styles.headerIcon} width={24} height={24} />
              </button>
            </div>

            {firstUser && (
              <div className={styles.userInfo}>
                <img
                  src={`https://i.pravatar.cc/40?img=${firstUser.id}`}
                  alt={firstUser.username}
                  className={styles.userAvatar}
                />
                <span className={styles.username}>{firstUser.username}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
