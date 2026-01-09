import type { JSX } from 'react'
import { EmailIcon } from './EmailIcon'
import { FooterLayout } from './FooterLayout'

export const Footer = (): JSX.Element => {
  return (
    <FooterLayout>
      <EmailIcon />
    </FooterLayout>
  )
}
