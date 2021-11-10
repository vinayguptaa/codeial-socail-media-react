import React, { Component } from 'react';
import { useParams } from 'react-router';

function UserProfileWrapper(props) {
  const params = useParams();
  return <UserProfile {...props} params={params} />;
}

class UserProfile extends Component {
  componentDidMount() {
    const {params} = this.props;
    if(params.userId) {
      //dispatch action to get user
    }
  }

  render() {
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://cdn-icons.flaticon.com/png/512/706/premium/706807.png?token=exp=1636447935~hmac=f3a998164afe30339ad2ff1615bdf0d9"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">John Doe</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">example@example.com</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

export default UserProfileWrapper;
