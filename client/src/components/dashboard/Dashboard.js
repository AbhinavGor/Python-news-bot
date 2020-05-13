import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Dashboard = ({
  auth: { user }
}) => {
  useEffect(() => {

  }, );

  return (
    <Fragment>
      
      {/* <h1 className='large text-primary'><i className="fas fa-user" /> Welcome {user && user.name}</h1> */}
      <h1 className='large'> <img className='round-img' src={user && user.avatar} alt='' /> {user && user.name}</h1>
      <h2><i className = 'fab fa-connectdevelop'></i> Our Sources</h2>
      <div className='indent1'>
        <ul className='indent1'>
          <li><a target = '_blank' href='https://www.nytimes.com/'>New York Times</a></li>
          <li><a target = '_blank' href='https://www.cnet.com/'>CNET</a></li>
          <li><a target = '_blank' href='https://timesofindia.indiatimes.com/defaultinterstitial.cms'>Times Of India</a></li>
        </ul>
      </div>
      <br />
      <h2><i className = 'fas fa-wrench'></i> How it works?</h2>
      <div className='indent1'>
        <ul className='indent1'>
          <li>News realted to your interested topics is scraped off every hour of the day.</li>
          <li>All the scraping work is done by a python bot.</li>
          <li>This news is stored in a database and sent to your registered email every morning at 9 AM.</li>
        </ul>
      </div>
      <br />
      <a target = '_blank' href = 'https://github.com/AbhinavGor/Python-news-bot'><button className='btn btn-light'>Contribute to the project here</button></a>
      <br /><a target = '_blank' href = 'https://abhinavgor.netlify.app/#contact'><button className='btn btn-light dev-btn'>Contact the developer</button></a>
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
