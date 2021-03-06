import React from 'react';
import {shallow, mount} from 'enzyme';

import JoinGame from '../../src/routes/join-game.jsx';
import TextBox from '../../src/components/text-box.jsx';
import Button from '../../src/components/shared/button.jsx';

const mockJoinFn = jest.fn();

jest.mock('../../src/lib/game-manager', () => {
  return class GameManager {
    static joinGame(id) {
      mockJoinFn(id);
    }
  };
});

describe('<JoinGame />', () => {
  let joinGame = null;

  beforeAll(() => {
    joinGame = shallow(<JoinGame/>);
  });

  test('renders a <TextBox />', () => {
    const textBoxes = [...joinGame.find(TextBox)];

    expect(textBoxes).toHaveLength(1);
  });

  test('renders a "Join" <Button/>', () => {
    const buttons = [...joinGame.find(Button)];

    expect(buttons).toHaveLength(1);

    const button = buttons[0];

    const {props} = button;

    expect(props.children).toEqual('Join Game');
    expect(props.onClick).toEqual(expect.any(Function));
  });

  test('"Join Game" button fires GameManager.joinGame', () => {
    joinGame.find(Button).simulate('click');

    expect(mockJoinFn).toHaveBeenCalled();
  });

  test('"Join Game" fires GameManager.joinGame with ID from <TextBox/>', () => {
    const mountedGame = mount(<JoinGame/>);

    const button = mountedGame.find(Button);
    const textBox = mountedGame.find(TextBox);

    const id = 'ABCDE';
    textBox.simulate('change', {target: {value: id}});

    button.simulate('click');

    expect(mockJoinFn).toHaveBeenCalledWith(id);
  });
});
