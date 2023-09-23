import React, {useState, useEffect, useRef} from 'react';
import {useSearchParams} from 'react-router-dom';

import {SearchInput} from '../searchInput/searchInput.jsx';
import {SearchCard} from '../searchCard/searchCard.jsx';
import {EmptySearchIcon, NotFoundIcon} from '../Icons/icons.jsx';
import getSearchResult from '../../services/getSearchResult.js';

import classes from './styles.module.css';

export function SearchContent() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') ?? '');
  const [result, setResult] = useState([]);
  const page = useRef(1);

  const handleSearch = async () => {
    console.log('page', page);
    const items = await getSearchResult('all', page.current, searchTerm);
    console.log('items', items);
    if (items) {
      setResult((prev) => [...prev, ...items]);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    page.current++;
    handleSearch();
  };

  const reset = () => {
    setResult([]);
    page.current = 1;
  };

  useEffect(() => {
    setSearchTerm(searchParams.get('query') ?? '');
  }, [searchParams]);

  useEffect(() => {
    reset();
    if (searchTerm) handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={classes.container}>
      <SearchInput />
      {searchTerm ? (
        result.length <= 0 ? (
          <div className={classes.notFoundState}>
            <NotFoundIcon width="140" height="140" />
            <span>موردی یافت نشد.</span>
          </div>
        ) : (
          <div className={classes.content}>
            {result?.map((res) => (
              <SearchCard key={res.id} data={res} />
            ))}
          </div>
        )
      ) : (
        <div className={classes.emptyState}>
          <EmptySearchIcon width="140" height="140" />
          <span>
            عنوان فیلم، سریال یا بازیگر مورد نظر خود را جستجو کنید و یا از طریق فیلتر‌های
            موجود، فیلم و سریال مورد علاقه خود را پیدا کنید.
          </span>
        </div>
      )}
    </div>
  );
}
