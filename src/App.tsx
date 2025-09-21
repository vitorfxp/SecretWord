//css
import './App.css'

// react 
import { useCallback, useEffect, useState } from 'react'

//data
import {wordsList} from "./data/word"

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

const [pickedWord, setPickedWord] = useState("")
const [pickedCategory, setPickedCategory] = useState("")
const [letters, setLetters] = useState<string[]>([]) // Array de strings, não string vazia

const [guessedLetters, setGuessedLetters] = useState<string[]>([]) // Array de strings
const [wrongLetters, setWrongLetters] = useState<string[]>([]) // Array de strings
const [guesses, setGuesses] = useState(5)
const [score, setScore] = useState(0)


const pickWordAndCategory = useCallback(() => {
  //pick a random category
  const categories = Object.keys(words) as (keyof typeof words)[];
  const category = categories[Math.floor(Math.random() * categories.length)];

  //pick a random word
  const word = words[category][Math.floor(Math.random() * words[category].length)];

  return { word, category }; // Agora a função retorna os valores
}, [words]);
  // starts
  const startGame = useCallback(() => {
    clearLetterStates();

    const {word, category} = pickWordAndCategory();

    //create an array of letters 
    let wordLetters: string[] = word.split("")
    wordLetters = wordLetters.map((letters) => letters.toLowerCase())


    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  },[pickWordAndCategory]);

  // process
  const verifyLetter = (letter: string) => {
    console.log(letter)
    const normalizedLetter = letter.toLowerCase()

    if (guessedLetters.includes(normalizedLetter) ||
        wrongLetters.includes(normalizedLetter)
      ){
          return;
        }

        //push
        if(letters.includes(normalizedLetter)){
          setGuessedLetters((actualGuessedLetters) => [
            ...actualGuessedLetters,
            normalizedLetter,
          ])
        } else {
           setWrongLetters((actualWrongLetters) => [
            ...actualWrongLetters,
            normalizedLetter,
            ])

            setGuesses((actualGuesses) => actualGuesses - 1)
        }
  };

const clearLetterStates = (): void => {
  setGuessedLetters([]);
  setWrongLetters([]);
};


//check defeat
  useEffect(() => {
    if(guesses <= 0){
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  }, [guesses, letters, startGame]);

  //cheack win
useEffect(() => {
    const uniqueLetters = [... new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore += 100)
      //
      startGame()
    }
  }, [guessedLetters]);


  // restart
  const retry = () => {
    setScore(0)
    setGuesses(5)
    setGameStage(stages[0].name);
  }

  return (
    <div className='App'>
     {gameStage === "start" && <StartScreen startGame={startGame}/>} 
     {gameStage === "game" && <Game 
     verifyLetter={verifyLetter} 
     pickedWord={pickedWord}
     pickedCategory={pickedCategory}
     letters={letters}
     guessedLetters={guessedLetters}
     wrongLetters={wrongLetters}
     guesses={guesses}
     score={score}
     />
     } 
     {gameStage === "end" && <GameOver retry={retry} score={score}/>} 
    </div>
  );
}

export default App;