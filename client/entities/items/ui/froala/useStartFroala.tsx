// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import './froalaPkgd.js'
import './froalaPkgd.css'

import type { MouseEvent } from 'react'
import { useEffect } from 'react'
import { apiUrl } from 'server/consts/apiUrl'
import { nanoid } from '@shared/lib/nanoid'
import { type FroalaEditorRef } from '@shared/types'
import { useFroala } from '../../providers/FroalaProvider'
import { beforeUpload } from './beforeUpload'
import { froalaDefaultOptions } from './froalaDefaultOptions'

declare const window: Window & typeof globalThis & {
  froalas: FroalaEditorRef[]
}

window.froalas = []

// * prevent image to be opened in browser
document.addEventListener('dragover', (e) => { e.preventDefault() })
document.addEventListener('drop', (e) => { e.preventDefault() })

export const useStartFroala = (): void => {
  const { htmlGetter, froalaElementRef, editorRef, placeholder, onContentChange, onFocus, onClick, onBlur, onKeydown, onInitialized, uploadParams } = useFroala()

  useEffect(() => {
    const initFroalaInstance = (): void => {
      const froalaInstance = new FroalaEditor(
        froalaElementRef.current,
        {
          ...froalaDefaultOptions,
          placeholderText: placeholder ?? 'Text...',
          // if logged then files are uploaded to the bucket, if not, they are just stored in browser
          ...(Boolean(uploadParams?.email) && {
            imageUploadURL: apiUrl.upload,
            fileUploadURL: apiUrl.upload,
            videoUploadURL: apiUrl.upload,
            imageUploadParams: uploadParams,
            fileUploadParams: uploadParams,
            videoUploadParams: uploadParams,
          }),

          fileMaxSize: 1024 * 1024 * 10,
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
            blur: (e: MouseEvent) => {
              onBlur?.(e)
            },
            'image.beforeUpload': (files) => {
              beforeUpload({ files, uploadParams })
            },
            'file.beforeUpload': (files) => {
              beforeUpload({ files, uploadParams })
            },
            'video.beforeUpload': (files) => {
              beforeUpload({ files, uploadParams })
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
              imageElement.id = `img-${nanoid(3)}`
              imageElement.classList.add('fr-rounded')
            },
            initialized: (): void => {
              window.froalas.push(editorRef)
              if (!editorRef.current?.html) return
              editorRef.current.html.set(htmlGetter())
              // editorRef.current.undo.saveStep() // triggers contentChange // without it any first click on cell considered as a fresh value and "contentChanged" callback is fired // https://github.com/froala/wysiwyg-editor/issues/1578#issuecomment-256577412
              window.froalas = window.froalas.filter(({ current }) => Boolean(current))
              onInitialized?.()
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
