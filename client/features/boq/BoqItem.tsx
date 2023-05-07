import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { useEffect, useRef } from 'react'
import { BoqHeader } from './boqHeader'
import { RefDivType, RefResizableType } from 'client/types'
import { BoqTable } from './boqHeader/boqTable'
import { store } from 'client/store'

type Props = {
  index: number
}

export const BoqItem = ({ index }: Props) => {
  const ref = useRef() as RefDivType
  const itemRef = useRef() as RefResizableType
  const height = store.getState().items[index].height

  useEffect(() => {
    ref.current.style.removeProperty('height')
  }, [])

  return (
    <DraggableResizableItemWithActions
      index={index}
      itemRef={itemRef}
    >
      <div
        ref={ref}
        style={{ height }}
      >
        <BoqHeader index={index} itemRef={itemRef} />
        <BoqTable index={index} itemRef={itemRef} />
      </div>
    </DraggableResizableItemWithActions>
  )
}
