import React, {useState, useEffect, useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';

import {SearchIcon, CloseIcon} from '../Icons/icons.jsx';

import classes from './styles.module.css';

export function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (!searchTerm) setSearchParams('');

    const delayDebounce = setTimeout(() => {
      if (searchTerm) setSearchParams({query: searchTerm});
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className={classes.container}>
      <SearchIcon width="28px" height="28px" />
      <input
        className={classes.input}
        type="text"
        placeholder="فیلم، سریال، بازیگر و ژانر"
        autoComplete="off"
        value={searchTerm}
        onChange={handleChange}
      />
      <CloseIcon
        width="28px"
        height="28px"
        className={searchTerm ? null : classes.hide}
      />
    </div>
  );
}
