import * as types from '../constants/ActionTypes';

/**
 * Page changed action
 * @param {Number} currentPage 
 * @returns {Object} action with type and current page index.
 */
export const pageChanged = (currentPage) => ({
    type: types.PAGE_CHANGED,
    currentPage
})
