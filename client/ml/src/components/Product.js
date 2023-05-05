import React, {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import Breadcrumb from './Breadcrumb';

function Product() {
  const location = useLocation();
  const product = location.state;

  const [categoriesList, setCategoriesList] = useState([]);
  
  const getCategories = () => {
    fetch("https://api.mercadolibre.com/categories/"+product.category ).then(
      response => response.json()
    ).then(
      data => {
        setCategoriesList(data.path_from_root);
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }

  useEffect(() => {
    //me llega el id de la cateoría del producto seleccionado pero necesito la info de la misma, 
    //para eso llamo a un servicio extra de la api de ML que me devuelve la info de una categoría
    //dado un id
    getCategories();
  }, [])


  return (
    <>
      <div className='contenedorPrincipal'>
        <Breadcrumb categories={categoriesList}/>
        <div className='contenedorDetalle'>
          <div className='sectionImage'>
            <img src={product.picture.secure_url} alt='image' className='imgDetalle'/>
            <div>
              <p  className='font28'>Descripción del producto</p>
              {product.description != "" ?
                <p className='font16'>{product.description}</p> : <p className='font16'>Este producto no tiene una descripción</p>
              }
            </div>
          </div>
          <div className='sectionPrice'>
            <p className='font14'>
              {product.condition == 'new' ? <span>Nuevo -</span> : <span>Usado -</span>}
              {product.sold_quantity} vendidos
            </p>
            <p className='font24 bold'>{product.title}</p>
            <p>
              <span className='font46'>
                {product.price.currency} {product.price.amount} 
              </span>
              <span className='font24 absolute'>
                {product.price.decimals == 0 ? '00' : product.price.decimals}
              </span>
            </p>
            <button className='btn'>Comprar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product