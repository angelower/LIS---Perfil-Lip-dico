import { useCallback, useMemo, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { usuarioAdmin } from '../data/usuarios';
import type { Credenciales, Usuario } from '../types';
import { AuthContext } from './authContextBase';
import type { AuthContextValue } from './authContextBase';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = useCallback(({ email, contrasena }: Credenciales): boolean => {
    if (email.trim() === '' || contrasena === '') return false;

    // Login simulado: no se verifican las credenciales; siempre entra la cuenta admin.
    setUsuario(usuarioAdmin);
    return true;
  }, []);

  const logout = useCallback((): void => {
    setUsuario(null);
  }, []);

  const valor = useMemo((): AuthContextValue => ({ usuario, login, logout }), [usuario, login, logout]);

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
};
