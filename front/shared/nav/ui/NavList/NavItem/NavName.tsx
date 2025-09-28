import { useRef } from 'react'
import type { ReactNode, ComponentRef } from 'react'
import { useEffectOnce } from 'react-use'

type Props = {
  name?: string
}

export const NavName = ({ name }: Props): ReactNode => {
  const ref = useRef<ComponentRef<'span'>>(null)

  // set text container width to initial width + 30px to avoid text overflow
  // when "Save" is changing to "Saving..."
  useEffectOnce(() => {
    if (ref.current !== null) {
      // this is a workaround for the fact that the text container is not visible
      // on small screen due media queries
      const virtualElement = document.createElement('span')
      virtualElement.style.visibility = 'hidden'
      virtualElement.style.position = 'absolute'
      virtualElement.style.whiteSpace = 'nowrap'
      virtualElement.className = 'nav-item-name'
      virtualElement.innerText = ref.current.innerText
      document.body.appendChild(virtualElement)
      const initialWidth = virtualElement.offsetWidth
      document.body.removeChild(virtualElement)
      ref.current.style.width = `${initialWidth + 30}px`
    }
  })

  if (name === undefined) {
    return null
  }

  return (
    <span
      className='nav-item-name'
      css={{
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '5px',
      }}
      ref={ref}
    >
      <span
        className='nav-item-text'
        style={{
          display: 'inline-block',
        }}
      >
        {name}
      </span>
    </span>
  )
}
