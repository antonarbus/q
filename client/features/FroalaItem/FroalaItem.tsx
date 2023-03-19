import parseHtml from 'html-react-parser'
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { ItemType } from '../items/types'
import { useEffectOnce } from 'react-use'
import { froalaOptions } from './froalaOptions'
import { useRef } from 'react'

type Props = {
  item: ItemType
  index: number
}

// todo: init on click and destroy it on click away

export const FroalaItem = ({ item, index }: Props) => {
  const froalaElement = useRef() as React.MutableRefObject<HTMLDivElement>
  useEffectOnce(() => {
    // @ts-ignore
    const editor = new FroalaEditor(froalaElement.current, froalaOptions)
  })

  return (
    <DraggableResizableItemWithActions
      index={index}
      item={item}
    >
      <div
        ref={froalaElement}
        css={{
          // html code
          '& .CodeMirror': {
            fontSize: '12px !important'
          },
          // icon to close html code
          '& .html-switch': {
            color: '#ff4848 !important',
            '&:hover': {
              background: 'transparent !important',
            },
            '& .fa-code': {
              position: 'absolute',
              top: 0,
              right: 0,
              fontSize: '16px !important',
              '&:hover': {
                scale: '1.2',
              },
              ':before': {
                content: '"\\f00d"'
              }
            }
          },
        }}
      >
        {parseHtml(item.innerHtml)}
      </div>
    </DraggableResizableItemWithActions>
  )
}
