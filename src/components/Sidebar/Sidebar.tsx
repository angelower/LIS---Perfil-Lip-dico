import type { ReactElement } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import iconoCrear from '../../assets/iconos/crear.svg';
import iconoEditar from '../../assets/iconos/editar.svg';
import iconoEliminar from '../../assets/iconos/eliminar.svg';
import iconoInicio from '../../assets/iconos/inicio.svg';
import iconoLista from '../../assets/iconos/lista.svg';
import iconoMenu from '../../assets/iconos/menu.svg';
import iconoUsuarios from '../../assets/iconos/usuarios.svg';
import { useAuth } from '../../hooks/useAuth';
import { unirClases } from '../../utils/clases';
import styles from './Sidebar.module.css';

interface SidebarProps {
  colapsado: boolean;
  onAlternar: () => void;
}

interface OpcionMenu {
  etiqueta: string;
  icono: string;
  ruta: string;
  soloAdmin?: boolean;
}

// Editar y eliminar necesitan un :id, así que se arman con el paciente de la URL actual.
interface OpcionPorPaciente {
  etiqueta: string;
  icono: string;
  rutaBase: string;
}

const opcionesGenerales: OpcionMenu[] = [
  { etiqueta: 'Inicio', icono: iconoInicio, ruta: '/' },
  { etiqueta: 'Cuentas de usuario', icono: iconoUsuarios, ruta: '/usuarios', soloAdmin: true },
];

const opcionesPacientes: OpcionMenu[] = [
  { etiqueta: 'Crear paciente', icono: iconoCrear, ruta: '/pacientes/crear' },
  { etiqueta: 'Lista de pacientes', icono: iconoLista, ruta: '/pacientes' },
];

const opcionesPorPaciente: OpcionPorPaciente[] = [
  { etiqueta: 'Editar paciente', icono: iconoEditar, rutaBase: '/pacientes/editar' },
  { etiqueta: 'Eliminar paciente', icono: iconoEliminar, rutaBase: '/pacientes/eliminar' },
];

const PISTA_SIN_PACIENTE = 'Seleccione un paciente en la lista';

const claseEnlace = ({ isActive }: { isActive: boolean }): string =>
  unirClases(styles.opcion, isActive && styles.activa);

const renderEnlace = (etiqueta: string, icono: string, ruta: string): ReactElement => (
  <li key={etiqueta}>
    <NavLink to={ruta} end className={claseEnlace}>
      <img src={icono} alt="" className={styles.icono} />
      <span className={styles.etiqueta}>{etiqueta}</span>
    </NavLink>
  </li>
);

const renderDeshabilitada = (etiqueta: string, icono: string): ReactElement => (
  <li key={etiqueta}>
    <span className={unirClases(styles.opcion, styles.deshabilitada)} aria-disabled="true">
      <img src={icono} alt="" className={styles.icono} />
      <span className={styles.etiqueta}>
        {etiqueta}
        <small className={styles.pista}>{PISTA_SIN_PACIENTE}</small>
      </span>
    </span>
  </li>
);

export const Sidebar = ({ colapsado, onAlternar }: SidebarProps): ReactElement => {
  const { usuario } = useAuth();
  const enEditar = useMatch('/pacientes/editar/:id');
  const enEliminar = useMatch('/pacientes/eliminar/:id');
  const idPacienteActual = enEditar?.params.id ?? enEliminar?.params.id;

  const esVisible = (opcion: OpcionMenu): boolean => !opcion.soloAdmin || usuario?.rol === 'admin';

  return (
    <aside className={unirClases(styles.sidebar, colapsado && styles.colapsada)}>
      <button
        type="button"
        className={styles.alternar}
        onClick={onAlternar}
        aria-label={colapsado ? 'Expandir menú' : 'Contraer menú'}
        aria-expanded={!colapsado}
        aria-controls="menu-principal"
      >
        <img src={iconoMenu} alt="" className={styles.icono} />
      </button>

      <nav id="menu-principal" aria-label="Menú principal">
        <ul className={styles.lista}>
          {opcionesGenerales.filter(esVisible).map((o) => renderEnlace(o.etiqueta, o.icono, o.ruta))}

          <li role="separator" className={styles.separador} />

          {opcionesPacientes.filter(esVisible).map((o) => renderEnlace(o.etiqueta, o.icono, o.ruta))}

          {opcionesPorPaciente.map((o) =>
            idPacienteActual
              ? renderEnlace(o.etiqueta, o.icono, `${o.rutaBase}/${idPacienteActual}`)
              : renderDeshabilitada(o.etiqueta, o.icono),
          )}
        </ul>
      </nav>
    </aside>
  );
};
