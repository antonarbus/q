import { Divider } from './button/shared/Divider'
import { BoldButton } from './button/BoldButton'
import { ItalicButton } from './button/ItalicButton'
import { UnderlineButton } from './button/UnderlineButton'
import { StrikethroughButton } from './button/StrikethroughButton'
import { CodeButton } from './button/CodeButton'
import { HeadingButton } from './button/HeadingButton'
import { BulletListButton } from './button/BulletListButton'
import { OrderedListButton } from './button/OrderedListButton'
import { TaskListButton } from './button/TaskListButton'
import { QuoteButton } from './button/QuoteButton'
import { CodeBlockButton } from './button/CodeBlockButton'
import { LinkFromTextButton } from './button/LinkFromTextButton'
import { ColorButton } from './button/ColorButton'
import { HighlightButton } from './button/HighlightButton'
import { AlignButton } from './button/AlignButton'
import { FontSizeButton } from './button/FontSizeButton'
import { LineHeightButton } from './button/LineHeightButton'
import { FontFamilyButton } from './button/FontFamilyButton'
import { ButtonsGroupLayout } from '../style/ButtonsGroupLayout'
import { ButtonsRowLayout } from '../style/ButtonsRowLayout'

export const TextMenu = (): React.JSX.Element => (
  <>
    <ButtonsRowLayout>
      <ButtonsGroupLayout>
        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
        <StrikethroughButton />
        <CodeButton />
        <CodeBlockButton />
        <LinkFromTextButton />
      </ButtonsGroupLayout>

      <Divider />

      <ButtonsGroupLayout>
        <FontSizeButton />
        <HeadingButton />
        <AlignButton />
      </ButtonsGroupLayout>
    </ButtonsRowLayout>

    <ButtonsRowLayout>
      <ButtonsGroupLayout>
        <BulletListButton />
        <OrderedListButton />
        <TaskListButton />
        <QuoteButton />
      </ButtonsGroupLayout>

      <Divider />

      <ButtonsGroupLayout>
        <ColorButton />
        <HighlightButton />
      </ButtonsGroupLayout>

      <Divider />

      <ButtonsGroupLayout>
        <FontFamilyButton />
        <LineHeightButton />
      </ButtonsGroupLayout>
    </ButtonsRowLayout>
  </>
)
