import type { ComponentProps, ReactElement } from 'react';
import { unirClases } from '../../utils/clases';
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  variante?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({
  variante = 'primary',
  type = 'button',
  className,
  ...props
}: ButtonProps): ReactElement => (
  <button type={type} className={unirClases(styles.boton, styles[variante], className)} {...props} />
);
