// Mensajes y navegación de error del portal del paciente (docs/portal-paciente.md).

export const MENSAJE_SIN_DOCUMENTO = 'Por favor ingresa tu documento de identidad';
export const MENSAJE_NO_ENCONTRADO =
  'No encontramos resultados para ese documento. Verifica el número e intenta de nuevo.';

interface EstadoErrorConsulta {
  error: string;
}

// Se envía en el `state` de la navegación hacia /consulta para mostrar el error allí.
export const crearEstadoError = (error: string): EstadoErrorConsulta => ({ error });

// El `state` de la navegación llega como `unknown`: se valida antes de usarlo.
export const obtenerErrorDeEstado = (estado: unknown): string | undefined => {
  if (typeof estado === 'object' && estado !== null && 'error' in estado && typeof estado.error === 'string') {
    return estado.error;
  }
  return undefined;
};
