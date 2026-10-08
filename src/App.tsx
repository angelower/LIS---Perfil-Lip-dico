import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

// Los flags `future` activan desde ya el comportamiento de React Router v7
// y evitan sus advertencias en la consola.
const App = (): ReactElement => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
