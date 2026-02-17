import { useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { useNavModeDetection } from './useNavModeDetection'

type Props = {
  children: React.ReactNode
}

export const NavLayout = (props: Props): React.JSX.Element => {
  const navRef = useNavModeDetection()
  const navMode = useSelector((state) => state.nav.navMode)

  return (
    <nav
      data-nav-mode={navMode}
      ref={navRef}
      css={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        position: 'sticky',
        top: '5px',
        marginBottom: `${theme.nav.marginBottom}px`,
        marginLeft: '10px',
        marginRight: '10px',
        height: `${theme.nav.height}px`,

        // liquid glass
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow:
          '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',

        zIndex: 6,
        contain: 'layout inline-size',
        fontWeight: 300,

        '&[data-nav-mode="text-only"] > ul > li > a .icon-round-wrapper': {
          display: 'none',
        },
        '&[data-nav-mode="icons-only"] .nav-item-name': {
          display: 'none',
        },
        '&[data-nav-mode="icons-only"] > ul > li > a .icon-round-wrapper': {
          marginRight: '24px',
        },
        '&[data-nav-mode="hamburger"] .nav-item-name': {
          display: 'none',
        },
      }}
    >
      {props.children}
    </nav>
  )
}
