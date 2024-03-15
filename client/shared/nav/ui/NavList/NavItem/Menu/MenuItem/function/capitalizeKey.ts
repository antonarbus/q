export const capitalizeKey = (keyStr: string): string => {
  return keyStr
    .toUpperCase()
    .replaceAll('CONTROL', 'Ctrl')
    .replaceAll('ALT', 'Alt')
    .replaceAll('META', 'Meta')
    .replaceAll('SHIFT', 'Shift')
    .replaceAll('OPTION', 'Opt')
    .replaceAll('TAB', 'Tab')
    .replaceAll('BACKSPACE', 'Backspace')
    .replaceAll('ENTER', 'Enter')
    .replaceAll('DELETE', 'Delete')
    .replaceAll('END', 'End')
    .replaceAll('HOME', 'Home')
    .replaceAll('PAGEDOWN', 'PageDown')
    .replaceAll('PAGEUP', 'PageUp')
    .replaceAll('CLEAR', 'Clear')
}
