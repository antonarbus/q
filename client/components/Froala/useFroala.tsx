import { AnyAction } from '@reduxjs/toolkit'
import { saveItemHeight, tellItemSavedLocally } from 'client/features/items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { useDispatchTyped } from 'client/store'
import { TRefAny, TRefDiv, TRefString } from 'client/types'
import { useEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'

type TProps = {
  index: number
  initHtml?: string
  onClickAwayIfHtmChanged?: Function
  froalaElementRef: TRefDiv
  editorRef: TRefAny
  placeholder?: string
  saveHtmlReducer: ({ index, html }: {index: number, html: string}) => AnyAction
}

export const useFroala = ({ index, initHtml, onClickAwayIfHtmChanged, froalaElementRef, editorRef, placeholder, saveHtmlReducer }: TProps) => {
  const dispatch = useDispatchTyped()
  const prevHtmlRef = useRef(initHtml) as TRefString

  function initFroalaInstance() {
    // @ts-ignore
    editorRef.current = new FroalaEditor(
      froalaElementRef.current,
      {
        initOnClick: true,
        toolbarInline: true,
        // toolbarVisibleWithoutSelection: true,
        toolbarButtons: {
          moreText: {
            buttons: ['fontSize', 'textColor', 'backgroundColor', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'inlineClass', 'inlineStyle', 'clearFormatting'],
            buttonsVisible: 3,
          },
          moreParagraph: {
            buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
            buttonsVisible: 3,
          },
          moreRich: {
            buttons: ['insertLink', 'insertTable', 'insertImage', 'insertVideo', 'emoticons', 'embedly', 'fontAwesome', 'specialCharacters', 'insertFile', 'insertHR', 'html'],
            buttonsVisible: 4,
          }
        },
        // pastePlain: true,
        charCounterCount: false,
        quickInsertEnabled: false,
        fontSizeSelection: true,
        fontSize: ['6', '8', '9', '10', '11', '12', '13', '14', '15', '16', '18', '20', '24', '30', '36', '48', '60', '72', '96'],
        tabSpaces: 4,
        fontFamily: {
          '"Roboto","Helvetica","Arial",sans-serif': 'Roboto',
          'Arial,Helvetica,sans-serif': 'Arial',
          'Georgia,serif': 'Georgia',
          'Impact,Charcoal,sans-serif': 'Impact',
          'Tahoma,Geneva,sans-serif': 'Tahoma',
          'Verdana,Geneva,sans-serif': 'Verdana',
          Helvetica: 'Helvetica',
          'Trebuchet MS': 'Trebuchet MS',
          "'Times New Roman',Times,serif": 'Times New Roman',
          Garamond: 'Garamond',
          'Courier New': 'Courier New',
          'Brush Script MT': 'Brush Script MT'
        },
        placeholderText: placeholder || 'Text...',
        tableInsertHelper: false,
        tableInsertMaxSize: 12,
        inlineStyles: {
          'Big red': 'font-size: 20px; color: red;',
          'Small blue': 'font-size: 14px; color: blue;',
          'Bit bold': 'font-weight: 400;',
          'More bold': 'font-weight: 600;',
        },
        inlineClasses: {
          'fr-class-code': 'Code',
          'fr-class-highlighted': 'Highlighted',
          'fr-class-transparency': 'Transparent',
        },
        // https://froala.com/wysiwyg-editor/docs/concepts/image/upload/
        // imageUploadURL: './../phps/upload_image.php',
        // fileUploadURL: './../phps/upload_file.php',
        // videoUploadURL: './../phps/upload_video.php',
        fileMaxSize: 1024 * 1024 * 30,
        // https://froala.com/wysiwyg-editor/docs/events/
        events: {
          initialized: function () {
          // $('a[href*="froala"]').parent().remove()
          },
          // 'codeView.update': () => onClickAwayIfHtmChanged?.(),
          'paste.afterCleanup': function (clipboardHtml: string) {
            // console.log(this)
            // console.log(clipboardHtml)
            // return clipboardHtml + 'additional text'
          },
          contentChanged: () => {
            if (!froalaElementRef?.current) return
            const updatedHtml = editorRef.current.html.get()
            const contentHasChanged = prevHtmlRef.current !== updatedHtml
            if (!contentHasChanged) return
            const html = editorRef.current.html.get()
            const itemHeight = (froalaElementRef.current as HTMLElement)!.closest('.item-paper')!.clientHeight || 0
            dispatch(saveHtmlReducer({ index, html }))
            dispatch(saveItemHeight({ index, height: itemHeight }))
            dispatch(tellItemSavedLocally({ index }))
            onClickAwayIfHtmChanged?.()
            saveItemsIntoLocalStorage()
            prevHtmlRef.current = updatedHtml
          }
        },
        key: 'AVB8B-21D4B3B2E1F1G1uB-33B-21cyoF-10yB-7G-7gB-22zzE2wkA-7gC7B7D6B4E4F3D2I3H2C5==',
      },
      function () {
        // @ts-ignore
        this.html.set(initHtml || '')
        console.log('froala initiated')
      }
    )
  }

  useEffectOnce(function startFroala() {
    initFroalaInstance()

    return () => {
      editorRef.current.destroy()
      console.log('froala destroyed')
    }
  })

  useEffect(function putCaretAtTheEndOfTextOnPaddingClick() {
    function focusOnTextIfClickedOnPadding(e: MouseEvent) {
      // https://stackoverflow.com/a/35191761/7239778
      const clickedElement = e.target as HTMLElement
      if (!clickedElement.matches('.fr-box')) return
      editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      editorRef.current.selection.restore()
    }

    froalaElementRef?.current?.addEventListener('click', focusOnTextIfClickedOnPadding)
    return () => {
      froalaElementRef?.current?.removeEventListener('click', focusOnTextIfClickedOnPadding)
    }
  }, [])

  return { froalaElementRef, editorRef }
}
