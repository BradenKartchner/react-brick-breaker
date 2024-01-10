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

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
