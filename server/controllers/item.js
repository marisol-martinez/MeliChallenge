const { response, request } = require('express');
const axios = require('axios');
require('dotenv').config();

const getItemById = async(req = request, res = response) => {
    const idItem = req.params.id;
    if(idItem == null){
      return res.status(400);
    }else{
      try {
        const item = await axios.get(process.env.API_URL+'/items/'+idItem);
        const description = await axios.get(process.env.API_URL+'/items/'+idItem+'/description');

        const priceArray = item.data.price.toString().split('.');
        const priceDecimal = priceArray.length > 1 ? priceArray[1] : 0;

        const resp = {
          author: {
            name: 'Marisol',
            lastname: 'Martínez'
          },
          item: {
            id: item.data.id,
            title: item.data.title,
            price: {
              currency: item.data.currency_id,
              amount: Math.trunc(item.data.price),
              decimals: Number(priceDecimal)
            },
            picture: item.data.pictures[0],
            condition: item.data.condition,
            free_shipping: item.data.shipping.free_shipping,
            sold_quantity: item.data.sold_quantity,
            description: description.data.plain_text,
            //debo agregar para luego poder buscar categorías propias
            category: item.data.category_id
          }
        }
        return res.status(200)
        .json(resp);
      } catch(error){
        return res.status(500)
      } 
    }  
}

const getItems = async(req, res = response) => {
  const queryItems = req.query.q;
  if(queryItems == null){
    return res.status(400);
  }else{
    try{
      const items = await axios.get(process.env.API_URL+'/sites/MLA/search?q='+queryItems);

      const listItems = [];
      const cat = [];

      for (let index = 0; index < items.data.results.length; index++) {
        const element = items.data.results[index];

        const priceArray = element.price.toString().split('.');
        const priceDecimal = priceArray.length > 1 ? priceArray[1] : 0;

        const ObjItem = {
          id: element.id,
          title: element.title,
          price: {
            currency: element.currency_id,
            amount: Math.trunc(element.price),
            decimals: Number(priceDecimal)
          },
          picture: element.thumbnail,
          condition: element.condition,
          free_shipping: element.shipping.free_shipping,
          //debo agregar para mostrar lugar de venta como lo pide la imagen de referencia
          address: element.address.state_name
        }
        listItems.push(ObjItem);
      }

      for (let index = 0; index < items.data.available_filters.length; index++) {
        if(items.data.available_filters[index].id === "category"){
          const element = items.data.available_filters[index];
          for (let index = 0; index < element.values.length; index++) {
            const categoria = element.values[index];
            cat.push(categoria);
          }
        }
        
      }

      const objRes = {
          author: {
          name: 'Marisol',
          lastname: 'Martínez',
          },
          categories: cat,
          items: listItems,
      }

      return res.status(200)
      .json(objRes);
    } catch(error){
      return res.status(500)
      }
  }
}

module.exports = {
  getItemById,
  getItems
}