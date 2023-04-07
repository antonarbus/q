type Props = {
  children: React.ReactNode,
}

export const BoqHeader = ({ children }: Props) => {
  return (
    <div
      css={{
        background: 'red'
      }}
    >
      {children}
    </div>
  )
}
