import { BackgroundMessage } from '@front/entities/quotation/ui/BackgroundMessage'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { arrayShapesEqualityFn } from '@front/entities/quotation/util/arrayShapesEqualityFn'
import { BlockMany } from '@front/widgets/block'
import { InfoLeft, InfoRight } from '@front/widgets/quotation/info'
import { Outlet } from 'react-router-dom'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'
import { FooterActions } from '@front/widgets/quotation/footer-actions'
import { ShareQuotationAtBottomButton } from '@front/features/quotation/share-quotation/ShareQuotationAtBottomButton'
import { SearchOrLogoOrNothing } from './SearchOrLogoOrNothing'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'

export const QuotationPage = (): React.JSX.Element => {
  const blocks = reduxHolder.useSelector((state) => state.quotation.blocks, arrayShapesEqualityFn)

  return (
    <FadeInOnInitLoad>
      <InfoAndSearchLayout>
        <InfoLeft />
        <SearchOrLogoOrNothing />
        <InfoRight />
      </InfoAndSearchLayout>
      <BackgroundMessage />
      <BlockMany blocks={blocks} />
      <ShareQuotationAtBottomButton />
      <FooterActions />
      <Outlet />
    </FadeInOnInitLoad>
  )
}
