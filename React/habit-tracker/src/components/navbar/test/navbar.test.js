import React from 'react';
import renderer from 'react-test-renderer';
import Navbar from '../navbar.jsx';

describe('navbar', () => {
  it('render', () => {
    // 스냅샷 테스트를 실행
    const component = renderer.create(<Navbar totalCount={4} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
