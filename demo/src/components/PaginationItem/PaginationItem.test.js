import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

import PaginationItem from './PaginationItem';

const onClickHandlerMocked = spy(jest.fn());

const props = {
    label: 1,
    onClickHandler: onClickHandlerMocked
};

describe('PaginationItem', () => {
  it('should render different element of the component', () => {
    const component = shallow(<PaginationItem {...props} />);

    const li = component.find('.page-item');
    expect(li).to.be.present();

    const pageLink = component.find('.page-link');
    expect(pageLink).to.be.present();
  });

  it('should render the item with class active', () => {
    const propsWithActiveState = Object.assign({}, props, {
        isActive: true
    });

    const component = shallow(<PaginationItem {...propsWithActiveState} />);

    const li = component.find('.page-item');
    expect(li.props().className).to.contain('active');
  });

  it('should render the item with class disabled', () => {
    const propsWithDisabledState = Object.assign({}, props, {
        isDisabled: true
    });

    const component = shallow(<PaginationItem {...propsWithDisabledState} />);

    const li = component.find('.page-item');
    expect(li.props().className).to.contain('disabled');
  });

  it('should call onClickHandler when click the link', () => {
    const component = shallow(<PaginationItem {...props} />);

    component.find('.page-link').simulate('click');
    expect(onClickHandlerMocked).to.have.been.called;
  });
});

chai.use(chaiEnzyme());
chai.use(sinonChai);
