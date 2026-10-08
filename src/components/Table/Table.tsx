import type { ReactElement, ReactNode } from 'react';
import styles from './Table.module.css';

export interface ColumnaTabla<T> {
  id: string;
  encabezado: string;
  celda: (fila: T) => ReactNode;
  alineacion?: 'izquierda' | 'derecha';
}

interface TableProps<T> {
  columnas: ColumnaTabla<T>[];
  filas: T[];
  obtenerClave: (fila: T) => string;
  titulo?: string;
  mensajeVacio?: string;
}

// Tabla genérica: cada página define sus columnas y cómo se pinta cada celda.
export const Table = <T,>({
  columnas,
  filas,
  obtenerClave,
  titulo,
  mensajeVacio = 'No hay registros para mostrar.',
}: TableProps<T>): ReactElement => {
  const claseAlineacion = (columna: ColumnaTabla<T>): string | undefined =>
    columna.alineacion === 'derecha' ? styles.derecha : undefined;

  return (
    <div className={styles.contenedor}>
      <table className={styles.tabla}>
        {titulo && <caption className={styles.titulo}>{titulo}</caption>}
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={columna.id} scope="col" className={claseAlineacion(columna)}>
                {columna.encabezado}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.length === 0 ? (
            <tr>
              <td colSpan={columnas.length} className={styles.vacio}>
                {mensajeVacio}
              </td>
            </tr>
          ) : (
            filas.map((fila) => (
              <tr key={obtenerClave(fila)}>
                {columnas.map((columna) => (
                  <td key={columna.id} className={claseAlineacion(columna)}>
                    {columna.celda(fila)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
