import './App.css';
import './styles/global.scss';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {

  return (
    <>
      <Toaster richColors />
      <AppRoutes />
    </>
  )
}

export default App
