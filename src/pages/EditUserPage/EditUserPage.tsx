import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchUserById } from '../../api/users';
import { userFormSchema } from '../../types/userSchema';
import type { UserFormData } from '../../types/userSchema';
import { FormField } from '../../components/FormField';
import { Loader } from '../../components/Loader';
import { SuccessModal } from '../../components/SuccessModal';
import styles from './EditUserPage.module.scss';

const SIDEBAR_TABS = [
  'Данные профиля',
  'Рабочее пространство',
  'Приватность',
  'Безопасность',
] as const;

export const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof SIDEBAR_TABS)[number]>(
    SIDEBAR_TABS[0],
  );

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(Number(id)),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        phone: user.phone.replace(/\D/g, ''),
        companyName: user.company.name,
      });
    }
  }, [user, reset]);

  const onSubmit = (_data: UserFormData) => {
    setShowModal(true);
  };

  if (isLoading) return <Loader />;

  if (isError || !user) {
    return <p className={styles.error}>Ошибка при загрузке пользователя</p>;
  }

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/')}>
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.125 10.5H0.875" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 16.625L0.875 10.5L7 4.375" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Назад</span>
      </button>

      <div className={styles.content}>
          <aside className={styles.sidebar}>
            <img
              src={`https://i.pravatar.cc/560?img=${user.id}`}
              alt={user.username}
              className={styles.profilePhoto}
            />

            <nav className={styles.sidebarNav}>
              {SIDEBAR_TABS.map((tab) => (
                <button
                  key={tab}
                  className={`${styles.sidebarTab} ${activeTab === tab ? styles.sidebarTabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </aside>

          <div className={styles.formCard}>
            <div className={styles.titleBlock}>
              <h2 className={styles.title}>Данные профиля</h2>
              <div className={styles.divider} />
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.fields}>
                <FormField
                  label="Имя"
                  registration={register('name')}
                  error={errors.name?.message}
                  isDirty={dirtyFields.name}
                />
                <FormField
                  label="Никнейм"
                  registration={register('username')}
                  error={errors.username?.message}
                  isDirty={dirtyFields.username}
                />
                <FormField
                  label="Почта"
                  registration={register('email')}
                  error={errors.email?.message}
                  isDirty={dirtyFields.email}
                />
                <FormField
                  label="Город"
                  registration={register('city')}
                  error={errors.city?.message}
                  isDirty={dirtyFields.city}
                />
                <FormField
                  label="Телефон"
                  registration={register('phone')}
                  error={errors.phone?.message}
                  isDirty={dirtyFields.phone}
                />
                <FormField
                  label="Название компании"
                  registration={register('companyName')}
                  error={errors.companyName?.message}
                  isDirty={dirtyFields.companyName}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Сохранить
              </button>
            </form>
          </div>
      </div>

      {showModal && (
        <SuccessModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};
