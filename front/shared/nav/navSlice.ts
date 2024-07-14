import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { NavItemsMediaQueryWidths } from '@widgets/nav'
import { setMenuItemPropValue } from './setMenuItemPropValue'
import type { MenuItemType, NavItemIdKey } from './type'

const initialState = {
  navStructure: [] as MenuItemType[],
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
    addNavStructure: (
      state,
      action: PayloadAction<{
        navStructure: MenuItemType[]
      }>,
    ) => {
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
    setNavMediaQueryWidths: (
      state,
      action: PayloadAction<NavItemsMediaQueryWidths>,
    ) => {
      const elementMediaQueryWidths = action.payload
      state.mediaQueryWidth = elementMediaQueryWidths
    },
    setNavItemRightPos: (state, action: PayloadAction<number>) => {
      const rightPos = action.payload
      state.navItemRightPos = rightPos
    },
    openMenuWithId: (state, action: PayloadAction<string>) => {
      state.idsToCurrentMenuItems = ['top', action.payload]
      state.idsToNextMenuItems = ['top', action.payload]
    },
    closeMenu: (state) => {
      state.idsToNextMenuItems = ['top']
      state.idsToCurrentMenuItems = ['top']
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
    showLoadingIcon: (
      state,
      action: PayloadAction<{
        navMenuItemIdKey: NavItemIdKey
      }>,
    ) => {
      const { navMenuItemIdKey } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemIdKey: navMenuItemIdKey,
        prop: 'isLoading',
        value: true,
      })
    },
    hideLoadingIcon: (
      state,
      action: PayloadAction<{
        navMenuItemIdKey: NavItemIdKey
      }>,
    ) => {
      const { navMenuItemIdKey } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemIdKey: navMenuItemIdKey,
        prop: 'isLoading',
        value: false,
      })
    },
    showSuccessIcon: (
      state,
      action: PayloadAction<{
        navMenuItemIdKey: NavItemIdKey
      }>,
    ) => {
      const { navMenuItemIdKey } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemIdKey: navMenuItemIdKey,
        prop: 'isSuccess',
        value: true,
      })
    },
    hideSuccessIcon: (
      state,
      action: PayloadAction<{
        navMenuItemIdKey: NavItemIdKey
      }>,
    ) => {
      const { navMenuItemIdKey } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemIdKey: navMenuItemIdKey,
        prop: 'isSuccess',
        value: false,
      })
    },
    showErrorIcon: (
      state,
      action: PayloadAction<{
        navMenuItemIdKey: NavItemIdKey
      }>,
    ) => {
      const { navMenuItemIdKey } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemIdKey: navMenuItemIdKey,
        prop: 'isError',
        value: true,
      })
    },
    hideErrorIcon: (
      state,
      action: PayloadAction<{
        navMenuItemIdKey: NavItemIdKey
      }>,
    ) => {
      const { navMenuItemIdKey } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemIdKey: navMenuItemIdKey,
        prop: 'isError',
        value: false,
      })
    },
    disableAllTopNavItems: (
      state,
      action: PayloadAction<{
        exceptNavItemIdKeys?: NavItemIdKey[]
      }>,
    ) => {
      const { exceptNavItemIdKeys } = action.payload

      const topLevelNavMenu = state.navStructure[0]
      if (!topLevelNavMenu) return

      const topNavItemsIds = topLevelNavMenu.menuItems?.map(
        (menuItem) => menuItem.id,
      ) as NavItemIdKey[]

      topNavItemsIds?.forEach((id) => {
        if (exceptNavItemIdKeys?.includes(id)) return

        setMenuItemPropValue({
          menu: state.navStructure,
          navItemIdKey: id,
          prop: 'disabled',
          value: true,
        })
      })
    },
    enableAllTopNavItems: (state) => {
      const topLevelNavMenu = state.navStructure[0]
      if (!topLevelNavMenu) return

      const topNavItemsIds = topLevelNavMenu.menuItems?.map(
        (menuItem) => menuItem.id,
      ) as NavItemIdKey[]

      topNavItemsIds?.forEach((id) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemIdKey: id,
          prop: 'disabled',
          value: false,
        })
      })
    },
    disableNavItems: (
      state,
      action: PayloadAction<{
        navItemIdKeys: NavItemIdKey[]
      }>,
    ) => {
      const { navItemIdKeys } = action.payload

      navItemIdKeys.forEach((navItemIdKey) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemIdKey,
          prop: 'disabled',
          value: true,
        })
      })
    },
    enableNavItems: (
      state,
      action: PayloadAction<{
        navItemIdKeys: NavItemIdKey[]
      }>,
    ) => {
      const { navItemIdKeys } = action.payload

      navItemIdKeys.forEach((navItemIdKey) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemIdKey,
          prop: 'disabled',
          value: false,
        })
      })
    },
    hideNavItems: (
      state,
      action: PayloadAction<{
        navItemIdKeys: NavItemIdKey[]
      }>,
    ) => {
      const { navItemIdKeys } = action.payload

      navItemIdKeys.forEach((navItemIdKey) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemIdKey,
          prop: 'isHidden',
          value: true,
        })
      })
    },
    showNavItems: (
      state,
      action: PayloadAction<{
        navItemIdKeys: NavItemIdKey[]
      }>,
    ) => {
      const { navItemIdKeys } = action.payload

      navItemIdKeys.forEach((navItemIdKey) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemIdKey,
          prop: 'isHidden',
          value: false,
        })
      })
    },
    removeUnderlineFromTopNav: (state) => {
      const topLevelNavMenu = state.navStructure[0]
      if (!topLevelNavMenu) return

      const topNavItemsIds = topLevelNavMenu.menuItems?.map(
        (menuItem) => menuItem.id,
      ) as NavItemIdKey[]

      topNavItemsIds?.forEach((id) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemIdKey: id,
          prop: 'isActive',
          value: false,
        })
      })
    },
    underlineNavItem: (
      state,
      action: PayloadAction<{
        navItemIdKey: NavItemIdKey
      }>,
    ) => {
      const { navItemIdKey } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemIdKey,
        prop: 'isActive',
        value: true,
      })
    },
  },
})

export const navReducer = navSlice.reducer
