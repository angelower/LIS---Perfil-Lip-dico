import { Fragment, useState } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { EncabezadoPagina } from '../../components/EncabezadoPagina/EncabezadoPagina';
import { IndicadorLipido } from '../../components/IndicadorLipido/IndicadorLipido';
import { Mensaje } from '../../components/Mensaje/Mensaje';
import { PacienteNoEncontrado } from '../../components/PacienteNoEncontrado/PacienteNoEncontrado';
import { usePacienteDeRuta } from '../../hooks/usePacienteDeRuta';
import { formatearFecha, nombreCompleto } from '../../utils/formato';
import { nombresLipidos, valoresLipidos } from '../../utils/perfilLipidico';
import styles from './EliminarPaciente.module.css';

export const EliminarPaciente = (): ReactElement => {
  const { id, paciente } = usePacienteDeRuta();
  const navigate = useNavigate();
  // Se guarda el id para no dar por eliminado a otro paciente si cambia la URL.
  const [idEliminado, setIdEliminado] = useState<string | null>(null);

  if (!paciente) return <PacienteNoEncontrado titulo="Eliminar paciente" id={id} />;

  const volverALista = (): void => navigate('/pacientes');

  if (idEliminado === paciente.id) {
    return (
      <>
        <EncabezadoPagina titulo="Eliminar paciente" />
        <Mensaje tipo="exito" titulo="Paciente eliminado" nota="Es una simulación: el paciente sigue en los datos.">
          {nombreCompleto(paciente)} fue eliminado correctamente.
        </Mensaje>
        <div className={styles.acciones}>
          <Button variante="secondary" onClick={volverALista}>
            Volver a la lista
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <EncabezadoPagina titulo="Eliminar paciente" descripcion="Revise los datos antes de confirmar." />

      <Card titulo="¿Desea eliminar este paciente?" className={styles.tarjeta}>
        <dl className={styles.detalle}>
          <dt>Paciente</dt>
          <dd>{nombreCompleto(paciente)}</dd>
          <dt>EPS</dt>
          <dd>{paciente.eps}</dd>
          <dt>Edad</dt>
          <dd>{paciente.edad} años</dd>
          <dt>Fecha de registro</dt>
          <dd>{formatearFecha(paciente.fechaRegistro)}</dd>
          {valoresLipidos.map((tipo) => (
            <Fragment key={tipo}>
              <dt>{nombresLipidos[tipo]} (mg/dL)</dt>
              <dd>
                <IndicadorLipido tipo={tipo} valor={paciente.perfilLipidico[tipo]} />
              </dd>
            </Fragment>
          ))}
        </dl>

        <p className={styles.advertencia}>Esta acción no se puede deshacer.</p>

        <div className={styles.acciones}>
          <Button variante="danger" onClick={() => setIdEliminado(paciente.id)}>
            Eliminar paciente
          </Button>
          <Button variante="secondary" onClick={volverALista}>
            Cancelar
          </Button>
        </div>
      </Card>
    </>
  );
};
