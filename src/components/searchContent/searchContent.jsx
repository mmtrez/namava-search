import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import {SearchInput} from '../searchInput/searchInput.jsx';
import {SearchCard} from '../searchCard/searchCard.jsx';
import {EmptySearchIcon, NotFoundIcon} from '../Icons/icons.jsx';
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
      const items = await getSearchResult(searchType, page, searchTerm);
      if (items) {
        setResult((prev) => [...prev, ...items]);
        setDisplayState('data');
      } else if (result.length < 1) {
        setDisplayState('notFound');
      }
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
    setDisplayState('empty');
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
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={classes.container}>
      <SearchInput />
      {displayState === 'empty' && (
        <div className={classes.emptyState}>
          <EmptySearchIcon width="140" height="140" />
          <span>
            عنوان فیلم، سریال یا بازیگر مورد نظر خود را جستجو کنید و یا از طریق فیلتر‌های
            موجود، فیلم و سریال مورد علاقه خود را پیدا کنید.
          </span>
        </div>
      )}
      {displayState === 'notFound' && (
        <div className={classes.notFoundState}>
          <NotFoundIcon width="140" height="140" />
          <span>موردی یافت نشد.</span>
        </div>
      )}
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
