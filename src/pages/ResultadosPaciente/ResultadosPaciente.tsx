import type { ReactElement } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { TarjetaPerfilLipidico } from '../../components/TarjetaPerfilLipidico/TarjetaPerfilLipidico';
import { buscarPacientePorDocumento } from '../../data/pacientes';
import { MENSAJE_NO_ENCONTRADO, crearEstadoError } from '../../utils/consulta';
import { nombreCompleto } from '../../utils/formato';
import { obtenerPruebas } from '../../utils/pruebas';
import styles from './ResultadosPaciente.module.css';

export const ResultadosPaciente = (): ReactElement => {
  const { documento = '' } = useParams<{ documento: string }>();
  const navigate = useNavigate();
  const paciente = buscarPacientePorDocumento(documento);

  if (!paciente) {
    return <Navigate to="/consulta" replace state={crearEstadoError(MENSAJE_NO_ENCONTRADO)} />;
  }

  const pruebas = obtenerPruebas(paciente);
  const hayHistorico = pruebas.length > 1;

  return (
    <>
      <div className={styles.textos}>
        <h1>Hola, {nombreCompleto(paciente)}</h1>
        <p className={styles.subtitulo}>Estos son tus resultados del perfil lipídico</p>
      </div>

      <Card titulo="Tus datos">
        <dl className={styles.datos}>
          <dt>Nombre completo</dt>
          <dd>{nombreCompleto(paciente)}</dd>
          <dt>EPS</dt>
          <dd>{paciente.eps}</dd>
          <dt>Edad</dt>
          <dd>{paciente.edad} años</dd>
          <dt>Documento</dt>
          <dd>{paciente.documento}</dd>
        </dl>
      </Card>

      <section className={styles.pruebas} aria-label="Perfiles lipídicos">
        {hayHistorico && <h2>Histórico de pruebas</h2>}
        {pruebas.map((prueba, indice) => (
          <TarjetaPerfilLipidico
            key={prueba.fecha}
            prueba={prueba}
            esMasReciente={hayHistorico && indice === 0}
          />
        ))}
      </section>

      <p className={styles.nota}>
        Estos resultados son orientativos. Consulta con tu médico para una interpretación completa.
      </p>

      <div>
        <Button variante="secondary" onClick={() => navigate('/consulta')}>
          Consultar otro documento
        </Button>
      </div>
    </>
  );
};
