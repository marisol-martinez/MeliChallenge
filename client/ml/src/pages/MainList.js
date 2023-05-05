import React, {useEffect, useState  }  from 'react'
import Header from  '../components/Header';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { useNavigate, useLocation } from "react-router-dom";

function MainList() {

  //datos búsqueda
  let location = useLocation();
  let datos = location.state;


  return (
    <>
      <Header/>
      <div className='contenedorPrincipal'>
        <Breadcrumb categories={datos.categorias}/>
        <div className='contenedorLista'>
        {(typeof datos.items === 'undefined' ) ? (
          <p>Loading..</p>
          ) : (
            datos.items.map((p, i) => (
              i < 4 && (
                <>
                  <ProductCard key={i} product={p}></ProductCard>
                </>
              )
          ))
          )}
        </div>
      </div>
    </>
  )
}

export default MainList