import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

class FriendList extends Component {

  render () {
    return (
      <div className="FriendList__wrapper">
        <ul className={styles.friendList}>
          {
            this.props.friends.map(({id, name, gender, starred}, index) => {
              return (
                <FriendListItem
                  key={id}
                  id={id}
                  name={name}
                  gender={gender}
                  starred={starred}
                  {...this.props.actions} />
              );
            })
          }
        </ul>
      </div>
    );
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
