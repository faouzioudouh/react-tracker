import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

import FriendListItem from './FriendListItem';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const starFriendMocked = spy(jest.fn());
const deleteFriendMocked = spy(jest.fn());

const props = {
    id: 1,
    name: 'Theodore Roosevelt',
    gender: 'male',
    starred: true,
    starFriend: starFriendMocked,
    deleteFriend: deleteFriendMocked
};

describe('FriendListItem', () => {
  it('should render different elements of the component', () => {
    const component = shallow(<FriendListItem {...props} />);

    expect(component.find('.Friend__name')).to.be.present();
    expect(component.find('.Friend__gender')).to.be.present();
  });

  it('should call starFriend action when click on star button', () => {
    const component = shallow(<FriendListItem {...props} />);
    const starButton = component.find('button').at(0);

    starButton.simulate('click');

    expect(starFriendMocked).to.have.been.calledWith(1);
  });

  it('should call deleteFriend action when click on delete button', () => {
    const component = shallow(<FriendListItem {...props} />);
    const deleteButton = component.find('button').at(1);

    deleteButton.simulate('click');

    expect(deleteFriendMocked).to.have.been.calledWith(1);
  });
});
