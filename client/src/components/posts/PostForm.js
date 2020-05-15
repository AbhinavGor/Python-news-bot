import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import CheckBox from './Checkbox';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [Breaking, setBreaking] = useState('');
  const catgs = {
    cats : [
        {id: 1, value: "banana", isChecked: false},
        {id: 2, value: "apple", isChecked: false},
        {id: 3, value: "mango", isChecked: false},
        {id: 4, value: "grap", isChecked: false}
    ]
  }

  const handleAllChecks = (e) => {
      console.log(e.target.checked);
  }
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
         <input type="checkbox"  value={Breaking} onChange={e => {console.log(e.target.checked); setBreaking(e.target.checked);}} /> Check / Uncheck All
        <ul>
        {
          catgs.cats.map((cats) => {
            return (<CheckBox {...cats} />)
          })
        }
        </ul>
        <br />
        <input type='submit' className='btn btn-light my-1' value='Submit' />
      </form>
      <h1 >HEllo{Breaking}</h1>
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
