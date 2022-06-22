class Stack {
  // constructor() {
  //   this.array = [];
  // }

  // 내부의 값이 바뀌면 어떻게 되는지?
  constructor() {
    this._size = 0;
    this.head = null;
  }

  size() {
    // return this.array.length;
    return this._size;
  }

  push(item) {
    // this.array.push(item);
    const node = { item: item, next: this.head };
    this.head = node;
    this._size++;
  }

  pop() {
    // if (this.array.length === 0) {
    //   throw new Error('스택이 비어있습니다.');
    // }
    // return this.array.pop();

    if (this.head === null) {
      throw new Error('스택이 비어있습니다.');
    }
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.item;
  }

  peek() {
    // if (this.array.length === 0) {
    //   throw new Error('스택이 비어있습니다.');
    // }
    // return this.array[this.size() - 1];
    if (this.head === null) {
      throw new Error('스택이 비어있습니다.');
    }
    return this.head.item;
  }
}

module.exports = Stack;
