import * as types from '../constants/ActionTypes';

export function addFriend(name, gender) {
  return {
    type: types.ADD_FRIEND,
    name,
    gender
  };
}

export function deleteFriend(id) {
  return {
    type: types.DELETE_FRIEND,
    id
  };
}

export function starFriend(id) {
  return {
    type: types.STAR_FRIEND,
    id
  };
}
