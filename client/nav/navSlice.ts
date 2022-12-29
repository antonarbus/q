import { MenuType, navStructure } from '@client/nav/navStructure'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@client/store'

const initialState = {
  navStructure,
  burger: { isOpen: false },
  mediaEnabled: true,
  mediaQueryWidth: { logoExtension: 0, logoPart: 0, icon: 0, name: 0, burger: 0 },
  idsToCurrentMenuItems: ['top'],
  idsToNextMenuItems: ['top'],
  navItemRightPos: 0,
  menuItemHoverIndex: 0
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    closeBurger: (state) => { state.burger.isOpen = false },
    toggleBurger: (state) => { state.burger.isOpen = !state.burger.isOpen },
    disableMedia: (state) => { state.mediaEnabled = false },
    enableMedia: (state) => { state.mediaEnabled = true },
    setNavMediaQueryWidths: (state, action) => {
      const { logoExtension, logoPart, icon, name, burger } = action.payload
      state.mediaQueryWidth.logoExtension = logoExtension
      state.mediaQueryWidth.logoPart = logoPart
      state.mediaQueryWidth.icon = icon
      state.mediaQueryWidth.name = name
      state.mediaQueryWidth.burger = burger
    },
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
    /**
     * @summary can change any property in navStructure, for ex we can change icon or hide menuItem
     * @example <caption>Example usage of in redux dev tools</caption>
     * {
          type: 'navSlice/setPropValueByIdInNavStructure',
          payload: { id: 'Offer', prop: 'isHidden', value: true }
        }
     */
    setPropValueByIdInNavStructure: (state, action) => {
      const { id, prop, value } = action.payload

      type Props = {
        navStructure: MenuType[],
        id: string,
        prop: 'isHidden' | 'icon' | 'name' | 'link' | 'func',
        value: any
      }

      function searchItemByIdAndSetValueToProp ({ navStructure, id, prop, value }: Props) {
        navStructure.forEach((el: MenuType) => {
          if (el.id === id) {
            el[prop] = value
            return
          }
          if (el.menuItems) searchItemByIdAndSetValueToProp({ navStructure: el.menuItems, id, prop, value })
        })
      }
      searchItemByIdAndSetValueToProp({ navStructure: state.navStructure, id, prop, value })
    }
  }
})

export default navSlice.reducer
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
  setPropValueByIdInNavStructure,
  disableMedia,
  enableMedia
} = navSlice.actions

// selectors
export const getMenuItemByIdsChainSelector = (idsToCurrentMenuItems: string[]) => (state: RootState) => {
  const navStructure = state.nav.navStructure

  let clicked: MenuType[] = navStructure
  let tempMenu: MenuType[] = navStructure
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
