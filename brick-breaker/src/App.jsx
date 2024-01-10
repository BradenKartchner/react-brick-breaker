import { useState } from "react";
import Game from "./components/Game.jsx";
import "./App.css";
import BrickGame from "./components/BrickGame.jsx";

function App() {
    const [score, setScore] = useState(0);

    const handleScore = (num) => {
        setScore(num);
    };

    return (
        <>
            <BrickGame />
            <p id="instructions">
                Mouse moves platform &bull; Press any key to pause
            </p>
            <button id="reloadButton">Play Again</button>
            <div id="score">Score: {score}</div>
        </>
    );
}

export default App;
