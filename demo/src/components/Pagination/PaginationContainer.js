import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Pagination from './Pagination';
import { pageChanged } from '../../actions/PaginationActions';

const calculatePagesCount = (totalItems, pageSize) => {
    return Math.ceil(totalItems /  pageSize);
};

class PaginationContainer extends Component {
  constructor (props) {
    super(props);

    this.onPageChange = this.onPageChange.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);

    this.state = {
      pageCount: calculatePagesCount(this.props.totalItems, this.props.pageSize)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pageCount: calculatePagesCount(nextProps.totalItems, nextProps.pageSize)});
  }

  render () {
    return (
      <Pagination
        pagesCount={this.state.pageCount}
        currentPage={this.props.currentPage}
        onPageChange={this.onPageChange}
        handleNextPage={this.handleNextPage}
        handlePreviousPage={this.handlePreviousPage}
      />
    );
  }

  /**
   * On page change handler
   * @param {Number} pageIndex 
   */
  onPageChange(pageIndex) {
    if (pageIndex >= 0 && this.state.pageCount >= pageIndex) {
      this.props.pageChanged(pageIndex);
    }
  }

  /**
   * Previous page handler
   * @param {Event} e 
   */
  handlePreviousPage(e) {
    e.preventDefault();
    if (this.props.currentPage > 0) {
        this.onPageChange(this.props.currentPage - 1);
    }
  }

  /**
   * Next page handler
   * @param {Event} e 
   */
  handleNextPage(e) {
    e.preventDefault();
    if (this.props.currentPage >= 0 && this.props.currentPage < (this.state.pageCount - 1)) {
      this.onPageChange(this.props.currentPage + 1);
    }
  }
}

PaginationContainer.propTypes = {
    totalItems: PropTypes.number,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    handlePageChange: PropTypes.func
};

const mapStateToProps = ({pagination}) => ({
    currentPage: pagination.currentPage
});

export default connect(mapStateToProps, {
  pageChanged
})(PaginationContainer)
