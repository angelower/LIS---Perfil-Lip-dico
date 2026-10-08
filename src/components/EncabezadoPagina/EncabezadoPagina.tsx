import type { ReactElement, ReactNode } from 'react';
import styles from './EncabezadoPagina.module.css';

interface EncabezadoPaginaProps {
  titulo: string;
  descripcion?: string;
  acciones?: ReactNode;
}

export const EncabezadoPagina = ({ titulo, descripcion, acciones }: EncabezadoPaginaProps): ReactElement => (
  <div className={styles.encabezado}>
    <div className={styles.textos}>
      <h1>{titulo}</h1>
      {descripcion && <p className={styles.descripcion}>{descripcion}</p>}
    </div>
    {acciones && <div className={styles.acciones}>{acciones}</div>}
  </div>
);
