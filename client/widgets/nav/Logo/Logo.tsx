import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import { useSelectorTyped } from '@shared/hooks'

type Prop = {
  logoRef: RefObject<HTMLDivElement>
}

export const Logo = ({ logoRef }: Prop): JSX.Element => {
  const mediaQueryWidth = useSelectorTyped(state => state.nav.mediaQueryWidth)
  const mediaEnabled = useSelectorTyped(state => state.nav.mediaEnabled)

  return (
    <div
      className='logo-container'
      ref={logoRef}
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 1,
        padding: '3px',
        paddingLeft: '10px',
        overflow: 'auto',
        '& a': {
          cursor: 'pointer',
          fontSize: '16px',
          [`@media (max-width: ${mediaQueryWidth.logoPart}px) and (min-width: ${mediaQueryWidth.burger}px)`]:
            mediaEnabled && {
              fontSize: '30px',
            },
          '& span:first-of-type': {
            color: 'white',
          },
          '& span:nth-of-type(2)': {
            color: '#e7e7e7bf',
            '&:hover': {
              color: 'white !important',
              transition: '0.3s ease',
            },
            [`@media (max-width: ${mediaQueryWidth.logoPart}px) and (min-width: ${mediaQueryWidth.burger}px)`]:
              mediaEnabled && {
                display: 'none',
              },
          },
          '& span:last-child': {
            color: '#e7e7e7bf',
            [`@media (max-width: ${mediaQueryWidth.logoExtension}px) and (min-width: ${mediaQueryWidth.burger}px)`]:
              mediaEnabled && {
                display: 'none',
              },
          },
        },
      }}
    >
      <Link to='/'>
        <span>Q</span>
        <span className='uotation'>uotation</span>
        <span className='app-ext'>.app</span>
      </Link>
    </div>
  )
}
