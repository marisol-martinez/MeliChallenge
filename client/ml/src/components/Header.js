import React from 'react'
import MLlogo from '../assets/Logo_ML.png'
import Search from './Search'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='cabezal'>
      <div className='contenedorPrincipal flex'>
        <Link to="/">
            <img src={MLlogo} alt='logo' className='logoCabezal'/>
        </Link>
        <Search/>
      </div>
    </header>
  )
}

export default Header