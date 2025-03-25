import { useRef } from 'react'
import { useEffectOnce } from 'react-use'

type Props = {
  name?: string
}

export const NavName = ({ name }: Props): React.ReactNode => {
  const navItemTextContainerRef = useRef<React.ComponentRef<'span'> | null>(
    null,
  )

  const navItemTextRef = useRef<React.ComponentRef<'span'> | null>(null)

  // set width and height of navNameRef to the width and height of textNameRef
  // this is needed to avoid layout shift when the text is being changed from 'Save' to 'Saving'
  useEffectOnce(() => {
    if (navItemTextContainerRef.current && navItemTextRef.current) {
      const width = navItemTextRef.current.offsetWidth
      const height = navItemTextRef.current.offsetHeight

      navItemTextContainerRef.current.style.width = `${width}px`
      navItemTextContainerRef.current.style.height = `${height}px`
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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span
        ref={navItemTextContainerRef}
        className='nav-item-text-container'
        style={{ display: 'inline-block', position: 'relative' }}
      >
        <span
          ref={navItemTextRef}
          className='nav-item-text'
          style={{ display: 'inline-block', position: 'absolute' }}
        >
          {name}
        </span>
      </span>
    </span>
  )
}
