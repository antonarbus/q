import type { CSSObject } from '@emotion/react'

type Props = {
  children: React.ReactNode
  css?: CSSObject
  className?: string
  disabled?: boolean
}

export const RoundSpanForIcon = (props: Props): React.JSX.Element => {
  return (
    <span
      className={props.className}
      css={{
        width: 30,
        height: 30,
        backgroundColor: props.disabled === true ? 'transparent' : '#484a4d',
        borderRadius: '50%',
        padding: 5,
        margin: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#dadce1',
        flexShrink: 0, // to avoid logo shrink when menu item text is long
        '& svg': {
          color: props.disabled === true ? 'grey' : '',
        },
        ...props.css,
      }}
    >
      {props.children}
    </span>
  )
}
