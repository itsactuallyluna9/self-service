import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../cssFiles/CourseInformationPage.css'

interface TextPopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  key: string;
}

const modalRoot = document.getElementById('modal-root');

const TextPopup = ({ message, isVisible, onClose }: TextPopupProps) => {
  useEffect(() => {
  if (isVisible) {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    return () => clearTimeout(timer);
  }
}, [isVisible, message, onClose]);

  if (!isVisible || !modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <p>{message}</p>
    </div>,
    modalRoot
  );
};

export default TextPopup;