import { theme } from '@libras/theme'
import { useSelectorTyped } from '@shared/hooks'

/**
 * check if menu width is more than distance to the left side of the window
 * @descriptions
 * - on NavItem click we store its 'right' position
 * - menu is absolute positioned below <li> and has same 'right' position
 * - if window is narrow, then menu can go over the screen's left side
 * - if so, we can fix 'left' side of the menu, instead of 'right'
 */
export const useIsMenuOutsideWindow = (): boolean => {
  const navItemRightPos = useSelectorTyped(state => state.nav.navItemRightPos)
  const isMenuOutsideWindow = theme.menu.width > navItemRightPos
  return isMenuOutsideWindow
}
