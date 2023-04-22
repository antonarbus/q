import { Typography } from '@mui/material'
import { ChildrenType, RefDivType } from 'client/types'

type Props = {
  children?: ChildrenType
  content?: React.ReactNode
  cssProps?: React.CSSProperties
  reference?: RefDivType
  title?: React.ReactNode
  logo?: React.ReactNode
}

/**
 * Just a white card
 * @param props object with parameters
 * @param props.children anything, goes inside tags
 * @param props.content anything, same, but goes as a prop
 * @param props.cssProps css object props to be added to the existing ones
 * @param props.title title
 * @param props.logo logo component
*/

export const CardCustom = ({ children, content, cssProps, reference, title, logo }: Props) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100vh - 64px)',
      maxWidth: 'calc(100vw - 64px)',
      minWidth: '300px',
      width: '400px',
      margin: '32px',
      padding: '40px',
      background: 'white',
      zIndex: 1001,
      color: 'rgba(0, 0, 0, 0.87)',
      borderRadius: '4px',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      boxShadow: '0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)',
      overflowY: 'auto',
      '&:hover, &:focus-within': {
        boxShadow: '0px 11px 15px -7px rgb(0 0 0 / 40%), 0px 24px 38px 3px rgb(0 0 0 / 28%), 0px 9px 46px 8px rgb(0 0 0 / 24%)'
      },
      ...cssProps
    }}
    onMouseDown={(e) => e.stopPropagation()}
    ref={reference}
  >
    {logo && <div css={{ alignSelf: 'center' }}>{logo}</div>}
    {title && (
      <Typography
        component='h1'
        variant='h5'
        sx={{ alignSelf: 'center', marginBottom: '30px' }}
      >
        {title}
      </Typography>
    )}
    {children}
    {content}
  </div>
)
