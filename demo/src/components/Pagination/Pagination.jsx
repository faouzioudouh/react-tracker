// --- NPM ---
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import PaginationItem from '../PaginationItem/PaginationItem';

const Pagination = ({
    pagesCount,
    cssClass,
    currentPage,
    onPageChange,
    handlePreviousPage,
    handleNextPage
}) => {

    // Render nothing if the pagination is unnecessary.
    if (pagesCount < 2) {
        return null;
    }

    const containerClassName = classnames('Pagination__wrapper', cssClass);

    /**
     * Page Change Handler
     * @param {Number} index
     * @return {Function}
     */
    const onPageChangeHandler = index => event => {
        event.preventDefault();
        onPageChange(index);
    }

    /**
     * Render Pagination Items
     * @param {number} pagesCount 
     * @param {number} currentPage 
     * @returns {Array} of pagination items
     */
    const renderPaginationItems = (pagesCount, currentPage) => {
        const paginationItems = [];
        for (let i = 0; i < pagesCount; i++) {
            const pageItem = (
            <PaginationItem
                key={i}
                label={i + 1}
                onClickHandler={onPageChangeHandler(i)}
                isActive={currentPage === i} />);

            paginationItems.push(pageItem);
        }
        return paginationItems;
    }

    return (
        <div className={containerClassName}>
            <nav aria-label="navigation">
                <ul className="pagination">
                    <PaginationItem
                        onClickHandler={handlePreviousPage}
                        label="Previous"
                        isDisabled={currentPage === 0}/>

                    {renderPaginationItems(pagesCount, currentPage)}

                    <PaginationItem
                        onClickHandler={handleNextPage}
                        label="Next"
                        isDisabled={(currentPage + 1) === pagesCount}/>
                </ul>
            </nav>
        </div>
    );
};

Pagination.propTypes = {
    pagesCount: PropTypes.number,
    cssClass: PropTypes.string,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
    handlePreviousPage: PropTypes.func,
    handleNextPage: PropTypes.func
};

export default Pagination;
