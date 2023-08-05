// unfortunately height: auto is not animated
// we need to manually control height of menu to animate it
// calculate height of fake menu div to manually set height to Menu for animation
export const elementHeight = (el: HTMLElement): number => {
  const height = el.offsetHeight
  return height
};
