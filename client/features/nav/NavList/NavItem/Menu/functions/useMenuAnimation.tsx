import { elementHeight } from 'utils/elementHeight'
import { goDownInCurrentMenu, goDownInNextMenu, goUpInCurrentMenu, goUpInNextMenu } from 'client/features/nav/navSlice'
import { useDispatchTyped } from 'client/store'
import { theme } from 'client/theme'
import { gsap } from 'gsap'
import { useEffect } from 'react'
import { getMenuItemByIdsChain } from './getMenuItemByIdsChain'
import { useFirstMountState } from 'react-use'

type Props = {
  up: { () : void } | null
  down: { (id: string): void } | null,
}

export const navigateInMenu: Props = {
  up: () => console.log('put function here for going up the menu, otherwise need to pass it in many props'),
  down: (id) => console.log('put function here for going into submenu, otherwise need to pass it in many props')
}

type PropsType = {
  currentMenuRef: React.MutableRefObject<HTMLDivElement>
  nextMenuRef: React.MutableRefObject<HTMLDivElement>
  menuContainerRef: React.MutableRefObject<HTMLDivElement>
  fakeMenuRef: React.MutableRefObject<HTMLDivElement>
  idsToNextMenuItems: string[]
}

export function useMenuAnimation({ currentMenuRef, nextMenuRef, menuContainerRef, fakeMenuRef, idsToNextMenuItems }: PropsType) {
  const dispatch = useDispatchTyped()
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

  function goDownInMenu(id: string) {
    type Function = () => void
    const cb: Function = () => dispatch(goDownInCurrentMenu(id))
    dispatch(goDownInNextMenu(id))
    gsap.fromTo(currentMenuRef.current, { xPercent: 0 }, { duration, xPercent: -100 })
    gsap.fromTo(nextMenuRef.current, { xPercent: 0 }, { duration, xPercent: -100, onComplete: cb })
  }

  function goUpInMenu() {
    type Function = () => void
    const cb: Function = () => dispatch(goUpInCurrentMenu())
    dispatch(goUpInNextMenu())
    gsap.fromTo(currentMenuRef.current, { xPercent: 0 }, { duration, xPercent: 100 })
    gsap.fromTo(nextMenuRef.current, { xPercent: -200 }, { duration, xPercent: -100, onComplete: cb })
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

  function animateMenuHeight() {
    gsap.to(menuContainerRef.current, {
      duration: isFirstMount ? 0 : duration,
      height: elementHeight(fakeMenuRef.current) + theme.menu.paddingTop + theme.menu.paddingBottom + theme.menu.menuItem.height
    })
  }

  useEffect(animateMenuHeight, [nextMenu])

  navigateInMenu.up = goUpInMenu
  navigateInMenu.down = goDownInMenu
}
