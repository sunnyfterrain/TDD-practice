// 네트워크를 사용하지 않고 진짜 같은 mock을 만듦

class StubProductClient {
  async fetchItems() {
    return [
      { item: 'milk', available: true },
      { item: '우유', available: false },
    ];
  }
}

module.exports = StubProductClient;
