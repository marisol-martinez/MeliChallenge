import React, {useState} from 'react'
import iconoBuscador from '../assets/ic_Search.png'
import { useNavigate } from "react-router-dom";

function Search() {
    let navigate = useNavigate();

    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const buscarProducto = () => {
        fetch("/api/items?q="+searchInput).then(
            response => response.json()
          ).then(
            data => {
                if(data.items.length < 1){
                    //si no hay resultados, hay dos opciones, 
                    //primero evalúo si es que es un id de producto, 
                    //sino es que no hay resultados a la búsqueda
                    fetch("/api/items/"+searchInput).then(
                        response => response.json()
                      ).then(
                        data2 => {
                          navigate("/detalle", {
                            state: data2.item
                          });
                        }
                      ).catch(
                        error => {
                            console.log(error);
                            navigate("/", {})
                        }
                      )
                }else{
                    //llamo a este servicio porque en la api no tenía esta información de las categorías y su ruteo.
                    fetch("https://api.mercadolibre.com/categories/"+data.categories[0].id ).then(
                    response2 => response2.json()
                    ).then(
                    data2 => {
                        data.categorias = data2.path_from_root;
                        navigate({pathname:"/items",search: '?search='+searchInput}, {
                            state: data
                            });
                    }
                    ).catch(
                        error => {
                            console.log(error);
                            navigate("/", {})
                        }
                    )
                }
            }
          )
    }

    const keyPress = (e) => {
        //keyCode 13 es Enter
        if (e.keyCode === 13) {
          buscarProducto();
        }
      }

    return (
        <>
            <input type="text" className='inputBuscador'
                placeholder="Nunca dejes de buscar"
                onChange={handleChange}
                onKeyDown={keyPress}
                value={searchInput} />

            <button type='submit' className='btnBuscador'
            onClick={buscarProducto}>
                <img src={iconoBuscador} alt="buscar"/>
            </button>
        </>
    )
}

export default Search