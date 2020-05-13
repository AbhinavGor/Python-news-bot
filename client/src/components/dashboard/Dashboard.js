import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from '../posts/Posts';


const Dashboard = ({
  auth: { user }
}) => {
  useEffect(() => {

  }, );

  return (
    <Fragment>
      
      <h1 className='large text-primary'><i className="fas fa-user" /> Welcome {user && user.name}</h1>
      
      <h2>Dashboard content here</h2>
      {/* <Post /> */}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(
  Dashboard
);
