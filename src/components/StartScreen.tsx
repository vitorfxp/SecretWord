import "./StartScreen.css"

type startGame = {
    startGame: () => void
}

const StartScreen = ({startGame}: startGame) => {
    return (
        <div className="start">
            <h1>Secret Word</h1>
            <p>Clique no botão para começar</p>
            <button onClick={startGame}>Começar o jogo</button>
        </div>
    );
};

export default StartScreen;