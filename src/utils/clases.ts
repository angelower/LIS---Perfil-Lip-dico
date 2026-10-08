// Une nombres de clase CSS ignorando los valores falsos: unirClases('a', activo && 'b').
export const unirClases = (...clases: Array<string | false | null | undefined>): string =>
  clases.filter(Boolean).join(' ');
