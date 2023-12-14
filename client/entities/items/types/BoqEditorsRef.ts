import { type MutableRefObject } from 'react'
import type FroalaEditor from 'react-froala-wysiwyg'

export type BoqEditorsRef = MutableRefObject<{
  subTotalEditor: FroalaEditor | null
}>
