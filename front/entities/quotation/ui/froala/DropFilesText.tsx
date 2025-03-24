import { useFroala } from '@entities/quotation/providers/FroalaProvider'
import { Box } from '@mui/material'
import { cls } from '@shared/consts/cls'

type Props = {
  dropFilesTextRef: React.RefObject<React.ComponentRef<'div'> | null>
}

export const DropFilesText = (props: Props): React.JSX.Element => {
  const { editorRef } = useFroala()

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
      Drop{' '}
      <span
        style={{ cursor: 'pointer', color: 'black', fontWeight: 400 }}
        onClick={(e) => {
          if (editorRef.current) {
            editorRef.current.file.showInsertPopup()
            editorRef.current.popups.show('file.insert', e.pageX, e.pageY)
          }
        }}
      >
        files
      </span>{' '}
      or{' '}
      <span
        style={{ cursor: 'pointer', color: 'black', fontWeight: 400 }}
        onClick={(e) => {
          if (editorRef.current) {
            editorRef.current.image.showInsertPopup()
            editorRef.current.popups.show('image.insert', e.pageX, e.pageY)
          }
        }}
      >
        images
      </span>
    </Box>
  )
}
