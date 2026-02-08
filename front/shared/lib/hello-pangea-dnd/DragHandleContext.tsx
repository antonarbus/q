import type { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'
import { createContext, useContext } from 'react'

export const DragHandleContext =
  createContext<DraggableProvidedDragHandleProps | null>(null)

export const useDragHandleProps = ():
  | DraggableProvidedDragHandleProps
  | null
  | undefined => {
  return useContext(DragHandleContext)
}
