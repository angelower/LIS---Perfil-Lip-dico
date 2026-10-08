# Documentación

Documentación de referencia del proyecto. Las instrucciones para agentes y colaboradores están en
[AGENT.md](../AGENT.md); aquí está el detalle que respalda esas instrucciones.

## Índice

| Documento | Contenido |
|---|---|
| [Arquitectura](arquitectura.md) | Estructura de carpetas, responsabilidades por capa, autenticación simulada |
| [Layout](layout.md) | MainLayout, navbar y sidebar |
| [Rutas](rutas.md) | Mapa de rutas, protección y redirecciones |
| [Modelo de datos](modelo-de-datos.md) | Tipos TypeScript y datos quemados |
| [Colores](diseno/colores.md) | Paleta de verdes, neutros y colores de estado |
| [Tipografía](diseno/tipografia.md) | Fuente y escala tipográfica |
| [Espaciado, bordes y sombras](diseno/espaciado-bordes-sombras.md) | Escala de 4px, radios y sombras |
| [Rangos del perfil lipídico](dominio/rangos-perfil-lipidico.md) | Umbrales clínicos y validaciones |
| [Portal del paciente](portal-paciente.md) | Micrositio público de consulta de resultados por documento |
| [Criterios de aceptación](criterios-de-aceptacion.md) | Qué hace correcto al proyecto |

## Convenciones de esta carpeta

- Cada documento cubre **un tema** y enlaza al código que lo implementa.
- Las secciones "Decisiones tomadas en la implementación" recogen lo que **no** estaba en la
  especificación original y se aprobó durante el desarrollo.
- Si cambia un valor de diseño, se actualiza el código **y** el documento correspondiente.
