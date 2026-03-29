import { navItemId as navItemIdKey } from '@front/entities/nav/navItemId'
import { createSlice, type PayloadAction, type Reducer, type WritableDraft } from '@reduxjs/toolkit'
import { getNavStructure } from './navStructureHolder'
import { getMenuItemPropValue } from './getMenuItemPropValue'
import { setMenuItemPropValue } from './setMenuItemPropValue'
import type { NavItem, NavItemId } from './type'
import { getNavItem } from './ui/NavList/NavItem/Menu/functions/getNavItem'

type NavMode = 'full' | 'text-only' | 'icons-only' | 'hamburger'

type InitState = {
  navStructure: NavItem[]
  navMode: NavMode
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
  navMode: 'full' as NavMode,
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
    setNavMode: (state: WritableDraft<InitState>, action: PayloadAction<{ mode: NavMode }>) => {
      state.navMode = action.payload.mode
    },
    addNavStructure: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{
        navStructure: NavItem[]
      }>,
    ) => {
      state.navStructure = action.payload.navStructure
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
      state.navItemRightPos = action.payload.navItemRightPos
    },
    openMenuWithId: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ navItemId: NavItemId }>,
    ) => {
      state.idsToCurrentMenuItems = [navItemIdKey.burger, action.payload.navItemId]

      state.currentMenuNavItemId = action.payload.navItemId
      state.nextMenuNavItemId = action.payload.navItemId
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
      state.idsToCurrentMenuItems = [...state.idsToCurrentMenuItems, action.payload.navItemId]

      state.currentMenuNavItemId = action.payload.navItemId
    },
    goUpInCurrentMenu: (state: WritableDraft<InitState>) => {
      state.idsToCurrentMenuItems = state.idsToCurrentMenuItems.slice(0, -1)

      if (state.currentMenuNavItemId !== null) {
        const navItem = getNavItem({
          navItemId: state.currentMenuNavItemId,
          navState: state,
        })

        if (navItem.parent !== null) {
          state.currentMenuNavItemId = navItem.parent.id
        }
      }
    },
    goDownInNextMenu: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ navItemId: NavItemId }>,
    ) => {
      state.nextMenuNavItemId = action.payload.navItemId
    },
    goUpInNextMenu: (state: WritableDraft<InitState>) => {
      if (state.nextMenuNavItemId !== null) {
        const navItem = getNavItem({
          navItemId: state.nextMenuNavItemId,
          navState: state,
        })

        if (navItem.parent !== null) {
          state.nextMenuNavItemId = navItem.parent.id
        }
      }
    },
    setMenuItemHoverIndex: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{ menuItemHoverIndex: number }>,
    ) => {
      state.hoverIndex = action.payload.menuItemHoverIndex
    },
    startLoadingIcon: (
      state: WritableDraft<InitState>,
      action: PayloadAction<{
        navItemId: NavItemId
        navItemNameWhileLoading?: string
      }>,
    ) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: action.payload.navItemId,
        prop: 'isLoading',
        value: true,
      })

      if (action.payload.navItemNameWhileLoading !== undefined) {
        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId: action.payload.navItemId,
          prop: 'name',
          value: action.payload.navItemNameWhileLoading,
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
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: action.payload.navItemId,
        prop: 'isLoading',
        value: false,
      })

      if (action.payload.navItemNameWhileLoading !== undefined) {
        const initialMenuItemName = getMenuItemPropValue({
          menu: getNavStructure(),
          navItemId: action.payload.navItemId,
          prop: 'name',
        })

        setMenuItemPropValue({
          menu: state.navStructure,
          navItemId: action.payload.navItemId,
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
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: action.payload.navItemId,
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
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: action.payload.navItemId,
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
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: action.payload.navItemId,
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
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: action.payload.navItemId,
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
      const [topLevelNavMenu] = state.navStructure

      if (topLevelNavMenu === undefined) {
        return
      }

      const topNavItemsIds = (topLevelNavMenu.nestedItemList ?? []).map((navItem) => navItem.id)

      topNavItemsIds.forEach((id) => {
        const didPressExcludedNavItem = (action.payload?.exceptNavItemIds ?? []).includes(id)

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
      const [topLevelNavMenu] = state.navStructure

      if (topLevelNavMenu === undefined) {
        return
      }

      const topNavItemsIds = (topLevelNavMenu.nestedItemList ?? []).map((navItem) => navItem.id)

      topNavItemsIds.forEach((id) => {
        const didPressExcludedNavItem = (action.payload?.exceptNavItemIds ?? []).includes(id)

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
      action.payload.navItemIds.forEach((navItemId) => {
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
      action.payload.navItemIds?.forEach((navItemId) => {
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
      action.payload.navItemIds.forEach((navItemId) => {
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
      action.payload.navItemIds.forEach((navItemId) => {
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

      const topNavItemsIds = (topLevelNavMenu.nestedItemList ?? []).map((navItem) => navItem.id)

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
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: action.payload.navItemId,
        prop: 'isActive',
        value: true,
      })
    },
    showAdminIcon: (state: WritableDraft<InitState>) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: navItemIdKey.profile,
        prop: 'iconId',
        value: 'admin',
      })
    },
    showUserIcon: (state: WritableDraft<InitState>) => {
      setMenuItemPropValue({
        menu: state.navStructure,
        navItemId: navItemIdKey.profile,
        prop: 'iconId',
        value: 'profile',
      })
    },
  },
})

export const navReducer: Reducer<InitState> = navSlice.reducer
