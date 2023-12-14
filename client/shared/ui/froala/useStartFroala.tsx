import type { MutableRefObject, RefObject } from 'react'
import { useEffect } from 'react'
import FroalaEditor from 'froala-editor'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/third_party/font_awesome.min.js'
import './froala_editor.pkgd.min.css'
import { froalaDefaultOptions } from './froalaDefaultOptions'
import { type BoqEditorsRef } from 'client/entities/items'
import { saveItemsLocally } from 'client/shared/lib'

type Props = {
  itemIndex: number
  htmlGetter: () => string
  onContentChange: () => void
  onFocus?: () => void
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
  boqEditorsRef?: BoqEditorsRef
  placeholder?: string
  rowIndex?: number
}

declare const window: Window & typeof globalThis & { froalas: Array<MutableRefObject<FroalaEditor | null>> }

window.froalas = []

export const useStartFroala = ({
  itemIndex,
  htmlGetter,
  froalaElementRef,
  editorRef,
  boqEditorsRef,
  placeholder,
  rowIndex,
  onContentChange,
  onFocus,
}: Props): void => {
  useEffect(() => {
    const initFroalaInstance = (): void => {
      const froalaInstance = new FroalaEditor(
        froalaElementRef.current,
        {
          ...froalaDefaultOptions,
          placeholderText: placeholder ?? 'Text...',
          events: {
            // 'paste.afterCleanup': function (clipboardHtml: string) { },
            // click: (event: MouseEvent) => {},
            initialized: (): void => {
              window.froalas.push(editorRef)
              if (!editorRef.current?.html) return
              editorRef.current.html.set(htmlGetter())
              window.froalas = window.froalas.filter(({ current }) => Boolean(current))
              // console.log('💚 froalas qty after init: ', window.froalas.length)
            },
            contentChanged: () => {
              onContentChange()
              saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
            },
            focus: () => {
              onFocus?.()
            },
          },
        },
      )

      editorRef.current = froalaInstance

      if (boqEditorsRef) {
        boqEditorsRef.current.subTotalEditor = froalaInstance
      }
    }

    initFroalaInstance()

    return (): void => {
      editorRef.current?.destroy()
      editorRef.current = null
      window.froalas = window.froalas.filter(({ current }) => Boolean(current))
      // console.log('💔 froalas qty after destroy: ', window.froalas.length)
    }
  })
}
