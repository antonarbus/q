// // @ts-nocheck
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { useEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { updateItemText } from '../items/itemsSlice'

type Props = {
  initHtml: string
  index: number
}

export const useFroala = ({ initHtml, index }: Props) => {
  const froalaRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const dispatch = useDispatchTyped()
  const editorRef = useRef() as React.MutableRefObject<any>
  const resetItemsToDefaults = useSelectorTyped(state => state.offer.toggleOffer)

  useEffect(() => {
    editorRef.current = new FroalaEditor(
      froalaRef.current,
      {
        toolbarInline: true,
        // toolbarVisibleWithoutSelection: true,
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
        // https://froala.com/wysiwyg-editor/docs/events/#image.removed
          'image.removed': function ($img) {
          // Do something here.
            console.log(this)
            console.log($img.attr('src'))
          },
          'paste.before': function () {
            console.log('paste before - froala')
          // addToUndoArr()
          },
          // https://froala.com/wysiwyg-editor/docs/events/#paste.after
          'paste.after': function () {
            console.log('paste after - froala')
          // addToUndoArr()
          },
          initialized: function () {
          // $('a[href*="froala"]').parent().remove()
          },
          'toolbar.show': function () {
          // console.log('toolbar on')

          },
          'toolbar.hide': function () {
          // console.log('toolbar off')
          },
        },
        key:
        'AVB8B-21D4B3B2E1F1G1uB-33B-21cyoF-10yB-7G-7gB-22zzE2wkA-7gC7B7D6B4E4F3D2I3H2C5==',
      },
      function () {
        this.html.set(initHtml)
        froalaRef.current.style.height = 'auto'
      }
    )

    return () => {
      editorRef.current.destroy()
    }
  }, [resetItemsToDefaults])

  useEffectOnce(() => {
    froalaRef.current.addEventListener('focusout', function saveText() {
      const innerHTML = editorRef.current.html.get()
      //! need also save item height
      dispatch(updateItemText({ index, innerHTML }))
      saveItemsIntoLocalStorage()
    })
  })

  return { froalaRef, editorRef }
}
