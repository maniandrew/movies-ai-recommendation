import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import './assets/styles/global.css';


createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>,
)
