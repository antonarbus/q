/** Mouse coordinates tracked globally */
export const mousePosition = { x: 0, y: 0 }

export const trackMousePosition = (): void => {
  window.addEventListener('mousemove', (event: MouseEvent): void => {
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
  })
}
