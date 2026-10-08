import { useState } from 'react';
import type { ReactElement } from 'react';
import { Card } from '../../components/Card/Card';
import { EncabezadoPagina } from '../../components/EncabezadoPagina/EncabezadoPagina';
import { FormularioPaciente } from '../../components/FormularioPaciente/FormularioPaciente';
import { Mensaje } from '../../components/Mensaje/Mensaje';
import { PacienteNoEncontrado } from '../../components/PacienteNoEncontrado/PacienteNoEncontrado';
import { usePacienteDeRuta } from '../../hooks/usePacienteDeRuta';
import type { DatosFormularioPaciente } from '../../types';
import { formatearFecha, nombreCompleto } from '../../utils/formato';
import styles from './EditarPaciente.module.css';

interface Actualizacion {
  idPaciente: string;
  nombre: string;
}

export const EditarPaciente = (): ReactElement => {
  const { id, paciente } = usePacienteDeRuta();
  // Se guarda el id para no mostrar el mensaje de otro paciente si cambia la URL.
  const [actualizacion, setActualizacion] = useState<Actualizacion | null>(null);

  if (!paciente) return <PacienteNoEncontrado titulo="Editar paciente" id={id} />;

  const guardar = (datos: DatosFormularioPaciente): void => {
    setActualizacion({ idPaciente: paciente.id, nombre: nombreCompleto(datos) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <EncabezadoPagina
        titulo="Editar paciente"
        descripcion={`${nombreCompleto(paciente)} · registrado el ${formatearFecha(paciente.fechaRegistro)}`}
      />

      {actualizacion?.idPaciente === paciente.id && (
        <Mensaje tipo="exito" titulo="Paciente actualizado" nota="Es una simulación: los cambios no se guardan.">
          Los datos de {actualizacion.nombre} se actualizaron correctamente.
        </Mensaje>
      )}

      <Card className={styles.tarjeta}>
        <FormularioPaciente
          key={paciente.id}
          paciente={paciente}
          textoBoton="Actualizar paciente"
          onGuardar={guardar}
        />
      </Card>
    </>
  );
};
