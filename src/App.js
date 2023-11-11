
import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import wordsData from './words.json'; 

const SynonymsGame = () => {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [selectedSynonyms, setSelectedSynonyms] = useState([]);
  const [selectedWordSynonyms, setSelectedWordSynonyms] = useState([]);
  const [correctSelectedSynonyms, setCorrectSelectedSynonyms] = useState([]);
  const [warnSelectedSynonyms, setWarnSelectedSynonyms] = useState([]);

  const [isCorrect, setIsCorrect] = useState(null);

  const fetchWordAndSynonymsData = () => {
    try {
      const randomIndex = Math.floor(Math.random() * wordsData.words.length);
      const { word, synonyms } = wordsData.words[randomIndex];
      setSelectedWordSynonyms(synonyms);
      const allOptions = shuffleArray([...synonyms,  ...getRandomWordsExcept(wordsData.words, word, 3)]);
    
      setWord(word);
      setSynonyms(allOptions);
      setSelectedSynonyms([]);
      setIsCorrect(null);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSynonymClick = (e,synonym) => {
    //console.log(selectedWordSynonyms.includes(synonym));
    console.log(correctSelectedSynonyms);
    if (selectedWordSynonyms.includes(synonym)&&!correctSelectedSynonyms.includes(synonym)) {
      // Eğer zaten seçiliyse, seçimden kaldır
    //  const updatedSelection = selectedSynonyms.filter((selected) => selected !== synonym);
      setCorrectSelectedSynonyms([...correctSelectedSynonyms, synonym]);
    } else {
      // Değilse, seçime ekle
      setWarnSelectedSynonyms([...warnSelectedSynonyms, synonym]);
    }
  };

  const nextQuestion = () => {
    setSelectedSynonyms([]);
    setCorrectSelectedSynonyms([]);
    setWarnSelectedSynonyms([])
    fetchWordAndSynonymsData();
  };

  useEffect(() => {
    fetchWordAndSynonymsData();
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getRandomWordsExcept = (words, excludedWord, count) => {
    console.log(wordsData);
    const filteredWords = words.filter((word) => word.word !== excludedWord);
    const randomWords = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      const randomSynonyms = Math.floor(Math.random() * filteredWords[randomIndex].synonyms.length);
      if (randomWords.includes(filteredWords[randomIndex].synonyms[randomSynonyms])) {
        randomSynonyms = Math.floor(Math.random() * filteredWords[randomIndex].synonyms.length);
      }
      randomWords.push(filteredWords[randomIndex].synonyms[randomSynonyms]);
    }
    console.log(randomWords);
    return randomWords;
  };

  return (
    <div className="App">
      <Card style={{ width: '18rem', margin: 'auto', marginTop: '20px' }}>
        <Card.Body>
          <Card.Title>Yds kelime</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Kelimen <b className='text-info'>" {word.toUpperCase()} "</b></Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Bulunacak kelime sayısı <b className='text-info'>" {selectedWordSynonyms.length-correctSelectedSynonyms.length} "</b></Card.Subtitle>
          <ListGroup variant="flush">
            {synonyms.map((synonym, index) => (
              <ListGroup.Item
                key={index}
                action
                variant={correctSelectedSynonyms.includes(synonym) ? 'success' : warnSelectedSynonyms.includes(synonym)?'danger':'light'}
                onClick={(e) => handleSynonymClick(e,synonym)}

              >
                {synonym}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {correctSelectedSynonyms.length >= selectedWordSynonyms.length && (
            <Button variant="primary" onClick={nextQuestion} style={{ marginTop: '10px' }}>
              Next Question
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SynonymsGame;
