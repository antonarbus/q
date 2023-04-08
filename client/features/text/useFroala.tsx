// // @ts-nocheck
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped, useSelectorTyped } from 'client/store'
import { Resizable } from 're-resizable'
import { useEffect, useRef } from 'react'
import { tellItemSavedLocally, updateItem } from '../items/itemsSlice'
import { r } from 'vitest/dist/types-94cfe4b4'

type Props = {
  index: number
  itemRef: React.MutableRefObject<Resizable>
}

export const useFroala = ({ index, itemRef }: Props) => {
  console.log('🚀 ~ file: useFroala.tsx:14 ~ useFroala ~ index:', index)
  const froalaElementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const dispatch = useDispatchTyped()
  const editorRef = useRef() as React.MutableRefObject<any>
  const resetItemsToDefaults = useSelectorTyped(state => state.offer.toggleOffer)
  const item = store.getState().items?.[index]
  const html = item?.html

  function saveEditedText() {
    if (!item) return
    if (!froalaElementRef?.current) return
    if (!itemRef?.current) return
    const updatedHtml = editorRef.current.html.get()
    if (html === updatedHtml) return
    const height = itemRef.current.resizable?.offsetHeight || 0
    dispatch(updateItem({ index, props: { height, html: updatedHtml } }))
    saveItemsIntoLocalStorage()
    dispatch(tellItemSavedLocally(index))
  }

  useEffect(() => {
    // @ts-ignore
    editorRef.current = new FroalaEditor(
      froalaElementRef.current,
      {
        toolbarInline: true,
        // toolbarVisibleWithoutSelection: true,
        pastePlain: true,
        charCounterCount: false,
        quickInsertEnabled: false,
        fontSizeSelection: true,
        fontSize: ['6', '8', '9', '10', '11', '12', '13', '14', '15', '16', '18', '20', '24', '30', '36', '48', '60', '72', '96'],
        tabSpaces: 4,
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
        placeholderText: 'Your text, links, files & images go here...',
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
          'codeView.update': saveEditedText
        },
        key: 'AVB8B-21D4B3B2E1F1G1uB-33B-21cyoF-10yB-7G-7gB-22zzE2wkA-7gC7B7D6B4E4F3D2I3H2C5==',
      },
      function () {
        // @ts-ignore
        this.html.set(html)
        froalaElementRef.current.style.height = 'auto'
      }
    )

    return () => {
      editorRef.current.destroy()
    }
  }, [resetItemsToDefaults])

  useEffect(() => {
    if (!item) return
    if (!froalaElementRef?.current) return
    if (!itemRef?.current) return
    froalaElementRef.current.addEventListener('focusout', saveEditedText)

    return () => {
      if (!item) return
      if (!froalaElementRef?.current) return
      if (!itemRef?.current) return
      froalaElementRef.current.removeEventListener('focusout', saveEditedText)
    }
  }, [index])

  function focusOnTextIfClickedOnPadding(e: MouseEvent) {
    // https://stackoverflow.com/a/35191761/7239778
    const clickedElement = e.target as HTMLElement
    const isClickInsideFroala = froalaElementRef.current.contains(clickedElement)
    if (isClickInsideFroala) return
    editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
    editorRef.current.selection.restore()
  }

  return { froalaElementRef, editorRef, focusOnTextIfClickedOnPadding }
}
