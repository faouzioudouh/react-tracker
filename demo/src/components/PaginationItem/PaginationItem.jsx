// --- NPM ---
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const PaginationItem = ({
    isActive,
    isDisabled,
    label,
    onClickHandler
}) => {

    const itemClassName = classnames('page-item', {
        'active': isActive,
        'disabled': isDisabled
    });

    return (
        <li
            className={itemClassName}>
            <a
                onClick={onClickHandler}
                className="page-link"
                href="#">{label}
            </a>
        </li>
    );
};

PaginationItem.propTypes = {
    isActive: PropTypes.bool,
    index: PropTypes.number,
    onClickHandler: PropTypes.func,
};

export default PaginationItem;
