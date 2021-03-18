const db = require('../db/connection.js');

module.exports = {
  getProducts: (request, response) => {
    // check to see if there is a specific count and page on the request
    if (Object.keys(request.query).length > 0) {
      if (request.query.page && request.query.count) {
        console.log('There is a specified page AND count')
      } else if (request.query.count) {
        console.log('There is a specific count')
      } else if (request.query.page) {
        console.log('There is a specified page')
      }
    } else {
      // default
      // db.query(`SELECT * FROM products LIMIT 5`, (error, data) => {
      //   if (error) {
      //     console.log('ERROR', error);
      //     response.send(error);
      //   } else {
      //     response.status(200).send(data)
      //   }
      // })

      // test area
      db.query(`SELECT * FROM products WHERE product_id<15`, (error, data) => {
        if (error) {
          console.log('ERROR', error);
          response.send(error);
        } else {
          response.status(200).send(data)
        }
      })
    }
  },
  getOneProduct: (request, response) => {
    console.log('Im in getOneProduct')
    response.send('Done')
  },
  getProductStyles: (request, response) => {
    console.log('getting styles')
    response.send('Done')
  },
  getRelatedProducts: (request, response) => {
    console.log('getting related products')
    const { product_id } = request.params;
    db.query(`SELECT * FROM related WHERE current_product_id=${product_id}`, (error, data) => {
      if (error) {
        console.log('ERROR fetching related products', error);
        response.send(error);
      } else {
        // check data structure
        const related = [];
        data.forEach((item) => {
          console.log(item.related_product_id);
          // console.log(item[related_product_id])
          related.push(item.related_product_id);
        })
        response.status(200).send(related)
      }
    })
  }
}