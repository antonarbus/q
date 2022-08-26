type Props = {
  onClick?: () => void
  children?: React.ReactNode;
  content?: React.ReactNode;
  color?: string
}

const css = {
  background: 'hotpink',
  width: '100px',
  height: '100px',
  '&:hover': {
    background: 'darkorchid'
  }
}

/**
 * Dark transparent div on top of the content
 * @param props.onClick usually a function which unmounts the parent component or changes the url
 * @param props.children anything, goes inside tags
 * @param props.content anything, same, but goes as a prop
 * @param props.color color for background
*/

export const Backdrop = ({ onClick, children, content, color }: Props) => (
  <div
    onClick={onClick}
    css={css}
  >
    I am the backdrop
    {children}
    {content}
  </div>
)
