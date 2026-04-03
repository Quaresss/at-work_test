import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormField.module.scss';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isDirty?: boolean;
  registration: UseFormRegisterReturn;
}

export const FormField = ({
  label,
  error,
  isDirty,
  registration,
  ...rest
}: FormFieldProps) => {
  const inputClass = [
    styles.input,
    error ? styles.inputError : '',
    !error && isDirty ? styles.inputDone : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input className={inputClass} {...registration} {...rest} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
