import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: {posts}, auth}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log(posts);
  return (
    <Fragment>
      <h2 className='large text-primary'><i className="fas fa-plus" /> Add Subscription</h2>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={auth.user._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);
