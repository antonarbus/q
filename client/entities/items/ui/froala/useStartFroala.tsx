// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// import 'froala-editor/js/froala_editor.pkgd.min.js'
// import FroalaEditor from 'froala-editor'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/third_party/font_awesome.min.js'
import './froala_editor.pkgd.min.css'
import { useSelectorTyped } from '@lib_instances/store'
import { nanoid } from 'nanoid'
import type { MouseEvent } from 'react'
import { useEffect } from 'react'
import { apiUrl } from 'server/consts/apiUrl'
import { type FroalaEditorRef } from '@shared/types'
import { useFroala } from '../../providers/FroalaProvider'
import { froalaDefaultOptions } from './froalaDefaultOptions'

declare const window: Window & typeof globalThis & {
  froalas: FroalaEditorRef[]
}

window.froalas = []

export const useStartFroala = (): void => {
  const { htmlGetter, froalaElementRef, editorRef, placeholder, onContentChange, onFocus, onClick, onBlur, onKeydown, onInitialized } = useFroala()
  const isLogged = useSelectorTyped(state => state.user.isLogged)

  useEffect(() => {
    const initFroalaInstance = (): void => {
      const froalaInstance = new FroalaEditor(
        froalaElementRef.current,
        {
          ...froalaDefaultOptions,
          placeholderText: placeholder ?? 'Text...',
          // if logged in files are uploaded to the bucket, if not, they are just stored in browser
          ...(isLogged && { imageUploadURL: apiUrl.upload }),
          ...(isLogged && { fileUploadURL: apiUrl.upload }),
          ...(isLogged && { videoUploadURL: apiUrl.upload }),
          fileMaxSize: 1024 * 1024 * 30,
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
            'file.beforeUpload': function (files) {
              const upload = confirm(`
                File will be uploaded into your profile?
                File size: ${(files[0].size / 1024 / 1024).toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)[0]} Mb
              `)
              if (!upload) {
                document.querySelector('.fr-file-progress-bar-layer.fr-layer.fr-active').classList.remove('fr-active')
              }
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
