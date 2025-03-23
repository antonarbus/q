import type { MenuItemType } from '@shared/nav'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

type Shortcuts = {
  name: string
  shortcut: string[]
  function: (() => void) | null
  link: string | null
}

const shortcuts: Shortcuts[] = []
let arrForNavStructureIteration: MenuItemType[] = []

const searchForShortcutsInNavStructure = ({
  navStructure,
}: {
  navStructure: MenuItemType[]
}): void => {
  arrForNavStructureIteration = navStructure

  arrForNavStructureIteration.forEach((menuItem) => {
    if (menuItem.shortcut) {
      shortcuts.push({
        name: menuItem.name,
        shortcut: menuItem.shortcut.toSorted(),
        function: () => void menuItem.func?.(),
        link: menuItem.link ?? null,
      })
    }
  })

  arrForNavStructureIteration.forEach((menuItem) => {
    if (menuItem.menuItems) {
      arrForNavStructureIteration = menuItem.menuItems

      searchForShortcutsInNavStructure({
        navStructure: arrForNavStructureIteration,
      })
    }
  })
}

type Props = {
  navStructure: MenuItemType[]
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
