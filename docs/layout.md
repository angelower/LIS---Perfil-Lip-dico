# Layout de la aplicación

Implementado en [`src/layouts/MainLayout.tsx`](../src/layouts/MainLayout.tsx).

## Estructura general

Todas las páginas autenticadas comparten esta estructura. `/login` y el [portal del paciente](portal-paciente.md) no la usan.

```
┌─────────────────────────────────────────────────┐
│  NAVBAR (fijo, arriba, altura 64px)             │
│  [Logo]                    [Usuario] [Salir]    │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ SIDEBAR  │         CONTENIDO DE LA PÁGINA       │
│(colapsa) │                                      │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

El contenido se renderiza con `<Outlet />` de React Router. El layout no se desmonta al cambiar
de página, así que el navbar y el estado del sidebar se conservan.

## Navbar

Componente: [`src/components/Navbar/`](../src/components/Navbar/). Presente en **todas** las
páginas autenticadas y nunca desaparece al navegar.

- Altura 64px, fondo `--verde-600`, texto blanco.
- **Izquierda:** logo (`src/assets/logo.svg`, que el estudiante reemplazará por el suyo).
  Es clickeable y lleva a la página de inicio.
- **Derecha:**
  - Nombre del usuario logueado, obtenido del `AuthContext`.
  - Botón "Cerrar sesión": limpia el contexto y redirige a `/login`.

## Sidebar

Componente: [`src/components/Sidebar/`](../src/components/Sidebar/).

- Ancho expandido 240px; colapsado 64px.
- Fondo `--verde-800`, texto blanco.
- Botón de colapsar/expandir arriba, con ícono de hamburguesa.
- El estado de colapso vive en un estado local de `MainLayout` (no se persiste entre sesiones).
- Colapsado: solo se ven los íconos; al pasar el mouse aparece un tooltip con el nombre.
- La opción activa se resalta con fondo `--verde-700` y borde izquierdo de 4px en `--verde-300`.

### Opciones del menú

Todas con ícono SVG simple.

| # | Opción | Ruta | Visibilidad |
|---|---|---|---|
| 1 | Inicio | `/` | Todos |
| 2 | Cuentas de usuario | `/usuarios` | Solo admin |
| 3 | — separador — | | |
| 4 | Crear paciente | `/pacientes/crear` | Todos |
| 5 | Lista de pacientes | `/pacientes` | Todos |
| 6 | Editar paciente | `/pacientes/editar/:id` | Todos |
| 7 | Eliminar paciente | `/pacientes/eliminar/:id` | Todos |

## Decisiones tomadas en la implementación

Estas decisiones **no** estaban en la especificación original; se aprobaron durante el desarrollo.

- **Editar y eliminar necesitan un `:id`.** Desde el menú no se sabe qué paciente abrir, así que
  aparecen deshabilitadas con la pista "Seleccione un paciente en la lista". Se activan cuando la
  ruta actual es de edición o eliminación de un paciente, y apuntan a ese mismo paciente.
- **Tarjetas en `--verde-100`.** El blanco se usa solo en campos de formulario y tablas, para
  respetar que la interfaz use exclusivamente la paleta.
