# Rutas de la aplicación

Definidas en [`src/routes/AppRoutes.tsx`](../src/routes/AppRoutes.tsx) con React Router DOM v6.

| Ruta | Página | Operación | Layout |
|---|---|---|---|
| `/login` | Login simulado | — | Sin navbar ni sidebar |
| `/` | Inicio | — | Con navbar y sidebar |
| `/usuarios` | Cuentas de usuario (solo admin) | — | Con navbar y sidebar |
| `/pacientes` | Lista de pacientes | READ | Con navbar y sidebar |
| `/pacientes/crear` | Formulario de creación | CREATE | Con navbar y sidebar |
| `/pacientes/editar/:id` | Formulario de edición | UPDATE | Con navbar y sidebar |
| `/pacientes/eliminar/:id` | Confirmación de eliminación | DELETE | Con navbar y sidebar |
| `/consulta` | Portal del paciente: formulario de documento | — | `PatientLayout` (público) |
| `/consulta/:documento` | Portal del paciente: resultados | — | `PatientLayout` (público) |

## Rutas protegidas

Todas las rutas excepto `/login` y las del portal del paciente (`/consulta...`, públicas; ver
[portal-paciente.md](portal-paciente.md)) verifican que haya un usuario en el `AuthContext`
([`ProtectedRoute`](../src/routes/ProtectedRoute.tsx)). Si no lo hay, redirigen a `/login`.

## Decisiones tomadas en la implementación

Estas decisiones **no** estaban en la especificación original; se aprobaron durante el desarrollo.

- **Volver a la página pedida:** al redirigir a `/login`, se guarda la ruta solicitada; tras iniciar
  sesión se vuelve a ella (ver [`redireccion.ts`](../src/routes/redireccion.ts)).
- **`/login` con sesión activa:** redirige a `/`.
- **Rutas inexistentes:** redirigen a `/` (y de ahí a `/login` si no hay sesión). No hay página 404.
- **`:id` inexistente:** editar y eliminar muestran "Paciente no encontrado" con un enlace a la lista.
- **`/usuarios` sin ser admin:** muestra una tarjeta de "Acceso restringido".

## Limitación: la sesión vive en memoria

Como no se permite `localStorage`, recargar la página o escribir una URL en la barra del navegador
pierde la sesión. Para recorrer la aplicación se usa el sidebar y los botones.
