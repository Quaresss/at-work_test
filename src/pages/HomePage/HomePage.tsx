import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../api/users';
import { useUsersStore } from '../../store/usersStore';
import { Loader } from '../../components/Loader';
import { UsersSection } from '../../components/UsersSection';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const setUsers = useUsersStore((s) => s.setUsers);
  const archiveUser = useUsersStore((s) => s.archiveUser);
  const activateUser = useUsersStore((s) => s.activateUser);
  const hideUser = useUsersStore((s) => s.hideUser);
  const users = useUsersStore((s) => s.users);
  const archivedIds = useUsersStore((s) => s.archivedIds);
  const hiddenIds = useUsersStore((s) => s.hiddenIds);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  const activeUsers = useMemo(
    () => users.filter((u) => !archivedIds.has(u.id) && !hiddenIds.has(u.id)),
    [users, archivedIds, hiddenIds],
  );

  const archivedUsers = useMemo(
    () => users.filter((u) => archivedIds.has(u.id) && !hiddenIds.has(u.id)),
    [users, archivedIds, hiddenIds],
  );

  if (isLoading) return <Loader />;

  if (isError) {
    return <p className={styles.error}>Ошибка при загрузке пользователей</p>;
  }

  return (
    <div className={styles.page}>
      <UsersSection
        title="Активные"
        users={activeUsers}
        emptyText="Нет активных пользователей"
        onArchive={archiveUser}
        onActivate={activateUser}
        onHide={hideUser}
      />

      {archivedUsers.length > 0 && (
        <UsersSection
          title="Архив"
          users={archivedUsers}
          isArchived
          onArchive={archiveUser}
          onActivate={activateUser}
          onHide={hideUser}
        />
      )}
    </div>
  );
};
