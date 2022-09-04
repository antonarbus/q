import { notify } from '@components/Notifier/notify'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { navStructure } from '../navStructure'

type ShortcutsType = {
  name: string
  shortcut: string[]
  function: (() => void) | null
  link: string | null
}

const shortcuts: ShortcutsType[] = []
let arr = navStructure

function searchForShortcutsInNavStructure() {
  arr.forEach((menuItem) => {
    if (menuItem.shortcut) {
      shortcuts.push({
        name: menuItem.name,
        shortcut: menuItem.shortcut,
        function: menuItem.func || null,
        link: menuItem.link || null
      })
    }
  })
  arr.forEach((menuItem) => {
    if (menuItem.menuItems) {
      arr = menuItem.menuItems
      searchForShortcutsInNavStructure()
    }
  })
}

export function useMenuItemActionShortcuts() {
  const navigate = useNavigate()

  useEffectOnce(() => {
    searchForShortcutsInNavStructure()

    let keysPressed: string[] = []

    window.addEventListener('keydown', (e) => {
      if (!e.key) return
      keysPressed.push(e.key.toLowerCase())
    })

    window.addEventListener('keyup', (e) => {
      if (!e.key) return
      keysPressed.push(e.key.toLowerCase())
      keysPressed = [...new Set(keysPressed)]
      const shortcutItem = shortcuts.find(o => {
        const shortcutSorted = [...o.shortcut].sort() // do not sort original array, but a copy
        const shortcutStr = shortcutSorted.join('')
        const pressedKeysStr = keysPressed.sort().join('')
        return shortcutStr === pressedKeysStr
      })
      keysPressed = keysPressed.filter(key => key !== e.key.toLocaleLowerCase())
      if (shortcutItem === undefined) return
      e.preventDefault()
      if (shortcutItem.function) {
        shortcutItem.function()
      }
      if (shortcutItem.link) {
        navigate(shortcutItem.link)
      }
      notify({ msg: <><span style={{ color: 'orange' }}>{shortcutItem.name}</span> triggered with keyboard</> })
    })
  })
}
