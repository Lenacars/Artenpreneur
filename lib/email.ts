import type { OrderDetails } from "./invoice-generator"
import { formatPrice } from "./coupons"
import { generateInvoicePDF } from "./invoice-generator"

export async function sendOrderConfirmationEmail(orderDetails: OrderDetails) {
  try {
    // Resend API'yi import et
    const { Resend } = await import("resend")

    // API anahtarını al
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY çevre değişkeni tanımlanmamış")
    }

    // Resend istemcisini oluştur
    const resend = new Resend(resendApiKey)

    // Müşteri e-posta adresi kontrolü
    const customerEmail = orderDetails.customerInfo?.email

    if (!customerEmail) {
      throw new Error("Müşteri e-posta adresi bulunamadı")
    }

    // Sipariş tarihi
    const orderDate = orderDetails.orderDate || new Date().toLocaleDateString("tr-TR")

    // Kurs listesi HTML'i oluştur
    const coursesHtml =
      orderDetails.courses
        ?.map((course) => {
          const priceDisplay =
            course.originalPrice && course.originalPrice !== course.price
              ? `<span style="text-decoration: line-through; color: #999; font-size: 12px;">${course.originalPrice}</span> ${course.price}`
              : course.price

          return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">
            <strong>${course.title}</strong><br>
            <span style="color: #666; font-size: 14px;">${course.instructor}</span>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
            ${priceDisplay}
          </td>
        </tr>
      `
        })
        .join("") || ""

    // E-posta içeriği
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sipariş Onayı</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; }
          .logo { color: #8a2be2; font-size: 24px; font-weight: bold; }
          .order-info { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .courses { width: 100%; border-collapse: collapse; }
          .total { text-align: right; font-weight: bold; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; }
          .button { display: inline-block; background-color: #8a2be2; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 15px; }
          .attachment-info { background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin: 20px 0; text-align: center; }
          @media only screen and (max-width: 600px) {
            .container { width: 100%; padding: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">ARTENPRENEUR</div>
            <h2>Siparişiniz Onaylandı!</h2>
          </div>
          
          <p>Merhaba ${orderDetails.customerInfo?.name || "Değerli Müşterimiz"},</p>
          
          <p>Siparişiniz başarıyla tamamlandı. Aşağıda sipariş detaylarınızı bulabilirsiniz:</p>
          
          <div class="order-info">
            <p><strong>Sipariş Numarası:</strong> ${orderDetails.orderNumber}</p>
            <p><strong>Sipariş Tarihi:</strong> ${orderDate}</p>
            <p><strong>Ödeme Yöntemi:</strong> ${orderDetails.paymentMethod || "Kredi Kartı"}</p>
          </div>
          
          <h3>Satın Aldığınız Kurslar</h3>
          
          <table class="courses">
            <tbody>
              ${coursesHtml}
              <tr>
                <td style="padding: 12px; text-align: right;" colspan="2">
                  <div class="total">Toplam: ${formatPrice(orderDetails.orderTotal || 0)}</div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="attachment-info">
            <p>📎 Faturanız bu e-postaya PDF olarak eklenmiştir.</p>
          </div>
          
          <p>Kurslarınıza hemen başlamak için hesabınıza giriş yapabilirsiniz:</p>
          
          <div style="text-align: center;">
            <a href="https://artenpreneur.com/kurslarim" class="button">Kurslarıma Git</a>
          </div>
          
          <div class="footer">
            <p>Bu e-posta, siparişinizin onaylandığını bildirmek için gönderilmiştir.</p>
            <p>&copy; ${new Date().getFullYear()} ARTENPRENEUR - Sanatçılar İçin Girişimcilik Eğitimleri</p>
            <p>
              <a href="https://artenpreneur.com/gizlilik-politikasi">Gizlilik Politikası</a> | 
              <a href="https://artenpreneur.com/kullanim-kosullari">Kullanım Koşulları</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    // Fatura PDF'ini oluştur
    const pdfDoc = await generateInvoicePDF(orderDetails)

    // PDF'i base64 formatına dönüştür
    const pdfBase64 = pdfDoc.output("datauristring").split(",")[1]

    // PDF'i buffer'a dönüştür
    const pdfBuffer = Buffer.from(pdfBase64, "base64")

    // E-postayı gönder
    const { data, error } = await resend.emails.send({
      from: "ARTENPRENEUR <siparis@artenpreneur.com>",
      to: [customerEmail],
      subject: `Sipariş Onayı - #${orderDetails.orderNumber}`,
      html: emailHtml,
      attachments: [
        {
          filename: `ARTENPRENEUR-Fatura-${orderDetails.orderNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    if (error) {
      console.error("E-posta gönderme hatası:", error)
      throw new Error(`E-posta gönderme hatası: ${error.message}`)
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error("E-posta gönderme hatası:", error)
    throw error
  }
}
