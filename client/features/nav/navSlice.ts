import { Menu, navStructure } from 'client/features/nav/navStructure'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'client/app/store'
import { setMenuItemPropValue } from './functions/setMenuItemPropValue'

const initialState = {
  navStructure,
  burger: { isOpen: false },
  mediaEnabled: true,
  mediaQueryWidth: { logoExtension: 0, logoPart: 0, icon: 0, name: 0, burger: 0 },
  idsToCurrentMenuItems: ['top'],
  idsToNextMenuItems: ['top'],
  navItemRightPos: 0,
  menuItemHoverIndex: 0,
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    closeBurger: (state) => { state.burger.isOpen = false },
    toggleBurger: (state) => { state.burger.isOpen = !state.burger.isOpen },
    disableMedia: (state) => { state.mediaEnabled = false },
    enableMedia: (state) => { state.mediaEnabled = true },
    setNavMediaQueryWidths: (state, action) => { state.mediaQueryWidth = action.payload },
    setNavItemRightPos: (state, action) => { state.navItemRightPos = action.payload },
    openMenuWithId: (state, action) => { state.idsToCurrentMenuItems = state.idsToNextMenuItems = ['top', action.payload] },
    closeMenu: (state) => {
      state.idsToNextMenuItems = state.idsToCurrentMenuItems = ['top']
      state.burger.isOpen = false
      state.menuItemHoverIndex = 0
    },
    goDownInCurrentMenu: (state, action) => { state.idsToCurrentMenuItems = [...state.idsToCurrentMenuItems, action.payload] },
    goUpInCurrentMenu: (state) => { state.idsToCurrentMenuItems = state.idsToCurrentMenuItems.slice(0, -1) },
    goDownInNextMenu: (state, action) => { state.idsToNextMenuItems = [...state.idsToNextMenuItems, action.payload] },
    goUpInNextMenu: (state) => { state.idsToNextMenuItems = state.idsToNextMenuItems.slice(0, -1) },
    setMenuItemHoverIndex: (state, action) => { state.menuItemHoverIndex = action.payload },
    disableTopMenuItemsExceptItemId: (state, action: PayloadAction<{ exceptItemId?: string }>) => {
      const { exceptItemId } = action.payload
      const topNavItemsIds = state.navStructure[0].menuItems?.map(item => item.id)
      topNavItemsIds?.forEach((id) => {
        if (id === exceptItemId) return
        setMenuItemPropValue({ menu: state.navStructure, id, prop: 'disabled', value: true })
      })
    },
    enableTopMenuItems: (state) => {
      const topNavItemsIds = state.navStructure[0].menuItems?.map(item => item.id)
      topNavItemsIds?.forEach((id) => {
        setMenuItemPropValue({ menu: state.navStructure, id, prop: 'disabled', value: false })
      })
    },
    hideLogInMenuItem: (state) => {
      setMenuItemPropValue({ menu: state.navStructure, id: 'logIn', prop: 'isHidden', value: true })
    },
    showLogInMenuItem: (state) => {
      setMenuItemPropValue({ menu: state.navStructure, id: 'logIn', prop: 'isHidden', value: false })
    },
    showAccountMenuItem: (state) => {
      setMenuItemPropValue({ menu: state.navStructure, id: 'account', prop: 'isHidden', value: false })
    },
    hideAccountMenuItem: (state) => {
      setMenuItemPropValue({ menu: state.navStructure, id: 'account', prop: 'isHidden', value: true })
    },
  },
})

export const {
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
} = navSlice.actions

export const selectMenuItemByIdsChainSelector = (idsToCurrentMenuItems: string[]) => (state: RootState) => {
  const navStructure = state.nav.navStructure

  let clicked: Menu[] = navStructure
  let tempMenu: Menu[] = navStructure
  idsToCurrentMenuItems.forEach((id: string) => {
    if (id === 'burger') {
      clicked = navStructure[0].menuItems!
      return clicked
    }
    if (id !== 'burger') {
      clicked = tempMenu.find(menuItem => menuItem.id === id)?.menuItems || []
    }
    tempMenu = clicked
  })
  return clicked
}

export default navSlice.reducer
