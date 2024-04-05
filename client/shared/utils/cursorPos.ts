export const cursorPos = {
  x: 0,
  y: 0,
}

document.addEventListener('mousemove', function(e) {
  cursorPos.x = e.pageX
  cursorPos.y = e.pageY
}, false)
