type InputComponentProps = Record<string, unknown> & {
  ref: React.RefObject<HTMLDivElement>
}

export const InputComponent = (props: InputComponentProps): React.JSX.Element => {
  const { ownerState: _ownerState, ref, ...rest } = props

  return (
    <div
      {...rest}
      css={{
        overflow: 'hidden',
        backgroundColor: 'white',
        width: '100%',
      }}
      ref={ref}
    />
  )
}
