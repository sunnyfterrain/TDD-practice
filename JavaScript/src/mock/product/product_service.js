const productClient = require('./test/stub_product_client.js');
class ProductService {
  constructor(productClient) {
    this.productClient = productClient; // stub으로 만든 것을 주입하기 위하여
  }

  fetchAvailableItems() {
    return this.productClient.fetchItems().then((items) => items.filter((item) => item.available));
  }
}

module.exports = ProductService;
