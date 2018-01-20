// --- styles ---
import './SelectBlock.css';

// --- NPM ---
import React from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

const SelectBlock = props => {
    const { cssClass, options } = props || {};

    // Render nothing if no option provided.. every select deserve options!
    if (isEmpty(options)) {
        return null;
    }

    const selectProps = omit(props, [
        'label',
        'required',
        'isFocus',
        'cssClass',
        'options'
    ]);


    const containerClassName = classnames('SelectBlock', cssClass);

    // For a11y!
    const mandatoryVisualToken = props.required ? <span aria-hidden="true"> *</span> : '';

    /**
     * Render select options
     * @param {Object} options 
     */
    const renderOptions = options =>
        options.map(({ text, ...rest }, index) => (
            <option {...rest} key={index}>{text}</option>
        ));

    return (
        <div className={containerClassName}>
            <label htmlFor={props.id} className="SelectBlock__label">
                {props.label}
                {mandatoryVisualToken}
            </label>
            <select
                {...selectProps}
                id={props.id}
                className="SelectBlock__select form-control"
                aria-required={props.required}
            >
                {renderOptions(options)}
            </select>
        </div>
    );
};

SelectBlock.propTypes = {
    required: PropTypes.bool,
    id: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    isFocus: PropTypes.bool,
    options: PropTypes.array,
};

export default SelectBlock;
