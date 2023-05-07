type TProps = {
  onMouseDown: any
  children?: React.ReactNode
  content?: React.ReactNode
  color?: string
}

/**
 * Dark transparent div on top of the content
 * @param props object with parameters
 * @param props.onMouseDown a callback, usually a function which unmounts the parent component or changes the url
 * @param props.children anything, goes inside tags
 * @param props.content anything, same, but goes as a prop
 * @param props.color color for background
*/

export const BackdropCustom = ({ onMouseDown, children, content, color }: TProps) => (
  <div
    onMouseDown={onMouseDown}
    css={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.5)',
      WebkitTapHighlightColor: 'transparent',
      zIndex: 1000
    }}
  >
    {children}
    {content}
  </div>
)
