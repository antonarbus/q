import { AlignLeftButton } from './button/AlignLeftButton'
import { AlignCenterButton } from './button/AlignCenterButton'
import { AlignRightButton } from './button/AlignRightButton'
import { ButtonsGroupLayout } from '../style/ButtonsGroupLayout'
import { ButtonsRowLayout } from '../style/ButtonsRowLayout'

export const ImageMenu = (): React.JSX.Element => (
  <ButtonsRowLayout>
    <ButtonsGroupLayout>
      <AlignLeftButton />
      <AlignCenterButton />
      <AlignRightButton />
    </ButtonsGroupLayout>
  </ButtonsRowLayout>
)
