import {
    DELETE_FRIEND,
    ADD_FRIEND,
    FRIENDS_PAGE_VIEW,
} from '../constants'

/**
 * get friend delete event object!
 * @param {Number} friendId 
 */
export const friendDeleteEvent = friendId => ({
    type: DELETE_FRIEND,
    data: {
        friendId  
    }
});

/**
 * get add friend event object!
 * @param {Number} friendId 
 */
export const addFriendEvent = (name, gender) => ({
    type: ADD_FRIEND,
    data: {
        name,
        gender  
    }
});

/**
 * get friends page view event object!
 * @param {Number} friendId 
 */
export const friendsPageView = friendCount => ({
    type: FRIENDS_PAGE_VIEW,
    data: {
        pageName: 'Home',
        friendCount,
    }
})