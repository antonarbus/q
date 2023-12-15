import { type MutableRefObject } from 'react'
// import type FroalaEditor from 'react-froala-wysiwyg' //! do not this one
import type FroalaEditor from 'froala-editor'

export type BoqEditorsRef = MutableRefObject<{
  subTotalEditor: FroalaEditor | null
}>
