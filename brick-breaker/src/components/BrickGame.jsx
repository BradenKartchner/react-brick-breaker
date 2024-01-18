import "./BrickGame.css";
import { useState, useEffect, useRef } from "react";

function BrickGame() {
    // Global vars that do NOT need state (don't re-render canvas when changed)
    var myInterval, ctx, width, height;
    var ballColor = "black";
    var ballRadius = 10;
    var backColor = "white";
    var paddleH = 10;
    var paddleW = 75;
    var paddleColor = "black";
    var canvasMinX = 0;
    var canvasMaxX = 0;
    //var paddlex = 250;
    // Global vars that DO need state (re-render canvas when changed)
    const [x, setX] = useState(200);
    const [y, setY] = useState(150);
    const [dx, setDX] = useState(1);
    const [dy, setDY] = useState(-3);
    const [paddleX, setPaddleX] = useState(250);
    // how to initialize nested array state variable?
    const [bricks, setBricks] = useState();

    // get reference to Canvas
    const canvasRef = useRef(null);

    // function to clear the canvas
    function clear() {
        ctx.clearRect(0, 0, width, height);
        rect(0, 0, width, height);
    }
    // function to draw the ball
    function circle(a, b, c) {
        ctx.beginPath();
        ctx.arc(a, b, c, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    // function to draw the paddle, background, and bricks
    function rect(a, b, c, d) {
        ctx.beginPath();
        ctx.rect(a, b, c, d);
        ctx.closePath();
        ctx.fill();
    }

    function draw() {
        // clear everything from the canvas
        ctx.fillStyle = backColor;
        clear();
        // draw the ball
        ctx.fillStyle = ballColor;
        circle(x, y, ballRadius);
        // draw the paddle
        ctx.fillStyle = paddleColor;
        rect(paddleX, height - paddleH, paddleW, paddleH);
        // draw the bricks

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
        canvasMinX = myCanvas.offsetLeft;
        canvasMaxX = canvasMinX + width;
        // Game loop: run draw on an interval
        myInterval = setInterval(draw, 10);

        // cleanup function gets run after component removed from the DOM, so any time canvas is updated?
        return () => clearInterval(myInterval);
    });
    //[canvasRef, x, y, dx, dy]

    // handle mouse movement on canvas
    function handleMouseMove(event) {
        if (event.pageX > canvasMinX && event.pageX < canvasMaxX) {
            let newValue = Math.max(event.pageX - canvasMinX - paddleW / 2, 0);
            setPaddleX(Math.min(width - paddleW, newValue));
            //paddlex = Math.min(width - paddleW, newValue);
        }
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                id="canvas"
                width="500"
                height="300"
                onMouseMove={(event) => handleMouseMove(event)}
            ></canvas>
        </>
    );
}

export default BrickGame;
