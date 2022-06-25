import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app';
import HabitPresenter from '../habit_presenter';

describe('App', () => {
  let presenter;
  beforeEach(() => {
    presenter = new HabitPresenter([
      { id: 1, name: 'Reading', count: 0 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 1 },
    ]);
  });

  it('renders', () => {
    const component = renderer.create(<App presenter={presenter} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Component', () => {
    beforeEach(() => {
      render(<App presenter={presenter} />);
    });

    it('counts only active habits', () => {
      const button = screen.getAllByTitle('increase')[0];
      userEvent.click(button);
      const count = screen.getByTestId('total-count');
      expect(count.innerHTML).toBe('2');
    });

    it('adds new habit', () => {
      const newHabit = 'New Habit';
      const input = screen.getByPlaceholderText('Habit');
      const button = screen.getByText('Add');
      userEvent.type(input, newHabit);
      userEvent.click(button);
      const addedName = screen.getAllByTestId('habit-name')[3];
      expect(addedName.innerHTML).toBe(newHabit);
      const addedCount = screen.getAllByTestId('habit-count')[3];
      expect(addedCount.innerHTML).toBe('0');
    });

    it('deletes an item', () => {
      const first = screen.getAllByTitle('delete')[0];
      userEvent.click(first);
      const next = screen.getAllByTestId('habit-name')[0];
      expect(next.innerHTML).not.toBe('Reading');
    });

    it('increases the counter', () => {
      const button = screen.getAllByTitle('increase')[0];
      userEvent.click(button);
      const count = screen.getAllByTestId('habit-count')[0];
      expect(count.innerHTML).toBe('1');
    });

    it('decreases the counter', () => {
      const button = screen.getAllByTitle('decrease')[2];
      userEvent.click(button);
      const count = screen.getAllByTestId('habit-count')[2];
      expect(count.innerHTML).toBe('0');
    });

    it('resets all counters', () => {
      const button = screen.getByText('Reset All');
      userEvent.click(button);
      screen.getAllByTestId('habit-count').forEach((count) => {
        expect(count.innerHTML).toBe('0');
      });
    });
  });
});
