// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

// import './froalaPlugins.js'
import './froalaPkg.js'
import './froalaPkg.css'

import type { MouseEvent } from 'react'
import { useEffectOnce } from 'react-use'
import { nanoid } from '@shared/lib/nanoid'
import { type FroalaEditorRef } from '@shared/types/froala.js'
import { useFroala } from '../../providers/FroalaProvider'
import { froalaDefaultOptions } from './froalaDefaultOptions'
import { remindToSaveQuotationOnInsert } from './remindToSaveQuotationOnInsert.js'
import { notify } from '@shared/toast/notify.js'

declare const window: Window &
  typeof globalThis & {
    froalas: FroalaEditorRef[]
  }

window.froalas = []

export const useStartFroala = (): void => {
  const froala = useFroala()

  useEffectOnce(() => {
    const initFroalaInstance = (): void => {
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
          'image.beforeUpload': function (files): void {
            if (froala.beforeUpload === undefined) {
              notify({
                msg: 'may drop files into text block & description cell',
                type: 'info',
              })

              removeLoadingBar()
              return false
            }
            froala.beforeUpload({ files, editor: this })
          },
          'file.beforeUpload': function (files): void {
            if (froala.beforeUpload === undefined) {
              notify({
                msg: 'may drop files into text block & description cell',
                type: 'info',
              })
              removeLoadingBar()
              return false
            }

            froala.beforeUpload({ files, editor: this })
          },
          'video.beforeUpload': function (files): void {
            if (froala.beforeUpload === undefined) {
              notify({
                msg: 'may drop files into text block & description cell',
                type: 'info',
              })
              removeLoadingBar()
              return false
            }

            froala.beforeUpload({ files, editor: this })
          },
          'image.inserted': function (response): void {
            remindToSaveQuotationOnInsert()
          },
          'file.inserted': function (response): void {
            remindToSaveQuotationOnInsert()
          },
          'video.inserted': function (response): void {
            remindToSaveQuotationOnInsert()
          },
          'file.unlink': function (link): void {
            const href = link.getAttribute('href')
            const isFileInBucket = href.includes('bucket')
            if (!isFileInBucket) return
            // eslint-disable-next-line no-alert
            const removeFile = confirm(`
                Remove file from your profile?
                ${href}
              `)

            if (removeFile) {
              // todo: remove file from DB
              // todo: check if any other offers or depend on the file
            }
          },

          'image.removed': function ($img): void {
            // console.log($img.attr('src'))
          },
          'image.loaded': function (props: { '0': HTMLImageElement }): void {
            const imageElement = props['0']
            imageElement.style.aspectRatio = `${imageElement.clientWidth}/${imageElement.clientHeight}`
            imageElement.id = `img-${nanoid(5)}`
            imageElement.classList.add('fr-rounded')
          },
          initialized: (): void => {
            window.froalas.push(froala.editorRef)
            if (!froala.editorRef.current?.html) return
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
