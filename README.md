# Tetris with react

Idea: create a game using the DOM with react hooks and try how far I can get with it...

## WHY

Fun, practice, experiment, learn.

### Why not use canvas or a game engine?

Not using an enginer because this is a experiment with react hooks.
On the other hand, I'm rendering divs as a first iteration implementation, but it should be relatively easy to adapt the game state to a canvas or even an svg renderer.

## TODO

- add settings panel
- add music turned off by default
- add sounds settings on or mute (by default mute)
- add sound setting for line eating x1, x2, (x3 or more)
- add sound setting for level transition
- add sound setting for game over
- add sound setting for regular thick
- add auto fit to rotation command
- add theme selector
- polish shapes with gradients and transitions
- make it similar to theme c palace and adjusting a theme
- add one more level of complexity: scarsity for I, etc
- complete other themes
- hide first 3 lines?

## DONE

- onscreen basic joystick
- add blast command
- basic game mechanism
- react native compatibility
- separate state from UI
- support theme
- test shape positions
- support levels of complexity
- expose generic handlers for alternative inputs like press
- keyboard support

## KNOWN ISSUES

- elapsed time counts pause / resume time
