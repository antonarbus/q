/* eslint-disable */
import './froalaPkg'
import './froalaPkg.css'
import { removeLoadingBar } from '@shared/lib/froala/removeLoadingBar'
import { generateId } from '@shared/lib/nanoid'
import { getState } from '@shared/lib/redux'
import type { FroalaEditorRef } from '@shared/type/froala'
import type { KeyboardEvent, MouseEvent } from 'react'
import { useEffectOnce } from 'react-use'
import { toast } from 'sonner'
import { useFroala } from '../../provider/FroalaProvider'
import { froalaDefaultOptions } from './froalaDefaultOptions'

declare const window: Window &
  typeof globalThis & {
    froalas: FroalaEditorRef[]
  }

window.froalas = []

const PREVENT_DEFAULT_BEHAVIOR = false

export const useStartFroala = (): void => {
  const froala = useFroala()

  useEffectOnce(() => {
    const initFroalaInstance = async (): Promise<void> => {
      //@ts-expect-error: some error
      const froalaInstance = new FroalaEditor(froala.froalaElementRef.current, {
        ...froalaDefaultOptions,
        placeholderText: froala.placeholder ?? 'Text...',
        events: {
          contentChanged: (): void => {
            froala.onContentChange()
          },
          focus: (): void => {
            froala.onFocus?.()
          },
          click: (e: MouseEvent): void => {
            // close opened inline toolbar
            // there is some bug in froala that it does not close initial toolbar on first 2...3 clicks
            const toolbarElement = froalaInstance.$tb['0']
            const isToolbarOpened = toolbarElement.style.display === 'block'

            if (isToolbarOpened) {
              froalaInstance.toolbar.hide()
            }

            froala.onClick?.(e)
          },
          keydown: (e: KeyboardEvent): void => {
            froala.onKeydown?.(e)
          },
          blur: (e: MouseEvent): void => {
            froala.onBlur?.(e)
          },
          'image.beforeUpload'(files: any): false | undefined {
            froala.beforeUpload?.({
              files,
              editor: froala.editorRef.current,
              type: 'image',
            })

            return PREVENT_DEFAULT_BEHAVIOR
          },
          'file.beforeUpload': (files: any): false | undefined => {
            froala.beforeUpload?.({
              files,
              editor: froala.editorRef.current,
              type: 'file',
            })

            return PREVENT_DEFAULT_BEHAVIOR
          },
          // 'image.inserted'(_response: any): void {
          //   remindToSaveQuotationOnInsert()
          // },
          // 'file.inserted'(response: any): void {
          //   remindToSaveQuotationOnInsert()
          // },
          // 'video.inserted'(response: any): void {
          //   remindToSaveQuotationOnInsert()
          // },
          'file.unlink'(link: { getAttribute: (arg0: string) => any }): void {
            const href = link.getAttribute('href')
            const isFileInBucket = href.includes('bucket')

            if (!isFileInBucket) {
              return
            }

            const removeFile = confirm(`
                Remove file from your profile?
                ${href}
              `)

            if (removeFile) {
              // todo: remove file from DB
              // todo: check if any other offers or depend on the file
            }
          },

          'image.removed'($img: any): void {
            // console.log($img.attr('src'))
          },
          'image.loaded'(props: { '0': HTMLImageElement }): void {
            const imageElement = props['0']
            imageElement.style.aspectRatio = `${imageElement.clientWidth}/${imageElement.clientHeight}`
            imageElement.id = `img-${generateId()}`
            imageElement.classList.add('fr-rounded')
          },
          // 'commands.before'(cmd: string, param1, param2) {
          //   if (cmd === 'linkOpen') {
          //     const linkElement = froalaInstance.selection.element()

          //     if (linkElement && linkElement.tagName === 'A') {
          //       const url = linkElement.getAttribute('href')
          //       const fileName = linkElement.textContent ?? 'file'
          //     }
          //   }
          // },
          initialized: (): void => {
            window.froalas.push(froala.editorRef)

            if (!froala.editorRef.current?.html) {
              return
            }

            froala.editorRef.current.html.set(froala.htmlGetter())

            // froala.editorRef.current.undo.saveStep() // triggers contentChange // without it any first click on cell considered as a fresh value and "contentChanged" callback is fired // https://github.com/froala/wysiwyg-editor/issues/1578#issuecomment-256577412
            window.froalas = window.froalas.filter(({ current }) =>
              Boolean(current),
            )

            froala.onInitialized?.()
            // console.log('💚 froalas qty after init: ', window.froalas.length)
          },
        },
      })

      froala.editorRef.current = froalaInstance
    }

    initFroalaInstance()

    return (): void => {
      froala.editorRef.current?.destroy()
      froala.editorRef.current = null
      window.froalas = window.froalas.filter(({ current }) => Boolean(current))
      // console.log('💔 froalas qty after destroy: ', window.froalas.length)
    }
  })
}
