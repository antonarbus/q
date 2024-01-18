import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { gsap } from 'gsap'
import type { RefObject } from 'react'
import { useEffect } from 'react'
import { useFirstMountState } from 'react-use'
import { elementHeight } from '@shared/lib/elementHeight'
import { navSlice } from '../../../../../navSlice'
import { getMenuItemByIdsChain } from './getMenuItemByIdsChain'

type PropsForNavigateInMenu = {
  up: (() => void) | null
  down: ((id: string) => void) | null
}

export const navigateInMenu: PropsForNavigateInMenu = {
  up: () => {
    console.warn('put function here for going up the menu, otherwise need to pass it in many props')
  },
  down: (id) => {
    console.warn('put function here for going into submenu, otherwise need to pass it in many props')
  },
}

type Props = {
  currentMenuRef: RefObject<HTMLDivElement>
  nextMenuRef: RefObject<HTMLDivElement>
  menuContainerRef: RefObject<HTMLDivElement>
  fakeMenuRef: RefObject<HTMLDivElement>
  idsToNextMenuItems: string[]
}

export const useMenuAnimation = ({
  currentMenuRef,
  nextMenuRef,
  menuContainerRef,
  fakeMenuRef,
  idsToNextMenuItems,
}: Props): void => {
  const isFirstMount = useFirstMountState()
  const duration = 0.5
  const nextMenu = getMenuItemByIdsChain(idsToNextMenuItems)

  /**
   * @descriptions
   * - we have 2 menus for animation of nested menus change
   * - when we click on menu we update content in 'nextMenuRef' with 'nextMenu' state update
   * - then we make animation moving 'nextMenuRef' into the view
   * - at the same time 'currentMenuRef' is moved away from the view
   * - when animation is finished we change moved away 'currentMenuRef' content with 'currentMenuItems' state update
   */

  const goDownInMenu = (id: string): void => {
    const cb = (): void => {
      dispatch(navSlice.actions.goDownInCurrentMenu(id))
    }
    dispatch(navSlice.actions.goDownInNextMenu(id))
    gsap.fromTo(
      currentMenuRef.current,
      { xPercent: 0 },
      { duration, xPercent: -100 },
    )
    gsap.fromTo(
      nextMenuRef.current,
      { xPercent: 0 },
      { duration, xPercent: -100, onComplete: cb },
    )
  }

  const goUpInMenu = (): void => {
    const cb = (): void => {
      dispatch(navSlice.actions.goUpInCurrentMenu())
    }
    dispatch(navSlice.actions.goUpInNextMenu())
    gsap.fromTo(
      currentMenuRef.current,
      { xPercent: 0 },
      { duration, xPercent: 100 },
    )
    gsap.fromTo(
      nextMenuRef.current,
      { xPercent: -200 },
      { duration, xPercent: -100, onComplete: cb },
    )
  }

  /**
   * height animation on menu change
   * @descriptions
   * - on menu change we gradually adjust its height
   * - height is calculated by measuring 'fakeMenuRef' menu with css height: 'auto'
   * - we keep 'fakeMenuRef' in synch with 'nextMenuRef'
   * - 'fakeMenuRef' is absolutely positioned far way out of the view
   * - on initial render we do not animate height (duration: 0)
   * - if we navigate inside menu then we animate height (duration: 0.5)
   * - height animation is triggered every time 'nextMenu' state is updated
   */

  const animateMenuHeight = (): void => {
    if (!fakeMenuRef.current) return

    gsap.to(menuContainerRef.current, {
      duration: isFirstMount ? 0 : duration,
      height:
        elementHeight(fakeMenuRef.current) +
        theme.menu.paddingTop +
        theme.menu.paddingBottom +
        theme.menu.menuItem.height,
    })
  }

  useEffect(animateMenuHeight, [nextMenu])

  navigateInMenu.up = goUpInMenu
  navigateInMenu.down = goDownInMenu
}
