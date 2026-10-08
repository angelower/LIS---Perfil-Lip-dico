import { useParams } from 'react-router-dom';
import { buscarPacientePorId } from '../data/pacientes';
import type { Paciente } from '../types';

interface PacienteDeRuta {
  id: string | undefined;
  paciente: Paciente | undefined;
}

// Lee el :id de rutas como /pacientes/editar/:id y busca ese paciente.
export const usePacienteDeRuta = (): PacienteDeRuta => {
  const { id } = useParams<{ id: string }>();
  return { id, paciente: id ? buscarPacientePorId(id) : undefined };
};
