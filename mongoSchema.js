
  let productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String,
    features: [{
      feature: String,
      value: String
    }]
  })

  let Product = mongoose.model('Product', productSchema);

  let styleSchema = new mongoose.Schema({
    product_id: String,
    results: [{
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String,
      'default?': Boolean,
      photos: [{
        thumbnail_url: String,
        url: String
      }]
      skus: [{
        skus_id: String,
        quantity: Number,
        size: String
      }]
    }]
  })

  let Style = mongoose.model('Style', styleSchema);

  let relatedSchema = new mongoose.Schema([
    Number
  ])

  let Related = mongoose.model('Related', relatedSchema);

  module.exports = {
    Product, Style, Related
  }