import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { searchUsers } from '../actions/search';
import avatar from '../assets/images/avatar.png';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    const searchText = e.target.value;
    this.props.dispatch(searchUsers(searchText));
  };

  render() {
    const { auth, search } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://cdn-icons-png.flaticon.com/512/482/482631.png"
            alt="search-icon"
          />
          <input placeholder="Search" onChange={this.handleSearch} />

          {search.results.length > 0 && (
            <div className="search-results">
              <ul>
                {search.results.map((user) => (
                  <Link to={`/user/${user._id}`} key={user._id}>
                    <li className="search-results-row">
                      <img src={avatar} alt="user-dp" />
                      <span>{user.name}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-nav">
          {auth.isLoggedIn && (
            <div className="user">
              <Link to="/settings">
                <img src={avatar} alt="user-dp" id="user-dp" />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedIn && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}

              {auth.isLoggedIn && <li onClick={this.logOut}>Log out</li>}

              {!auth.isLoggedIn && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    search: state.search,
  };
}

export default connect(mapStateToProps)(Navbar);
