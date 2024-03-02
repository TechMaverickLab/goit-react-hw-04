import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal'; // Додайте цей імпорт
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import axios from 'axios';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (searchQuery, page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: searchQuery, page, per_page: 12 },
        headers: {
          Authorization: 'Client-ID Dg4Q5zV4616xmFVHboRdUvNXy_Jup_wWxRb9WiYhQZc',
        },
      });
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setPage(page);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (searchQuery) => {
    setImages([]);
    setPage(1);
    setQuery(searchQuery);
    fetchImages(searchQuery, 1);
  };

  const handleLoadMore = () => {
    fetchImages(query, page + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {isLoading && <Loader />}
      {images.length > 0 ? (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          <LoadMoreBtn onClick={handleLoadMore} />
        </>
      ) : (
        !isLoading && <p>No images found.</p>
      )}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
  
}

export default App;
