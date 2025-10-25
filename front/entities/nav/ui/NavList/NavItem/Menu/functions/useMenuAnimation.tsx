import type { NavItemId } from '@entities/nav/navItemId'
import { navSlice } from '@entities/nav/navSlice'
import { generateId } from '@shared/lib/nanoid'
import { dispatch } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { elementHeight } from '@shared/util/elementHeight'
import { animate } from 'motion'
import {
  type ComponentRef,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useFirstMountState } from 'react-use'

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
  currentMenuRef: RefObject<ComponentRef<'div'> | null>
  nextMenuRef: RefObject<ComponentRef<'div'> | null>
  menuContainerRef: RefObject<ComponentRef<'div'> | null>
  fakeMenuRef: RefObject<ComponentRef<'div'> | null>
}

export const useMenuAnimation = (props: Props): void => {
  const isFirstMount = useFirstMountState()
  const duration = 0.5
  const isGoingDown = useRef(true)

  const [animateHeight, setAnimateHeight] = useState(generateId())

  const getFakeElementHeight = (): number => {
    if (props.fakeMenuRef.current instanceof HTMLElement === false) {
      return 0
    }

    const height =
      elementHeight(props.fakeMenuRef.current) +
      theme.menu.paddingTop +
      theme.menu.paddingBottom +
      theme.menu.navItem.height

    return height
  }

  const getPrevElementHeight = (): number => {
    if (props.currentMenuRef.current instanceof HTMLElement === false) {
      return 0
    }

    const height =
      elementHeight(props.currentMenuRef.current) +
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
    if (props.currentMenuRef.current === null) {
      return
    }

    if (props.nextMenuRef.current === null) {
      return
    }

    isGoingDown.current = true

    dispatch(navSlice.actions.goDownInNextMenu({ navItemId }))

    setAnimateHeight(generateId())

    await Promise.all([
      animate(
        props.currentMenuRef.current,
        { x: ['0%', '-100%'] },
        { duration },
      ),
      animate(props.nextMenuRef.current, { x: ['100%', '0'] }, { duration }),
    ])

    dispatch(navSlice.actions.goDownInCurrentMenu({ navItemId }))
  }

  const goUpInMenu = async (): Promise<void> => {
    if (props.currentMenuRef.current === null) {
      return
    }

    if (props.nextMenuRef.current === null) {
      return
    }

    isGoingDown.current = false

    dispatch(navSlice.actions.goUpInCurrentMenu())

    setAnimateHeight(generateId())

    await Promise.all([
      animate(
        props.currentMenuRef.current,
        { x: ['-100%', '0%'] },
        { duration },
      ),
      animate(props.nextMenuRef.current, { x: ['0%', ' 100%'] }, { duration }),
    ])

    dispatch(navSlice.actions.goUpInNextMenu())
  }

  useEffect(() => {
    const animateHeightIntoNextMenu = (): void => {
      if (props.menuContainerRef.current === null) {
        return
      }

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

    animateHeightIntoNextMenu()
  }, [animateHeight])

  navigateInMenu.up = goUpInMenu
  navigateInMenu.down = goDownInMenu
}
