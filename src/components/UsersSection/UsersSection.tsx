import { UserCard } from '../UserCard';
import type { User } from '../../types/user';
import styles from './UsersSection.module.scss';

interface UsersSectionProps {
  title: string;
  users: User[];
  emptyText?: string;
  isArchived?: boolean;
  onArchive: (id: number) => void;
  onActivate: (id: number) => void;
  onHide: (id: number) => void;
}

export const UsersSection = ({
  title,
  users,
  emptyText,
  isArchived = false,
  onArchive,
  onActivate,
  onHide,
}: UsersSectionProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.divider} />
      </div>

      {users.length > 0 ? (
        <div className={styles.grid}>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isArchived={isArchived}
              onArchive={onArchive}
              onActivate={onActivate}
              onHide={onHide}
            />
          ))}
        </div>
      ) : (
        emptyText ? <p className={styles.empty}>{emptyText}</p> : null
      )}
    </section>
  );
};
