import {
    DELETE_FRIEND,
} from '../constants'

export const friendDeleteEvent = friendId => ({
    type: DELETE_FRIEND,
    data: {
        friendId  
    }
});
