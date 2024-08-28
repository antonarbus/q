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

// * prevent image to be opened in browser
document.addEventListener('dragover', (e) => {
  e.preventDefault()
})
document.addEventListener('drop', (e) => {
  e.preventDefault()
})

export const useStartFroala = (): void => {
  const {
    htmlGetter,
    froalaElementRef,
    editorRef,
    placeholder,
    onContentChange,
    onFocus,
    onClick,
    onBlur,
    onKeydown,
    onInitialized,
    beforeUpload,
  } = useFroala()

  useEffectOnce(() => {
    const initFroalaInstance = (): void => {
      const froalaInstance = new FroalaEditor(froalaElementRef.current, {
        ...froalaDefaultOptions,
        placeholderText: placeholder ?? 'Text...',
        events: {
          contentChanged: (): void => {
            onContentChange()
          },
          focus: (): void => {
            onFocus?.()
          },
          click: (e: MouseEvent): void => {
            // close opened inline toolbar
            // there is some bug in froala that it does not close initial toolbar on first 2...3 clicks
            const toolbarElement = froalaInstance.$tb['0']
            const isToolbarOpened = toolbarElement.style.display === 'block'
            if (isToolbarOpened) {
              froalaInstance.toolbar.hide()
            }

            onClick?.(e)
          },
          keydown: (e: KeyboardEvent): void => {
            onKeydown?.(e)
          },
          blur: (e: MouseEvent): void => {
            onBlur?.(e)
          },
          'image.beforeUpload': function (files): void {
            if (beforeUpload === undefined) {
              notify({
                msg: 'may drop files into text block & description cell',
                type: 'info',
              })
              removeLoadingBar()
              return false
            }
            beforeUpload({ files, editor: this })
          },
          'file.beforeUpload': function (files): void {
            if (beforeUpload === undefined) {
              notify({
                msg: 'may drop files into text block & description cell',
                type: 'info',
              })
              removeLoadingBar()
              return false
            }
            beforeUpload({ files, editor: this })
          },
          'video.beforeUpload': function (files): void {
            if (beforeUpload === undefined) {
              notify({
                msg: 'may drop files into text block & description cell',
                type: 'info',
              })
              removeLoadingBar()
              return false
            }
            beforeUpload({ files, editor: this })
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
            imageElement.style.height = `${imageElement.clientHeight}px`
            imageElement.id = `img-${nanoid(5)}`
            imageElement.classList.add('fr-rounded')
          },
          initialized: (): void => {
            window.froalas.push(editorRef)
            if (!editorRef.current?.html) return
            editorRef.current.html.set(htmlGetter())
            // editorRef.current.undo.saveStep() // triggers contentChange // without it any first click on cell considered as a fresh value and "contentChanged" callback is fired // https://github.com/froala/wysiwyg-editor/issues/1578#issuecomment-256577412
            window.froalas = window.froalas.filter(({ current }) =>
              Boolean(current),
            )
            onInitialized?.()
            // console.log('💚 froalas qty after init: ', window.froalas.length)
          },
        },
      })

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
