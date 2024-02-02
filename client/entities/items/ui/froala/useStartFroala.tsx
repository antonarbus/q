import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/third_party/font_awesome.min.js'
import './froala_editor.pkgd.min.css'
import FroalaEditor from 'froala-editor'
import type { MouseEvent } from 'react'
import { useEffect } from 'react'
import { type FroalaEditorRef } from '@shared/types'
import { useFroala } from '../../providers/FroalaProvider'
import { froalaDefaultOptions } from './froalaDefaultOptions'

declare const window: Window & typeof globalThis & {
  froalas: FroalaEditorRef[]
}

window.froalas = []

export const useStartFroala = (): void => {
  const { htmlGetter, froalaElementRef, editorRef, placeholder, onContentChange, onFocus, onClick, onBlur, onKeydown } = useFroala()

  useEffect(() => {
    const initFroalaInstance = (): void => {
      const froalaInstance = new FroalaEditor(
        froalaElementRef.current,
        {
          ...froalaDefaultOptions,
          placeholderText: placeholder ?? 'Text...',
          events: {
            contentChanged: () => {
              onContentChange()
            },
            focus: () => {
              onFocus?.()
            },
            click: (e: MouseEvent) => {
              onClick?.(e)
            },
            keydown: (e: KeyboardEvent) => {
              onKeydown?.(e)
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            blur: (e: MouseEvent) => {
              onBlur?.(e)
            },
            // 'paste.afterCleanup': function (clipboardHtml: string) { },
            initialized: (): void => {
              window.froalas.push(editorRef)
              if (!editorRef.current?.html) return
              editorRef.current.html.set(htmlGetter())
              // editorRef.current.undo.saveStep() // triggers contentChange // without it any first click on cell considered as a fresh value and "contentChanged" callback is fired // https://github.com/froala/wysiwyg-editor/issues/1578#issuecomment-256577412
              window.froalas = window.froalas.filter(({ current }) => Boolean(current))
              // console.log('💚 froalas qty after init: ', window.froalas.length)
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
      // console.log('💔 froalas qty after destroy: ', window.froalas.length)
    }
  })
}
