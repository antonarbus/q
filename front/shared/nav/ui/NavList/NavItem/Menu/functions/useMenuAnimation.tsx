import { dispatch } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { useEffect, useRef, useState } from 'react'
import { useFirstMountState } from 'react-use'
import { elementHeight } from '@shared/utils/elementHeight'
import { navSlice } from '@shared/nav/navSlice'
import { animate } from 'motion'
import { nanoid } from '@reduxjs/toolkit'
import type { NavItemId } from '@shared/consts/navItemId'

type PropsForNavigateInMenu = {
  up: () => Promise<void> | void
  down: ({ navItemId }: { navItemId: NavItemId }) => Promise<void> | void
}

export const navigateInMenu: PropsForNavigateInMenu = {
  up: () => {
    console.warn(
      'put function here for going up the menu, otherwise need to pass it in many props',
    )
  },
  down: (id) => {
    console.warn(
      'put function here for going into submenu, otherwise need to pass it in many props',
    )
  },
}

type Props = {
  currentMenuRef: React.RefObject<React.ComponentRef<'div'> | null>
  nextMenuRef: React.RefObject<React.ComponentRef<'div'> | null>
  menuContainerRef: React.RefObject<React.ComponentRef<'div'> | null>
  fakeMenuRef: React.RefObject<React.ComponentRef<'div'> | null>
}

export const useMenuAnimation = ({
  currentMenuRef,
  nextMenuRef,
  menuContainerRef,
  fakeMenuRef,
}: Props): void => {
  const isFirstMount = useFirstMountState()
  const duration = 0.5
  const isGoingDown = useRef(true)

  const [animateHeight, setAnimateHeight] = useState(nanoid())

  const getFakeElementHeight = (): number => {
    if (!(fakeMenuRef.current instanceof HTMLElement)) {
      return 0
    }

    const height =
      elementHeight(fakeMenuRef.current) +
      theme.menu.paddingTop +
      theme.menu.paddingBottom +
      theme.menu.navItem.height

    return height
  }

  const getPrevElementHeight = (): number => {
    if (!(currentMenuRef.current instanceof HTMLElement)) {
      return 0
    }

    const height =
      elementHeight(currentMenuRef.current) +
      theme.menu.paddingTop +
      theme.menu.paddingBottom +
      theme.menu.navItem.height

    return height
  }

  const goDownInMenu = async ({
    navItemId,
  }: {
    navItemId: NavItemId
  }): Promise<void> => {
    if (currentMenuRef.current === null) {
      return
    }

    if (nextMenuRef.current === null) {
      return
    }

    isGoingDown.current = true

    dispatch(navSlice.actions.goDownInNextMenu({ navItemId }))

    setAnimateHeight(nanoid())

    await Promise.all([
      animate(currentMenuRef.current, { x: ['0%', '-100%'] }, { duration }),
      animate(nextMenuRef.current, { x: ['100%', '0'] }, { duration }),
    ])

    dispatch(navSlice.actions.goDownInCurrentMenu({ navItemId }))
  }

  const goUpInMenu = async (): Promise<void> => {
    if (currentMenuRef.current === null) {
      return
    }

    if (nextMenuRef.current === null) {
      return
    }

    isGoingDown.current = false

    dispatch(navSlice.actions.goUpInCurrentMenu())

    setAnimateHeight(nanoid())

    await Promise.all([
      animate(currentMenuRef.current, { x: ['-100%', '0%'] }, { duration }),
      animate(nextMenuRef.current, { x: ['0%', ' 100%'] }, { duration }),
    ])

    dispatch(navSlice.actions.goUpInNextMenu())
  }

  useEffect(() => {
    const animateHeightIntoNextMenu = (): void => {
      if (menuContainerRef.current === null) {
        return
      }

      animate(
        menuContainerRef.current,
        {
          height: isGoingDown.current
            ? getFakeElementHeight()
            : getPrevElementHeight(),
        },
        { duration: isFirstMount ? 0 : duration },
      )
    }

    animateHeightIntoNextMenu()
  }, [animateHeight])

  navigateInMenu.up = goUpInMenu
  navigateInMenu.down = goDownInMenu
}
