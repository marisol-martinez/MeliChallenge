import React from 'react'
import shipping from '../assets/ic_shipping.png'
import { useNavigate } from "react-router-dom";

function ProductCard({product}) {
  let navigate = useNavigate();

  const verdetalleProducto = () => {
    fetch("/api/items/"+product.id).then(
      response => response.json()
    ).then(
      data => {
        navigate("/items/"+data.item.id, {
          state: data.item
        });
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  };

  return (
        <section className='contenedorCard' 
          onClick={() => {
            verdetalleProducto();
        }}>
          <div className='flex'>
            {product.picture != null ? 
            <img src={product.picture} alt='image' className='imgListado'/>             
              : ''}
            <div>
                <p className='font24'>
                  <span>
                    {product.price.currency} {product.price.amount} 
                  </span>
                  <span className='decimals font14'>{product.price.decimals == 0 ? '' : product.price.decimals}</span>
                  {product.free_shipping == true ? 
                  <img src={shipping} alt='image' className='iconShipping'/> : <></>}
                </p>
                <p className='font18'>{product.title}</p>
                <p className='font18'>{product.description}</p>
            </div>
          </div>
          <div>
              <p className='font12'>{product.address}</p>
          </div>
        </section>
  )
}

export default ProductCard