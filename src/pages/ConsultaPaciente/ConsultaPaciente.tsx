import { useState } from 'react';
import type { FormEvent, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { buscarPacientePorDocumento } from '../../data/pacientes';
import {
  MENSAJE_NO_ENCONTRADO,
  MENSAJE_SIN_DOCUMENTO,
  obtenerErrorDeEstado,
} from '../../utils/consulta';
import styles from './ConsultaPaciente.module.css';

export const ConsultaPaciente = (): ReactElement => {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const [documento, setDocumento] = useState<string>('');
  // Arranca con el error que haya enviado ResultadosPaciente al no encontrar el documento.
  const [error, setError] = useState<string | undefined>(() => obtenerErrorDeEstado(ubicacion.state));

  const actualizarDocumento = (valor: string): void => {
    setDocumento(valor);
    setError(undefined);
  };

  const enviar = (evento: FormEvent<HTMLFormElement>): void => {
    evento.preventDefault();
    const documentoLimpio = documento.trim();

    if (documentoLimpio === '') {
      setError(MENSAJE_SIN_DOCUMENTO);
      return;
    }
    if (!buscarPacientePorDocumento(documentoLimpio)) {
      setError(MENSAJE_NO_ENCONTRADO);
      return;
    }
    navigate(`/consulta/${encodeURIComponent(documentoLimpio)}`);
  };

  return (
    <>
      <div className={styles.textos}>
        <h1>Consulta tus resultados</h1>
        <p className={styles.subtitulo}>Ingresa tu documento de identidad para ver tus perfiles lipídicos</p>
      </div>

      <Card className={styles.tarjeta}>
        <form className={styles.formulario} onSubmit={enviar} noValidate>
          <Input
            etiqueta="Documento de identidad"
            placeholder="Ej: 1234567890"
            autoComplete="off"
            value={documento}
            error={error}
            onChange={(evento) => actualizarDocumento(evento.target.value)}
          />
          <Button type="submit">Consultar</Button>
        </form>
      </Card>
    </>
  );
};
