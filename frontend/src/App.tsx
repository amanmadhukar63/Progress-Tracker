import './App.css';
import './styles/global.scss';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';

function App() {

  return (
    <>
      <Toaster richColors />
      <AppRoutes />
    </>
  )
}

export default App
