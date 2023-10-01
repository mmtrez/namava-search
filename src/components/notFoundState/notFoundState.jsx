import React from 'react';

import {NotFoundIcon} from '../Icons/icons.jsx';

import classes from './styles.module.css';

export default function NotFoundState() {
  return (
    <div className={classes.notFoundState}>
      <NotFoundIcon width="140" height="140" />
      <span>موردی یافت نشد.</span>
    </div>
  );
}
