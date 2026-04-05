import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchUserById } from '../../api/users';
import { useUsersStore } from '../../store/usersStore';
import { userFormSchema } from '../../types/userSchema';
import type { UserFormData } from '../../types/userSchema';
import type { User } from '../../types/user';
import { Loader } from '../../components/Loader';
import { SuccessModal } from '../../components/SuccessModal';
import { EditUserSidebar } from '../../components/EditUserSidebar';
import { EditUserForm } from '../../components/EditUserForm';
import { EditUserBackButton } from '../../components/EditUserBackButton';
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
  const queryClient = useQueryClient();
  const updateUser = useUsersStore((s) => s.updateUser);
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
        phone: user.phone,
        companyName: user.company.name,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UserFormData) => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone.replace(/\D/g, ''),
      address: {
        ...user.address,
        city: data.city,
      },
      company: {
        ...user.company,
        name: data.companyName,
      },
    };

    updateUser(updatedUser);
    queryClient.setQueryData(['user', id], updatedUser);

    setShowModal(true);
  };

  if (isLoading) return <Loader />;

  if (isError || !user) {
    return <p className={styles.error}>Ошибка при загрузке пользователя</p>;
  }

  return (
    <div className={styles.page}>
      <EditUserBackButton onClick={() => navigate('/')} />

      <div className={styles.content}>
        <EditUserSidebar
          userId={user.id}
          username={user.username}
          tabs={SIDEBAR_TABS}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as (typeof SIDEBAR_TABS)[number])}
        />

        <EditUserForm
          register={register}
          errors={errors}
          dirtyFields={dirtyFields}
          onSubmit={handleSubmit(onSubmit)}
        />
      </div>

      {showModal && (
        <SuccessModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};
