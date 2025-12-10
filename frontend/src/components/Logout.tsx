import React from 'react';
import ReactDOM from 'react-dom';
import '../cssFiles/Logout.css';

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const modalRoot = document.getElementById('modal-root');

const LogoutModal = ({ isOpen, onConfirm, onCancel }: LogoutModalProps) => {
  if (!isOpen || !modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to sign out of your account?</p>
        <div className="modal-buttons">
          <button onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-button">
            Sign Out
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default LogoutModal;