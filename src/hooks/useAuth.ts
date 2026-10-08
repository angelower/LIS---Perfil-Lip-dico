import { useContext } from 'react';
import { AuthContext } from '../context/authContextBase';
import type { AuthContextValue } from '../context/authContextBase';

export const useAuth = (): AuthContextValue => {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>.');
  }
  return contexto;
};
