import { useState } from 'react';
import type { ReactElement } from 'react';
import { Card } from '../../components/Card/Card';
import { EncabezadoPagina } from '../../components/EncabezadoPagina/EncabezadoPagina';
import { FormularioPaciente } from '../../components/FormularioPaciente/FormularioPaciente';
import { Mensaje } from '../../components/Mensaje/Mensaje';
import type { DatosFormularioPaciente } from '../../types';
import { nombreCompleto } from '../../utils/formato';
import styles from './CrearPaciente.module.css';

export const CrearPaciente = (): ReactElement => {
  const [ultimoRegistrado, setUltimoRegistrado] = useState<string | null>(null);
  const [envios, setEnvios] = useState<number>(0);

  // Simulación: no se guarda nada. Cambiar la key del formulario lo vuelve a montar vacío.
  const guardar = (datos: DatosFormularioPaciente): void => {
    setUltimoRegistrado(nombreCompleto(datos));
    setEnvios((total) => total + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <EncabezadoPagina
        titulo="Crear paciente"
        descripcion="Registre los datos del paciente y los resultados de su perfil lipídico básico."
      />

      {ultimoRegistrado && (
        <Mensaje tipo="exito" titulo="Paciente registrado" nota="Es una simulación: los datos no se guardan.">
          {ultimoRegistrado} se registró correctamente.
        </Mensaje>
      )}

      <Card className={styles.tarjeta}>
        <FormularioPaciente key={envios} textoBoton="Guardar paciente" onGuardar={guardar} />
      </Card>
    </>
  );
};
