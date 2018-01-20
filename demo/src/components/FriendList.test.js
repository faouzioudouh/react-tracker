import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import FriendList from './FriendList';
import FriendListItem from './FriendListItem';

const props = {
    friends: [{
      id: 1,
      name: 'Theodore Roosevelt',
      gender: 'male',
      starred: true
    },
    {
      id: 2,
      name: 'Abraham Lincoln',
      gender: 'male',
      starred: false
    },
    {
      id: 3,
      name: 'George Washington',
      gender: 'male',
      starred: false
    }
  ], 
    actions: {
        starFriend: jest.fn()
    }
};

describe('FriendList', () => {
  it('should render different elements of the component', () => {
    const component = shallow(<FriendList {...props} />);

    const friendListItems = component.find(FriendListItem);
    expect(friendListItems).to.be.present();
    expect(friendListItems).to.length(3);
  });

  it('should render FriendListItem with the right props', () => {
    const component = shallow(<FriendList {...props} />);

    const friendListItems = component.find(FriendListItem);
    expect(friendListItems.at(0)).to.be.present();
    expect(friendListItems.at(0).props().id).to.be.equal(1);
    expect(friendListItems.at(0).props().name).to.be.equal('Theodore Roosevelt');
    expect(friendListItems.at(0).props().gender).to.be.equal('male');
    expect(friendListItems.at(0).props().starred).to.be.equal(true);
  });

  it('should render no FriendListItem if no friends provided', () => {
      const propsWithNoFriends = Object.assign({}, props, {
          friends: []
      });

    const component = shallow(<FriendList {...propsWithNoFriends} />);

    const friendListItems = component.find(FriendListItem);
    expect(friendListItems).to.length(0);
  });
});

chai.use(chaiEnzyme());
