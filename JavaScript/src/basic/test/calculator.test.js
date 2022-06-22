const Calculator = require('../calculator.js'); // node에서는 import가 require

describe('Calculator', () => {
  // 관련된것을 그룹으로 묶음
  let cal;
  beforeEach(() => {
    cal = new Calculator();
  });
  it('init with 0', () => {
    expect(cal.value).toBe(0);
  }); //it은 caculator 임

  it('set test', () => {
    cal.set(9);
    expect(cal.value).toBe(9);
  });

  it('clear', () => {
    cal.set(9);
    cal.clear();
    expect(cal.value).toBe(0);
  });

  it('add', () => {
    cal.set(2);
    cal.add(2);
    expect(cal.value).toBe(4);
  });

  it('addError', () => {
    expect(() => {
      cal.add(101);
    }).toThrow('100을 넘을 수 없습니다.');
  });

  it('substract', () => {
    cal.set(5);
    cal.subtract(3);
    expect(cal.value).toBe(2);
  });

  it('multiply', () => {
    cal.set(5);
    cal.multiply(2);
    expect(cal.value).toBe(10);
  });

  describe('divides', () => {
    it('0/0 === NaN', () => {
      cal.divide(0);
      expect(cal.value).toBe(NaN);
    });

    it('1/0 === infinity', () => {
      cal.set(1);
      cal.divide(0);
      expect(cal.value).toBe(Infinity);
    });

    it('4/4===1', () => {
      cal.set(4);
      cal.divide(4);
      expect(cal.value).toBe(1);
    });
  });
});

// 코드의 중복을 피하려면 beforeEach 테스트 전에 수행됨
// afterEach는 테스트 이후에 수행
// beforeAll() 모든 테스트가 수행 전 한번
// afterAll() 모든 테스트가 수행 후 한번
