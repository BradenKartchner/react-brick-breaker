# App design strategy

Which variables in Brick Breaker should be State variables?
Anything that would need the Canvas to be re-rendered when a change occurs:

-   the ball's position or velocity changes
-   a brick is contacted by the ball (a change occurs to a brick)
-   the game starts
-   the game ends
-   the score changes
-   the paddle changes position (mouse movement over canvas)
-   the user pauses the game (keypress event)
-   the user presses the "Try Again" button (button event)

How to execute the main game loop (re-rendering, etc)?
Ideas:

1. use the `useEffect()` hook to re-render the Canvas when any of the above variables changes, make sure to pass a second argument `[var1, var2, etc...]` so useEffect() knows when to run. actually, the Canvas will automatically re-render any time a state variable is updated, right? so what is `useEffect()` good for in this situation? re-setting the time interval?
2. how to get the game loop to run on an interval, using `setInterval(func, time)`? what is the goal here? re-render the canvas every `time` seconds? can we call useEffect() every `time` interval?
3. call `draw()` on an interval from within `useEffect(..., ([var1, var2, ...]))`, so that every time a state variable changes, the draw function is called to re-calculate the state (and other) variables, thus triggering the gameplay loop

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
