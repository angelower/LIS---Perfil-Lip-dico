export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'laboratorista';
}

export interface Credenciales {
  email: string;
  contrasena: string;
}

// Todos los valores en mg/dL.
export interface PerfilLipidico {
  colesterolTotal: number;
  hdl: number;
  ldl: number;
  trigliceridos: number;
}

// Una prueba anterior del paciente: el perfil y la fecha en que se tomó.
export interface PruebaLipidica {
  fecha: string; // ISO 8601
  perfilLipidico: PerfilLipidico;
}

// `perfilLipidico` y `fechaRegistro` son los de la prueba MÁS RECIENTE;
// las pruebas previas (si hay) están en `pruebasAnteriores`.
export interface Paciente {
  id: string;
  documento: string; // identificador de la consulta pública; único por paciente
  nombre: string;
  apellidos: string;
  eps: string;
  edad: number;
  perfilLipidico: PerfilLipidico;
  fechaRegistro: string; // ISO 8601
  pruebasAnteriores?: PruebaLipidica[];
}

// Valores del formulario de paciente tal como se escriben (texto), antes de validarlos.
export interface DatosFormularioPaciente {
  nombre: string;
  apellidos: string;
  eps: string;
  edad: string;
  colesterolTotal: string;
  hdl: string;
  ldl: string;
  trigliceridos: string;
}

// Coincide con las variables --alerta-bajo, --alerta-medio y --alerta-alto.
export type NivelAlerta = 'bajo' | 'medio' | 'alto';
