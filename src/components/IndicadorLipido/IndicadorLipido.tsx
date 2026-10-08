import type { ReactElement } from 'react';
import { clasificarValor, etiquetasNivel } from '../../utils/perfilLipidico';
import type { ValorLipido } from '../../utils/perfilLipidico';
import { unirClases } from '../../utils/clases';
import styles from './IndicadorLipido.module.css';

interface IndicadorLipidoProps {
  tipo: ValorLipido;
  valor: number;
}

// El nivel se muestra con color y con texto, para no depender solo del color.
export const IndicadorLipido = ({ tipo, valor }: IndicadorLipidoProps): ReactElement => {
  const nivel = clasificarValor(tipo, valor);

  return (
    <span className={unirClases(styles.indicador, styles[nivel])}>
      <span className={styles.valor}>{valor}</span>
      <span className={styles.nivel}>{etiquetasNivel[nivel]}</span>
    </span>
  );
};
