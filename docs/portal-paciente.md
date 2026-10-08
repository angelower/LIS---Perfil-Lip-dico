# Portal del Paciente

Micrositio público donde un paciente consulta sus resultados del perfil lipídico
ingresando su documento de identidad. Es un área separada del panel administrativo.

## Propósito

Permitir que una persona acceda a sus propios resultados sin necesidad de usuario
ni contraseña. La "autenticación" es el número de documento: si existe en los datos
quemados, se muestran los resultados; si no, se muestra un error.

## Alcance

- Área pública, sin login.
- Un solo campo de entrada: documento de identidad.
- Puede haber **uno o varios** perfiles lipídicos por paciente (histórico de pruebas).
- Si hay varios, se muestran todos ordenados por fecha descendente (el más reciente primero).
- No hay escritura, ni edición, ni eliminación.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/consulta` | Página de bienvenida con el formulario de documento |
| `/consulta/:documento` | Vista de resultados del paciente con ese documento |

Estas rutas **no** usan MainLayout ni el AuthContext. Usan un layout propio y simple.

## Layout del portal

Layout independiente del panel administrativo. Estructura:

- **Header simple** (altura 80px, fondo `--verde-700`): logo a la izquierda,
  título "Consulta de Resultados" centrado.
- **Contenido** centrado, ancho máximo 800px, fondo `--verde-50`.
- **Footer** con el texto "© Laboratorio Clínico - Perfil Lipídico" en `--gris-600`.

Sin sidebar. Con nombre del paciente que está consultando. Un botón salir que lleve a la página `/consulta`

## Página `/consulta` (formulario)

- Título H1: "Consulta tus resultados"
- Subtítulo: "Ingresa tu documento de identidad para ver tus perfiles lipídicos"
- Un solo campo de texto:
  - Label: "Documento de identidad"
  - Placeholder: "Ej: 1234567890"
- Botón primario: "Consultar"
- Validaciones:
  - Campo vacío → "Por favor ingresa tu documento de identidad"
  - Documento no encontrado en `/data/pacientes.ts` → "No encontramos resultados
    para ese documento. Verifica el número e intenta de nuevo."
- Si el documento existe → navega a `/consulta/:documento`

## Página `/consulta/:documento` (resultados)

- Obtiene el parámetro `:documento` con `useParams`.
- Busca en `/data/pacientes.ts` todas las pruebas cuyo `documento` coincida.
- Si no hay coincidencias → redirige a `/consulta` con mensaje de error.
- Si hay coincidencias, muestra:
  - Título H1: "Hola, [nombre] [apellidos]"
  - Subtítulo: "Estos son tus resultados del perfil lipídico"
  - Tarjeta de información del paciente: nombre completo, EPS, edad, documento.
  - **Lista de perfiles lipídicos** ordenados por `fechaRegistro` descendente.
    Cada perfil se muestra en una tarjeta que incluye:
    - Fecha de la prueba (formateada DD/MM/YYYY)
    - Grid de 4 métricas: colesterol total, HDL, LDL, triglicéridos
    - Cada métrica con valor, unidad (mg/dL), y badge de estado
      (Normal / Limítrofe / Alto)
  - Si solo hay un perfil, se muestra igual pero sin encabezado de "histórico".
  - Nota al final: "Estos resultados son orientativos. Consulta con tu médico
    para una interpretación completa."
  - Botón secundario: "Consultar otro documento" que vuelve a `/consulta`.

## Modelo de datos requerido

El tipo `Paciente` debe extenderse para soportar el documento y múltiples pruebas.
Ver [modelo-de-datos.md](modelo-de-datos.md) para el detalle. Añadir:

- `documento: string` al tipo `Paciente` (identificador de consulta pública).
- El array de pacientes en `/data/pacientes.ts` debe garantizar que al menos
  un paciente tenga **dos o más** perfiles lipídicos para poder ver el histórico.

> Nota: cómo se modelan las múltiples pruebas está registrado en la sección
> "Decisiones tomadas en la implementación" de [modelo-de-datos.md](modelo-de-datos.md).

## Componentes reutilizables

Se reutilizan componentes ya existentes del panel administrativo:

- `MetricaResultado` (o equivalente) para cada valor del perfil.
- `EstadoBadge` para la etiqueta Normal / Limítrofe / Alto.

Si alguno no existe todavía, se crea siguiendo [code-rules](../AGENT.md#reglas-de-código)
y [design-system](diseno/colores.md).

## Utilidades

Se reutilizan las funciones de clasificación de rangos ya definidas
(ver [rangos-perfil-lipidico.md](dominio/rangos-perfil-lipidico.md)).
No se duplican.

## Reglas específicas del módulo

- El portal **no** usa MainLayout ni AuthContext.
- El portal **no** modifica el panel administrativo existente.
- El portal **no** introduce nuevas dependencias.
- Los colores, tipografía y espaciado siguen el sistema de diseño existente.
- La ruta `/consulta` debe ser accesible sin autenticación.

## Decisiones tomadas en la implementación

Estas decisiones **no** estaban en la especificación original; se aprobaron durante el desarrollo
(2026-10-07).

- **Histórico de pruebas:** el modelo de datos se extendió en vez de reestructurarse; ver
  [modelo-de-datos.md](modelo-de-datos.md). El portal junta la prueba más reciente y las anteriores
  con `obtenerPruebas()` ([`src/utils/pruebas.ts`](../src/utils/pruebas.ts)) y las ordena por fecha
  descendente.
- **Etiqueta "Fuera de rango" en lugar de "Alto":** se reutiliza `IndicadorLipido` del panel, que
  muestra Normal / Limítrofe / Fuera de rango. Un HDL de 38 es bajo, no alto.
- **Componentes:** `MetricaResultado` y `EstadoBadge` no existían; `IndicadorLipido` cumple ambos
  papeles (valor + nivel con color y texto). Solo se creó `TarjetaPerfilLipidico` (una prueba, con su
  fecha y las 4 métricas). La unidad (mg/dL) se muestra bajo cada métrica.
- **Formato de fecha DD/MM/YYYY** en el portal (función `formatearFechaCorta`); el panel conserva
  "18 sept 2026".
- **Rutas en `src/routes/AppRoutes.tsx`**, junto a las del panel, y no en `App.tsx`. No pasan por
  `ProtectedRoute`.
- **Cabecera:** en `/consulta` solo se muestran el logo y el título. El nombre del paciente y el
  botón "Salir" (que lleva a `/consulta`) aparecen solo en `/consulta/:documento` con un documento
  válido. En pantallas angostas (≤ 720px) el nombre se oculta y el título pasa a una segunda fila.
- **Etiqueta "Más reciente"** en la prueba más nueva, solo cuando hay histórico.
- **Errores:** si `/consulta/:documento` no encuentra el documento, redirige a `/consulta` enviando el
  mensaje en el `state` de la navegación. El documento se recorta de espacios antes de buscarlo.
- **Documentos ficticios** en `data/pacientes.ts`:

  | Paciente | Documento | Pruebas |
  |---|---|---|
  | Laura Martínez Arango | `1020304051` | 1 |
  | Carlos Rodríguez | `1030405062` | 1 |
  | Juan Pérez | `1040506073` | 2 (03/10/2026 y 18/09/2026) |
  | Jorge Ramírez Ospina | `71234567` | 1 |
  | María Gómez Restrepo | `43123456` | 1 |

## Limitaciones conocidas

- **Privacidad:** el documento viaja en la URL (`/consulta/:documento`) y cualquiera que la tenga ve
  los resultados. Es aceptable para este mockup; un sistema real necesitaría autenticación real,
  nunca el solo número de documento.
