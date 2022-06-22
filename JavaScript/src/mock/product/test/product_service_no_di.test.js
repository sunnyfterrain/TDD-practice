const ProductService = require('../product_service_no_di.js');
const ProductClient = require('../product_client.js');
jest.mock('../product_client.js'); // product_client에 의존하지 않게 Mock 하면 됨
// available을 테스트 하는건데 fetchItems 까지 의존하지 않기 위함

describe('productService', () => {
  // mock 함수와 연결하기 위함 대체해서 사용. mock을 너무 남용
  const fetchItems = jest.fn(async () => [
    { item: 'milk', available: true },
    { item: '우유', available: false },
  ]);

  // 의존성을 받지 않게 연결 위의것과
  ProductClient.mockImplementation(() => {
    return {
      fetchItems: fetchItems,
    };
  });

  let productService;

  beforeEach(() => {
    productService = new ProductService();
    //jets.config에서 clearMocks 가 false 라면
    //fetchitems.mockClear();
    //ProductClient.mockClear();
  });

  it('사용가능한 아이템을 리턴', async () => {
    // productService 안에 있는 함수호출
    const items = await productService.fetchAvailableItems();
    expect(items).toEqual([{ item: 'milk', available: true }]);
    expect(items.length).toBe(1);
  });

  it('test', async () => {
    const items = await productService.fetchAvailableItems();
    expect(fetchItems).toHaveBeenCalledTimes(1);
  });
});
