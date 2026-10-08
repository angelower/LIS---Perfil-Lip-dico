import type { Credenciales, DatosFormularioPaciente } from '../types';
import { valoresLipidos } from './perfilLipidico';

// Mensaje de error por campo; un campo sin mensaje es válido.
export type Errores<T> = Partial<Record<keyof T, string>>;

const OBLIGATORIO = 'Este campo es obligatorio.';
const EDAD_MAXIMA = 120;
// Formato básico: texto@texto.dominio
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const estaVacio = (valor: string): boolean => valor.trim() === '';

const validarEdad = (valor: string): string | undefined => {
  if (estaVacio(valor)) return OBLIGATORIO;
  const edad = Number(valor);
  if (!Number.isInteger(edad)) return 'La edad debe ser un número entero.';
  if (edad < 0 || edad > EDAD_MAXIMA) return `La edad debe estar entre 0 y ${EDAD_MAXIMA} años.`;
  return undefined;
};

const validarValorLipido = (valor: string): string | undefined => {
  if (estaVacio(valor)) return OBLIGATORIO;
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return 'Debe ser un número.';
  if (numero <= 0) return 'Debe ser mayor que 0.';
  return undefined;
};

export const validarPaciente = (datos: DatosFormularioPaciente): Errores<DatosFormularioPaciente> => {
  const errores: Errores<DatosFormularioPaciente> = {};

  (['nombre', 'apellidos', 'eps'] as const).forEach((campo) => {
    errores[campo] = estaVacio(datos[campo]) ? OBLIGATORIO : undefined;
  });

  errores.edad = validarEdad(datos.edad);

  valoresLipidos.forEach((tipo) => {
    errores[tipo] = validarValorLipido(datos[tipo]);
  });

  return errores;
};

const validarEmail = (email: string): string | undefined => {
  if (estaVacio(email)) return OBLIGATORIO;
  return PATRON_EMAIL.test(email.trim()) ? undefined : 'Ingrese un email válido.';
};

export const validarLogin = ({ email, contrasena }: Credenciales): Errores<Credenciales> => ({
  email: validarEmail(email),
  contrasena: contrasena === '' ? OBLIGATORIO : undefined,
});

export const tieneErrores = <T>(errores: Errores<T>): boolean => Object.values(errores).some(Boolean);
