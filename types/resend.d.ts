declare module "resend" {
  export class Resend {
    constructor(apiKey: string)

    emails: {
      send: (options: {
        from: string
        to: string[]
        subject: string
        html?: string
        text?: string
        attachments?: Array<{
          filename: string
          content: Buffer | string
        }>
      }) => Promise<{
        data: { id: string } | null
        error: { message: string; statusCode: number } | null
      }>
    }
  }
}
