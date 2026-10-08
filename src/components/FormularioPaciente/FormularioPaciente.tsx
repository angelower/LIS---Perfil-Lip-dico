import { useState } from 'react';
import type { FormEvent, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DatosFormularioPaciente, Paciente } from '../../types';
import { nombresLipidos, valoresLipidos } from '../../utils/perfilLipidico';
import { tieneErrores, validarPaciente } from '../../utils/validaciones';
import type { Errores } from '../../utils/validaciones';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import styles from './FormularioPaciente.module.css';

interface FormularioPacienteProps {
  paciente?: Paciente;
  textoBoton: string;
  onGuardar: (datos: DatosFormularioPaciente) => void;
}

interface CampoFormulario {
  nombre: keyof DatosFormularioPaciente;
  etiqueta: string;
  tipo: 'text' | 'number';
}

const camposDatos: CampoFormulario[] = [
  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'text' },
  { nombre: 'apellidos', etiqueta: 'Apellidos', tipo: 'text' },
  { nombre: 'eps', etiqueta: 'EPS', tipo: 'text' },
  { nombre: 'edad', etiqueta: 'Edad (años)', tipo: 'number' },
];

const camposPerfil: CampoFormulario[] = valoresLipidos.map((tipo) => ({
  nombre: tipo,
  etiqueta: `${nombresLipidos[tipo]} (mg/dL)`,
  tipo: 'number',
}));

const formularioVacio: DatosFormularioPaciente = {
  nombre: '',
  apellidos: '',
  eps: '',
  edad: '',
  colesterolTotal: '',
  hdl: '',
  ldl: '',
  trigliceridos: '',
};

const aDatosFormulario = (paciente: Paciente): DatosFormularioPaciente => ({
  nombre: paciente.nombre,
  apellidos: paciente.apellidos,
  eps: paciente.eps,
  edad: String(paciente.edad),
  colesterolTotal: String(paciente.perfilLipidico.colesterolTotal),
  hdl: String(paciente.perfilLipidico.hdl),
  ldl: String(paciente.perfilLipidico.ldl),
  trigliceridos: String(paciente.perfilLipidico.trigliceridos),
});

// Formulario compartido por Crear y Editar: con `paciente` arranca precargado.
export const FormularioPaciente = ({ paciente, textoBoton, onGuardar }: FormularioPacienteProps): ReactElement => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState<DatosFormularioPaciente>(() =>
    paciente ? aDatosFormulario(paciente) : formularioVacio,
  );
  const [errores, setErrores] = useState<Errores<DatosFormularioPaciente>>({});

  const actualizarCampo = (campo: keyof DatosFormularioPaciente, valor: string): void => {
    setDatos((anteriores) => ({ ...anteriores, [campo]: valor }));
    setErrores((anteriores) => ({ ...anteriores, [campo]: undefined }));
  };

  const enviar = (evento: FormEvent<HTMLFormElement>): void => {
    evento.preventDefault();
    const nuevosErrores = validarPaciente(datos);
    setErrores(nuevosErrores);

    if (tieneErrores(nuevosErrores)) {
      const primerCampoInvalido = camposDatos
        .concat(camposPerfil)
        .find((campo) => nuevosErrores[campo.nombre]);
      const elemento = primerCampoInvalido && evento.currentTarget.elements.namedItem(primerCampoInvalido.nombre);
      if (elemento instanceof HTMLInputElement) elemento.focus();
      return;
    }

    onGuardar(datos);
  };

  const renderCampo = (campo: CampoFormulario): ReactElement => (
    <Input
      key={campo.nombre}
      etiqueta={campo.etiqueta}
      name={campo.nombre}
      type={campo.tipo}
      inputMode={campo.tipo === 'number' ? 'decimal' : undefined}
      value={datos[campo.nombre]}
      error={errores[campo.nombre]}
      onChange={(evento) => actualizarCampo(campo.nombre, evento.target.value)}
    />
  );

  return (
    <form className={styles.formulario} onSubmit={enviar} noValidate>
      <fieldset className={styles.grupo}>
        <legend className={styles.leyenda}>Datos del paciente</legend>
        <div className={styles.campos}>{camposDatos.map(renderCampo)}</div>
      </fieldset>

      <fieldset className={styles.grupo}>
        <legend className={styles.leyenda}>Perfil lipídico básico</legend>
        <div className={styles.campos}>{camposPerfil.map(renderCampo)}</div>
      </fieldset>

      <div className={styles.acciones}>
        <Button type="submit">{textoBoton}</Button>
        <Button variante="secondary" onClick={() => navigate('/pacientes')}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
