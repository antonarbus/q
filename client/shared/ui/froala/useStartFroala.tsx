import type { OnFroalaContentChange } from 'client/shared/types'
import type { MutableRefObject, RefObject } from 'react'
import { useEffect } from 'react'
import FroalaEditor from 'froala-editor'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/third_party/font_awesome.min.js'
import './froala_editor.pkgd.min.css'
import { froalaStaticOptions } from './froalaStaticOptions'

type Props = {
  itemIndex: number
  initHtmlGetter: () => string
  onContentChange: OnFroalaContentChange
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  rowIndex?: number
}

declare const window: Window & typeof globalThis & { froalas: Array<MutableRefObject<FroalaEditor | null>> }

window.froalas = []

export const useStartFroala = ({
  itemIndex,
  initHtmlGetter,
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
          ...froalaStaticOptions,
          placeholderText: placeholder ?? 'Text...',
          events: {
            // 'paste.afterCleanup': function (clipboardHtml: string) { },
            // click: (event: MouseEvent) => {},
            initialized: (): void => {
              window.froalas.push(editorRef)
              if (!editorRef.current?.html) return
              editorRef.current.html.set(initHtmlGetter())
              window.froalas = window.froalas.filter(({ current }) => Boolean(current))
              console.log('froalas qty after init: ', window.froalas.length)
            },
            contentChanged: (): void => {
              if (!editorRef.current) return
              const html = editorRef.current.html.get()
              const onContentChangeWithBoundArgs = onContentChange.bind(null, { itemIndex, html, rowIndex })
              onContentChangeWithBoundArgs()
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
