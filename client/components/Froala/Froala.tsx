import { useFroala } from './useFroala'

type Props = {
  padding?: number | string
  initHeight?: number | string
  initHtml?: string
  onClickAwayIfHtmChanged?: () => void
  froalaElementRef: React.MutableRefObject<HTMLDivElement>
  editorRef: React.MutableRefObject<any>
}

export const Froala = ({ padding, initHeight, initHtml, onClickAwayIfHtmChanged, froalaElementRef, editorRef }: Props) => {
  useFroala({ initHtml, onClickAwayIfHtmChanged, froalaElementRef, editorRef })

  return (
    <div
      ref={froalaElementRef}
      style={{
        height: initHeight || 'auto',
        padding: padding || 0,
      }}
    />
  )
}
