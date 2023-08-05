import type { ReactNode } from 'react';

interface IOnItemDragEnd {
  oldIndex: number
  newIndex: number
}

export interface IProps {
  children: ReactNode
  onItemDragStart: () => void
  onItemDragEnd: ({ oldIndex, newIndex }: IOnItemDragEnd) => void
}