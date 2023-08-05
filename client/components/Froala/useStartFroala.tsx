import { useDispatchTyped } from 'client/shared/hooks'
import type { RefAny, RefDiv, RefString } from 'client/types'
import { useEffect, useRef } from 'react'
import type { SaveFroalaReducer } from './Froala'
import { saveItemsLocally } from 'client/features/save_items_locally'

interface IProps {
  index: number
  getHtml: () => string
  onClickAwayIfHtmChanged?: Function
  froalaElementRef: RefDiv
  editorRef: RefAny
  placeholder?: string
  saveFroalaReducer: SaveFroalaReducer
  rowIndex?: number
}

declare const window: Window &
  typeof globalThis & {
    froalas: any[]
  }

window.froalas = []

export const useStartFroala = ({ index, getHtml, onClickAwayIfHtmChanged, froalaElementRef, editorRef, placeholder, saveFroalaReducer, rowIndex }: IProps) => {
  const dispatch = useDispatchTyped()
  const prevHtmlRef = useRef(getHtml()) as RefString

  useEffect(() => {
    function initFroalaInstance() {
      // @ts-expect-error
      editorRef.current = new FroalaEditor(
        froalaElementRef.current,
        {
          initOnClick: false,
          toolbarInline: true,
          toolbarVisibleWithoutSelection: false,
          quickInsertEnabled: true,
          pastePlain: false,
          charCounterCount: false,
          fontSizeSelection: true,
          tabSpaces: 4,
          toolbarButtons: {
            moreText: {
              buttons: [
                'fontSize',
                'textColor',
                'backgroundColor',
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                'subscript',
                'superscript',
                'fontFamily',
                'inlineClass',
                'inlineStyle',
                'clearFormatting',
              ],
              buttonsVisible: 3,
            },
            moreParagraph: {
              buttons: [
                'alignLeft',
                'alignCenter',
                'formatOLSimple',
                'alignRight',
                'alignJustify',
                'formatOL',
                'formatUL',
                'paragraphFormat',
                'paragraphStyle',
                'lineHeight',
                'outdent',
                'indent',
                'quote',
              ],
              buttonsVisible: 3,
            },
            moreRich: {
              buttons: ['insertLink', 'insertTable', 'insertImage', 'insertVideo', 'emoticons', 'embedly', 'fontAwesome', 'specialCharacters', 'insertFile', 'insertHR', 'html'],
              buttonsVisible: 4,
            },
          },
          fontSize: ['6', '8', '9', '10', '11', '12', '13', '14', '15', '16', '18', '20', '24', '30', '36', '48', '60', '72', '96'],
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
            'Brush Script MT': 'Brush Script MT',
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
          events: {
            'paste.afterCleanup': function (clipboardHtml: string) { },
            click: (event: MouseEvent) => { },
            contentChanged: () => {
              if (!froalaElementRef.current) return
              const updatedHtml = editorRef.current.html.get()
              const contentHasChanged = prevHtmlRef.current !== updatedHtml
              if (!contentHasChanged) return
              const html = editorRef.current.html.get()
              dispatch(saveFroalaReducer({ index, html, rowIndex }))
              onClickAwayIfHtmChanged?.()
              saveItemsLocally({ msgAboveItemWithIndex: index })
              prevHtmlRef.current = updatedHtml
            },
          },
          key: 'AVB8B-21D4B3B2E1F1G1uB-33B-21cyoF-10yB-7G-7gB-22zzE2wkA-7gC7B7D6B4E4F3D2I3H2C5==',
        },
        function () {
          window.froalas.push(editorRef)
          if (!editorRef.current?.html) return
          editorRef.current.html.set(getHtml())
          window.froalas = window.froalas.filter(({ current }) => current !== null)
          // console.log('froalas are initiated')
          console.log('froalas number', window.froalas.length)
        },
      )
    }

    initFroalaInstance()

    return () => {
      editorRef.current?.destroy?.()
      editorRef.current = null
      window.froalas = window.froalas.filter(({ current }) => current !== null)
      // console.log('froala destroyed')
      console.log('froalas number', window.froalas.length)
    }
  }, [index])
}
