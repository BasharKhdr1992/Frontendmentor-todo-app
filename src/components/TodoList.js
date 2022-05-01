import React, { useState } from 'react';
import Item from './Item';
import Button from './UI/Button';
import './TodoList.css';

const RenderMiddleActionBar = (props) => {
  return (
    <div className={`${props.className}`}>
      <Button
        onClick={() => {
          props.setActive(0);
          props.filter('all');
        }}
        className={`btn btn-action small ${props.actionClass} ${props.btnActive[0]}`}
      >
        All
      </Button>
      <Button
        onClick={() => {
          props.setActive(1);
          props.filter('active');
        }}
        className={`btn btn-action small ${props.actionClass} ${props.btnActive[1]}`}
      >
        Active
      </Button>
      <Button
        onClick={() => {
          props.setActive(2);
          props.filter('completed');
        }}
        className={`btn btn-action small ${props.actionClass} ${props.btnActive[2]}`}
      >
        Completed
      </Button>
    </div>
  );
};

const TodoList = (props) => {
  const [btnActive, setBtnActive] = useState(['', '', '']);

  const textStyle = props.darkMode ? 'dark-text' : 'light-text';

  const leftItems = props.items.filter((item) => !item.completed).length;

  const actionClass = props.darkMode ? 'btn-action-dark' : 'btn-action-light';

  const setActive = (index) => {
    setBtnActive((prev) =>
      prev.map((item, i) => {
        return i === index ? 'active' : '';
      })
    );
  };

  return (
    <div>
      <div className={`todo-list ${textStyle}`}>
        {props.items.map((item) => {
          return (
            <Item
              key={item.id}
              bg={props.bg}
              item={item}
              onDelete={props.onDelete}
              onComplete={props.onTaskComplete}
              onDragStart={props.onItemDragStart}
              onDragOver={props.onItemDragOver}
              onDrop={props.onItemDrop}
            />
          );
        })}
      </div>
      <div className={`action-bar ${props.bg}`}>
        <p className={textStyle}>{leftItems} items left</p>
        <RenderMiddleActionBar
          className={`middle-action-bar-lg ${props.bg}`}
          setActive={setActive}
          filter={props.filter}
          actionClass={actionClass}
          btnActive={btnActive}
        />
        <Button
          className={`btn btn-action small ${actionClass}`}
          onClick={props.clearCompleted}
        >
          Clear Completed
        </Button>
      </div>
      <RenderMiddleActionBar
        actionClass={actionClass}
        btnActive={btnActive}
        setActive={setActive}
        filter={props.filter}
        className={`middle-action-bar-sm ${props.bg}`}
      />
      <p className="note">Drag and drop to reorder list</p>
    </div>
  );
};

export default TodoList;
