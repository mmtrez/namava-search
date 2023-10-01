import React from 'react';

import {EmptySearchIcon} from '../Icons/icons.jsx';

import classes from './styles.module.css';

export default function EmptyState() {
  return (
    <div className={classes.emptyState}>
      <EmptySearchIcon width="140" height="140" />
      <span>
        عنوان فیلم، سریال یا بازیگر مورد نظر خود را جستجو کنید و یا از طریق فیلتر‌های
        موجود، فیلم و سریال مورد علاقه خود را پیدا کنید.
      </span>
    </div>
  );
}
