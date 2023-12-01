import type { MutableRefObject, RefObject } from 'react'
import { useEffect } from 'react'
import FroalaEditor from 'froala-editor'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/third_party/font_awesome.min.js'
import './froala_editor.pkgd.min.css'
import { froalaDefaultOptions } from './froalaDefaultOptions'

type Props = {
  itemIndex: number
  htmlGetter: () => string
  onContentChange: () => void
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
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
  placeholder,
  rowIndex,
  onContentChange,
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
              console.log('💚 froalas qty after init: ', window.froalas.length)
            },
            contentChanged: () => {
              onContentChange()
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
      console.log('💔 froalas qty after destroy: ', window.froalas.length)
    }
  })
}
