// // @ts-nocheck
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { useFroala } from './useFroala'
import { theme } from 'client/theme'
import { store } from 'client/store'
import { useRef } from 'react'
import { Resizable } from 're-resizable'
import { BiEditAlt as PencilIcon } from 'react-icons/bi'

type Props = {
  index: number
}

export const EditableTextItem = ({ index }: Props) => {
  const itemRef = useRef() as React.MutableRefObject<Resizable>

  // at first we have fixed height to avoid height change when froala converts html into text on initialization
  // when froala is initialized we make height: 'auto' to let it adjust when new text is added from the keyboard
  const initFroalaHeight = store.getState().items?.[index]?.height
  const { froalaElementRef } = useFroala({ index, itemRef, initFroalaHeight })
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
          height: initFroalaHeight || 'auto',
          padding: theme.item.padding,
        }}
      />
    </DraggableResizableItemWithActions>
  )
}
