import type { Usuario } from '../types';

// El login simulado siempre inicia sesión con esta cuenta.
export const usuarioAdmin: Usuario = {
  id: '1',
  nombre: 'Dra. Ana Gómez',
  email: 'ana.gomez@labclinico.example',
  rol: 'admin',
};

export const usuarios: Usuario[] = [
  usuarioAdmin,
  {
    id: '2',
    nombre: 'Bact. Luis Herrera',
    email: 'luis.herrera@labclinico.example',
    rol: 'laboratorista',
  },
  {
    id: '3',
    nombre: 'Bact. Sofía Castaño',
    email: 'sofia.castano@labclinico.example',
    rol: 'laboratorista',
  },
  {
    id: '4',
    nombre: 'Bact. Andrés Vélez',
    email: 'andres.velez@labclinico.example',
    rol: 'laboratorista',
  },
];
