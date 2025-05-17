// qrcode için tip tanımları
declare module "qrcode" {
  function toDataURL(
    text: string,
    options?: {
      errorCorrectionLevel?: "L" | "M" | "Q" | "H"
      type?: string
      quality?: number
      margin?: number
      color?: {
        dark?: string
        light?: string
      }
      width?: number
    },
  ): Promise<string>

  export default {
    toDataURL,
  }
}
