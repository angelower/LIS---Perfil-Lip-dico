# Modelo de datos

Los tipos viven en [`src/types/index.ts`](../src/types/index.ts) y los datos en
[`src/data/`](../src/data/). No hay backend: la "persistencia" es simulada con datos quemados
(hardcoded) en memoria.

## Tipos

```ts
interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'laboratorista';
}

interface PerfilLipidico {
  colesterolTotal: number;  // mg/dL
  hdl: number;              // mg/dL
  ldl: number;              // mg/dL
  trigliceridos: number;    // mg/dL
}

interface PruebaLipidica {
  fecha: string;            // ISO 8601
  perfilLipidico: PerfilLipidico;
}

interface Paciente {
  id: string;
  documento: string;        // identificador de la consulta pública; único
  nombre: string;
  apellidos: string;
  eps: string;
  edad: number;
  perfilLipidico: PerfilLipidico;   // prueba MÁS RECIENTE
  fechaRegistro: string;            // ISO 8601; fecha de la prueba más reciente
  pruebasAnteriores?: PruebaLipidica[];
}
```

## Datos quemados

| Archivo | Contenido requerido |
|---|---|
| `src/data/usuarios.ts` | Un usuario admin simulado (ej.: "Dra. Ana Gómez") |
| `src/data/pacientes.ts` | Al menos 5 pacientes con perfiles lipídicos variados (algunos en rango normal, otros alterados) |

## Decisiones tomadas en la implementación

Estas decisiones **no** estaban en la especificación original; se aprobaron durante el desarrollo.

- **Usuarios adicionales:** además del admin hay 3 cuentas con rol `laboratorista`, para que la
  página de cuentas de usuario tenga contenido. El login simulado siempre entra como el admin.
- **Pacientes:** hay 5, cubriendo un perfil en rango, uno con un valor limítrofe, uno con todos
  los valores limítrofes, uno con triglicéridos fuera de rango y uno con todos fuera de rango.
  Los valores son coherentes con la fórmula de Friedewald (LDL ≈ CT − HDL − TG/5).
- **Tipos auxiliares:** `Credenciales`, `DatosFormularioPaciente` (valores del formulario como
  texto, antes de validar) y `NivelAlerta` (`'bajo' | 'medio' | 'alto'`).
- **Histórico de pruebas (portal del paciente):** un paciente puede tener varias pruebas en fechas
  distintas, como en la vida real. En vez de reemplazar `perfilLipidico` por un arreglo, se extendió
  el tipo: `perfilLipidico` y `fechaRegistro` son los de la prueba **más reciente** y las anteriores van
  en `pruebasAnteriores` (opcional). Así el panel administrativo no cambia: sigue mostrando un
  paciente con su última prueba. La lista completa se obtiene con `obtenerPruebas()`
  ([`src/utils/pruebas.ts`](../src/utils/pruebas.ts)).
  - *Costo:* hay dos formas de leer una prueba. Un modelo de `pruebas[]` único sería más limpio, pero
    obliga a cambiar 5 archivos del panel.
  - *Consecuencia:* para un paciente con histórico, la etiqueta "Fecha de registro" del panel significa
    "fecha de la prueba más reciente".
- **Documento:** `documento` es obligatorio y único por paciente; los valores son ficticios.
- **Juan Pérez** tiene 2 pruebas (18/09/2026 y 03/10/2026) para mostrar el histórico.
