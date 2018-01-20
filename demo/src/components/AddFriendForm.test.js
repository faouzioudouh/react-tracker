import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

import AddFriendForm from './AddFriendForm';
import SelectBlock from './SelectBlock';
import wrapWithStore from '../../specs/helpers/mountWithStore'
import configureStore from '../store/configureStore';
import { addFriend } from '../actions/friendsActions';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const addFriendMocked = spy(jest.fn());
const props = {
    addFriend: addFriendMocked,
    name: 'Faouzi',
    gender: 'male'
};

describe('AddFriendForm', () => {
  it('should render different elements of the component', () => {
    const component = shallow(<AddFriendForm {...props} />);

    expect(component.find(SelectBlock)).to.be.present();
    expect(component.find('input')).to.be.present();
    expect(component.find('input').props().value).to.be.equal('Faouzi');
    expect(component.find('button')).to.be.present();
  });

  it('should call change the state name when the input value changed', () => {
    const component = mount(<AddFriendForm {...props} />);
    const nameInput = component.find('input');

    const newValue = 'Heaven';
    nameInput.simulate('change', {
        target: {
            value: newValue
        }
    });

    expect(component.state().name).to.equal(newValue);
  });

  it('should call addFriend with correct props when the button clicked', () => {
    const component = mount(<AddFriendForm {...props} />);
    const button = component.find('button');

    button.simulate('click');

    expect(addFriendMocked).to.have.been.calledWith(props.name, props.gender);

    expect(component.state().name).to.equal('');
    expect(component.state().gender).to.equal('');
  });


  it('should add friend to the state of the store', () => {
    // Configure the store with initial state
    const store = configureStore({
        friendlist: {
            friendsById: []
        }
    });

    const propsWithAddFriendAction = Object.assign({}, props, {
        // Mock add friend action
        addFriend: (name, gender) => store.dispatch(addFriend(name, gender))
    })

    const Wrapper = wrapWithStore(store)(AddFriendForm);

    const Component = mount(<Wrapper {...propsWithAddFriendAction} />);
    Component.props().addFriend('friend', 'female');

    expect(store.getState().friendlist.friendsById).to.length(1);

    expect(store.getState().friendlist.friendsById).to.deep.equal([{
        id: 1,
        starred: false,
        name: 'friend',
        gender: 'female'
    }]);
  });
});
