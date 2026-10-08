import type { ReactElement } from 'react';
import type { PruebaLipidica } from '../../types';
import { formatearFechaCorta } from '../../utils/formato';
import { nombresLipidos, valoresLipidos } from '../../utils/perfilLipidico';
import { Card } from '../Card/Card';
import { IndicadorLipido } from '../IndicadorLipido/IndicadorLipido';
import styles from './TarjetaPerfilLipidico.module.css';

interface TarjetaPerfilLipidicoProps {
  prueba: PruebaLipidica;
  esMasReciente?: boolean;
}

// Una prueba del paciente: fecha y las 4 métricas, cada una con su nivel.
export const TarjetaPerfilLipidico = ({ prueba, esMasReciente = false }: TarjetaPerfilLipidicoProps): ReactElement => (
  <Card>
    <div className={styles.encabezado}>
      <h3>
        Prueba del <time dateTime={prueba.fecha}>{formatearFechaCorta(prueba.fecha)}</time>
      </h3>
      {esMasReciente && <small className={styles.etiqueta}>Más reciente</small>}
    </div>

    <ul className={styles.metricas}>
      {valoresLipidos.map((tipo) => (
        <li key={tipo} className={styles.metrica}>
          <span className={styles.nombre}>{nombresLipidos[tipo]}</span>
          <IndicadorLipido tipo={tipo} valor={prueba.perfilLipidico[tipo]} />
          <span className={styles.unidad}>mg/dL</span>
        </li>
      ))}
    </ul>
  </Card>
);
