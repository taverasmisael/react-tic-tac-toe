import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme'

import GameBoard from '../../components/GameBoard'

const emptyProps = {board: ['', '', '', '', '', '', '', '', ''], winner: []}

describe("GameBoard Component", () => {
  describe("Renderization", () => {
    test("render without crashing", () => {
      const div = document.createElement('div');
      ReactDOM.render(<GameBoard { ...emptyProps } />, div);
    });

    test('renders 9 squares', () => {
      const wrapper = shallow(<GameBoard { ...emptyProps } />)
      expect(wrapper.find('.GameBoard__square').length).toBe(9)
    })
    test('renders 1 square', () => {
      const wrapper = shallow(<GameBoard board={['']} winner={[]} />)
      expect(wrapper.find('.GameBoard__square').length).toBe(1)
    })
  });
});
