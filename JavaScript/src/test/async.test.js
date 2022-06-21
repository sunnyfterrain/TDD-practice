const fetchProduct = require('../async');

describe('Async', () => {
  it('async - done', (done) => {
    fetchProduct().then((item) => {
      expect(item).toEqual({ item: 'Milk', price: 200 }); // 아이템은 이 오브젝트와 동일한지
      done();
    });
  });

  it('async - return', () => {
    return fetchProduct().then((item) => {
      expect(item).toEqual({ item: 'Milk', price: 200 });
    });
  });

  it('async - await', async () => {
    const product = await fetchProduct();
    expect(product).toEqual({ item: 'Milk', price: 200 });
  });

  it('async - resolves', async () => {
    return expect(fetchProduct()).resolves.toEqual({ item: 'Milk', price: 200 });
  });

  it('async - reject', () => {
    return expect(fetchProduct('error')).rejects.toBe('network error');
  });
});
// 비동기는 끝나는 시점을 따로 명시해 주어야한다.
