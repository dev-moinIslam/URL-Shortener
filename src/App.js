import { Outlet } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import './App.css'
import Header from './components/Header'


/* ------------- All child component of App are Shown in Outlet ------------- */
function App() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Toaster />
    </>
  )
}

export default App
