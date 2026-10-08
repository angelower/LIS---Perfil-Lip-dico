// Mismos valores que variables.css (docs/diseno/colores.md), para usarlos desde TypeScript.
// Si cambia un color, se actualiza en ambos archivos.

export const verdes = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
} as const;

export const grises = {
  50: '#f9fafb',
  100: '#f3f4f6',
  300: '#d1d5db',
  600: '#4b5563',
  900: '#111827',
} as const;

export const blanco = '#ffffff';

export const alertas = {
  bajo: '#16a34a',
  medio: '#ca8a04',
  alto: '#dc2626',
} as const;

export const theme = { verdes, grises, blanco, alertas } as const;
