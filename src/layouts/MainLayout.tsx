import { useState } from 'react';
import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Sidebar } from '../components/Sidebar/Sidebar';
import styles from './MainLayout.module.css';

// Envuelve todas las rutas autenticadas. Como el layout no se desmonta al cambiar de
// página (solo cambia el <Outlet />), el navbar y el estado del sidebar se conservan.
export const MainLayout = (): ReactElement => {
  const [sidebarColapsado, setSidebarColapsado] = useState<boolean>(false);

  const alternarSidebar = (): void => {
    setSidebarColapsado((colapsado) => !colapsado);
  };

  return (
    <>
      <Navbar />
      <div className={styles.cuerpo}>
        <Sidebar colapsado={sidebarColapsado} onAlternar={alternarSidebar} />
        <main className={styles.contenido}>
          <Outlet />
        </main>
      </div>
    </>
  );
};
