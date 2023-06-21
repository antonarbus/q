import { TRefDiv } from 'client/types'

export const froalaHeights = new Map()

export const saveFroalaHeight = (
  { froalaElementRef }: { froalaElementRef: TRefDiv }
) => {
  const htmlAsKey = froalaElementRef.current?.outerHTML || undefined
  const froalaHeight = froalaElementRef.current?.clientHeight || 0
  // console.log(froalaElementRef.current)
  froalaHeights.set(htmlAsKey, froalaHeight)
  console.log(froalaHeight)
}
