import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser, clearAuthState, updateError } from '../actions/auth';
import avatar from '../assets/images/avatar.png'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      password: '',
      confirmPassword: '',
      editMode: false,
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleChange = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };

  handleSave = () => {
    const { password, name, confirmPassword } = this.state;
    const { user } = this.props.auth;

    if (name === user.name && password === '') {
      this.props.dispatch(updateError(`Nothing Edited !`));
      return;
    }

    this.props.dispatch(editUser(name, password, confirmPassword, user._id));
  };

  render() {
    const { user, error } = this.props.auth;
    const { editMode } = this.state;
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src={avatar}
            alt="user-dp"
          />
        </div>

        {error && <div className="alert error-dailog">{error}</div>}
        {error === false && (
          <div className="alert success-dailog">
            Successfully updated profile !
          </div>
        )}

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('name', e.target.value)}
              value={this.state.name}
            />
          ) : (
            <div className="field-value">{user.name}</div>
          )}
        </div>

        {editMode && (
          <div className="field">
            <div className="field-label">New password</div>

            <input
              type="password"
              onChange={(e) => this.handleChange('password', e.target.value)}
              value={this.state.password}
            />
          </div>
        )}

        {editMode && (
          <div className="field">
            <div className="field-label">Confirm password</div>

            <input
              type="password"
              onChange={(e) =>
                this.handleChange('confirmPassword', e.target.value)
              }
              value={this.state.confirmPassword}
            />
          </div>
        )}

        <div className="btn-grp">
          {editMode ? (
            <button className="button save-btn" onClick={this.handleSave}>
              Save
            </button>
          ) : (
            <button
              className="button edit-btn"
              onClick={() => this.handleChange('editMode', true)}
            >
              Edit profile
            </button>
          )}

          {editMode && (
            <div
              className="go-back"
              onClick={() => this.handleChange('editMode', false)}
            >
              Go back
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}
export default connect(mapStateToProps)(Settings);
