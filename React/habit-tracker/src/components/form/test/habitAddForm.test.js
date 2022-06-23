import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitAddForm from '../habitAddForm';

describe('HabitAddForm', () => {
  let onAdd;
  let input;
  let button;
  beforeEach(() => {
    onAdd = jest.fn();
    render(<HabitAddForm onAdd={onAdd} />); // 컴포넌트 렌더링
    input = screen.getByPlaceholderText('Habit'); // placeholder가 habit이라고 되어있는 인풋
    button = screen.getByText('Add'); //  text가 add 인 버튼
  });

  it('버튼 클릭했을때 onAdd 호출하기 유효한 값이 입력되고 버튼클릭했을때', () => {
    // input에다가 원하는 습권의 이름을 타이핑 한 다음에
    // add라는 버튼을 클릭하면
    // onAdd가 input에 입력된 이름과 함께 호출되어야 함
    userEvent.type(input, 'New Habit'); // 사용자가 마우스로 클릭한 효과
    userEvent.click(button);

    expect(onAdd).toHaveBeenCalledWith('New Habit'); // 이것과 함께 출력되어야한다.
  });

  it('버튼은 클릭했는데 name에 아무것도 없을때', () => {
    userEvent.type(input, ''); // 사용자가 마우스로 클릭한 효과
    userEvent.click(button);
    expect(onAdd).toHaveBeenCalledTimes(0); // 몇번 출력되어야 한다.
  });
});
