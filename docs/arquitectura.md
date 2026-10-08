# Arquitectura

Aplicación frontend en React + Vite + TypeScript, sin backend ni persistencia. El objetivo es
pedagógico: mostrar una arquitectura frontend bien organizada, buenas prácticas y un sistema de
diseño consistente.

## Estructura de carpetas

```
src/
  assets/       logos e íconos SVG
  components/   componentes reutilizables (Navbar, Sidebar, Card, Button, etc.)
  context/      AuthContext para el usuario logueado simulado
  data/         datos quemados (pacientes, usuarios)
  hooks/        hooks personalizados (prefijo use)
  layouts/      MainLayout: combina Navbar + Sidebar + contenido
  pages/        páginas del CRUD (Inicio, CrearPaciente, ListaPacientes, etc.)
  routes/       definición de rutas de la aplicación
  styles/       variables globales de diseño (colores, tipografía, espaciado)
  types/        tipos e interfaces TypeScript (Paciente, Usuario, etc.)
  utils/        funciones auxiliares (validaciones, formateo)
  App.tsx
  main.tsx
```

`hooks/` no aparecía en la especificación original, pero la regla de estilo de código lo exige.

## Responsabilidades

| Capa | Responsabilidad |
|---|---|
| `pages/` | Una por ruta; componen componentes y llaman a `data/` y `utils/` |
| `components/` | Piezas visuales reutilizables; sin conocimiento de rutas concretas |
| `layouts/` | Estructura común de las páginas autenticadas |
| `context/` + `hooks/` | Estado global de autenticación y su acceso (`useAuth`) |
| `routes/` | Mapa de rutas y protección |
| `utils/` | Lógica pura: rangos clínicos, validaciones, formato |
| `data/` + `types/` | Datos quemados y su modelo ([modelo de datos](modelo-de-datos.md)) |
| `styles/` | Variables globales y estilos base |

## Autenticación simulada

- `AuthContext` guarda el usuario logueado y expone `login` y `logout`; `useAuth` lo consume.
- `login` rechaza campos vacíos; con cualquier email y contraseña no vacíos inicia sesión como el
  usuario admin de `data/usuarios.ts`.
- `ProtectedRoute` redirige a `/login` si no hay usuario (ver [rutas](rutas.md)).

## Estilos

- Cada componente y página tiene su propio `.module.css` (CSS Modules).
- Los valores de diseño salen de variables CSS ([colores](diseno/colores.md),
  [tipografía](diseno/tipografia.md), [espaciado, bordes y sombras](diseno/espaciado-bordes-sombras.md)).
  No se escriben colores a mano en los componentes.

## Decisiones tomadas en la implementación

- **`authContextBase.ts`:** el `createContext` y su tipo viven aparte de `AuthContext.tsx`, porque
  la recarga en caliente (Fast Refresh) de Vite solo funciona en archivos que exportan únicamente
  componentes.
- **`useAuth` en `hooks/`:** según la regla de que los hooks personalizados van en `/hooks`.
- **Componentes añadidos:** `FormularioPaciente` (compartido por crear y editar), `Mensaje`,
  `EncabezadoPagina`, `PacienteNoEncontrado` e `IndicadorLipido`, para no repetir lógica entre páginas.
- **React Router v6:** exigido por la especificación. Tiene 2 avisos de seguridad moderados que solo
  se corrigen en v7 (redirección con `\` en `<Link>`/`useNavigate` y deserialización en SSR); la app
  usa rutas fijas y no usa SSR.
