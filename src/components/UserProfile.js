import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import Loader from 'react-loader-spinner';
import { fetchUserProfile } from '../actions/profile';
import avatar from '../assets/images/avatar.png';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';

function UserProfileWrapper(props) {
  const params = useParams();
  if (params.userId === props.auth.user._id) {
    return <Navigate to="/settings" />;
  }
  return <UserProfile {...props} params={params} />;
}

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
      inProgress: false,
    };
  }

  componentDidMount() {
    const { params } = this.props;
    if (params.userId) {
      //dispatch action to get user
      this.props.dispatch(fetchUserProfile(params.userId));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      params: { userId: prevUserId },
    } = prevProps;
    const {
      params: { userId: currUserId },
    } = this.props;

    if (prevUserId && currUserId && prevUserId !== currUserId) {
      this.props.dispatch(fetchUserProfile(currUserId));
    }
  }

  checkIfUserIsAFreind = () => {
    const userId = this.props.params.userId;
    const { friends } = this.props;

    const index = friends.friends
      .map((friend) => friend.to_user._id)
      .indexOf(userId); //getting array of index and then checking !
    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleAddFriendClick = async () => {
    this.setState({
      inProgress: true,
    });
    const userId = this.props.params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added friend successfully!',
        inProgress: false,
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        error: data.message,
        success: null,
        inProgress: false,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    this.setState({
      inProgress: true,
    });
    const userId = this.props.params.userId;
    const url = APIUrls.removeFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Removed friends successfully!',
        inProgress: false,
      });
      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
        inProgress: false,
      });
    }
  };

  render() {
    const { profile } = this.props;
    const { success, error, successMessage, inProgress } = this.state; //this inprogress in for add/remove friend
    const user = profile.user;

    const isUserAFriend = this.checkIfUserIsAFreind();
    return (
      <div className="settings">
        <div className="img-container">
          <img src={avatar} alt="user-dp" />
        </div>

        {profile.inProgress ? (
          <div style={{ margin: 'auto' }}>
            <Loader
              type="ThreeDots"
              color="#ef7917"
              timeout={3000} //2 secs
            />
          </div>
        ) : (
          <div>
            <div className="field">
              <div className="field-label">Name</div>
              <div className="field-value">{user.name}</div>
            </div>

            <div className="field">
              <div className="field-label">Email</div>
              <div className="field-value">{user.email}</div>
            </div>

            <div className="btn-grp">
              {isUserAFriend ? (
                <button
                  className="button save-btn"
                  onClick={this.handleRemoveFriendClick}
                  disabled={inProgress}
                >
                  {inProgress ? (
                    <span>Removing...</span>
                  ) : (
                    <span>Remove Friend</span>
                  )}
                </button>
              ) : (
                <button
                  className="button save-btn"
                  onClick={this.handleAddFriendClick}
                  disabled={inProgress}
                >
                  {inProgress ? (
                    <span>Adding...</span>
                  ) : (
                    <span>Add Friend</span>
                  )}
                </button>
              )}

              {success && (
                <div className="success-dailog alert">{successMessage}</div>
              )}
              {error && <div className="error-dailog alert">{error}</div>}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ profile, friends, auth }) {
  return {
    profile,
    friends,
    auth,
  };
}

export default connect(mapStateToProps)(UserProfileWrapper);
