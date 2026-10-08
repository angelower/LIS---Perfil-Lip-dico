import type { ReactElement } from 'react';
import { Card } from '../../components/Card/Card';
import { EncabezadoPagina } from '../../components/EncabezadoPagina/EncabezadoPagina';
import { pacientes } from '../../data/pacientes';
import { useAuth } from '../../hooks/useAuth';
import type { NivelAlerta } from '../../types';
import { nivelPerfil } from '../../utils/perfilLipidico';
import styles from './Inicio.module.css';

interface TarjetaResumen {
  titulo: string;
  cifra: number;
  descripcion: string;
  nivel?: NivelAlerta;
}

export const Inicio = (): ReactElement => {
  const { usuario } = useAuth();
  const niveles = pacientes.map((paciente) => nivelPerfil(paciente.perfilLipidico));
  const contar = (nivel: NivelAlerta): number => niveles.filter((n) => n === nivel).length;

  const tarjetas: TarjetaResumen[] = [
    { titulo: 'Total de pacientes', cifra: pacientes.length, descripcion: 'Registrados en el laboratorio.' },
    { titulo: 'En rango', cifra: contar('bajo'), descripcion: 'Todos los valores normales.', nivel: 'bajo' },
    {
      titulo: 'Limítrofes',
      cifra: contar('medio'),
      descripcion: 'Algún valor limítrofe y ninguno fuera de rango.',
      nivel: 'medio',
    },
    {
      titulo: 'Perfil alterado',
      cifra: contar('alto'),
      descripcion: 'Al menos un valor fuera de rango.',
      nivel: 'alto',
    },
  ];

  return (
    <>
      <EncabezadoPagina
        titulo="Inicio"
        descripcion={`${usuario ? `Hola, ${usuario.nombre}. ` : ''}Resumen de los perfiles lipídicos registrados.`}
      />

      <section className={styles.tarjetas} aria-label="Resumen de pacientes">
        {tarjetas.map((tarjeta) => (
          <Card key={tarjeta.titulo} titulo={tarjeta.titulo} className={tarjeta.nivel && styles[tarjeta.nivel]}>
            <p className={styles.cifra}>{tarjeta.cifra}</p>
            <small className={styles.descripcion}>{tarjeta.descripcion}</small>
          </Card>
        ))}
      </section>

      <p className={styles.nota}>
        Clasificación según los rangos NCEP ATP III de colesterol total, HDL, LDL y triglicéridos.
      </p>
    </>
  );
};
