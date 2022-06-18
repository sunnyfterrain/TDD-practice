const add = require('../add.js'); // node에서는 import가 require

test('테스트이름', () => {
  // 테스트 코드 작성
  expect(add(3, 5)).toBe(8); // add 라는 함수에 3,5를 넣으면 정확하게 8이 나와야한다.
});
