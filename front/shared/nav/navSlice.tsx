import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { setMenuItemPropValue } from './setMenuItemPropValue'
import type { NavItem, NavItemId } from './type'
import { getMenuItemPropValue } from './getMenuItemPropValue'
import { navStructure as navStructureOriginal } from '@widgets/nav/navStructure'
import { navItemId as navItemIdKey } from '@shared/consts/navItemId'
import { getNavItem } from './ui/NavList/NavItem/Menu/functions/getNavItem'
import { RiAdminLine } from 'react-icons/ri'
import { RxPerson } from 'react-icons/rx'

const initialState = {
  navStructure: [] as NavItem[],
  burger: { isOpen: false },
  idsToCurrentMenuItems: [navItemIdKey.burger] as NavItemId[],
  currentMenuNavItemId: null as NavItemId | null,
  nextMenuNavItemId: null as NavItemId | null,
  navItemRightPos: 0,
  hoverIndex: -1,
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
      state.idsToCurrentMenuItems = [navItemIdKey.burger, navItemId]
      state.currentMenuNavItemId = navItemId
      state.nextMenuNavItemId = navItemId
    },
    closeMenu: (state) => {
      state.idsToCurrentMenuItems = [navItemIdKey.burger]
      state.burger.isOpen = false
      state.hoverIndex = -1
      state.currentMenuNavItemId = null
      state.nextMenuNavItemId = null
    },
    goDownInCurrentMenu: (
      state,
      action: PayloadAction<{ navItemId: NavItemId }>,
    ) => {
      const { navItemId } = action.payload
      state.idsToCurrentMenuItems = [...state.idsToCurrentMenuItems, navItemId]
      state.currentMenuNavItemId = navItemId
    },
    goUpInCurrentMenu: (state) => {
      state.idsToCurrentMenuItems = state.idsToCurrentMenuItems.slice(0, -1)
      const currentMenuNavItemId = state.currentMenuNavItemId

      if (currentMenuNavItemId) {
        const { parentNavItem } = getNavItem({
          navItemId: currentMenuNavItemId,
          navState: state,
        })

        if (parentNavItem) {
          state.currentMenuNavItemId = parentNavItem.id
        }
      }
    },
    goDownInNextMenu: (
      state,
      action: PayloadAction<{ navItemId: NavItemId }>,
    ) => {
      const { navItemId } = action.payload
      state.nextMenuNavItemId = navItemId
    },
    goUpInNextMenu: (state) => {
      const nextMenuNavItemId = state.nextMenuNavItemId

      if (nextMenuNavItemId) {
        const { parentNavItem } = getNavItem({
          navItemId: nextMenuNavItemId,
          navState: state,
        })

        if (parentNavItem) {
          state.nextMenuNavItemId = parentNavItem.id
        }
      }
    },
    setMenuItemHoverIndex: (
      state,
      action: PayloadAction<{ menuItemHoverIndex: number }>,
    ) => {
      const { menuItemHoverIndex } = action.payload
      state.hoverIndex = menuItemHoverIndex
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
        (navItem) => navItem.id,
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
        (navItem) => navItem.id,
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
        (navItem) => navItem.id,
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
    showAdminIcon: (state) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: navItemIdKey.profile,
        prop: 'icon',
        value: <RiAdminLine />,
      })
    },
    showUserIcon: (state) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: navItemIdKey.profile,
        prop: 'icon',
        value: <RxPerson data-testid='profile icon' />,
      })
    },
  },
})

export const navReducer = navSlice.reducer
