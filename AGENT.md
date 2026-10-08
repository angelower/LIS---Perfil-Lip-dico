# AGENT.md

Sistema de Laboratorio Clínico (Perfil Lipídico): mockup frontend para gestionar pacientes con
perfil lipídico básico. Sin backend ni persistencia; los datos están quemados en memoria. El
objetivo es pedagógico: una arquitectura frontend ordenada, buenas prácticas y un sistema de
diseño consistente.

Este archivo es la fuente de verdad de las **reglas**. El detalle (valores de diseño, rutas,
modelo de datos, etc.) está en [docs/](docs/README.md).

## Comandos

```bash
npm install
npm run dev     # servidor de desarrollo en http://localhost:5173
npm run lint    # hace cumplir las reglas de código de este archivo
npm run build   # verificación de tipos + build de producción
```

Antes de dar una tarea por terminada deben pasar `npm run lint` y `npm run build`.

## Stack obligatorio

- React 18+ con Vite y TypeScript
- React Router DOM **v6** para navegación
- Context API para el estado global de autenticación simulada
- CSS Modules para estilos

## Prohibido

- Tailwind, Bootstrap, styled-components o cualquier librería de UI (Material UI, Ant Design, Chakra...)
- Backend, `fetch`, `axios`, `localStorage`, `sessionStorage`, cookies
- Colores escritos a mano en los componentes: se usan las variables de [colores](docs/diseno/colores.md)

## Estructura de carpetas

Todo el código va en `src/`. Detalle y responsabilidades en [docs/arquitectura.md](docs/arquitectura.md).

```
src/
  assets/  components/  context/  data/  hooks/
  layouts/  pages/  routes/  styles/  types/  utils/
  App.tsx  main.tsx
```

## Reglas de código

- Componentes en PascalCase, archivos `.tsx`.
- Hooks personalizados en `/hooks` con prefijo `use`.
- Todas las funciones con tipos explícitos de retorno.
- Usar `const` y funciones flecha; evitar `function` declarations.
- Comentarios solo donde la lógica no sea obvia.
- Cada componente tiene su propio `.module.css`.
- Sin estilos inline, salvo para valores dinámicos calculados.

Las dos reglas sobre funciones las hace cumplir ESLint (`eslint.config.js`).

## Cómo trabajar

- Si algo no está especificado en este archivo ni en `docs/`, **pregunta antes de asumir**.
- Si tomas una decisión que no estaba especificada y se aprueba, regístrala en la sección
  "Decisiones tomadas en la implementación" del documento correspondiente de `docs/`.
- Si cambias un valor de diseño, actualiza el código **y** su documento en `docs/`.

## Documentación

| Tema | Documento |
|---|---|
| Índice | [docs/README.md](docs/README.md) |
| Arquitectura y autenticación | [docs/arquitectura.md](docs/arquitectura.md) |
| Layout: navbar y sidebar | [docs/layout.md](docs/layout.md) |
| Rutas y protección | [docs/rutas.md](docs/rutas.md) |
| Tipos y datos quemados | [docs/modelo-de-datos.md](docs/modelo-de-datos.md) |
| Colores | [docs/diseno/colores.md](docs/diseno/colores.md) |
| Tipografía | [docs/diseno/tipografia.md](docs/diseno/tipografia.md) |
| Espaciado, bordes y sombras | [docs/diseno/espaciado-bordes-sombras.md](docs/diseno/espaciado-bordes-sombras.md) |
| Rangos del perfil lipídico | [docs/dominio/rangos-perfil-lipidico.md](docs/dominio/rangos-perfil-lipidico.md) |
| Criterios de aceptación | [docs/criterios-de-aceptacion.md](docs/criterios-de-aceptacion.md) |
| Portal del paciente (consulta por documento) | [docs/portal-paciente.md](docs/portal-paciente.md) |
