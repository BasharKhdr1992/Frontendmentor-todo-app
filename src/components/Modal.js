import React from 'react';
import Button from './UI/Button';
import './Modal.css';
import Close from './UI/Close';

const Modal = ({ onClick, onConfirm, onCancel, bg }) => {
  return (
    <div className={`modal ${bg}`}>
      <div className="modal-header">
        <Close onClick={onClick} />
      </div>
      <div className="modal-content">
        <h2>Are you sure you want to delete this todo ?</h2>
        <div className="btn-row">
          <Button onClick={onConfirm} className={'btn btn-danger'}>
            Delete
          </Button>
          <Button onClick={onCancel} className={'btn btn-link'}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
