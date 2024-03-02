import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

function ImageModal({ image, onClose }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscPress);
    return () => window.removeEventListener('keydown', handleEscPress);
  }, [onClose]);

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      onClick={handleOverlayClick}
    >
      <img src={image.urls.regular} alt={image.alt_description} />
      <div className={styles.info}>
        <p>Author: {image.user.name}</p>
        <p>Likes: {image.likes}</p>
      </div>
      <button className={styles.closeButton} onClick={onClose}>Close</button>
    </Modal>
  );
}

ImageModal.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.object.isRequired,
    alt_description: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    likes: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
