import React from 'react';
import './Input.css';
import Circle from './UI/Circle';

const Input = (props) => {
  const inputColor = props.darkMode ? 'dark-text' : 'light-text';

  return (
    <div className="form-control">
      {<p className="error">{props.error}</p>}
      <div className={`form-input ${props.bg}`}>
        <Circle onClick={props.onNewTodoAdd} title={'Add new Todo'} />
        <input
          type={'text'}
          placeholder={props.placeholder}
          value={props.value}
          className={`${props.bg} ${inputColor}`}
          onChange={props.onInputChange}
        />
      </div>
    </div>
  );
};

export default Input;
