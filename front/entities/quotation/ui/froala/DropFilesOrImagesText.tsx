import { useFroala } from '@entities/quotation/providers/FroalaProvider'
import { Box } from '@mui/material'
import { cls } from '@shared/consts/cls'
import { theme } from '@shared/theme'

type Props = {
  dropFilesTextRef: React.RefObject<React.ComponentRef<'div'> | null>
}

export const DropFilesOrImagesText = (props: Props): React.JSX.Element => {
  const { editorRef } = useFroala()

  return (
    <Box
      className={cls.dropFilesText}
      ref={props.dropFilesTextRef}
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
      Drop{' '}
      <span
        onClick={(event) => {
          if (editorRef.current !== null) {
            editorRef.current.file.showInsertPopup()

            editorRef.current.popups.show(
              'file.insert',
              event.pageX,
              event.pageY,
            )
          }
        }}
        style={{
          cursor: 'pointer',
          color: theme.colors.blue,
          fontWeight: 400,
        }}
      >
        files
      </span>{' '}
      or{' '}
      <span
        onClick={(event) => {
          if (editorRef.current !== null) {
            editorRef.current.image.showInsertPopup()

            editorRef.current.popups.show(
              'image.insert',
              event.pageX,
              event.pageY,
            )
          }
        }}
        style={{
          cursor: 'pointer',
          color: theme.colors.blue,
          fontWeight: 400,
        }}
      >
        images
      </span>
    </Box>
  )
}
