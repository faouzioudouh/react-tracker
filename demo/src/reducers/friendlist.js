import * as types from '../constants/ActionTypes';

const initialState = {
  friendsById: [{
      id: 1,
      name: 'Theodore Roosevelt',
      gender: 'male',
      starred: true
    },
    {
      id: 2,
      name: 'Abraham Lincoln',
      gender: 'male',
      starred: false
    },
    {
      id: 3,
      name: 'George Washington',
      gender: 'male',
      starred: false
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      return {
        ...state,
        friendsById: [
          {
            name: action.name,
            gender: action.gender,
            starred: !!action.starred,
             // Provide ID for the new friend!
            id: state.friendsById.length + 1
          },
          ...state.friendsById
        ],
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter(({id}) => id !== action.id)
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find(({id}) => id === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };

    default:
      return state;
  }
}