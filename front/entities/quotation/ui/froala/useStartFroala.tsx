// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { MouseEvent } from 'react'
import { useEffectOnce } from 'react-use'
import { nanoid } from '@shared/lib/nanoid'
import { type FroalaEditorRef } from '@shared/types/froala.js'
import { notify } from '@shared/ui/top_msg/notify.js'
import { useFroala } from '../../providers/FroalaProvider'
import { froalaDefaultOptions } from './froalaDefaultOptions'
import { remindToSaveQuotationOnInsert } from './remindToSaveQuotationOnInsert.js'

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
          contentChanged: () => {
            onContentChange()
          },
          focus: () => {
            onFocus?.()
          },
          click: (e: MouseEvent) => {
            // close opened inline toolbar
            // there is some bug in froala that it does not close initial toolbar on first 2...3 clicks
            const toolbarElement = froalaInstance.$tb['0']
            const isToolbarOpened = toolbarElement.style.display === 'block'
            if (isToolbarOpened) {
              froalaInstance.toolbar.hide()
            }

            onClick?.(e)
          },
          keydown: (e: KeyboardEvent) => {
            onKeydown?.(e)
          },
          blur: (e: MouseEvent) => {
            onBlur?.(e)
          },
          'image.beforeUpload': function (files) {
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
          'file.beforeUpload': function (files) {
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
          'video.beforeUpload': function (files) {
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
          'image.inserted': function (response) {
            remindToSaveQuotationOnInsert()
          },
          'file.inserted': function (response) {
            remindToSaveQuotationOnInsert()
          },
          'video.inserted': function (response) {
            remindToSaveQuotationOnInsert()
          },
          'file.unlink': function (link) {
            const href = link.getAttribute('href')
            const isFileInBucket = href.includes('bucket')
            if (!isFileInBucket) return
            const removeFile = confirm(`
                Remove file from your profile?
                ${href}
              `)

            if (removeFile) {
              // todo: remove file from DB
              // todo: check if any other offers or depend on the file
            }
          },

          'image.removed': function ($img) {
            // console.log($img.attr('src'))
          },
          'image.loaded': function (props: { '0': HTMLImageElement }) {
            const imageElement = props['0']
            imageElement.style.height = imageElement.clientHeight + 'px'
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
