import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import Pagination from './Pagination';
import PaginationItem from '../PaginationItem/PaginationItem';

const props = {
    pagesCount: 8,
    cssClass: 'hello',
    currentPage: 1,
    onPageChange: jest.fn(),
    handlePreviousPage: jest.fn(),
    handleNextPage: jest.fn()
};

describe('Pagination', () => {
  it('should render different element of the component', () => {
    const component = shallow(<Pagination {...props} />);

    // Nav
    const Nav = component.find('nav');
    expect(Nav).to.be.present();
    expect(Nav.prop('aria-label')).to.equal('navigation');

    // Page Items
    const paginationWrapper = component.find('.pagination');
    expect(paginationWrapper).to.be.present();  
    expect(paginationWrapper.find(PaginationItem)).to.have.length(10);
  });

  it('should render nothing if pagesCount less than 2', () => {
    const propsWithInvalidPagesCount = Object.assign({}, props, {pagesCount: 1})
    const component = shallow(<Pagination {...propsWithInvalidPagesCount} />);

    expect(component.find('Pagination__wrapper')).to.not.be.present(); ;
  });
});

chai.use(chaiEnzyme());