import React from 'react';
import './Logout.css';

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ isOpen, onConfirm, onCancel }: LogoutModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Sign Out</h2>
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
    </div>
  );
};

export default LogoutModal;