import { BackgroundMessage } from '@front/entities/quotation/ui/BackgroundMessage'
import { reduxHolder } from '@front/shared/lib/redux'
import { arrayShapesEqualityFn } from '@front/entities/quotation/util/arrayShapesEqualityFn'
import { BlockMany } from '@front/widgets/block'
import { InfoLeft, InfoRight } from '@front/widgets/quotation/info'
import { Search } from '@front/widgets/quotation/search'
import { Outlet } from 'react-router-dom'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'
import { useIsFullAppView } from '@front/entities/quotation/util/useIsFullAppView'
import { LogoLink } from '@front/widgets/logo/LogoLink'

export const QuotationPage = (): React.JSX.Element => {
  const blocks = reduxHolder.useSelector((state) => state.quotation.blocks, arrayShapesEqualityFn)
  const isFullAppView = useIsFullAppView()

  return (
    <>
      <InfoAndSearchLayout>
        <InfoLeft />
        {isFullAppView ? <Search /> : <LogoLink />}
        <InfoRight />
      </InfoAndSearchLayout>
      <BackgroundMessage />
      <BlockMany blocks={blocks} />
      <Outlet />
    </>
  )
}
