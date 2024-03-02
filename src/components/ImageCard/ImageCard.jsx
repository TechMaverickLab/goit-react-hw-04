import PropTypes from 'prop-types';
import styles from './ImageCard.module.css';

function ImageCard({ image }) {
    return (
        <div className={styles.card}>
          <img src={image.urls.small} alt={image.alt_description} />
        </div>
      );
}

ImageCard.propTypes = {
    image: PropTypes.shape({
      urls: PropTypes.object.isRequired,
      alt_description: PropTypes.string,
    }).isRequired,
};

export default ImageCard;
