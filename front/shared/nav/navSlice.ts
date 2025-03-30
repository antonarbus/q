import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { setMenuItemPropValue } from './setMenuItemPropValue'
import type { NavItem, NavItemId } from './type'
import { getMenuItemPropValue } from './getMenuItemPropValue'
import { navStructure as navStructureOriginal } from '@widgets/nav/navStructure'
import { navItemId as navItemIdKey } from '@shared/consts/navItemId'

const initialState = {
  navStructure: [] as NavItem[],
  burger: { isOpen: false },
  idsToCurrentMenuItems: [navItemIdKey.top] as NavItemId[],
  idsToNextMenuItems: [navItemIdKey.top] as NavItemId[],
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
        navStructure: NavItem[]
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
    setNavItemRightPos: (
      state,
      action: PayloadAction<{ navItemRightPos: number }>,
    ) => {
      const { navItemRightPos } = action.payload
      state.navItemRightPos = navItemRightPos
    },
    openMenuWithId: (
      state,
      action: PayloadAction<{ navItemId: NavItemId }>,
    ) => {
      const { navItemId } = action.payload
      state.idsToCurrentMenuItems = [navItemIdKey.top, navItemId]
      state.idsToNextMenuItems = [navItemIdKey.top, navItemId]
    },
    closeMenu: (state) => {
      state.idsToNextMenuItems = [navItemIdKey.top]
      state.idsToCurrentMenuItems = [navItemIdKey.top]
      state.burger.isOpen = false
      state.menuItemHoverIndex = 0
    },
    goDownInCurrentMenu: (
      state,
      action: PayloadAction<{ navItemId: NavItemId }>,
    ) => {
      const { navItemId } = action.payload
      state.idsToCurrentMenuItems = [...state.idsToCurrentMenuItems, navItemId]
    },
    goUpInCurrentMenu: (state) => {
      state.idsToCurrentMenuItems = state.idsToCurrentMenuItems.slice(0, -1)
    },
    goDownInNextMenu: (
      state,
      action: PayloadAction<{ navItemId: NavItemId }>,
    ) => {
      const { navItemId } = action.payload
      state.idsToNextMenuItems = [...state.idsToNextMenuItems, navItemId]
    },
    goUpInNextMenu: (state) => {
      state.idsToNextMenuItems = state.idsToNextMenuItems.slice(0, -1)
    },
    setMenuItemHoverIndex: (
      state,
      action: PayloadAction<{ menuItemHoverIndex: number }>,
    ) => {
      const { menuItemHoverIndex } = action.payload
      state.menuItemHoverIndex = menuItemHoverIndex
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

      const topNavItemsIds = (topLevelNavMenu.navItems ?? []).map(
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

      const topNavItemsIds = (topLevelNavMenu.navItems ?? []).map(
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

      const topNavItemsIds = (topLevelNavMenu.navItems ?? []).map(
        (menuItem) => menuItem.id,
      )

      topNavItemsIds.forEach((navItemId) => {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId,
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
