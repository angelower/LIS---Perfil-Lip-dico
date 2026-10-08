import { createContext } from 'react';
import type { Credenciales, Usuario } from '../types';

// Separado de AuthContext.tsx porque Fast Refresh (recarga en caliente de Vite)
// solo funciona en archivos que exportan únicamente componentes.
export interface AuthContextValue {
  usuario: Usuario | null;
  login: (credenciales: Credenciales) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
