// // @ts-nocheck
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { useFroala } from './useFroala'
import { theme } from 'client/theme'
import { store } from 'client/store'
import { useRef } from 'react'
import { Resizable } from 're-resizable'
import { BiEditAlt as PencilIcon } from 'react-icons/bi'
import parseHtml from 'html-react-parser'

type Props = {
  index: number
}

export const EditableTextItem = ({ index }: Props) => {
  const itemRef = useRef() as React.MutableRefObject<Resizable>
  const { froalaElementRef, initFroalaHeight } = useFroala({ index, itemRef })
  // console.log('🚀 ~  EditableTextItem: ' + index)

  return (
    <DraggableResizableItemWithActions
      index={index}
      itemRef={itemRef}
    >
      <PencilIcon
        css={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          color: '#b3b3b3',
          height: 14
        }}
      />
      <div
        ref={froalaElementRef}
        style={{
          height: initFroalaHeight,
          padding: theme.item.childMargin,
        }}
      />
    </DraggableResizableItemWithActions>
  )
}
