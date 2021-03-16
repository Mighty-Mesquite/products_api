
module.exports = {
  getProducts: (request, response) => {
    console.log('Im in getProducts');
    response.send('Done')
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
    response.send('Done')
  }
}