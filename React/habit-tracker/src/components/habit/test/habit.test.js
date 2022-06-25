import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Habit from '../habit';

describe('habit component', () => {
  const habit = { name: 'Habit', count: 4 };
  let habitComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    habitComponent = (
      <Habit
        habit={habit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />
    );
  });

  // it('render', () => {
  //   // 스냅샷 테스트를 실행
  //   const component = renderer.create(habitComponent);
  //   expect(component.toJSON()).toMatchSnapshot();
  // });

  describe('버튼 클릭', () => {
    beforeEach(() => {
      render(habitComponent);
    });

    it('증가버튼 클릭', () => {
      const button = screen.getByTitle('increase');
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habit);
    });

    it('감소버튼 클릭', () => {
      const button = screen.getByTitle('decrease');
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habit);
    });

    it('삭제버튼 클릭', () => {
      const button = screen.getByTitle('delete');
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habit);
    });
  });
});
