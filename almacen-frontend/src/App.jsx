import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Productos from './Componentes/Productos'
import RegistrarProductos from './Componentes/RegistrarProductos'
import Navbar from './Componentes/Navbar'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Productos/>}/>
        <Route path="/registro" element={ <RegistrarProductos/> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
