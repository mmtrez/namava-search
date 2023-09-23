import React from 'react';

import classes from './styles.module.css';

export function SearchCard({data}) {
  return (
    <div className={classes.card}>
      <div className={classes.imgContainer}>
        <img src={data.image_url} alt={data.name} />
      </div>
      <h2 className={classes.title}>{data.name}</h2>
    </div>
  );
}
