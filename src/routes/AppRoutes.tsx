import type { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { PatientLayout } from '../layouts/PatientLayout';
import { ConsultaPaciente } from '../pages/ConsultaPaciente/ConsultaPaciente';
import { CrearPaciente } from '../pages/CrearPaciente/CrearPaciente';
import { EditarPaciente } from '../pages/EditarPaciente/EditarPaciente';
import { EliminarPaciente } from '../pages/EliminarPaciente/EliminarPaciente';
import { Inicio } from '../pages/Inicio/Inicio';
import { ListaPacientes } from '../pages/ListaPacientes/ListaPacientes';
import { Login } from '../pages/Login/Login';
import { ResultadosPaciente } from '../pages/ResultadosPaciente/ResultadosPaciente';
import { Usuarios } from '../pages/Usuarios/Usuarios';
import { ProtectedRoute } from './ProtectedRoute';

// Mapa de rutas: docs/rutas.md.
export const AppRoutes = (): ReactElement => (
  <Routes>
    {/* Pública: sin navbar ni sidebar. */}
    <Route path="/login" element={<Login />} />

    {/* Portal del paciente: público, con su propio layout (sin MainLayout ni AuthContext). */}
    <Route element={<PatientLayout />}>
      <Route path="/consulta" element={<ConsultaPaciente />} />
      <Route path="/consulta/:documento" element={<ResultadosPaciente />} />
    </Route>

    {/* Protegidas: exigen sesión y comparten MainLayout (navbar + sidebar). */}
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/pacientes" element={<ListaPacientes />} />
        <Route path="/pacientes/crear" element={<CrearPaciente />} />
        <Route path="/pacientes/editar/:id" element={<EditarPaciente />} />
        <Route path="/pacientes/eliminar/:id" element={<EliminarPaciente />} />
      </Route>
    </Route>

    {/* Cualquier otra ruta va a Inicio (y de ahí a /login si no hay sesión). */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
