import type { BaseSyntheticEvent } from 'react';
import type { FieldErrors, FormState, UseFormRegister } from 'react-hook-form';
import { FormField } from '../FormField';
import type { UserFormData } from '../../types/userSchema';
import styles from './EditUserForm.module.scss';

interface EditUserFormProps {
  register: UseFormRegister<UserFormData>;
  errors: FieldErrors<UserFormData>;
  dirtyFields: FormState<UserFormData>['dirtyFields'];
  onSubmit: (event?: BaseSyntheticEvent) => void;
}

export const EditUserForm = ({ register, errors, dirtyFields, onSubmit }: EditUserFormProps) => {
  return (
    <div className={styles.formCard}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>Данные профиля</h2>
        <div className={styles.divider} />
      </div>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
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
            inputMode="numeric"
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
  );
};
