import {
  SendEmailCommand,
  type SendEmailCommandOutput,
  SESClient,
} from '@aws-sdk/client-ses'

type Props = {
  to: string | string[]
  subject: string
  htmlBody: string
}

export const sendEmail = async ({
  to,
  htmlBody,
  subject,
}: Props): Promise<SendEmailCommandOutput | undefined> => {
  const sendEmailCommand = new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: typeof to === 'string' ? [to] : to,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: htmlBody,
        },
        // Text: {
        //   Charset: 'UTF-8',
        //   Data: 'hello, this is the test',
        // },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: 'info@quotation.app',
    ReplyToAddresses: [],
  })

  const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_KEY ?? 'fallback for TS',
      secretAccessKey: process.env.AWS_SECRETE_KEY ?? 'fallback for TS',
    },
  })

  const emailRes = await sesClient.send(sendEmailCommand)
  return emailRes
}
