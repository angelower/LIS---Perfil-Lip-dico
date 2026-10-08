# Sistema de Laboratorio Clínico — Perfil Lipídico (caso 3)

Mockup en React + Vite + TypeScript para gestionar pacientes con perfil lipídico básico. Sin
backend ni persistencia: los datos están quemados en memoria.

## Ejecutar

```bash
npm install
npm run dev     # servidor de desarrollo en http://localhost:5173
npm run lint    # revisa las reglas de código
npm run build   # verificación de tipos + build de producción
```

Entra en `/login` con cualquier email válido y contraseña: inicia sesión como administrador.

La sesión vive en memoria: al recargar la página o escribir una URL en la barra del navegador se
pierde y hay que volver a iniciar sesión. Para recorrer la aplicación, usa el sidebar y los botones.

## Documentación

- [AGENT.md](AGENT.md): reglas del proyecto (stack, prohibiciones, estilo de código).
- [docs/](docs/README.md): arquitectura, layout, rutas, modelo de datos, sistema de diseño y
  rangos del perfil lipídico.
