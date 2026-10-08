import type { ReactElement, ReactNode } from 'react';
import { unirClases } from '../../utils/clases';
import styles from './Card.module.css';

interface CardProps {
  titulo?: string;
  children: ReactNode;
  className?: string;
}

export const Card = ({ titulo, children, className }: CardProps): ReactElement => (
  <div className={unirClases(styles.card, className)}>
    {titulo && <h3>{titulo}</h3>}
    {children}
  </div>
);
