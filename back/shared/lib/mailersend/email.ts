import 'dotenv/config'
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'
import { getEnvVarOrThrow } from '../dot-env'
import type { APIResponse } from 'mailersend/lib/services/request.service'

const apiKey = getEnvVarOrThrow('MAILERSEND_API_KEY')
const mailerSend = new MailerSend({ apiKey })

type Props = {
  to: string
  subject: string
  html: string
}

export const sendEmail = async ({
  to,
  subject,
  html,
}: Props): Promise<APIResponse> => {
  try {
    const sentFrom = new Sender('info@sendmequotation.today')

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo([new Recipient(to)])
      .setReplyTo(sentFrom)
      .setSubject(subject)
      .setHtml(html)

    const sendEmailRes = await mailerSend.email.send(emailParams)

    return sendEmailRes
  } catch (error) {
    console.error('error 😬', error)

    throw error
  }
}
