import "./BrickGame.css";
import { useState, useEffect, useRef } from "react";

function BrickGame() {
    // Global vars that do NOT need state (don't re-render canvas when changed)
    // Global vars that DO need state (re-render canvas when changed)
    const [x, setX] = useState(200);
    const [y, setY] = useState(150);
    const [dx, setDX] = useState(1);
    const [dy, setDY] = useState(-3);
    // how to initialize nested array state variable?
    const [bricks, setBricks] = useState();

    return (
        <>
            <canvas
                ref={canvasRef}
                id="canvas"
                width="500"
                height="300"
            ></canvas>
        </>
    );
}

export default BrickGame;
