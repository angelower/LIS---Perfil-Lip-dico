import type { ReactElement } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { Button } from '../components/Button/Button';
import { buscarPacientePorDocumento } from '../data/pacientes';
import { nombreCompleto } from '../utils/formato';
import styles from './PatientLayout.module.css';

// Layout del portal público del paciente: no usa MainLayout ni AuthContext.
// El nombre y el botón "Salir" aparecen solo cuando la ruta trae un documento válido.
export const PatientLayout = (): ReactElement => {
  const { documento } = useParams<{ documento: string }>();
  const navigate = useNavigate();
  const paciente = documento ? buscarPacientePorDocumento(documento) : undefined;

  return (
    <div className={styles.pagina}>
      <header className={styles.encabezado}>
        <Link to="/consulta" className={styles.logo}>
          <img src={logo} alt="LabClínico · Ir a la consulta" />
        </Link>

        <p className={styles.titulo}>Consulta de Resultados</p>

        {paciente && (
          <div className={styles.paciente}>
            <span className={styles.nombre}>{nombreCompleto(paciente)}</span>
            <Button variante="secondary" onClick={() => navigate('/consulta')}>
              Salir
            </Button>
          </div>
        )}
      </header>

      <main className={styles.contenido}>
        <Outlet />
      </main>

      <footer className={styles.pie}>
        <small>© Laboratorio Clínico - Perfil Lipídico</small>
      </footer>
    </div>
  );
};
