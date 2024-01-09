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
    var score = 0;
    var paddleX = 0;
    var canvasMinX, canvasMaxX;

    // global vars that DO need state
    const [paused, setPaused] = useState(false);
    var intervalIdRef = useRef(null);

    // get reference to canvas
    const canvasRef = useRef(null);
    var myCanvas;
    const isFirstRender = useRef(true);

    useEffect(() => {
        // context vars declared here
        if (isFirstRender.current) {
            myCanvas = canvasRef.current;
            init();
        }
        isFirstRender.current = false;
        // for strictMode
        return () => {
            isFirstRender.current = true;
        };
    }, []);

    // init(). on loading document, draw the initial canvas
    function init() {
        // context vars declared here
        myCanvas = canvasRef.current;
        const ctx = myCanvas.getContext("2d");
        ctx.fillStyle = backcolor;
        width = myCanvas.width;
        height = myCanvas.height;
        ctx.fillRect(0, 0, width, height);
        paddleX = width / ncols - 1;
        brickWidth = width / ncols - 1;
        canvasMinX = myCanvas.offsetLeft;
        canvasMaxX = canvasMinX + width;
        console.log("ran init");
        // TODO: initialize bricks, draw everything once by calling draw()?
        init_bricks();
        draw();
        start_animation();
        // TODO: add message to display "click to start"
    }

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
        myCanvas = canvasRef.current;
        var ctx = myCanvas.getContext("2d");
        ctx.fillStyle = ballcolor;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    // used to draw each brick & the paddle
    function rect(x, y, w, h, color) {
        myCanvas = canvasRef.current;
        var ctx = myCanvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    // clear everything from the canvas
    function clear() {
        myCanvas = canvasRef.current;
        var ctx = myCanvas.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        rect(0, 0, width, height, backcolor);
    }

    // function to draw the bricks
    // render the bricks
    function draw_bricks() {
        myCanvas = canvasRef.current;
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
                        brickHeight,
                        brick_colors[(i + j) % brick_colors.length]
                    );
                } // else if bricks[i][j] is false it's already been hit
            }
        }
    }

    // main drawing function. call this on an interval to play the game
    function draw() {
        // const myCanvas = canvasRef.current;
        // var ctx = myCanvas.getContext("2d");
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
        let row = Math.floor(y / rowheight);
        let col = Math.floor(x / colwidth);
        // if hit brick, reverse ball and mark brick as broken, update score
        if (y < nrows * rowheight && row >= 0 && col >= 0 && bricks[row][col]) {
            dy = -dy;
            bricks[row][col] = false;
            score += 1;
            //handleScore(score);
        }

        // rebound ball off of canvas walls
        if (x + dx > width || x + dx < 0) {
            dx = -dx;
        }
        if (y + dy < 0) {
            dy = -dy;
        } else if (y + dy > height - paddleh) {
            // check if the ball is hitting the
            // paddle and if it is rebound it
            if (x > paddleX && x < paddleX + paddlew) {
                dy = -dy;
            }
        }
        if (y + dy > height) {
            //game over, so stop the animation
            stop_animation();
        }
        x += dx;
        y += dy;
    }

    // call this to start playing the game
    function start_animation() {
        intervalIdRef.current = setInterval(draw, 100);
        console.log(intervalIdRef.current);
    }

    // call this to stop the game, aka when the player loses or when paused
    function stop_animation() {
        clearInterval(intervalIdRef.current);
        console.log("game over");
    }

    // handle mouse moving over the canvas events
    function handleMouseMove(evt) {
        if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
            paddleX = Math.max(evt.pageX - canvasMinX - paddlew / 2, 0);
            paddleX = Math.min(width - paddlew, paddleX);
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

export default Game;
