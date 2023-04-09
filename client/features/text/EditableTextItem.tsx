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
  const { froalaElementRef, focusOnTextIfClickedOnPadding, initFroalaHeight } = useFroala({ index, itemRef })
  // console.log('🚀 ~  EditableTextItem: ' + index)

  return (
    <DraggableResizableItemWithActions
      index={index}
      itemRef={itemRef}
      onClick={focusOnTextIfClickedOnPadding}
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
          margin: theme.item.childMargin,
        }}
      >
        {/* text is managed by froala */}
      </div>
    </DraggableResizableItemWithActions>
  )
}
