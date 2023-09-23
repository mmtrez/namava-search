import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {Search} from './pages/search/search.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
