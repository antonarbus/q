export type { MenuLevel } from './menuType'
export {
  closeBurger,
  toggleBurger,
  setNavMediaQueryWidths,
  setNavItemRightPos,
  openMenuWithId,
  closeMenu,
  // we track the state of 'current' and 'next' menus for the slide effect, coz we actually have two parallel menus
  // 1st menu state
  goDownInCurrentMenu,
  goUpInCurrentMenu,
  // 2nd menu state
  goDownInNextMenu,
  goUpInNextMenu,
  setMenuItemHoverIndex,
  showLogInMenuItem,
  hideLogInMenuItem,
  showAccountMenuItem,
  hideAccountMenuItem,
  disableTopMenuItemsExceptItemId,
  enableTopMenuItems,
  disableMedia,
  enableMedia,
  selectMenuItemByIdsChainSelector,
  navReducer,
} from './navSlice'
