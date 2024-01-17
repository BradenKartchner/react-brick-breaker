import "./BrickGame.css";
import { useState, useEffect, useRef } from "react";

function BrickGame() {
    // Global vars that do NOT need state (don't re-render canvas when changed)
    var myInterval, ctx, width, height;
    var ballColor = "black";
    var ballRadius = 10;
    // Global vars that DO need state (re-render canvas when changed)
    const [x, setX] = useState(200);
    const [y, setY] = useState(150);
    const [dx, setDX] = useState(1);
    const [dy, setDY] = useState(-3);
    // how to initialize nested array state variable?
    const [bricks, setBricks] = useState();

    // get reference to Canvas
    const canvasRef = useRef(null);

    // function to draw the ball
    function circle(a, b, c) {
        ctx.beginPath();
        ctx.arc(a, b, c, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    function draw() {
        // clear everything from the canvas
        // draw the ball
        ctx.fillStyle = ballColor;
        circle(x, y, ballRadius);

        // reverse x if the ball hits the side of the canvas
        if (x + dx > width || x + dx < 0) {
            setDX(-dx);
        }

        // handle changes in y
        if (y + dy < 0) {
            setDY(-dy);
        } else if (y + dy > height) {
            setDY(-dy);
        }

        // change x and y values
        setY(y + dy);
        setX(x + dx);
    }

    // main loop: useEffect()
    useEffect(() => {
        var myCanvas = canvasRef.current;
        ctx = myCanvas.getContext("2d");
        width = myCanvas.width;
        height = myCanvas.height;
        //draw();
        // Game loop: run draw on an interval
        myInterval = setInterval(draw, 100);

        //
        return () => clearInterval(myInterval);
    });
    //[canvasRef, x, y, dx, dy]

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
