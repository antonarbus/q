import 'dotenv/config'
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'
import type { APIResponse } from 'mailersend/lib/services/request.service'
import { getEnvVarOrThrow } from '../dot-env'

const apiKey = getEnvVarOrThrow('MAILERSEND_API_KEY')
const mailerSend = new MailerSend({ apiKey })

type Props = {
  to: string
  subject: string
  html: string
}

export const sendEmail = async (props: Props): Promise<APIResponse> => {
  try {
    const sentFrom = new Sender('info@sendmequotation.today')

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo([new Recipient(props.to)])
      .setReplyTo(sentFrom)
      .setSubject(props.subject)
      .setHtml(props.html)

    const sendEmailRes = await mailerSend.email.send(emailParams)

    return sendEmailRes
  } catch (error) {
    console.error('error at mail send 😬', error)

    throw error
  }
}
