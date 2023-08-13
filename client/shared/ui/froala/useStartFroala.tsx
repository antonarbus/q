import type { RefDiv, RefString } from 'client/shared/types'
import type { MutableRefObject } from 'react'
import type { ISaveFroalaReducer } from './Froala'
import { useDispatchTyped } from 'client/shared/hooks'
import { useEffect, useRef } from 'react'
import { saveItemsLocally } from 'client/shared/lib'
import FroalaEditor from 'froala-editor'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/third_party/font_awesome.min.js'
import './froala_editor.pkgd.min.css'
import { froalaStaticOptions } from './froalaStaticOptions'

interface IProps {
  index: number
  getHtml: () => string
  onClickAwayIfHtmChanged?: () => void
  froalaElementRef: RefDiv
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  saveFroalaReducer: ISaveFroalaReducer
  rowIndex?: number
}

declare const window: Window & typeof globalThis & { froalas: MutableRefObject<FroalaEditor | null>[] }

window.froalas = []

export const useStartFroala = ({ index, getHtml, onClickAwayIfHtmChanged, froalaElementRef, editorRef, placeholder, saveFroalaReducer, rowIndex }: IProps): void => {
  const dispatch = useDispatchTyped()
  const prevHtmlRef = useRef(getHtml()) as RefString

  useEffect(() => {
    const initFroalaInstance = (): void => {
      const froalaInstance = new FroalaEditor(
        froalaElementRef.current,
        {
          ...froalaStaticOptions,
          placeholderText: placeholder ?? 'Text...',
          events: {
            // 'paste.afterCleanup': function (clipboardHtml: string) { },
            // click: (event: MouseEvent) => {},
            initialized: (): void => {
              window.froalas.push(editorRef)
              if (!editorRef.current?.html) return
              editorRef.current.html.set(getHtml())
              window.froalas = window.froalas.filter(({ current }) => Boolean(current))
              console.log('froalas qty after init: ', window.froalas.length)
            },
            contentChanged: (): void => {
              // if (!froalaElementRef.current) return
              if (!editorRef.current) return
              const updatedHtml = editorRef.current.html.get()
              const contentHasChanged = prevHtmlRef.current !== updatedHtml
              if (!contentHasChanged) return
              const html = editorRef.current.html.get()
              dispatch(saveFroalaReducer({ index, html, rowIndex }))
              onClickAwayIfHtmChanged?.()
              saveItemsLocally({ msgAboveItemWithIndex: index })
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              prevHtmlRef.current = updatedHtml
            },
          },
        },
      )

      editorRef.current = froalaInstance
    }

    initFroalaInstance()

    return (): void => {
      editorRef.current?.destroy()
      editorRef.current = null
      window.froalas = window.froalas.filter(({ current }) => Boolean(current))
      console.log('froalas qty after destroy: ', window.froalas.length)
    }
  })
}
