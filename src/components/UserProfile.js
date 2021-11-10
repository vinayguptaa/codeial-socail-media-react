import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Loader from 'react-loader-spinner';
import { fetchUserProfile } from '../actions/profile';

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
          <img
            src="https://cdn-icons.flaticon.com/png/512/706/premium/706807.png?token=exp=1636447935~hmac=f3a998164afe30339ad2ff1615bdf0d9"
            alt="user-dp"
          />
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
