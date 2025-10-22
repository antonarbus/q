import type { NavItem } from '@entities/nav/type'
import { functionRegistry } from '@widgets/nav/functionRegistry'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

type Shortcuts = {
  name: string
  shortcut: string[]
  function: (() => void) | null
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
      const func = navItem.funcId ? functionRegistry[navItem.funcId] : null

      shortcuts.push({
        name: navItem.name,
        shortcut: navItem.shortcut.toSorted(),
        function: func ? () => void func() : null,
        link: navItem.link ?? null,
      })
    }
  })

  arrForNavStructureIteration.forEach((navItem) => {
    if (navItem.navItems !== undefined) {
      arrForNavStructureIteration = navItem.navItems

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

    let keysBeingPressed: string[] = []

    window.addEventListener('keydown', (event) => {
      const keyPressed = event.key.toLowerCase()
      keysBeingPressed.push(keyPressed)
      keysBeingPressed = [...new Set(keysBeingPressed)].toSorted()

      const matchedNavItemByShortcut = shortcuts.find((item) => {
        const shortcutStr = item.shortcut.join('')
        const pressedKeysStr = keysBeingPressed.join('')
        const isMatch = shortcutStr === pressedKeysStr

        return isMatch
      })

      if (matchedNavItemByShortcut !== undefined) {
        event.preventDefault()

        if (matchedNavItemByShortcut.function !== null) {
          matchedNavItemByShortcut.function()

          return
        }

        if (matchedNavItemByShortcut.link !== null) {
          void navigate(matchedNavItemByShortcut.link)
        }
      }
    })

    window.addEventListener('keyup', (event) => {
      const keyReleased = event.key.toLowerCase()
      keysBeingPressed = keysBeingPressed.filter((key) => key !== keyReleased)
    })
  })
}
