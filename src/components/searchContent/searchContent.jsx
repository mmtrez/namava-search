import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import {SearchInput} from '../searchInput/searchInput.jsx';
import {SearchCard} from '../searchCard/searchCard.jsx';
import EmptyState from '../emptyState/emptyState.jsx';
import NotFoundState from '../notFoundState/notFoundState.jsx';
import getSearchResult from '../../services/getSearchResult.js';

import classes from './styles.module.css';

export function SearchContent() {
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('type') ?? 'all';
  const searchTerm = searchParams.get('query') ?? '';
  const [result, setResult] = useState([]);
  const [displayState, setDisplayState] = useState('empty');
  const [page, setPage] = useState(1);

  // ** Fns
  const handleSearch = async () => {
    if (searchTerm) {
      setIsFetching(true);
      const items = await getSearchResult(searchType, page, searchTerm);
      if (items) {
        setResult((prev) => [...prev, ...items]);
      }
      setIsFetching(false);
    }
  };

  const handleScroll = () => {
    const bottomDistance =
      window.innerHeight +
      document.documentElement.scrollTop -
      document.documentElement.offsetHeight;

    if (bottomDistance > 1 || bottomDistance < -1) {
      return;
    }

    setPage((prev) => prev + 1);
  };

  const reset = () => {
    setResult([]);
    setPage(1);
  };

  // ** Effects
  useEffect(() => {
    reset();
    handleSearch();
  }, [searchTerm, searchType]);

  useEffect(() => {
    handleSearch();
  }, [page]);

  useEffect(() => {
    if (searchTerm) {
      setDisplayState(result.length > 0 ? 'data' : 'notFound');
    } else {
      setDisplayState('empty');
    }
  }, [searchTerm]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={classes.container}>
      <SearchInput />
      {displayState === 'empty' && <EmptyState />}
      {displayState === 'notFound' && <NotFoundState />}
      {displayState === 'data' && (
        <div className={classes.content}>
          {result?.map((res, index) => (
            <SearchCard key={index} data={res} />
          ))}
        </div>
      )}
    </div>
  );
}
