# Tipografía

Definida en [`src/styles/variables.css`](../../src/styles/variables.css) (variables `--texto-*`)
y aplicada en [`src/styles/global.css`](../../src/styles/global.css).

## Fuente

- Principal: **Inter**, importada desde Google Fonts en `index.html`.
- Fallback: `system-ui, -apple-system, sans-serif`.

## Escala

| Nivel | Uso | Tamaño | Peso | Interlineado |
|---|---|---|---|---|
| H1 | Título de página | 32px | 700 | 1.2 |
| H2 | Título de sección | 24px | 600 | 1.3 |
| H3 | Título de tarjeta | 18px | 600 | 1.4 |
| Body | Texto general | 16px | 400 | 1.5 |
| Small | Etiquetas, ayudas | 14px | 400 | 1.4 |
| Caption | Notas al pie | 12px | 400 | 1.3 |

## Colores del texto

- Todos los títulos (H1, H2, H3): `--verde-900`.
- Texto body: `--gris-900`.
- Texto secundario: `--gris-600`.

## Notas de uso

- Las leyendas (`<legend>`) de los formularios funcionan como título de sección dentro de una
  tarjeta y usan la escala H3.
- Las cifras grandes del dashboard usan la escala H1.
