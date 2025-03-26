import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { setMenuItemPropValue } from './setMenuItemPropValue'
import type { MenuItemType, NavItemId, NavItemsMediaQueryWidths } from './type'
import { getMenuItemPropValue } from './getMenuItemPropValue'
import { navStructure as navStructureOriginal } from '@widgets/nav/navStructure'

const initialState = {
  navStructure: [] as MenuItemType[],
  burger: { isOpen: false },
  mediaEnabled: true,
  mediaQueryWidth: {
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
    startLoadingIcon: (
      state,
      action: PayloadAction<{
        navItemId: NavItemId
        navItemNameWhileLoading?: string
      }>,
    ) => {
      const { navItemId, navItemNameWhileLoading } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId,
        prop: 'isLoading',
        value: true,
      })

      if (navItemNameWhileLoading !== undefined) {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId,
          prop: 'name',
          value: navItemNameWhileLoading,
        })
      }
    },
    stopLoadingIcon: (
      state,
      action: PayloadAction<{
        navItemId: NavItemId
        navItemNameWhileLoading?: string
      }>,
    ) => {
      const { navItemId, navItemNameWhileLoading } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId,
        prop: 'isLoading',
        value: false,
      })

      if (navItemNameWhileLoading !== undefined) {
        const initialMenuItemName = getMenuItemPropValue({
          menu: navStructureOriginal,
          navItemId,
          prop: 'name',
        })

        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId,
          prop: 'name',
          value: initialMenuItemName ?? 'no name',
        })
      }
    },
    showSuccessIcon: (
      state,
      action: PayloadAction<{
        navItemId: NavItemId
      }>,
    ) => {
      const { navItemId } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId,
        prop: 'isSuccess',
        value: true,
      })
    },
    hideSuccessIcon: (
      state,
      action: PayloadAction<{
        navItemId: NavItemId
      }>,
    ) => {
      const { navItemId } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId,
        prop: 'isSuccess',
        value: false,
      })
    },
    showErrorIcon: (
      state,
      action: PayloadAction<{
        navItemId: NavItemId
      }>,
    ) => {
      const { navItemId } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId,
        prop: 'isError',
        value: true,
      })
    },
    hideErrorIcon: (
      state,
      action: PayloadAction<{
        navItemId: NavItemId
      }>,
    ) => {
      const { navItemId } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId,
        prop: 'isError',
        value: false,
      })
    },
    disableTopNavItems: (
      state,
      action: PayloadAction<
        | {
            exceptNavItemIds?: NavItemId[]
          }
        | undefined
      >,
    ) => {
      const { exceptNavItemIds = [] } = action.payload ?? {}

      const topLevelNavMenu = state.navStructure[0]

      if (!topLevelNavMenu) {
        return
      }

      const topNavItemsIds = (topLevelNavMenu.menuItems ?? []).map(
        (menuItem) => menuItem.id,
      )

      topNavItemsIds.forEach((id) => {
        if (exceptNavItemIds.includes(id)) {
          return
        }

        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId: id,
          prop: 'disabled',
          value: true,
        })
      })
    },
    enableTopNavItems: (
      state,
      action: PayloadAction<
        | {
            exceptNavItemIds?: NavItemId[]
          }
        | undefined
      >,
    ) => {
      const { exceptNavItemIds = [] } = action.payload ?? {}

      const topLevelNavMenu = state.navStructure[0]

      if (!topLevelNavMenu) {
        return
      }

      const topNavItemsIds = (topLevelNavMenu.menuItems ?? []).map(
        (menuItem) => menuItem.id,
      )

      topNavItemsIds.forEach((id) => {
        if (exceptNavItemIds.includes(id)) {
          return
        }

        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId: id,
          prop: 'disabled',
          value: false,
        })
      })
    },
    disableNavItems: (
      state,
      action: PayloadAction<{
        navItemIds: NavItemId[]
      }>,
    ) => {
      const { navItemIds } = action.payload

      navItemIds.forEach((navItemId) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId,
          prop: 'disabled',
          value: true,
        })
      })
    },
    enableNavItems: (
      state,
      action: PayloadAction<{
        navItemIds?: NavItemId[]
      }>,
    ) => {
      const { navItemIds } = action.payload

      navItemIds?.forEach((navItemId) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId,
          prop: 'disabled',
          value: false,
        })
      })
    },
    hideNavItems: (
      state,
      action: PayloadAction<{
        navItemIds: NavItemId[]
      }>,
    ) => {
      const { navItemIds } = action.payload

      navItemIds.forEach((navItemId) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId,
          prop: 'isHidden',
          value: true,
        })
      })
    },
    showNavItems: (
      state,
      action: PayloadAction<{
        navItemIds: NavItemId[]
      }>,
    ) => {
      const { navItemIds } = action.payload

      navItemIds.forEach((navItemId) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId,
          prop: 'isHidden',
          value: false,
        })
      })
    },
    removeUnderlineFromTopNav: (state) => {
      const topLevelNavMenu = state.navStructure[0]

      if (!topLevelNavMenu) {
        return
      }

      const topNavItemsIds = (topLevelNavMenu.menuItems ?? []).map(
        (menuItem) => menuItem.id,
      )

      topNavItemsIds.forEach((id) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId: id,
          prop: 'isActive',
          value: false,
        })
      })
    },
    underlineNavItem: (
      state,
      action: PayloadAction<{
        navItemId: NavItemId
      }>,
    ) => {
      const { navItemId } = action.payload

      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId,
        prop: 'isActive',
        value: true,
      })
    },
  },
})

export const navReducer = navSlice.reducer
