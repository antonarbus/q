import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/third_party/font_awesome.min.js'
import './froala_editor.pkgd.min.css'
import type { MutableRefObject } from 'react'
import { useEffect } from 'react'
import FroalaEditor from 'froala-editor'
import { froalaDefaultOptions } from './froalaDefaultOptions'
import { saveItemsLocally } from 'client/shared/lib'
import { useItem } from '../../providers/ItemProvider'
import { useFroala } from '../../providers/FroalaProvider'

declare const window: Window & typeof globalThis & {
  froalas: Array<MutableRefObject<FroalaEditor | null>>
}

window.froalas = []

export const useStartFroala = (): void => {
  const { itemIndex } = useItem()
  const { htmlGetter, froalaElementRef, editorRef, placeholder, onContentChange, onFocus, onBlur } = useFroala()

  useEffect(() => {
    const initFroalaInstance = (): void => {
      const froalaInstance = new FroalaEditor(
        froalaElementRef.current,
        {
          ...froalaDefaultOptions,
          placeholderText: placeholder ?? 'Text...',
          events: {
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
            blur: () => {
              onBlur?.()
            },
            // 'paste.afterCleanup': function (clipboardHtml: string) { },
            // click: (event: MouseEvent) => {},
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
      // console.log('💔 froalas qty after destroy: ', window.froalas.length)
    }
  })
}
