import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'
import type { APIResponse } from 'mailersend/lib/services/request.service'
import { getSecret } from '../secret-manager/getSecret'

type Props = {
  to: string
  subject: string
  html: string
}

export const sendEmail = async (props: Props): Promise<APIResponse> => {
  const MAILERSEND_API_KEY = await getSecret('MAILERSEND_API_KEY')

  const mailerSend: MailerSend = new MailerSend({
    apiKey: MAILERSEND_API_KEY,
  })

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
    // oxlint-disable-next-line no-console
    console.error('error at mail send 😬', error)

    throw error
  }
}
