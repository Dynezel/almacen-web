import React from 'react'
import { Link } from 'react-router-dom'
import '../css/navbar.css'

export default function Navbar() {
  return (
    <nav className='items-navbar'>
      <div className='links'>
        <Link to ="/" >
            Volver a inicio
        </Link>
        <Link to ="/registro">
            Registrar producto
        </Link>
        </div>
    </nav>
  )
}
