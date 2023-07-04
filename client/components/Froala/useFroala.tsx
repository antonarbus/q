import { saveHeaderHeight, saveItemHeight, tellItemSavedLocally } from 'client/features/items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { TRefAny, TRefDiv, TRefString } from 'client/types'
import { useEffect, useRef } from 'react'
import { TSaveFroalaReducer } from './Froala'
import { useEffectOnce } from 'react-use'
import { theme } from 'client/theme'

type TProps = {
  index: number
  initHtml: string
  onClickAwayIfHtmChanged?: Function
  froalaElementRef: TRefDiv
  editorRef: TRefAny
  placeholder?: string
  saveFroalaReducer: TSaveFroalaReducer
  rowIndex?: number
}

declare const window: Window &
  typeof globalThis & {
    froalas: any[]
  }

window.froalas = []

export const useFroala = ({
  index,
  initHtml,
  onClickAwayIfHtmChanged,
  froalaElementRef,
  editorRef,
  placeholder,
  saveFroalaReducer,
  rowIndex,
}: TProps) => {
  const dispatch = useDispatchTyped()
  const prevHtmlRef = useRef(initHtml) as TRefString
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)

  function saveHtmlAndHeights() {
    const html = editorRef.current.html.get()
    const height = froalaElementRef.current?.clientHeight || 0 // save height of froala element in memory to use it during animation to avoid element height jump
    dispatch(saveFroalaReducer({ index, html, height, rowIndex }))
    const itemHeight = (froalaElementRef.current as HTMLElement).closest('.item-paper')?.clientHeight || 0
    dispatch(saveItemHeight({ index, height: itemHeight }))
    const headerHeight = (froalaElementRef.current as HTMLElement).closest('.boq-header')?.clientHeight
    if (headerHeight) dispatch(saveHeaderHeight({ index, height: headerHeight }))
  }

  useEffect(function startFroala() {
    if (isCopyMode) return

    function initFroalaInstance() {
      // @ts-ignore
      editorRef.current = new FroalaEditor(
        froalaElementRef.current,
        {
          // initOnClick: true,
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
            },
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
          // https://froala.com/wysiwyg-editor/docs/concepts/image/upload/
          // imageUploadURL: './../phps/upload_image.php',
          // fileUploadURL: './../phps/upload_file.php',
          // videoUploadURL: './../phps/upload_video.php',
          fileMaxSize: 1024 * 1024 * 30,
          // https://froala.com/wysiwyg-editor/docs/events/
          events: {
            'paste.afterCleanup': function (clipboardHtml: string) {
              // console.log(this)
              // console.log(clipboardHtml)
              // return clipboardHtml + 'additional text'
            },
            click: (event: MouseEvent) => {
              const isDoubleClick = event.detail === 2
              if (isDoubleClick) editorRef.current.commands.selectAll()
            },
            contentChanged: () => {
              if (!froalaElementRef?.current) return
              const updatedHtml = editorRef.current.html.get()
              const contentHasChanged = prevHtmlRef.current !== updatedHtml
              if (!contentHasChanged) return
              saveHtmlAndHeights()
              dispatch(tellItemSavedLocally({ index }))
              onClickAwayIfHtmChanged?.()
              saveItemsIntoLocalStorage()
              prevHtmlRef.current = updatedHtml
            },
          },
          key: 'AVB8B-21D4B3B2E1F1G1uB-33B-21cyoF-10yB-7G-7gB-22zzE2wkA-7gC7B7D6B4E4F3D2I3H2C5==',
        },
        function () {
          window.froalas.push(editorRef)
          console.log('froala initiated')
          if (!editorRef?.current?.html) return
          editorRef.current.html.set(initHtml)
          saveHtmlAndHeights() // initial correction of height values in redux
        }
      )
    }
    // init froala with delay after animation is finished, otherwise animation staggers
    // initFroalaInstance()
    setTimeout(() => {
      initFroalaInstance()
      // todo: need to create an Intersection Observer and init and destroy froala when it is visible
      // todo: they are really heavy and slows app very much
    }, 1000 * theme.item.animationDuration)

    return () => {
      console.log('destroyed')
      editorRef?.current?.destroy?.()
      editorRef.current = null
      window.froalas = window.froalas.filter(({ current }) => current !== null)
    }
  }, [index, isCopyMode]) //* without index, index is remembered at first initiation and if we move item it tries to update wrong item

  useEffectOnce(function putCaretAtTheEndOfText() {
    if (isCopyMode) return
    function focusOnTextIfCellOrPaddingAreClicked(e: MouseEvent) {
      // https://stackoverflow.com/a/35191761/7239778
      const clickedElement = e.target as HTMLElement

      if (clickedElement.matches('.fr-box')) {
        editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      }

      if (clickedElement.matches('.ag-cell')) {
        // editorRef.current.selection.setAtStart(editorRef.current.$el.get(0))
        editorRef.current.selection.setAtEnd(editorRef.current.$el.get(0))
      }

      editorRef.current.selection.restore()
    }

    froalaElementRef?.current?.addEventListener('click', focusOnTextIfCellOrPaddingAreClicked)
    const tableCell = froalaElementRef?.current.closest('.ag-cell') as HTMLElement
    tableCell?.addEventListener('click', focusOnTextIfCellOrPaddingAreClicked)

    return () => {
      froalaElementRef?.current?.removeEventListener('click', focusOnTextIfCellOrPaddingAreClicked)
      tableCell?.removeEventListener('click', focusOnTextIfCellOrPaddingAreClicked)
    }
  })

  useEffectOnce(function selectTextOnDoubleClick() {
    if (isCopyMode) return
    function selectTextAndShowEditor(e: MouseEvent) {
      const isDoubleClick = e.detail === 2
      if (!isDoubleClick) return
      const clickedElement = e.target as HTMLElement
      if (clickedElement.matches('.ag-cell')) {
        editorRef.current.commands.selectAll()
      }
    }

    const tableCell = froalaElementRef?.current.closest('.ag-cell') as HTMLElement
    tableCell?.addEventListener('click', selectTextAndShowEditor)

    return () => {
      tableCell?.removeEventListener('click', selectTextAndShowEditor)
    }
  })
}
