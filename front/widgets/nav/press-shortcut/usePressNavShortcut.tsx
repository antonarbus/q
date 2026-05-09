import type { NavItem } from '@front/shared/nav/NavItem'
import { mousePosition } from '@front/shared/util/mousePosition'
import { functionRegistry } from '@front/widgets/nav/functionRegistry'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

type MouseEventLike = Pick<React.MouseEvent, 'clientX' | 'clientY'>

type Shortcuts = {
  name: string
  shortcut: string[]
  function: ((event?: MouseEventLike) => void) | null
  link: string | null
}

let arrForNavStructureIteration: NavItem[] = []
const shortcuts: Shortcuts[] = []

type Props = {
  navStructure: NavItem[]
}

const searchForShortcutsInNavStructure = (props: Props): void => {
  arrForNavStructureIteration = props.navStructure

  arrForNavStructureIteration.forEach((navItem) => {
    if (navItem.shortcut !== undefined) {
      const func = navItem.funcId === undefined ? null : functionRegistry[navItem.funcId]

      shortcuts.push({
        name: navItem.name,
        shortcut: navItem.shortcut.toSorted(),
        function:
          func === null
            ? null
            : (event?: MouseEventLike): void => {
                // Safe: func only uses clientX/clientY properties
                func(event as React.MouseEvent | undefined)
              },
        link: navItem.link ?? null,
      })
    }
  })

  arrForNavStructureIteration.forEach((navItem) => {
    if (navItem.nestedItemList !== undefined) {
      arrForNavStructureIteration = navItem.nestedItemList

      searchForShortcutsInNavStructure({
        navStructure: arrForNavStructureIteration,
      })
    }
  })
}

export const usePressNavShortcut = (props: Props): void => {
  const navigate = useNavigate()

  useEffectOnce(() => {
    searchForShortcutsInNavStructure({ navStructure: props.navStructure })

    let keysAreBeingPressed: string[] = []

    window.addEventListener('keydown', (event) => {
      // Only handle real keyboard events
      const isRealKeyboardEvent = typeof event.key === 'string' && event.key !== ''

      if (isRealKeyboardEvent === false) {
        return
      }

      const keyPressed = event.key.toLowerCase()
      keysAreBeingPressed.push(keyPressed)
      keysAreBeingPressed = [...new Set(keysAreBeingPressed)].toSorted()

      const matchedNavItemByShortcut = shortcuts.find((item) => {
        const shortcutStr = item.shortcut.join('')
        const pressedKeysStr = keysAreBeingPressed.join('')
        const isMatch = shortcutStr === pressedKeysStr

        return isMatch
      })

      if (matchedNavItemByShortcut !== undefined) {
        event.preventDefault()

        if (matchedNavItemByShortcut.function !== null) {
          // Create a synthetic event-like object with current mouse position
          // so that copy modal can be opened when triggered by shortcuts
          const syntheticEvent: MouseEventLike = {
            clientX: mousePosition.x,
            clientY: mousePosition.y,
          }

          matchedNavItemByShortcut.function(syntheticEvent)

          return
        }

        if (matchedNavItemByShortcut.link !== null) {
          navigate(matchedNavItemByShortcut.link)
        }
      }
    })

    window.addEventListener('keyup', (event) => {
      // Only handle real keyboard events
      const isRealKeyboardEvent = typeof event.key === 'string' && event.key !== ''

      if (isRealKeyboardEvent === false) {
        return
      }

      const keyReleased = event.key.toLowerCase()

      keysAreBeingPressed = keysAreBeingPressed.filter((key) => key !== keyReleased)
    })
  })
}
