import { Box } from '@mui/material'
import { useCallback } from 'react'
import { useTiptap } from '@tiptap/react'

type Props = {
  onClick: () => void
  isActive: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
  skipBlurFocus?: boolean
}

export const MenuButton = (props: Props): React.JSX.Element => {
  const { editor } = useTiptap()

  const handleClick = useCallback(() => {
    props.onClick()
    if (props.skipBlurFocus !== true) {
      // Consume the BubbleMenu plugin's preventHide flag via a synchronous blur→focus cycle.
      // Without this, preventHide stays true after the click (event.preventDefault() on
      // mousedown prevents the editor from blurring, so the flag is never consumed).
      // blur+focus happen in the same synchronous task, so there is no browser repaint
      // and no visible selection flash.
      editor.view.dom.blur()
      editor.view.dom.focus()
    }
  }, [editor, props])

  return (
    <Box
      component='button'
      type='button'
      disabled={props.disabled}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault()
      }}
      onClick={handleClick}
      title={props.title}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '28px',
        height: '28px',
        padding: '4px 8px',
        border: 'none',
        borderRadius: '4px',
        cursor: props.disabled === true ? 'default' : 'pointer',
        pointerEvents: props.disabled === true ? 'none' : 'auto',
        fontSize: 14,
        opacity: props.disabled === true ? 0.5 : 1,
        backgroundColor: props.isActive === true ? '#d8d8d87d' : 'transparent',
        ':hover': {
          backgroundColor: props.isActive === true ? '#d8d8d87d' : '#eaeaea',
        },
      }}
    >
      {props.children}
    </Box>
  )
}
