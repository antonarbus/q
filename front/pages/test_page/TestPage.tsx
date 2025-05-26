import { useRef } from 'react'

export const TestPage = (): React.JSX.Element => {
  const ref = useRef<React.ComponentRef<'div'>>(null)

  return <div ref={ref}> Hello from test page</div>
}
