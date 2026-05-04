import { BackgroundMessage } from '@front/entities/quotation/ui/BackgroundMessage'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { arrayShapesEqualityFn } from '@front/entities/quotation/util/arrayShapesEqualityFn'
import { BlockMany } from '@front/widgets/block'
import { InfoLeft, InfoRight } from '@front/widgets/quotation/info'
import { Search } from '@front/widgets/quotation/search'
import { Outlet } from 'react-router-dom'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { LogoLink } from '@front/widgets/logo/LogoLink'
import { FooterActions } from '@front/widgets/quotation/footer-actions'

export const QuotationPage = (): React.JSX.Element => {
  const blocks = reduxHolder.useSelector((state) => state.quotation.blocks, arrayShapesEqualityFn)
  const isEditorView = useIsEditorView()

  return (
    <>
      <InfoAndSearchLayout>
        <InfoLeft />
        {isEditorView ? <Search /> : <LogoLink />}
        <InfoRight />
      </InfoAndSearchLayout>
      <BackgroundMessage />
      <BlockMany blocks={blocks} />
      <FooterActions />
      <Outlet />
    </>
  )
}
