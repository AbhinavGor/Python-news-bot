import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import CheckBox from './Checkbox';


const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const breaking = {id: 1, value: "Breaking", isChecked: false};
  const tech = {id: 2, value: "Tech News", isChecked: false};
  const sports = {id:3, value: "Sports", isChecked:false};
  const covid = {id:4, value: "COVID", isChecked:false};

  return (
    <div className='post-form'>
      <h3>Enter the topics you are interested in separated by commas.</h3>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Example: covid-19, javascript, tech, politics'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        {/* <CheckBox {...breaking} />
        <br />
        <CheckBox {...sports} />
        <br />
        <CheckBox {...tech} />
        <br />
        <CheckBox {...covid} />
        <br /> */}
        <input type='submit' className='btn btn-light my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
