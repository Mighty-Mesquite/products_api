const db = require('../db/connection.js');

module.exports = {
  getProducts: (request, response) => {
    // check to see if there is a specific count and page on the request
    if (Object.keys(request.query).length > 0) {
      if (request.query.page && request.query.count) {
        console.log('There is a specified page AND count')
      } else if (request.query.count) {
        console.log('There is a specific count')
        db.query(`SELECT * FROM products LIMIT ${request.query.count}`, (error, data) => {
          if (error) {
            console.log('ERROR', error);
            response.send(error);
          } else {
            response.status(200).send(data)
          }
        })
      } else if (request.query.page) {
        console.log('There is a specified page')
      }
    } else {
      // default
      db.query(`SELECT * FROM products LIMIT 5`, (error, data) => {
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
    db.query(`SELECT * FROM products WHERE product_id=${request.params.product_id}`, (error, productData) => {
      if (error) {
        console.log('ERROR', error);
        response.send(error);
      } else {
        db.query(`SELECT * FROM features WHERE product_id=${request.params.product_id}`, (error, featureData) => {
          if (error) {
            console.log(error)
          } else {
            delete productData[0].product_id;
            productData[0].id = request.params.product_id;
            productData[0].features = [];
            featureData.forEach((feature) => {

            })

          }
        })
        response.status(200)
      }
    })
  },
  getProductStyles: (request, response) => {
    console.log('getting styles')
    const product_id = request.params.product_id;
    const result = {
      "product_id": request.params.product_id,
      results: [],
    }
    return new Promise(function(resolve, reject) {
      db.query(`SELECT * FROM skus WHERE style_id IN (SELECT style_id FROM styles WHERE product_id=${product_id})`, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
      .then((data) => {
        const styleIDs = new Set();

        data.forEach((item) => {
          styleIDs.add(item.style_id);
        })
        // console.log(styleIDs);
        styleIDs.forEach((ID) => {
          const styleObject = {
            "style_id": ID,
            "name": '',
            "original_price": '',
            "sale-price": '',
            "default?": '',
            "photos": [],
            "skus": {}
          }
          for (var i = 0; i < data.length; i++) {
            if (data[i].style_id === ID) {
              styleObject.skus[data[i].sku_id] = {
                "size": data[i].size,
                "quantity": data[i].quantity
              }
            }
          }
          result.results.push(styleObject);

        })
        return new Promise(function(resolve, reject) {
          db.query(`SELECT * FROM photos WHERE style_id IN (SELECT style_id FROM styles WHERE product_id=${product_id})`, (error, data) => {
            if (error) {
              reject(error)
            } else {
              resolve(data)
            }
          })
        })
          .then ((photoData) => {
            styleIDs.forEach((ID) => {
              const photosArray = [];
              for (var i = 0; i < photoData.length; i++) {
                if (photoData[i].style_id === ID) {
                  const urlObj = {
                    "thumbnail_url": photoData[i].thumbnail_url,
                    "url": photoData[i].url
                  }
                  photosArray.push(urlObj)
                }

              }
              result.results.forEach((style) => {
                if (style.style_id === ID) {
                  style.photos = photosArray;
                }
              })
            })
            // console.log(styleIDs)

            return new Promise(function(resolve, reject) {
              db.query(`select * from styles where product_id=${product_id}`, (error, data) => {
                if (error) {
                  reject(error)
                } else {
                  resolve(data)
                  // console.log(data);
                }
              })
            })
              .then((styleData) => {
                styleData.forEach((style) => {
                  const stylesArray = result.results;
                  for (var i = 0; i < stylesArray.length; i++) {
                    if (stylesArray[i].style_id === style.style_id) {
                      stylesArray[i].name = style.name;
                      stylesArray[i].original_price = style.original_price;
                      stylesArray[i]["sale-price"] = style.sale_price;
                      if (style.default_style === 0) {
                        stylesArray[i]["default?"] = false;
                      } else {
                        stylesArray[i]["default?"] = true;
                      }
                    }
                  }
                })
                response.status(200).send(result);
              })
              .catch((error) => {
                console.log('ERROR', error)
              })
          })
      })
      .catch((error) => {
        console.log(error)
        response.status(404).send(error);
      })
  },
  getRelatedProducts: (request, response) => {
    console.log('getting related products')
    const { product_id } = request.params;
    db.query(`SELECT * FROM related WHERE current_product_id=${product_id}`, (error, data) => {
      if (error) {
        console.log('ERROR fetching related products', error);
        response.send(error);
      } else {
        const related = [];
        data.forEach((item) => {
          related.push(item.related_product_id);
        })
        response.status(200).send(related)
      }
    })
  }
}
