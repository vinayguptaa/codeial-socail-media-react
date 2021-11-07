import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import { fetchPosts } from '../actions/posts';
import { PostsList, Navbar } from './';

const Login = () => <div>Login</div>;
const SignUp = () => <div>SignUp</div>;
const Home = () => <div>Home</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
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
  };
}

App.propTypes = {
  posts: propTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
