import { RefAny, RefDiv } from 'client/types'
import { AnyAction } from '@reduxjs/toolkit'
import { SxProps } from '@mui/material'
import { useSelectorTyped } from 'client/store'
import { StaticHtml } from './StaticHtml'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { EditableHtml } from './EditableHtml'
import { useEffect, useRef, useState } from 'react'
import { useEffectOnce } from 'react-use'

type ReducerProps = {
  index: number
  html: string
  rowIndex?: number
}

export type SaveFroalaReducer = ({ index, html, rowIndex }: ReducerProps) => AnyAction

type Props = {
  index: number
  padding?: number | string
  initHtml: string
  froalaElementRef: RefDiv
  editorRef: RefAny
  placeholder?: string
  additionalStyle?: SxProps
  onClickAwayIfHtmChanged?: Function
  rowIndex?: number
  saveFroalaReducer: SaveFroalaReducer
}

export const Froala = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  index,
  initHtml,
  onClickAwayIfHtmChanged,
  padding,
  placeholder,
  rowIndex,
  saveFroalaReducer,
}: Props) => {
  const ref = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const { heightDuringAnimationRef } = useFixedHeightForAnimation({ froalaElementRef, isCopyMode })

  useEffectOnce(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0 }

    const callback: IntersectionObserverCallback = ([entry], observer) => {
      setIsIntersecting(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(callback, options)

    if (ref.current) observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  })

  // todo: add an option and state which will show RenderedHtml and init froala on mousedown, for froalas at header, item, cost, price
  // todo: it will be more performant

  return (
    <div ref={ref} >
      {!isCopyMode && !isIntersecting && (
        <StaticHtml
          html={initHtml}
          padding={padding}
          additionalStyle={additionalStyle}
          editorRef={editorRef}
          heightDuringAnimationRef={heightDuringAnimationRef}
        />
      )}
      {!isCopyMode && isIntersecting && (
        <EditableHtml
          additionalStyle={additionalStyle}
          editorRef={editorRef}
          froalaElementRef={froalaElementRef}
          index={index}
          initHtml={initHtml}
          onClickAwayIfHtmChanged={onClickAwayIfHtmChanged}
          padding={padding}
          placeholder={placeholder}
          rowIndex={rowIndex}
          saveFroalaReducer={saveFroalaReducer}
          heightDuringAnimationRef={heightDuringAnimationRef}
        />
      )}
      {isCopyMode && (
        <StaticHtml
          html={initHtml}
          padding={padding}
          additionalStyle={additionalStyle}
          editorRef={editorRef}
          heightDuringAnimationRef={heightDuringAnimationRef}
        />
      )}
      {/* {!isCopyMode && (
        <EditableHtml
          additionalStyle={additionalStyle}
          editorRef={editorRef}
          froalaElementRef={froalaElementRef}
          index={index}
          initHtml={initHtml}
          onClickAwayIfHtmChanged={onClickAwayIfHtmChanged}
          padding={padding}
          placeholder={placeholder}
          rowIndex={rowIndex}
          saveFroalaReducer={saveFroalaReducer}
          heightDuringAnimationRef={heightDuringAnimationRef}
        />
      )} */}
    </div>
  )
}
