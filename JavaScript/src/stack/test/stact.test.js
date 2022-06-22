const Stack = require('../stack');

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('빈것으로 만들어져야 합니다.', () => {
    expect(stack.size()).toBe(0);
  });

  it('푸쉬하는것을 허용합니다.', () => {
    stack.push('바나나');
    expect(stack.size()).toBe(1);
  });

  describe('pop', () => {
    it('만약 스택이 비어있다면?', () => {
      expect(() => {
        stack.pop(); // 스택이 비었는데 pop을하면 에러가 나는구나
      }).toThrow('스택이 비어있습니다.');
    });

    it('마지막 푸쉬된 것을 리턴하고 하나를 제거', () => {
      stack.push('바나나');
      stack.push('사과');
      expect(stack.pop()).toBe('사과');
      expect(stack.size()).toBe(1);
    });
  });

  describe('peek', () => {
    it('만약 스택이 비어있다면?', () => {
      expect(() => {
        stack.peek();
      }).toThrow('스택이 비어있습니다.');
    });

    it('peek은 마지막 아이템을 리턴하지만 아이템을 유지합니다. ', () => {
      stack.push('바나나');
      stack.push('사과');

      expect(stack.peek()).toBe('사과');
      expect(stack.size()).toBe(2);
    });
  });
});
