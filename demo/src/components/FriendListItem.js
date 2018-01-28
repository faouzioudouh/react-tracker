import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// tracking
import { withTracking } from 'react-tracker'
import { friendDeleteEvent } from '../tracking/events/friendEvents';

import styles from './FriendListItem.css';

const FriendListItem = ({
  id,
  name,
  gender,
  starred,
  starFriend,
  deleteFriend,
  trackFriendDelete,
}) => {

    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div>
            <span className="Friend__name">
              {name}
            </span>
          </div>
          <div>
            <span className="Friend__gender">
              {gender}
            </span>
          </div>
          <div>
            <small>xx friends in common</small>
          </div>
        </div>
        <div className={styles.friendActions}>
          <button className={`btn btn-default ${styles.btnAction}`}
                  onClick={() => starFriend(id)}>
            <i className={classnames('fa', {
              'fa-star': starred,
              'fa-star-o': !starred
            })} />
          </button>
          <button className={`btn btn-default ${styles.btnAction}`}
                  onClick={() => {
                    // In additional to dispatch redux action to delete friend with given id
                    // And since we configured our middleware will also
                    // fire the event listener with eventType 'DELETE_FRIEND'
                    // Redux action object will be passed to the event listener as first argument
                    deleteFriend(id);

                    // track friend delete
                    trackFriendDelete(id);

                    // So this event will be tracked twice !!
                    } }>
            <i className="fa fa-trash" />
          </button>
        </div>
      </li>
    );

}

FriendListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  starred: PropTypes.bool,
  starFriend: PropTypes.func.isRequired
};

const mapTrackingToProps = trackEvent => ({
  trackFriendDelete: id => trackEvent(friendDeleteEvent(id))
});

const FriendListItemWithTracking = withTracking(mapTrackingToProps)(FriendListItem)

export default FriendListItemWithTracking;
