import type { NavItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import { theme } from '@front/shared/theme'
import { elementHeight } from '@front/shared/util/elementHeight'
import { animate } from 'motion'
import { useEffect, useRef } from 'react'
import { useFirstMountState } from 'react-use'

type MenuNavigation = {
  goUp: () => Promise<void>
  goDown: (args: { navItemId: NavItemId }) => Promise<void>
}

type Props = {
  currentMenuRef: React.RefObject<React.ComponentRef<'div'> | null>
  nextMenuRef: React.RefObject<React.ComponentRef<'div'> | null>
  menuContainerRef: React.RefObject<React.ComponentRef<'div'> | null>
  fakeMenuRef: React.RefObject<React.ComponentRef<'div'> | null>
}

export const useMenuAnimation = (props: Props): MenuNavigation => {
  const isFirstMount = useFirstMountState()
  const duration = 0.5
  const isGoingDown = useRef(true)

  // Gap between TopMenuItemsContainer (non-slidable) and SlidableMenuItemsContainer
  // This appears to be from browser default spacing or margin collapsing
  const topMenuGap = 10

  const getFakeElementHeight = (): number => {
    if (props.fakeMenuRef.current instanceof HTMLElement === true) {
      const height =
        elementHeight(props.fakeMenuRef.current) +
        theme.menu.paddingTop +
        theme.menu.paddingBottom +
        topMenuGap

      return height
    }

    return 0
  }

  const getPrevElementHeight = (): number => {
    if (props.currentMenuRef.current instanceof HTMLElement === true) {
      const height =
        elementHeight(props.currentMenuRef.current) +
        theme.menu.paddingTop +
        theme.menu.paddingBottom +
        topMenuGap

      return height
    }

    return 0
  }

  const goDownInMenu = async ({ navItemId }: { navItemId: NavItemId }): Promise<void> => {
    if (props.currentMenuRef.current !== null && props.nextMenuRef.current !== null) {
      isGoingDown.current = true

      reduxHolder.dispatch(navSlice.actions.goDownInNextMenu({ navItemId }))

      await Promise.all([
        animate(props.currentMenuRef.current, { x: ['0%', '-100%'] }, { duration }),
        animate(props.nextMenuRef.current, { x: ['100%', '0'] }, { duration }),
      ])

      reduxHolder.dispatch(navSlice.actions.goDownInCurrentMenu({ navItemId }))
    }
  }

  const goUpInMenu = async (): Promise<void> => {
    if (props.currentMenuRef.current !== null && props.nextMenuRef.current !== null) {
      isGoingDown.current = false

      reduxHolder.dispatch(navSlice.actions.goUpInCurrentMenu())

      await Promise.all([
        animate(props.currentMenuRef.current, { x: ['-100%', '0%'] }, { duration }),
        animate(props.nextMenuRef.current, { x: ['0%', ' 100%'] }, { duration }),
      ])

      reduxHolder.dispatch(navSlice.actions.goUpInNextMenu())
    }
  }

  useEffect(() => {
    const animateHeightIntoNextMenu = (): void => {
      if (props.menuContainerRef.current !== null) {
        const fakeElementHeight = getFakeElementHeight()
        const prevElementHeight = getPrevElementHeight()

        // Set initial height explicitly if it's auto (first render)
        if (
          props.menuContainerRef.current.style.height === '' ||
          props.menuContainerRef.current.style.height === 'auto'
        ) {
          props.menuContainerRef.current.style.height = `${prevElementHeight}px`
        }

        animate(
          props.menuContainerRef.current,
          {
            height: isGoingDown.current ? fakeElementHeight : prevElementHeight,
          },
          { duration: isFirstMount === true ? 0 : duration },
        )
      }
    }

    animateHeightIntoNextMenu()
  })

  return {
    goUp: goUpInMenu,
    goDown: goDownInMenu,
  }
}
