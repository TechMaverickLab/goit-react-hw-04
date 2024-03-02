import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';
import { debounce } from '../../utils/debounce';

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');
  const debouncedSubmit = debounce(onSubmit, 500);
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }
    debouncedSubmit(query);
    setQuery('');
  };  

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <button className={styles.button} type="submit">Search</button>
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
