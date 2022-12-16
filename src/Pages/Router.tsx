import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './Detail/Detail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
