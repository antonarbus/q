import { Box } from '@mui/material'
import { cls } from '@shared/consts/cls'

type Props = {
  dropFilesTextRef: React.RefObject<React.ComponentRef<'div'> | null>
}

export const DropFilesText = (props: Props): React.JSX.Element => {
  return (
    <Box
      ref={props.dropFilesTextRef}
      className={cls.dropFilesText}
      style={{
        position: 'absolute',
        top: '2px',
        right: '5px',
        fontSize: '8px',
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.3s ease-in-out 0.8s',
        userSelect: 'none',
      }}
    >
      Drop files
    </Box>
  )
}
