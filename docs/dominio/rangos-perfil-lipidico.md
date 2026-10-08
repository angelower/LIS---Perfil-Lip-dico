# Rangos del perfil lipídico

> **Origen:** la especificación original pedía indicadores verde, amarillo y rojo pero no definía los
> rangos. Esta tabla se propuso y se aprobó durante el desarrollo.

Implementados en [`src/utils/perfilLipidico.ts`](../../src/utils/perfilLipidico.ts). Criterios NCEP ATP III
llevados a tres niveles. Valores en mg/dL.

| Valor | Normal (verde) | Limítrofe (amarillo) | Fuera de rango (rojo) |
|---|---|---|---|
| Colesterol total | < 200 | 200–239 | ≥ 240 |
| LDL | < 130 | 130–159 | ≥ 160 |
| HDL (más alto es mejor) | ≥ 60 | 40–59 | < 40 |
| Triglicéridos | < 150 | 150–199 | ≥ 200 |

Los colores corresponden a `--alerta-bajo`, `--alerta-medio` y `--alerta-alto`
(ver [colores](../diseno/colores.md)).

## Nivel de un perfil completo

El nivel del perfil es el de su **peor valor**. Un perfil está **alterado** si tiene al menos un
valor fuera de rango.

## Presentación

El nivel se muestra con color **y** con texto ("Normal", "Limítrofe", "Fuera de rango"), para no
depender solo del color (por ejemplo, para personas con daltonismo).

## Validaciones del formulario de paciente

Implementadas en [`src/utils/validaciones.ts`](../../src/utils/validaciones.ts).

- Nombre, apellidos y EPS: obligatorios.
- Edad: número entero entre 0 y 120.
- Colesterol total, HDL, LDL y triglicéridos: números mayores que 0.
