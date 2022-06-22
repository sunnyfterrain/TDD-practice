const check = require('../check');

describe('check', () => {
  let onSuccess;
  let onFail;

  beforeEach(() => {
    onSuccess = jest.fn(); // mock 함수
    onFail = jest.fn();
  });

  // 성공일때
  it('should call onSuccess when predicate is true', () => {
    check(() => true, onSuccess, onFail); // 트루를 리턴하는 함수
    expect(onSuccess.mock.calls.length).toBe(1); // onSuccess라는 함수에는 mock이라는 데이터에 호출의 길이가 1번은 호출 되어야 한다.
    expect(onSuccess).toHaveBeenCalledTimes(1); // 몇번 호출 되어야 하는지 간단한 API

    expect(onSuccess.mock.calls[0][0]).toBe('yes'); // 첫번째로 호출된 함수에 첫번째 인자는 yes여야한다.
    expect(onSuccess).toHaveBeenCalledWith('yes'); // 이 인자와 같이 호출되어야 한다 API

    expect(onFail.mock.calls.length).toBe(0); // fail은 한번이라도 호출 되면 안된다.
    expect(onFail).toHaveBeenCalledTimes(0);
  });

  // 실패일때
  it('should call onFail when predicate is true', () => {
    check(() => false, onSuccess, onFail); // false를 리턴하는 함수
    expect(onFail.mock.calls.length).toBe(1); // onSuccess라는 함수에는 mock이라는 데이터에 호출의 길이가 1번은 호출 되어야 한다.
    expect(onFail).toHaveBeenCalledTimes(1); // 몇번 호출 되어야 하는지 간단한 API

    expect(onFail.mock.calls[0][0]).toBe('no'); // 첫번째로 호출된 함수에 첫번째 인자는 no여야한다.
    expect(onFail).toHaveBeenCalledWith('no'); // 이 인자와 같이 호출되어야 한다 API

    expect(onSuccess.mock.calls.length).toBe(0); // onSuccess는 한번이라도 호출 되면 안된다.
    expect(onSuccess).toHaveBeenCalledTimes(0);
  });
});
