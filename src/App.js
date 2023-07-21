import { Outlet } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import AnimatedBg from './components/AnimatedBg'

/* ------------- All child component of App are Shown in Outlet ------------- */
function App() {
  return (
    <>
      <Header/>
      <Outlet/>
      <AnimatedBg/>
      <ToastContainer/>
    </>
  )
}

export default App
