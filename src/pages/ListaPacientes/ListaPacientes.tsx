import type { ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { EncabezadoPagina } from '../../components/EncabezadoPagina/EncabezadoPagina';
import { IndicadorLipido } from '../../components/IndicadorLipido/IndicadorLipido';
import { Table } from '../../components/Table/Table';
import type { ColumnaTabla } from '../../components/Table/Table';
import { pacientes } from '../../data/pacientes';
import type { Paciente } from '../../types';
import { formatearFecha, nombreCompleto } from '../../utils/formato';
import { nombresLipidos, valoresLipidos } from '../../utils/perfilLipidico';
import type { ValorLipido } from '../../utils/perfilLipidico';
import styles from './ListaPacientes.module.css';

const columnaLipido = (tipo: ValorLipido): ColumnaTabla<Paciente> => ({
  id: tipo,
  encabezado: `${nombresLipidos[tipo]} (mg/dL)`,
  celda: (p) => <IndicadorLipido tipo={tipo} valor={p.perfilLipidico[tipo]} />,
});

const columnas: ColumnaTabla<Paciente>[] = [
  { id: 'paciente', encabezado: 'Paciente', celda: (p) => nombreCompleto(p) },
  { id: 'eps', encabezado: 'EPS', celda: (p) => p.eps },
  { id: 'edad', encabezado: 'Edad', celda: (p) => p.edad, alineacion: 'derecha' },
  ...valoresLipidos.map(columnaLipido),
  {
    id: 'fechaRegistro',
    encabezado: 'Fecha de registro',
    celda: (p) => <span className={styles.fecha}>{formatearFecha(p.fechaRegistro)}</span>,
  },
  {
    id: 'acciones',
    encabezado: 'Acciones',
    celda: (p) => (
      <span className={styles.acciones}>
        <Link to={`/pacientes/editar/${p.id}`}>Editar</Link>
        <Link to={`/pacientes/eliminar/${p.id}`}>Eliminar</Link>
      </span>
    ),
  },
];

export const ListaPacientes = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <>
      <EncabezadoPagina
        titulo="Lista de pacientes"
        descripcion="Resultados del perfil lipídico básico de cada paciente."
        acciones={<Button onClick={() => navigate('/pacientes/crear')}>Crear paciente</Button>}
      />
      <Card>
        <Table
          titulo={`${pacientes.length} pacientes registrados`}
          columnas={columnas}
          filas={pacientes}
          obtenerClave={(p) => p.id}
        />
        <p className={styles.nota}>
          Normal, Limítrofe y Fuera de rango según los rangos NCEP ATP III. En HDL, los valores bajos son los
          que están fuera de rango.
        </p>
      </Card>
    </>
  );
};
