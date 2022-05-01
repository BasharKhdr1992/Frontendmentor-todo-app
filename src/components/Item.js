import React from 'react';
import './Item.css';
import Circle from './UI/Circle';
import Close from './UI/Close';

const Item = ({
  item,
  onComplete,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  bg,
}) => {
  return (
    <div
      id={item.sortId}
      className={`list-item ${bg}`}
      draggable={true}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="list-item-left">
        <Circle
          className={item.completed ? 'fill' : ''}
          onClick={() => onComplete(item.id)}
        />
        <p className={`task ${item.completed ? 'completed' : undefined}`}>
          {item.task}
        </p>
      </div>
      <Close onClick={() => onDelete(item.id)} />
    </div>
  );
};

export default Item;
