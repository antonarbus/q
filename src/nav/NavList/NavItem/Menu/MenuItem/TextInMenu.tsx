import styled from '@emotion/styled'

type PropsForComponent = {
  reserveSpaceForIcon?: boolean
  name: string | React.ReactNode
}

type PropsForSC = {
  reserveSpaceForIcon?: boolean
}

/**
 * Component for name in menu item
 * @descriptions
 * - if we have nested menu some space should be left for 'go inside' icon
 * - if name is long it will be trimmed ellipsis (... dots)
 */
export function TextInMenu({ reserveSpaceForIcon, name }: PropsForComponent) {
  return (
    <Span reserveSpaceForIcon={reserveSpaceForIcon}>
      {name}
    </Span>
  )
}

const Span = styled.span<PropsForSC>`
  margin-left: 10px;
  margin-right: ${props => props.reserveSpaceForIcon ? '30px' : '0px'};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
