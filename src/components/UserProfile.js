import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Loader from 'react-loader-spinner';
import { fetchUserProfile } from '../actions/profile';
import avatar from '../assets/images/avatar.png';

function UserProfileWrapper(props) {
  const params = useParams();
  return <UserProfile {...props} params={params} />;
}

class UserProfile extends Component {
  componentDidMount() {
    const { params } = this.props;
    if (params.userId) {
      //dispatch action to get user
      this.props.dispatch(fetchUserProfile(params.userId));
    }
  }

  render() {
    const { profile } = this.props;
    const user = profile.user;

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
              timeout={3000} //3 secs
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
              <button className="button save-btn">Add Friend</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  return {
    profile,
  };
}

export default connect(mapStateToProps)(UserProfileWrapper);
