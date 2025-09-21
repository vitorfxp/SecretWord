import "./GameOver.css";

type gameover = {
    retry: () => void
    score: number
}


const GameOver = ({retry, score}: gameover) => {
    return (
    <div>
    <h1>Game Over</h1>
    <h2>A sua pontuação foi: <span>{score}</span></h2>
    <button onClick={retry}>Tentar novamente</button>
    </div>
    )
}

export default GameOver;