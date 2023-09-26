import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import classes from './styles.module.css';

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState({
    movie: searchParams.get('type') === 'movie',
    series: searchParams.get('type') === 'series',
  });

  const handleSetFilter = (event) => {
    const target = event.target;
    setSearchType((prev) => ({...prev, [target.name]: target.checked}));
  };

  useEffect(() => {
    const {movie, series} = searchType;

    if ((movie && series) || (!movie && !series)) {
      searchParams.set('type', 'all');
      setSearchParams(searchParams);
    } else if (movie) {
      searchParams.set('type', 'movie');
      setSearchParams(searchParams);
    } else if (series) {
      searchParams.set('type', 'series');
      setSearchParams(searchParams);
    }
  }, [searchType]);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>فیلتر‌ها</h2>
      <div className={classes.row}>
        <div className={classes.select}>
          <input
            className={classes.selectInput}
            type="checkbox"
            id="movie"
            name="movie"
            value="movie"
            checked={searchType.movie}
            onChange={handleSetFilter}
          />
          <label className={classes.label} htmlFor="movie">
            فیلم
          </label>
        </div>
        <div className={classes.select}>
          <input
            className={classes.selectInput}
            type="checkbox"
            id="series"
            name="series"
            value="series"
            checked={searchType.series}
            onChange={handleSetFilter}
          />
          <label className={classes.label} htmlFor="series">
            سریال
          </label>
        </div>
      </div>
    </div>
  );
}
