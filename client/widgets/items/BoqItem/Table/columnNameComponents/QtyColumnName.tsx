import { itemBoqColumnNameQtyHtmlGetter } from 'client/entities/items'
import { onBoqQtyColumnNameChange } from 'client/features/on_boq_qty_column_name_change'
import { store } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'

interface Props {
  index: number
}

export const QtyColumnName = ({ index }: Props): JSX.Element | null => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)
  const item = store.getState().items[index]

  if (item?.type !== 'boq') return null

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Qty...'
      initHtmlGetter={itemBoqColumnNameQtyHtmlGetter}
      onContentChange={onBoqQtyColumnNameChange}
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
