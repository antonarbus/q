import type { NavItem } from '@shared/nav'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

type Shortcuts = {
  name: string
  shortcut: string[]
  function: (() => void) | null
  link: string | null
}

const shortcuts: Shortcuts[] = []
let arrForNavStructureIteration: NavItem[] = []

const searchForShortcutsInNavStructure = ({
  navStructure,
}: {
  navStructure: NavItem[]
}): void => {
  arrForNavStructureIteration = navStructure

  arrForNavStructureIteration.forEach((navItem) => {
    if (navItem.shortcut) {
      shortcuts.push({
        name: navItem.name,
        shortcut: navItem.shortcut.toSorted(),
        function: () => void navItem.func?.(),
        link: navItem.link ?? null,
      })
    }
  })

  arrForNavStructureIteration.forEach((navItem) => {
    if (navItem.navItems) {
      arrForNavStructureIteration = navItem.navItems

      searchForShortcutsInNavStructure({
        navStructure: arrForNavStructureIteration,
      })
    }
  })
}

type Props = {
  navStructure: NavItem[]
}

export const usePressNavShortcut = ({ navStructure }: Props): void => {
  const navigate = useNavigate()

  useEffectOnce(() => {
    searchForShortcutsInNavStructure({ navStructure })

    let keysBeingPressed: string[] = []

    window.addEventListener('keydown', (e) => {
      if (!e.key) {
        return
      }

      const keyPressed = e.key.toLowerCase()
      keysBeingPressed.push(keyPressed)
      keysBeingPressed = [...new Set(keysBeingPressed)].toSorted()

      const matchedNavItemByShortcut = shortcuts.find((item) => {
        const shortcutStr = item.shortcut.join('')
        const pressedKeysStr = keysBeingPressed.join('')
        const isMatch = shortcutStr === pressedKeysStr

        return isMatch
      })

      if (matchedNavItemByShortcut) {
        e.preventDefault()

        if (matchedNavItemByShortcut.function) {
          matchedNavItemByShortcut.function()

          return
        }

        if (matchedNavItemByShortcut.link) {
          void navigate(matchedNavItemByShortcut.link)
        }
      }
    })

    window.addEventListener('keyup', (e) => {
      if (!e.key) {
        return
      }

      const keyReleased = e.key.toLowerCase()
      keysBeingPressed = keysBeingPressed.filter((key) => key !== keyReleased)
    })
  })
}
