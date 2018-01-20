import { PAGE_CHANGED } from '../constants/ActionTypes';
import { getUrlParam, setUrlParam } from '../libs/location';

const initialState = {
    currentPage: (parseInt(getUrlParam('page'), 10) - 1) || 0
};

const pagination = (state = initialState, action) => {
    switch (action.type) {
        case PAGE_CHANGED:
            setUrlParam('page', action.currentPage + 1);
            return Object.assign({}, {
                currentPage: action.currentPage
            });

        default:
            return state;
    }
}

export default pagination;
