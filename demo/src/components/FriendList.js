import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

// tracking
import { withTracking } from 'react-tracker';
import { friendsPageView } from '../tracking/events/friendEvents';

class FriendList extends Component {

  componentDidMount() {
    this.props.trackFriendPageView(this.props.friends.length);
  }

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

const mapTrackingToProps = trackEvent => ({
  trackFriendPageView: friendsCount => trackEvent(friendsPageView(friendsCount))
});

const FriendListWithTracking = withTracking(mapTrackingToProps)(FriendList)

export default FriendListWithTracking;
