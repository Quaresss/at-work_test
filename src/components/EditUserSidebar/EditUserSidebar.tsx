import styles from './EditUserSidebar.module.scss';

interface EditUserSidebarProps<T extends string> {
  userId: number;
  username: string;
  tabs: readonly T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}

export const EditUserSidebar = <T extends string>({
  userId,
  username,
  tabs,
  activeTab,
  onTabChange,
}: EditUserSidebarProps<T>) => {
  return (
    <aside className={styles.sidebar}>
      <img
        src={`https://i.pravatar.cc/560?img=${userId}`}
        alt={username}
        className={styles.profilePhoto}
      />

      <nav className={styles.sidebarNav}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.sidebarTab} ${activeTab === tab ? styles.sidebarTabActive : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </aside>
  );
};
