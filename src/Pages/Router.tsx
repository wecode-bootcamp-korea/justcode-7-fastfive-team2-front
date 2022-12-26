import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Test from './asdasd/Test';
import Detail from './Detail/Detail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/' element={<Home />} />
        <Route path='/hi' element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
