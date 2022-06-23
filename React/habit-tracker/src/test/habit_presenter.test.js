import HabitPresenter from '../habit_presenter';

describe('HabitPresenter Test', () => {
  const habits = [
    { id: 1, name: 'Reading', count: 1 },
    { id: 2, name: 'Running', count: 0 },
  ];
  let presenter;
  let update; // 목 함수로 대체
  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3);
    update = jest.fn();
  });

  it('habits 초기화', () => {
    expect(presenter.getHabits()).toEqual(habits); // habit과 getHabits의 결과가 같은지
  });

  it('habit count 증가하고 update 콜백 호출', () => {
    presenter.increment(habits[0], update); // 카운트 업!!
    expect(presenter.getHabits()[0].count).toBe(2); // 카운트 업한 값이 맞는지
    expect(update).toHaveBeenCalledTimes(1); // update가 최소 한번 호출됐는지
    expect(update).toHaveBeenCalledWith(presenter.getHabits()); // 업데이트한 habit의 배열이 잘 전달 되었는지
  });

  it('habit count 감소하고 update 콜백 호출', () => {
    presenter.decrement(habits[0], update); // 카운트 다운!!
    expect(presenter.getHabits()[0].count).toBe(0); // 카운트 다운한 값이 맞는지
    checkUpdateIsCalled();
  });

  it('count를 0이하로 만들지 않는다.', () => {
    presenter.decrement(habits[0], update);
    presenter.decrement(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(0);
  });

  it('habit 삭제', () => {
    presenter.delete(habits[0], update);
    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0].name).toBe('Running');
    checkUpdateIsCalled();
  });

  it('add habit', () => {
    presenter.add('Eating', update);
    expect(presenter.getHabits()[2].name).toBe('Eating');
    expect(presenter.getHabits()[2].count).toBe(0);
    // checkUpdateIsCalled();
  });

  it('reset habit', () => {
    presenter.reset(update);
    expect(presenter.getHabits()[0].count).toBe(0);
    expect(presenter.getHabits()[1].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('maxHabit 넘으면 에러 던짐', () => {
    presenter.add('Eating', update);
    expect(() => {
      presenter.add('Eating', update);
    }).toThrow('습관의 갯수는 3 이상이 될 수 없습니다.');
  });

  describe('reset', () => {
    it('reset habit count 0', () => {
      presenter.reset(update);
      expect(presenter.getHabits()[0].count).toBe(0);
      expect(presenter.getHabits()[1].count).toBe(0);
      checkUpdateIsCalled();
    });

    it('카운트가 0일땐 새로운 오브젝트를 만들지 않는다.', () => {
      // 불변성 테스트
      const habits = presenter.getHabits();
      presenter.reset(update);
      const updatedHabits = presenter.getHabits();
      expect(updatedHabits[1]).toEqual(habits[1]);
    });
  });

  function checkUpdateIsCalled() {
    // 중복 되는 함수가 있어 합침
    expect(update).toHaveBeenCalledTimes(1); // update가 최소 한번 호출됐는지
    expect(update).toHaveBeenCalledWith(presenter.getHabits()); // 업데이트한 habit의 배열이 잘 전달 되었는지
  }
});
