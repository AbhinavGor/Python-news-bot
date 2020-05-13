import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => (
  <div>
    {user === auth.user._id &&(
      <div className='post bg-white p-1 my-1'>
        <div>
          <Fragment>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => deletePost(_id)}
                  type='button'
                  className='btn btn-danger'
                >
                  <i className='fas fa-times' /> Remove Subscription
                </button>
              )}
            </Fragment></div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Subscription added on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
        </div>
            
        </div>)}
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
