import React from 'react';
import { mount, shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

import PaginationContainer from './PaginationContainer';
import Pagination from './Pagination';
import wrapWithStore from '../../../specs/helpers/mountWithStore'
import configureStore from '../../store/configureStore';
import { pageChanged } from '../../actions/PaginationActions';


chai.use(chaiEnzyme());
chai.use(sinonChai);

const props = {
  totalItems: 20,
  pageSize: 5,
};

const mockedPreventDefault = spy(jest.fn());

const event = {
  preventDefault: mockedPreventDefault
}

describe('PaginationContainer', () => {
  // Configure the store with initial state
  const store = configureStore({
    pagination: {
      currentPage: 2
    }
  });

  const Wrapper = wrapWithStore(store)(PaginationContainer);

  const Component = mount(<Wrapper {...props} />);
  const PaginationComponent = Component.find(Pagination);
  
  it('should propagate the right props', () => {
    expect(PaginationComponent).to.be.present();
    expect(PaginationComponent.props().pagesCount).to.equal(4);
    expect(PaginationComponent.props().currentPage).to.equal(2);
  });

  it('should got to page 4', () => {
    PaginationComponent.props().onPageChange(4);
    expect(PaginationComponent.props().currentPage).to.equal(4);
  });

  it('should do nothing if try to go to unvalid pageIndex', () => {
    PaginationComponent.props().onPageChange(30);
    // Stay in the same page
    expect(PaginationComponent.props().currentPage).to.equal(4);
  });
  
  it('should got to previous page', () => {
    // We are in the page 4
    expect(PaginationComponent.props().currentPage).to.equal(4);
    PaginationComponent.props().handlePreviousPage(event);
    // Making sure the preventDefault have been called
    expect(mockedPreventDefault).to.have.been.called;

    // We are in the page 3    
    expect(PaginationComponent.props().currentPage).to.equal(3);

    PaginationComponent.props().handlePreviousPage(event);
    // We are in the page 2    
    expect(PaginationComponent.props().currentPage).to.equal(2);    
  });

  it('should got to next page', () => {
    // We are in the page 2
    expect(PaginationComponent.props().currentPage).to.equal(2);
    PaginationComponent.props().handleNextPage(event);
    // Making sure the preventDefault have been called
    expect(mockedPreventDefault).to.have.been.called;
    // We are in the page 3
    expect(PaginationComponent.props().currentPage).to.equal(3);
  });

  it('should change the page after dispatching the action of pageChanged', () => {
    store.dispatch(pageChanged(1));
    expect(PaginationComponent.props().currentPage).to.equal(1);
  });
});
