import {
    DELETE_FRIEND,
} from '../constants';

/**
 * 
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onFriendDelete = (event = {}, eventsHistory) => {
    console.log(event);
}
onFriendDelete.eventType = DELETE_FRIEND;
