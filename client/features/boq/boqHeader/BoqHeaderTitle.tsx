import { Froala } from 'client/components/Froala'
import { store } from 'client/store'
import { useRef } from 'react'

type Props = {
  index: number
}

export const BoqHeaderTitle = ({ index }: Props) => {
  // const dispatch = useDispatchTyped()
  // const itemRef = useRef() as React.MutableRefObject<Resizable>
  const froalaElementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const editorRef = useRef() as React.MutableRefObject<any>
  const { html = 'Title', height = 24 } = store.getState().items?.[index]?.boq?.header?.title

  return (
    <Froala
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        initHtml={html}
        initHeight={height}
        // padding={theme.item.padding}
        // onClickAwayIfHtmChanged={saveHtmlAndHeight}
      />
  )
}
