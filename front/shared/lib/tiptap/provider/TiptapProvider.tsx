import { useMemo } from 'react'
import type { Props } from './types'
import { TiptapContext } from './TiptapContext'

export const TiptapProvider = (props: Props): React.JSX.Element => {
  const value = useMemo(() => {
    return {
      registryKey: props.registryKey,
      isEditorView: props.isEditorView,
      placeholder: props.placeholder,
      contentGetter: props.contentGetter,
      className: props.className,
      sx: props.sx,
      onCreate: props.onCreate,
      onChange: props.onChange,
      onFocusOut: props.onFocusOut,
      onKeyDown: props.onKeyDown,
      onWrapperClick: props.onWrapperClick,
      onWrapperFocus: props.onWrapperFocus,
      onUpload: props.onUpload,
    }
  }, [props])

  return <TiptapContext.Provider value={value}>{props.children}</TiptapContext.Provider>
}
