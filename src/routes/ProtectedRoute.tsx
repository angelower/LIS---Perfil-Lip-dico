import type { ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { crearEstadoRedireccion } from './redireccion';

// Ruta "envoltorio": si no hay usuario en el AuthContext redirige a /login;
// si lo hay, muestra la ruta hija (<Outlet />).
export const ProtectedRoute = (): ReactElement => {
  const { usuario } = useAuth();
  const ubicacion = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={crearEstadoRedireccion(ubicacion)} />;
  }

  return <Outlet />;
};
