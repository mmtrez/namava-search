import React from 'react';

import {Filters} from '../../components/filters/filters.jsx';
import {SearchContent} from '../../components/searchContent/searchContent.jsx';

import classes from './styles.module.css';

export function Search() {
  return (
    <div className={classes.container}>
      <Filters />
      <SearchContent />
    </div>
  );
}
