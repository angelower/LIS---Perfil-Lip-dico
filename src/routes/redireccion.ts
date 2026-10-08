import type { Location } from 'react-router-dom';

// ProtectedRoute guarda la página pedida en el `state` de la navegación hacia /login,
// y Login la lee para volver a ella después de iniciar sesión.
interface EstadoRedireccion {
  desde: string;
}

export const crearEstadoRedireccion = ({ pathname, search }: Location): EstadoRedireccion => ({
  desde: `${pathname}${search}`,
});

// El `state` de la navegación llega como `unknown`: se valida antes de usarlo.
export const obtenerDestino = (estado: unknown): string => {
  if (typeof estado === 'object' && estado !== null && 'desde' in estado && typeof estado.desde === 'string') {
    return estado.desde;
  }
  return '/';
};
