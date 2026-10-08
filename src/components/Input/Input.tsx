import { useId } from 'react';
import type { ComponentProps, ReactElement } from 'react';
import { unirClases } from '../../utils/clases';
import styles from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {
  etiqueta: string;
  error?: string;
}

export const Input = ({ etiqueta, error, id, className, ...props }: InputProps): ReactElement => {
  const idGenerado = useId();
  const idInput = id ?? idGenerado;
  const idError = `${idInput}-error`;

  return (
    <div className={unirClases(styles.campo, className)}>
      <label htmlFor={idInput} className={styles.etiqueta}>
        {etiqueta}
      </label>
      <input
        id={idInput}
        className={unirClases(styles.input, error && styles.invalido)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? idError : undefined}
        {...props}
      />
      {error && (
        <small id={idError} className={styles.error}>
          {error}
        </small>
      )}
    </div>
  );
};
