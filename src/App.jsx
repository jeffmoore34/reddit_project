import React from 'react';
import './App.css';
import Header from './components/Header/header';
import Subreddits from './components/Subreddits/subreddits';
import Home from './components/Home/home';

function App() {
  return (
    <>
      <Header />
      <Home />
      <Subreddits />
    </>
  )
}

export default App
