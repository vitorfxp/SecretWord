import { useState,useRef } from "react";
import "./Game.css";

type verify = {
    verifyLetter: (letter: string) => void;
    pickedWord: string
    pickedCategory: string
    letters: string[]
    guessedLetters: string[]
    wrongLetters:string[]
    guesses: number
    score:number
}


const Game = ({verifyLetter, pickedCategory,letters,guessedLetters,wrongLetters,guesses,score }: verify) => {
    const [letter,setLetter] = useState("")
    const letterInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        verifyLetter(letter);

        setLetter("")

        if (letterInputRef.current) {
            letterInputRef.current.focus();
    }
    };


    return (
        <div className="game">
        <p className="points">
            <span>Pontuação: {score}</span>
        </p>
        <h1>Advinhe a palavra</h1>
        <h3 className="tipo">
            dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativa(s).</p>
        <div className="wordContainer">
            {letters.map((letter, i) => (
                guessedLetters.includes(letter) ? (
                    <span key={i} className="letter">{letter}</span>
                ) : (
                    <span key={i} className="blanksquare"></span>
                )
            ))}
        </div>
        <div className="letterContainer">
            <p>tente advinhar um letra da palavra:</p>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="letter" 
                maxLength={1} 
                required onChange={(e) => setLetter (e.target.value)} 
                value={letter}
                ref={letterInputRef}
                />
                <button>Jogar!</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras já utilizadas:</p>
            {wrongLetters.map((letter, i) => (      
                    <span key={i} >{letter},</span>      
            ))}
        </div>
        {/* <button onClick={verifyLetter}>Finalizar o jogo</button> */}
        </div>
    );
};

export default Game;