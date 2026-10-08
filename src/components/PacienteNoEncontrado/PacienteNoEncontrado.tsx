import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { EncabezadoPagina } from '../EncabezadoPagina/EncabezadoPagina';
import { Mensaje } from '../Mensaje/Mensaje';
import styles from './PacienteNoEncontrado.module.css';

interface PacienteNoEncontradoProps {
  titulo: string;
  id: string | undefined;
}

export const PacienteNoEncontrado = ({ titulo, id }: PacienteNoEncontradoProps): ReactElement => (
  <>
    <EncabezadoPagina titulo={titulo} />
    <Mensaje tipo="aviso" titulo="Paciente no encontrado">
      <p>
        No existe un paciente con el identificador <strong>«{id}»</strong>.{' '}
        <Link to="/pacientes" className={styles.enlace}>
          Volver a la lista de pacientes
        </Link>
      </p>
    </Mensaje>
  </>
);
