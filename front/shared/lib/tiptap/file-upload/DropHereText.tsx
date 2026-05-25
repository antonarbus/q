import { cls } from '@front/shared/cls'
import { useTiptapCtx } from '../provider/useTiptapCtx'

export const DropHereText = (): React.ReactNode => {
  const tiptapCtx = useTiptapCtx()

  if (tiptapCtx.isEditorView === false) {
    return null
  }

  if (tiptapCtx.onUpload === undefined) {
    return null
  }

  return (
    <div
      className={cls.dropHereText}
      style={{
        position: 'absolute',
        inset: 0,
        color: 'grey',
        fontSize: 14,
        fontWeight: 600,
        userSelect: 'none',
        margin: '5px',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(1.2px) saturate(180%)',
        border: '2px dashed grey',
        borderRadius: '4px',
        pointerEvents: 'none',
        placeItems: 'center',
        display: 'none',
      }}
    >
      Drop here
    </div>
  )
}
