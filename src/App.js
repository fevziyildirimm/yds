
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Shuffle from './pages/Shuffle';
import Flashcard from './pages/Flashcard';
import Home from './pages/Home';
import { Button } from 'react-bootstrap';

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shuffle' element={<Shuffle/>}/>
        <Route path='/card' element={<Flashcard/>}/>

      </Routes>
    </div>
  );
};

export default App;
