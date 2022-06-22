const ProductService = require('../product_service.js');
const StubProductClient = require('./stub_product_client.js');

describe('ProductService - Stub', () => {
  let productService;

  beforeEach(() => {
    productService = new ProductService(new StubProductClient());
  });

  it('사용가능한 아이템을 리턴', async () => {
    // productService 안에 있는 함수호출
    const items = await productService.fetchAvailableItems();
    expect(items).toEqual([{ item: 'milk', available: true }]);
    expect(items.length).toBe(1);
  });
});
