import { useState } from 'react';
import type { FormEvent, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import { obtenerDestino } from '../../routes/redireccion';
import type { Credenciales } from '../../types';
import { tieneErrores, validarLogin } from '../../utils/validaciones';
import type { Errores } from '../../utils/validaciones';
import styles from './Login.module.css';

// Página sin navbar ni sidebar (está fuera de MainLayout).
export const Login = (): ReactElement => {
  const { usuario, login } = useAuth();
  const ubicacion = useLocation();
  const [credenciales, setCredenciales] = useState<Credenciales>({ email: '', contrasena: '' });
  const [errores, setErrores] = useState<Errores<Credenciales>>({});

  // Con sesión (recién iniciada o previa) se va a la página que se había pedido, o a Inicio.
  if (usuario) {
    return <Navigate to={obtenerDestino(ubicacion.state)} replace />;
  }

  const actualizarCampo = (campo: keyof Credenciales, valor: string): void => {
    setCredenciales((anteriores) => ({ ...anteriores, [campo]: valor }));
    setErrores((anteriores) => ({ ...anteriores, [campo]: undefined }));
  };

  const enviar = (evento: FormEvent<HTMLFormElement>): void => {
    evento.preventDefault();
    const nuevosErrores = validarLogin(credenciales);
    setErrores(nuevosErrores);
    if (tieneErrores(nuevosErrores)) return;

    login(credenciales);
  };

  return (
    <main className={styles.pagina}>
      <Card className={styles.tarjeta}>
        <div className={styles.marca}>
          <img src={logo} alt="LabClínico" />
        </div>

        <div className={styles.textos}>
          <h1>Iniciar sesión</h1>
          <p className={styles.ayuda}>
            Acceso simulado: cualquier email y contraseña inician sesión como administrador.
          </p>
        </div>

        <form className={styles.formulario} onSubmit={enviar} noValidate>
          <Input
            etiqueta="Email"
            type="email"
            autoComplete="username"
            value={credenciales.email}
            error={errores.email}
            onChange={(evento) => actualizarCampo('email', evento.target.value)}
          />
          <Input
            etiqueta="Contraseña"
            type="password"
            autoComplete="current-password"
            value={credenciales.contrasena}
            error={errores.contrasena}
            onChange={(evento) => actualizarCampo('contrasena', evento.target.value)}
          />
          <Button type="submit" className={styles.boton}>
            Ingresar
          </Button>
        </form>
      </Card>
    </main>
  );
};
