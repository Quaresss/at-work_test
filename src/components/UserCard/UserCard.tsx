import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { User } from '../../types/user';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: User;
  onArchive: (id: number) => void;
  onActivate: (id: number) => void;
  onHide: (id: number) => void;
  isArchived?: boolean;
}

export const UserCard = ({
  user,
  onArchive,
  onActivate,
  onHide,
  isArchived = false,
}: UserCardProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const avatarUrl = `https://i.pravatar.cc/224?img=${user.id}`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.card}>
      <img className={styles.avatar} src={avatarUrl} alt={user.username} />
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.usernameRow}>
            <span className={`${styles.username} ${isArchived ? styles.usernameArchived : ''}`}>
              {user.username}
            </span>
            <div className={styles.dropdownWrapper} ref={dropdownRef}>
              <button
                className={styles.menuBtn}
                onClick={() => setOpen(!open)}
                aria-label="Действия"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16C10.9 16 10 16.9 10 18ZM10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6ZM10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12Z" fill="#161616"/>
                </svg>
              </button>

              {open && (
                <div className={styles.dropdown}>
                  {isArchived ? (
                    <button
                      className={styles.dropdownItem}
                      onClick={() => { onActivate(user.id); setOpen(false); }}
                    >
                      Активировать
                    </button>
                  ) : (
                    <>
                      <button
                        className={styles.dropdownItem}
                        onClick={() => { navigate(`/user/${user.id}`); setOpen(false); }}
                      >
                        Редактировать
                      </button>
                      <button
                        className={styles.dropdownItem}
                        onClick={() => { onArchive(user.id); setOpen(false); }}
                      >
                        Архивировать
                      </button>
                      <button
                        className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                        onClick={() => { onHide(user.id); setOpen(false); }}
                      >
                        Скрыть
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <span className={`${styles.company} ${isArchived ? styles.companyArchived : ''}`}>
            {user.company.name}
          </span>
        </div>
        <span className={`${styles.city} ${isArchived ? styles.cityArchived : ''}`}>
          {user.address.city}
        </span>
      </div>
    </div>
  );
};
