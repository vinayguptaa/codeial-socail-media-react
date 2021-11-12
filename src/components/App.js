import React from 'react';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom'; //https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md

import { fetchPosts } from '../actions/posts';
import {
  Home,
  Navbar,
  Page404,
  Login,
  Signup,
  Settings,
  UserProfile,
} from './';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';

const PrivateRoute = ({ children, isLoggedIn }) => {
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = getAuthTokenFromLocalStorage();
    if (token) {
      const user = jwt_decode(token);
      console.log('user ', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          name: user.name,
          _id: user._id,
        })
      );

      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  posts={posts}
                  friends={friends.friends}
                  fetchInProgress={friends.inProgress}
                  isLoggedIn={auth.isLoggedIn}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute isLoggedIn={auth.isLoggedIn}>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/:userId"
              element={
                <PrivateRoute isLoggedIn={auth.isLoggedIn}>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
          {/* <PostsList posts={posts} /> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

App.propTypes = {
  posts: propTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
