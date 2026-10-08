import type { Paciente, PruebaLipidica } from '../types';

// Todas las pruebas del paciente (la más reciente + las anteriores), de la más reciente a la más antigua.
export const obtenerPruebas = (paciente: Paciente): PruebaLipidica[] =>
  [
    { fecha: paciente.fechaRegistro, perfilLipidico: paciente.perfilLipidico },
    ...(paciente.pruebasAnteriores ?? []),
  ].sort((a, b) => Date.parse(b.fecha) - Date.parse(a.fecha));
