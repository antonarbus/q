import { type RootState } from '@libras/store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { ItemsMediaQueryWidths } from '@widgets/nav'
import { setMenuItemPropValue } from './setMenuItemPropValue'
import type { MenuItemTypes } from './TMenuItem'

const initialState = {
  navStructure: [] as MenuItemTypes[],
  burger: { isOpen: false },
  mediaEnabled: true,
  mediaQueryWidth: {
    logoExtension: 0,
    logoPart: 0,
    icon: 0,
    name: 0,
    burger: 0,
  },
  idsToCurrentMenuItems: ['top'],
  idsToNextMenuItems: ['top'],
  navItemRightPos: 0,
  menuItemHoverIndex: 0,
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    addNavStructure: (state, action: PayloadAction<{
      navStructure: MenuItemTypes[]
    }>) => {
      const { navStructure } = action.payload
      state.navStructure = navStructure
    },
    closeBurger: (state) => {
      state.burger.isOpen = false
    },
    toggleBurger: (state) => {
      state.burger.isOpen = !state.burger.isOpen
    },
    disableMedia: (state) => {
      state.mediaEnabled = false
    },
    enableMedia: (state) => {
      state.mediaEnabled = true
    },
    setNavMediaQueryWidths: (state, action: PayloadAction<ItemsMediaQueryWidths>) => {
      const elementMediaQueryWidths = action.payload
      state.mediaQueryWidth = elementMediaQueryWidths
    },
    setNavItemRightPos: (state, action: PayloadAction<number>) => {
      const rightPos = action.payload
      state.navItemRightPos = rightPos
    },
    openMenuWithId: (state, action: PayloadAction<string>) => {
      state.idsToCurrentMenuItems = state.idsToNextMenuItems = ['top', action.payload]
    },
    closeMenu: (state) => {
      state.idsToNextMenuItems = state.idsToCurrentMenuItems = ['top']
      state.burger.isOpen = false
      state.menuItemHoverIndex = 0
    },
    goDownInCurrentMenu: (state, action: PayloadAction<string>) => {
      state.idsToCurrentMenuItems = [
        ...state.idsToCurrentMenuItems,
        action.payload,
      ]
    },
    goUpInCurrentMenu: (state) => {
      state.idsToCurrentMenuItems = state.idsToCurrentMenuItems.slice(0, -1)
    },
    goDownInNextMenu: (state, action: PayloadAction<string>) => {
      state.idsToNextMenuItems = [...state.idsToNextMenuItems, action.payload]
    },
    goUpInNextMenu: (state) => {
      state.idsToNextMenuItems = state.idsToNextMenuItems.slice(0, -1)
    },
    setMenuItemHoverIndex: (state, action: PayloadAction<number>) => {
      state.menuItemHoverIndex = action.payload
    },
    disableTopMenuItemsExceptItemId: (state, action: PayloadAction<{ exceptItemId?: string }>) => {
      const { exceptItemId } = action.payload
      const topLevelNavMenu = state.navStructure[0]
      if (!topLevelNavMenu) return
      const topNavItemsIds = topLevelNavMenu.menuItems?.map((item) => item.id)
      topNavItemsIds?.forEach((id) => {
        if (id === exceptItemId) return
        setMenuItemPropValue({
          menu: state.navStructure,
          id,
          prop: 'disabled',
          value: true,
        })
      })
    },
    enableTopMenuItems: (state) => {
      const topLevelNavMenu = state.navStructure[0]
      if (!topLevelNavMenu) return
      const topNavItemsIds = topLevelNavMenu.menuItems?.map((item) => item.id)
      topNavItemsIds?.forEach((id) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          id,
          prop: 'disabled',
          value: false,
        })
      })
    },
    hideLogInMenuItem: (state) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        id: 'logIn',
        prop: 'isHidden',
        value: true,
      })
    },
    showLogInMenuItem: (state) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        id: 'logIn',
        prop: 'isHidden',
        value: false,
      })
    },
    showAccountMenuItem: (state) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        id: 'account',
        prop: 'isHidden',
        value: false,
      })
    },
    hideAccountMenuItem: (state) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        id: 'account',
        prop: 'isHidden',
        value: true,
      })
    },
  },
})

export const selectMenuItemByIdsChainSelector =
  (idsToCurrentMenuItems: string[]) => (state: RootState): MenuItemTypes[] => {
    const topLevelNavMenu = state.nav.navStructure[0]
    if (!topLevelNavMenu) return state.nav.navStructure

    let clicked: MenuItemTypes[] = state.nav.navStructure
    let tempMenu: MenuItemTypes[] = state.nav.navStructure

    idsToCurrentMenuItems.forEach((id: string) => {
      if (id === 'burger') {
        clicked = topLevelNavMenu.menuItems ?? state.nav.navStructure
        return clicked
      }
      if (id !== 'burger') {
        clicked = tempMenu.find((menuItem) => menuItem.id === id)?.menuItems ?? []
      }
      tempMenu = clicked
    })
    return clicked
  }
