import type { Paciente } from '../types';

const formatoFecha = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'America/Bogota',
});

// "2026-09-18T07:55:00-05:00" → "18 sept 2026" (sin los "de" que agrega Intl).
export const formatearFecha = (fechaIso: string): string =>
  formatoFecha
    .formatToParts(new Date(fechaIso))
    .filter((parte) => parte.type !== 'literal')
    .map((parte) => parte.value.replace('.', ''))
    .join(' ');

export const nombreCompleto = ({ nombre, apellidos }: Pick<Paciente, 'nombre' | 'apellidos'>): string =>
  `${nombre.trim()} ${apellidos.trim()}`;

const formatoFechaCorta = new Intl.DateTimeFormat('es-CO', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'America/Bogota',
});

// "2026-09-18T07:55:00-05:00" → "18/09/2026" (DD/MM/YYYY).
export const formatearFechaCorta = (fechaIso: string): string => formatoFechaCorta.format(new Date(fechaIso));
