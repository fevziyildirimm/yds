import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import '../flashcard.css';
import wordsData from '../wordsFlash.json';
import { useSwipeable } from 'react-swipeable';
import right from '../img/right.png'
import left from '../img/left.png'


const Flashcard = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState([]); // Birden fazla ünite seçmek için liste oluşturuldu

  useEffect(() => {
    if (selectedUnits.length > 0) {
      setWords(
        wordsData.filter(word => selectedUnits.includes(word.unit))
      );
    } else {
      setWords(wordsData);
    }
  }, [selectedUnits]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeLeft(),
    onSwipedRight: () => handleSwipeRight(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipeRight = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleSwipeLeft = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowAnswer(false);
    }
  };

  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };

  const handleUnitSelect = (unit) => {
    if (selectedUnits.includes(unit)) {
      setSelectedUnits(selectedUnits.filter(selectedUnit => selectedUnit !== unit));
    } else {
      setSelectedUnits([...selectedUnits, unit]);
    }
  };

  const handlePreviousClick = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleNextClick = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          
          <div className="flashcard-container" {...handlers}>
            <div className="navbar navbar-expand-lg navbar-dark bg-dark mt-3">
              {[...new Set(wordsData.map(word => word.unit))].map((unit, index) => (
                <button
                  key={index}
                  className={`btn ${selectedUnits.includes(unit) ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                  onClick={() => handleUnitSelect(unit)}
                >
                  Ünite {unit}
                </button>
              ))}
            </div>
            <div
              className={`flashcard ${showAnswer ? 'show-answer' : ''}`}
              onClick={handleCardClick}
            >
              <div className="flashcard-content">
                <div className="flashcard-front">
                  <p>{words[currentWordIndex]?.english}</p>
                </div>
                <div className="flashcard-back">
                  <p>{words[currentWordIndex]?.turkish}</p>
                </div>
              </div>
            </div>
            
            <div className="navigation-buttons mt-3">
              <button className="btn " onClick={handlePreviousClick}>
              <img src={left} width='60px'/>  
              </button>
              <button className="btn " onClick={handleNextClick} >
              <img src={right} width='60px'/>  
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
