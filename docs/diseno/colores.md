# Colores

Paleta del sistema de diseño. Se usa **exclusivamente** esta escala para la interfaz.

- Fuente de verdad en CSS: [`src/styles/variables.css`](../../src/styles/variables.css)
- Espejo para TypeScript: [`src/styles/theme.ts`](../../src/styles/theme.ts)

Si cambia un valor, se actualiza en ambos archivos y en este documento.

## Escala de verdes

| Variable | Valor | Uso |
|---|---|---|
| `--verde-50` | `#f0fdf4` | Fondos muy claros |
| `--verde-100` | `#dcfce7` | Fondos de tarjetas |
| `--verde-200` | `#bbf7d0` | Bordes suaves |
| `--verde-300` | `#86efac` | Acentos claros |
| `--verde-400` | `#4ade80` | Hover de botones secundarios |
| `--verde-500` | `#22c55e` | Color principal de marca |
| `--verde-600` | `#16a34a` | Botones primarios, énfasis |
| `--verde-700` | `#15803d` | Hover de botones primarios |
| `--verde-800` | `#166534` | Texto sobre fondos claros |
| `--verde-900` | `#14532d` | Títulos principales |

## Neutros permitidos

| Variable | Valor | Uso |
|---|---|---|
| `--gris-50` | `#f9fafb` | Fondo general de la app |
| `--gris-100` | `#f3f4f6` | Fondo de filas alternas en tablas |
| `--gris-300` | `#d1d5db` | Bordes |
| `--gris-600` | `#4b5563` | Texto secundario |
| `--gris-900` | `#111827` | Texto principal |

## Colores de estado

Solo para alertas médicas (indicadores del perfil lipídico). Los niveles y sus umbrales
están en [rangos del perfil lipídico](../dominio/rangos-perfil-lipidico.md).

| Variable | Valor | Significado |
|---|---|---|
| `--alerta-bajo` | `#16a34a` | Valores dentro de rango |
| `--alerta-medio` | `#ca8a04` | Valores limítrofes |
| `--alerta-alto` | `#dc2626` | Valores fuera de rango |

## Decisiones tomadas en la implementación

Estas decisiones **no** estaban en la especificación original; se aprobaron durante el desarrollo.

- **`--blanco` (`#ffffff`):** texto sobre el navbar y el sidebar, y fondo de campos de formulario y tablas.
  La especificación dice "texto blanco" en navbar y sidebar, pero no lo definía como variable.
- **Rojo en acciones destructivas:** el botón `danger` y los mensajes de error de los campos usan
  `--alerta-alto`. Un botón de eliminar en verde no se distinguiría de una acción normal.
- **Colores derivados:** los fondos tenues de los indicadores usan `color-mix()` sobre las variables
  de estado, para no introducir colores nuevos.
