import type { Paciente } from '../types';

// Los valores son coherentes con la fórmula de Friedewald:
// LDL ≈ colesterol total − HDL − triglicéridos / 5.
// Del perfil más sano al más alterado según los rangos acordados para la tabla.
// Los documentos son ficticios.
export const pacientes: Paciente[] = [
  {
    // Todos los valores en rango.
    id: '1',
    documento: '1020304051',
    nombre: 'Laura',
    apellidos: 'Martínez Arango',
    eps: 'Compensar',
    edad: 29,
    perfilLipidico: { colesterolTotal: 175, hdl: 65, ldl: 90, trigliceridos: 100 },
    fechaRegistro: '2026-09-02T08:15:00-05:00',
  },
  {
    // En rango, salvo HDL limítrofe.
    id: '2',
    documento: '1030405062',
    nombre: 'Carlos',
    apellidos: 'Rodríguez',
    eps: 'Sanitas',
    edad: 33,
    perfilLipidico: { colesterolTotal: 180, hdl: 56, ldl: 100, trigliceridos: 120 },
    fechaRegistro: '2026-09-10T09:40:00-05:00',
  },
  {
    // Dos pruebas (histórico): la reciente tiene colesterol total y HDL limítrofes; la anterior, todo limítrofe.
    id: '3',
    documento: '1040506073',
    nombre: 'Juan',
    apellidos: 'Pérez',
    eps: 'EPS Sura',
    edad: 45,
    perfilLipidico: { colesterolTotal: 210, hdl: 49, ldl: 125, trigliceridos: 142 },
    fechaRegistro: '2026-10-03T08:53:00-05:00',
    pruebasAnteriores: [
      {
        fecha: '2026-09-18T07:55:00-05:00',
        perfilLipidico: { colesterolTotal: 200, hdl: 40, ldl: 130, trigliceridos: 150 },
      },
    ],
  },
  {
    // Limítrofe con triglicéridos altos.
    id: '4',
    documento: '71234567',
    nombre: 'Jorge',
    apellidos: 'Ramírez Ospina',
    eps: 'Salud Total',
    edad: 61,
    perfilLipidico: { colesterolTotal: 230, hdl: 42, ldl: 148, trigliceridos: 200 },
    fechaRegistro: '2026-09-25T10:20:00-05:00',
  },
  {
    // Todos los valores fuera de rango.
    id: '5',
    documento: '43123456',
    nombre: 'María',
    apellidos: 'Gómez Restrepo',
    eps: 'Nueva EPS',
    edad: 52,
    perfilLipidico: { colesterolTotal: 240, hdl: 38, ldl: 160, trigliceridos: 210 },
    fechaRegistro: '2026-10-01T08:05:00-05:00',
  },
];

export const buscarPacientePorId = (id: string): Paciente | undefined =>
  pacientes.find((paciente) => paciente.id === id);

export const buscarPacientePorDocumento = (documento: string): Paciente | undefined =>
  pacientes.find((paciente) => paciente.documento === documento);
