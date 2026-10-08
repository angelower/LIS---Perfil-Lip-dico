import type { ReactElement } from 'react';
import { Card } from '../../components/Card/Card';
import { EncabezadoPagina } from '../../components/EncabezadoPagina/EncabezadoPagina';
import { Mensaje } from '../../components/Mensaje/Mensaje';
import { Table } from '../../components/Table/Table';
import type { ColumnaTabla } from '../../components/Table/Table';
import { usuarios } from '../../data/usuarios';
import { useAuth } from '../../hooks/useAuth';
import type { Usuario } from '../../types';
import { unirClases } from '../../utils/clases';
import styles from './Usuarios.module.css';

const etiquetasRol: Record<Usuario['rol'], string> = {
  admin: 'Administrador',
  laboratorista: 'Laboratorista',
};

const columnas: ColumnaTabla<Usuario>[] = [
  { id: 'nombre', encabezado: 'Nombre', celda: (u) => u.nombre },
  { id: 'email', encabezado: 'Email', celda: (u) => u.email },
  {
    id: 'rol',
    encabezado: 'Rol',
    celda: (u) => <span className={unirClases(styles.rol, styles[u.rol])}>{etiquetasRol[u.rol]}</span>,
  },
];

export const Usuarios = (): ReactElement => {
  const { usuario } = useAuth();

  if (usuario?.rol !== 'admin') {
    return (
      <>
        <EncabezadoPagina titulo="Cuentas de usuario" />
        <Mensaje tipo="aviso" titulo="Acceso restringido">
          Solo los administradores pueden ver las cuentas de usuario.
        </Mensaje>
      </>
    );
  }

  return (
    <>
      <EncabezadoPagina titulo="Cuentas de usuario" descripcion="Personas con acceso al sistema del laboratorio." />
      <Card>
        <Table
          titulo={`${usuarios.length} cuentas registradas`}
          columnas={columnas}
          filas={usuarios}
          obtenerClave={(u) => u.id}
        />
      </Card>
    </>
  );
};
