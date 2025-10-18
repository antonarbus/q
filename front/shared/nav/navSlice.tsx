import {
  createSlice,
  type PayloadAction,
  type Reducer,
  type WritableDraft,
} from '@reduxjs/toolkit'
import { instance } from '@shared/instance'
import { navItemId as navItemIdKey } from '@shared/nav/navItemId'
import { RiAdminLine } from 'react-icons/ri'
import { RxPerson } from 'react-icons/rx'
import { getMenuItemPropValue } from './getMenuItemPropValue'
import { setMenuItemPropValue } from './setMenuItemPropValue'
import type { NavItem, NavItemId } from './type'
import { getNavItem } from './ui/NavList/NavItem/Menu/functions/getNavItem'

type InitState = {
  navStructure: NavItem[]
  burger: {
    isOpen: boolean
  }
  idsToCurrentMenuItems: NavItemId[]
  currentMenuNavItemId: NavItemId | null
  nextMenuNavItemId: NavItemId | null
  navItemRightPos: number
  hoverIndex: number
}

const initialState: InitState = {
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
      state: WritableDraft<InitState>,
      action: PayloadAction<{
        navStructure: NavItem[]
      }>,
    ) => {
      const { navStructure } = action.payload
      state.navStructure = navStructure
    },
    closeBurger: (state: WritableDraft<InitState>) => {
      state.burger.isOpen = false
    },
    toggleBurger: (state: WritableDraft<InitState>) => {
      state.burger.isOpen = state.burger.isOpen === false
    },
    setNavItemRightPos: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ navItemRightPos: number }>,
    ) => {
      const { navItemRightPos } = action.payload
      state.navItemRightPos = navItemRightPos
    },
    openMenuWithId: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ navItemId: NavItemId }>,
    ) => {
      const { navItemId } = action.payload
      state.idsToCurrentMenuItems = [navItemIdKey.burger, navItemId]
      state.currentMenuNavItemId = navItemId
      state.nextMenuNavItemId = navItemId
    },
    closeMenu: (state: WritableDraft<InitState>) => {
      state.idsToCurrentMenuItems = [navItemIdKey.burger]
      state.burger.isOpen = false
      state.hoverIndex = -1
      state.currentMenuNavItemId = null
      state.nextMenuNavItemId = null
    },
    goDownInCurrentMenu: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ navItemId: NavItemId }>,
    ) => {
      const { navItemId } = action.payload
      state.idsToCurrentMenuItems = [...state.idsToCurrentMenuItems, navItemId]
      state.currentMenuNavItemId = navItemId
    },
    goUpInCurrentMenu: (state: WritableDraft<InitState>) => {
      state.idsToCurrentMenuItems = state.idsToCurrentMenuItems.slice(0, -1)
      const { currentMenuNavItemId } = state

      if (currentMenuNavItemId !== null) {
        const { parentNavItem } = getNavItem({
          navItemId: currentMenuNavItemId,
          navState: state,
        })

        if (parentNavItem !== null) {
          state.currentMenuNavItemId = parentNavItem.id
        }
      }
    },
    goDownInNextMenu: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ navItemId: NavItemId }>,
    ) => {
      const { navItemId } = action.payload
      state.nextMenuNavItemId = navItemId
    },
    goUpInNextMenu: (state: WritableDraft<InitState>) => {
      const { nextMenuNavItemId } = state

      if (nextMenuNavItemId !== null) {
        const { parentNavItem } = getNavItem({
          navItemId: nextMenuNavItemId,
          navState: state,
        })

        if (parentNavItem !== null) {
          state.nextMenuNavItemId = parentNavItem.id
        }
      }
    },
    setMenuItemHoverIndex: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ menuItemHoverIndex: number }>,
    ) => {
      const { menuItemHoverIndex } = action.payload
      state.hoverIndex = menuItemHoverIndex
    },
    startLoadingIcon: (
      state: WritableDraft<InitState>,
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
      state: WritableDraft<InitState>,
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
          menu: instance.navStructure,
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
      state: WritableDraft<InitState>,
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
      state: WritableDraft<InitState>,
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
      state: WritableDraft<InitState>,
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
      state: WritableDraft<InitState>,
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
      state: WritableDraft<InitState>,
      action: PayloadAction<
        | {
            exceptNavItemIds?: NavItemId[]
          }
        | undefined
      >,
    ) => {
      const { exceptNavItemIds = [] } = action.payload ?? {}
      const [topLevelNavMenu] = state.navStructure

      if (topLevelNavMenu === undefined) {
        return
      }

      const topNavItemsIds = (topLevelNavMenu.navItems ?? []).map(
        (navItem) => navItem.id,
      )

      topNavItemsIds.forEach((id) => {
        const didPressExcludedNavItem = exceptNavItemIds.includes(id)

        if (didPressExcludedNavItem === true) {
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
      state: WritableDraft<InitState>,
      action: PayloadAction<
        | {
            exceptNavItemIds?: NavItemId[]
          }
        | undefined
      >,
    ) => {
      const { exceptNavItemIds = [] } = action.payload ?? {}
      const [topLevelNavMenu] = state.navStructure

      if (topLevelNavMenu === undefined) {
        return
      }

      const topNavItemsIds = (topLevelNavMenu.navItems ?? []).map(
        (navItem) => navItem.id,
      )

      topNavItemsIds.forEach((id) => {
        const didPressExcludedNavItem = exceptNavItemIds.includes(id)

        if (didPressExcludedNavItem === true) {
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
      state: WritableDraft<InitState>,
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
      state: WritableDraft<InitState>,
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
      state: WritableDraft<InitState>,
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
      state: WritableDraft<InitState>,
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
    removeUnderlineFromTopNav: (state: WritableDraft<InitState>) => {
      const [topLevelNavMenu] = state.navStructure

      if (topLevelNavMenu === undefined) {
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
      state: WritableDraft<InitState>,
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
    showAdminIcon: (state: WritableDraft<InitState>) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: navItemIdKey.profile,
        prop: 'icon',
        value: <RiAdminLine />,
      })
    },
    showUserIcon: (state: WritableDraft<InitState>) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: navItemIdKey.profile,
        prop: 'icon',
        value: <RxPerson data-testid='profile icon' />,
      })
    },
  },
})

export const navReducer: Reducer<InitState> = navSlice.reducer
