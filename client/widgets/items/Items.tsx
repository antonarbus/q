import {
  DndContext,
  MeasuringStrategy,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { onItemDragEnd, onItemDragStart } from '@features/items/drag'
import {
  ItemProvider,
  itemsShapeEqualityFn,
  BoqItemProvider,
  itemKey,
} from '@entities/quotation'
import { BoqItem } from './boq/BoqItem'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'
import { PasteItem } from './paste/PasteItem'
import { TotalPriceItem } from './price/PriceItem'
import { TextItem } from './text/TextItem'

export const Items = (): ReactNode => {
  const items = useSelectorTyped(
    (state) => state.quotation.items,
    itemsShapeEqualityFn,
  )

  const itemIds = items.map((item) => item.id)

  const sensors = useSensors(useSensor(PointerSensor))

  if (items.length === 0) return null

  return (
    <FadeInOnInitLoad>
      <DndContext
        autoScroll={{ layoutShiftCompensation: false }}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onItemDragStart}
        onDragEnd={onItemDragEnd({ itemIds })}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        <SortableContext
          items={itemIds}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence initial={false}>
            {items.map((item, itemIndex) => {
              if (item.type === itemKey.text) {
                return (
                  <ItemProvider
                    key={item.id}
                    itemId={item.id}
                    itemIndex={itemIndex}
                  >
                    <TextItem />
                  </ItemProvider>
                )
              }

              if (item.type === itemKey.boq) {
                return (
                  <ItemProvider
                    key={item.id}
                    itemId={item.id}
                    itemIndex={itemIndex}
                  >
                    <BoqItemProvider>
                      <BoqItem />
                    </BoqItemProvider>
                  </ItemProvider>
                )
              }

              if (item.type === itemKey.price) {
                return (
                  <ItemProvider
                    key={item.id}
                    itemId={item.id}
                    itemIndex={itemIndex}
                  >
                    <TotalPriceItem />
                  </ItemProvider>
                )
              }

              if (item.type === itemKey.paste) {
                return <PasteItem key={item.id} />
              }

              return null
            })}
          </AnimatePresence>
        </SortableContext>
      </DndContext>
    </FadeInOnInitLoad>
  )
}
