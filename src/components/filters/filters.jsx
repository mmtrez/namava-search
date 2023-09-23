import React from 'react';

import classes from './styles.module.css';

export function Filters() {
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
          />
          <label className={classes.label} htmlFor="movie">
            فیلم
          </label>
        </div>
        <div className={classes.select}>
          <input
            className={classes.selectInput}
            type="checkbox"
            id="tvshow"
            name="tvshow"
            value="tvshow"
          />
          <label className={classes.label} htmlFor="tvshow">
            سریال
          </label>
        </div>
      </div>
    </div>
  );
}
