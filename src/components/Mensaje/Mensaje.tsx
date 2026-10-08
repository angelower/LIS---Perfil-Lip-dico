import type { ReactElement, ReactNode } from 'react';
import { unirClases } from '../../utils/clases';
import styles from './Mensaje.module.css';

interface MensajeProps {
  tipo: 'exito' | 'aviso';
  titulo: string;
  children?: ReactNode;
  nota?: string;
}

export const Mensaje = ({ tipo, titulo, children, nota }: MensajeProps): ReactElement => (
  <div className={unirClases(styles.mensaje, styles[tipo])} role="status">
    <p className={styles.titulo}>{titulo}</p>
    {children && <div className={styles.detalle}>{children}</div>}
    {nota && <small className={styles.nota}>{nota}</small>}
  </div>
);
