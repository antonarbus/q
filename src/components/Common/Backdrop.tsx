import { css } from '@emotion/react'

type Props = {
  onClick?: () => void
  children?: React.ReactNode;
  content?: React.ReactNode;

}

/**
 * @param onClick usually a function which unmounts the parent component or changes the url
 * @param children anything
 * @param content anything, same as children
*/

export const Backdrop = ({ onClick, children, content }: Props) => (
  <div
    onClick={onClick}
    css={css`
      background-color: hotpink;
      width: 100px;
      height: 100px;
    `}
  >
    I am the backdrop
    {children}
    {content}
  </div>
)
