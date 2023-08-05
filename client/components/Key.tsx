import { css } from '@emotion/react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const Key = ({ children }: Props) => {
  return (
    <div
      css={css`
        margin: 0px 0.1em;
        padding: 0.1em 0.3em;
        border-radius: 3px;
        border: 1px solid rgb(204, 204, 204);
        color: rgb(51, 51, 51);
        line-height: 1.4;
        display: inline-block;
        box-shadow:
          0px 1px 0px rgba(0, 0, 0, 0.2),
          inset 0px 0px 0px 2px #ffffff;
        text-shadow: 0 1px 0 #fff;
        font-size: 11px;
      `}
    >
      {children}
    </div>
  )
}
