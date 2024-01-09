import { useState, useRef, useEffect } from "react";
import "./Game.css";

function Game({ handleScore }) {
    // global variables that do NOT need state
    var brickWidth, width, height, bricks;
    var ncols = 6;
    var nrows = 5;
    var padding = 1;
    var paddleh = 10;
    var paddlew = 75;
    var intervalId = 0;
    var brickHeight = 15;
    var ballRadius = 10;
    var brick_colors = [
        "rgb(237, 76, 103)",
        "rgb(181, 52, 113)",
        "rgb(131, 52, 113)",
        "rgb(111, 30, 81)",
    ];
    var paddlecolor = "black";
    var ballcolor = "black";
    var backcolor = "grey";
    var x = 200;
    var y = 150;
    var dx = 1;
    var dy = -3;

    // global vars that DO need state
    const [paddleX, setPaddleX] = useState(0);
    const [canvasMinX, setCanvasMinX] = useState(0);
    const [canvasMaxX, setCanvasMaxX] = useState(0);
    const [paused, setPaused] = useState(false);

    // get reference to canvas
    const canvasRef = useRef(null);

    // init(). on loading document, draw the initial canvas
    useEffect(() => {
        // context vars declared here
        const myCanvas = canvasRef.current;
        const ctx = myCanvas.getContext("2d");
        ctx.fillStyle = backcolor;
        width = myCanvas.width;
        height = myCanvas.height;
        ctx.fillRect(0, 0, width, height);
        setPaddleX(width / ncols - 1);
        brickWidth = width / ncols - 1;
        setCanvasMinX(myCanvas.offsetLeft);
        setCanvasMaxX(canvasMinX + width);
        // TODO: initialize bricks, draw everything once by calling draw()?
        init_bricks();
        draw();
        // TODO: add message to display "click to start"
    });

    // init_bricks() function
    function init_bricks() {
        bricks = new Array(nrows);
        for (let i = 0; i < nrows; i++) {
            // for each row of bricks
            bricks[i] = new Array(ncols);
            for (let j = 0; j < ncols; j++) {
                // for each column of bricks
                bricks[i][j] = true;
            }
        }
    }

    // used to draw the ball
    function circle(x, y, r) {
        const myCanvas = canvasRef.current;
        var ctx = myCanvas.getContext("2d");
        ctx.fillStyle = ballcolor;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    // used to draw each brick & the paddle
    function rect(x, y, w, h, color) {
        const myCanvas = canvasRef.current;
        var ctx = myCanvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    // clear everything from the canvas
    function clear() {
        const myCanvas = canvasRef.current;
        var ctx = myCanvas.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        rect(0, 0, width, height, backcolor);
    }

    // function to draw the bricks
    // render the bricks
    function draw_bricks() {
        const myCanvas = canvasRef.current;
        var ctx = myCanvas.getContext("2d");
        for (let i = 0; i < nrows; i++) {
            // for each row of bricks
            for (let j = 0; j < ncols; j++) {
                // for each column of bricks
                // set the colors to alternate through
                // all colors in brick_colors array
                // modulus (%, aka remainder) ensures the colors
                // rotate through the whole range of brick_colors
                ctx.fillStyle = brick_colors[(i + j) % brick_colors.length];
                if (bricks[i][j]) {
                    rect(
                        j * (brickWidth + padding) + padding,
                        i * (brickHeight + padding) + padding,
                        brickWidth,
                        brickHeight
                    );
                } // else if bricks[i][j] is false it's already been hit
            }
        }
    }

    // main drawing function. call this on an interval to play the game
    function draw() {
        const myCanvas = canvasRef.current;
        var ctx = myCanvas.getContext("2d");
        // clear everything from Canvas each frame, then redraw
        clear();
        // draw ball
        circle(x, y, ballRadius);
        // draw paddle
        rect(paddleX, height - paddleh, paddlew, paddleh, paddlecolor);
        // draw the bricks by calling draw_bricks()
        draw_bricks();

        // check if we have hit a brick
        let rowheight = brickHeight + padding;
        let colwidth = brickWidth + padding;
        row = Math.floor(y / rowheight);
        col = Math.floor(x / colwidth);
    }

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

export default Game;
