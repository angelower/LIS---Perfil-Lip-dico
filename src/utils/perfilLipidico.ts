import type { NivelAlerta, PerfilLipidico } from '../types';

export type ValorLipido = keyof PerfilLipidico;

// Orden en que se muestran los valores en tablas, formularios y fichas.
export const valoresLipidos: ValorLipido[] = ['colesterolTotal', 'hdl', 'ldl', 'trigliceridos'];

export const nombresLipidos: Record<ValorLipido, string> = {
  colesterolTotal: 'Colesterol total',
  hdl: 'HDL',
  ldl: 'LDL',
  trigliceridos: 'Triglicéridos',
};

export const etiquetasNivel: Record<NivelAlerta, string> = {
  bajo: 'Normal',
  medio: 'Limítrofe',
  alto: 'Fuera de rango',
};

interface Umbrales {
  limitrofe: number;
  fueraDeRango: number;
}

// Rangos NCEP ATP III llevados a tres niveles (mg/dL).
// En HDL un valor más alto es mejor, así que sus umbrales se comparan al revés:
// ≥ 60 normal, 40–59 limítrofe, < 40 fuera de rango.
const umbrales: Record<ValorLipido, Umbrales> = {
  colesterolTotal: { limitrofe: 200, fueraDeRango: 240 },
  hdl: { limitrofe: 60, fueraDeRango: 40 },
  ldl: { limitrofe: 130, fueraDeRango: 160 },
  trigliceridos: { limitrofe: 150, fueraDeRango: 200 },
};

export const clasificarValor = (tipo: ValorLipido, valor: number): NivelAlerta => {
  const { limitrofe, fueraDeRango } = umbrales[tipo];

  if (tipo === 'hdl') {
    if (valor >= limitrofe) return 'bajo';
    return valor >= fueraDeRango ? 'medio' : 'alto';
  }

  if (valor < limitrofe) return 'bajo';
  return valor < fueraDeRango ? 'medio' : 'alto';
};

const gravedad: Record<NivelAlerta, number> = { bajo: 0, medio: 1, alto: 2 };

// El nivel del perfil completo es el de su peor valor:
// "alto" = perfil alterado (al menos un valor fuera de rango).
export const nivelPerfil = (perfil: PerfilLipidico): NivelAlerta =>
  valoresLipidos
    .map((tipo) => clasificarValor(tipo, perfil[tipo]))
    .reduce<NivelAlerta>((peor, nivel) => (gravedad[nivel] > gravedad[peor] ? nivel : peor), 'bajo');
