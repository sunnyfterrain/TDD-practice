import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Habits from '../habits';

describe('Habits 컴포넌트', () => {
  const habits = [
    { name: 'Reading', count: 1, id: 1 },
    { name: 'Eating', count: 2, id: 2 },
  ];
  let HabitsComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;
  let onAdd;
  let onReset;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    onAdd = jest.fn();
    onReset = jest.fn();
    HabitsComponent = (
      <Habits
        habits={habits}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
        onAdd={onAdd}
        onReset={onReset}
      />
    );
  });

  it('render', () => {
    const component = renderer.create(HabitsComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('버튼 클릭', () => {
    beforeEach(() => {
      render(HabitsComponent);
    });

    it('증가버튼', () => {
      const input = screen.getByPlaceholderText('Habit');
      const button = screen.getByText('Add');
      const newHabit = 'New Habit';
      userEvent.type(input, newHabit);
      userEvent.click(button);
      expect(onAdd).toHaveBeenCalledWith(newHabit);
    });

    it('증가버튼', () => {
      const button = screen.getAllByTitle('increase')[0];
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habits[0]);
    });

    it('감소버튼', () => {
      const button = screen.getAllByTitle('decrease')[0];
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habits[0]);
    });

    it('삭제버튼', () => {
      const button = screen.getAllByTitle('delete')[0];
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habits[0]);
    });

    it('리셋버튼', () => {
      const button = screen.getAllByText('Reset All')[0];
      userEvent.click(button);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });
});
