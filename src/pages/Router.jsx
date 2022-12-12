import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './Post/Post';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
