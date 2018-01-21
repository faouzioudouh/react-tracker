import {
    DELETE_FRIEND,
    ADD_FRIEND,
    FRIENDS_PAGE_VIEW,
} from '../constants';

/**
 * Listener on delete friend event
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onFriendDelete = (event = {}, eventsHistory) => {
    // For example let's push the recieved event to our Datalyer!
    window.dataLayer.push({
        ...event.data
    })

    // In order to save this event ins the histry (so we can log it) we should return it!
    // otherwise it will be ignored!
    return event;
}
onFriendDelete.eventType = DELETE_FRIEND;

/**
 * Listener on add friend event
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onAddFriend = (event = {}, eventsHistory) => {
    // For example let's push the recieved event to our Datalyer!
    window.dataLayer.push({
        ...event.data
    })
    
    // In order to save this event ins the histry (so we can log it) we should return it!
    // otherwise it will be ignored!
    return event;
}
onAddFriend.eventType = ADD_FRIEND;

/**
 * Listener on friends page view
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onFriendsPageView = (event = {}, eventsHistory) => {
    // For example let's push the recieved event to our Datalyer!
    window.dataLayer.push({
        ...event.data
    })
    
    // In order to save this event ins the histry (so we can log it) we should return it!
    // otherwise it will be ignored!
    return event;
}
onFriendsPageView.eventType = FRIENDS_PAGE_VIEW;
