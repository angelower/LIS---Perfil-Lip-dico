import type { ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../Button/Button';
import styles from './Navbar.module.css';

export const Navbar = (): ReactElement => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = (): void => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="LabClínico · Ir al inicio" />
      </Link>

      <div className={styles.sesion}>
        {usuario && <span className={styles.usuario}>{usuario.nombre}</span>}
        <Button variante="secondary" onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};
