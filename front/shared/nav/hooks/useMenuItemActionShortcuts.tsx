import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import type { MenuItemType } from '../type'

type Shortcuts = {
  name: string
  shortcut: string[]
  function: (() => void) | null
  link: string | null
}

const shortcuts: Shortcuts[] = []
let arr: MenuItemType[] = []

const searchForShortcutsInNavStructure = ({
  navStructure,
}: {
  navStructure: MenuItemType[]
}): void => {
  arr = navStructure

  arr.forEach((menuItem) => {
    if (menuItem.shortcut) {
      shortcuts.push({
        name: menuItem.name,
        shortcut: menuItem.shortcut,
        function: () => void menuItem.func?.(),
        link: menuItem.link ?? null,
      })
    }
  })

  arr.forEach((menuItem) => {
    if (menuItem.menuItems) {
      arr = menuItem.menuItems
      searchForShortcutsInNavStructure({ navStructure: arr })
    }
  })
}

type Props = {
  navStructure: MenuItemType[]
}

export const useMenuItemActionShortcuts = ({ navStructure }: Props): void => {
  const navigate = useNavigate()

  useEffectOnce(() => {
    searchForShortcutsInNavStructure({ navStructure })

    let keysPressed: string[] = []

    window.addEventListener('keydown', (e) => {
      if (!e.key) return
      keysPressed.push(e.key.toLowerCase())
    })

    window.addEventListener('keyup', (e) => {
      if (!e.key) return

      keysPressed.push(e.key.toLowerCase())
      keysPressed = [...new Set(keysPressed)]

      const shortcutItem = shortcuts.find((o) => {
        const shortcutSorted = [...o.shortcut].sort() // do not sort original array, but a copy
        const shortcutStr = shortcutSorted.join('')
        const pressedKeysStr = keysPressed.sort().join('')
        return shortcutStr === pressedKeysStr
      })

      keysPressed = keysPressed.filter(
        (key) => key !== e.key.toLocaleLowerCase(),
      )

      if (shortcutItem === undefined) return

      e.preventDefault()

      if (shortcutItem.function) {
        shortcutItem.function()
      }

      if (shortcutItem.link) {
        navigate(shortcutItem.link)
      }
    })
  })
}
