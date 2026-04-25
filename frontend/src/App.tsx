import './App.css';
import './styles/global.scss';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  )
}

export default App
