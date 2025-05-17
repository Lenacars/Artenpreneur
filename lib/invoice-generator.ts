import { formatPrice } from "./coupons"

export type OrderDetails = {
  paymentMethod?: string
  orderTotal?: number
  orderDate?: string
  orderNumber?: string
  courses?: Array<{
    id: string
    title: string
    instructor: string
    price: string
    originalPrice?: string
    image?: string
  }>
  customerInfo?: {
    name?: string
    email?: string
    address?: string
    city?: string
    country?: string
    postalCode?: string
  }
}

// Tip tanımları için
declare module "jspdf" {
  interface jsPDF {
    autoTable: any
    lastAutoTable: any
    output(type: string, options?: any): any
  }
}

// QR kod için yardımcı fonksiyon
async function generateQRCodeDataURL(data: string): Promise<string> {
  try {
    // QRCode.js'i dinamik olarak import et
    const QRCode = await import("qrcode").then((m) => m.default || m)

    // QR kodu oluştur ve data URL olarak döndür
    return await QRCode.toDataURL(data, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 150,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })
  } catch (error) {
    console.error("QR kod oluşturma hatası:", error)
    throw error
  }
}

export async function generateInvoicePDF(orderDetails: OrderDetails) {
  try {
    // Dinamik olarak jsPDF ve jspdf-autotable'ı import et
    const jsPDFModule = await import("jspdf").then((m) => m.default || m)
    const jsPDF = jsPDFModule as any

    // jspdf-autotable'ı import et
    const autoTableModule = await import("jspdf-autotable").then((m) => m.default || m)

    // PDF oluştur
    const doc = new jsPDF()

    // autoTable fonksiyonunu doc nesnesine ekle
    if (typeof autoTableModule === "function") {
      autoTableModule(doc)
    }

    // Logo ve başlık
    doc.setFontSize(20)
    doc.setTextColor(128, 0, 128) // Mor renk
    doc.text("ARTENPRENEUR", 105, 20, { align: "center" })

    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text("FATURA", 105, 30, { align: "center" })

    // Fatura bilgileri
    doc.setFontSize(10)
    doc.text(`Fatura No: ${orderDetails.orderNumber || "N/A"}`, 20, 45)
    doc.text(`Tarih: ${orderDetails.orderDate || new Date().toLocaleDateString("tr-TR")}`, 20, 52)
    doc.text(`Ödeme Yöntemi: ${orderDetails.paymentMethod || "Kredi Kartı"}`, 20, 59)

    // Müşteri bilgileri
    doc.setFontSize(12)
    doc.text("Müşteri Bilgileri:", 140, 45)
    doc.setFontSize(10)

    const customerInfo = orderDetails.customerInfo || {}
    doc.text(`İsim: ${customerInfo.name || "N/A"}`, 140, 52)
    doc.text(`E-posta: ${customerInfo.email || "N/A"}`, 140, 59)

    if (customerInfo.address) {
      doc.text(`Adres: ${customerInfo.address}`, 140, 66)
      doc.text(`${customerInfo.city || ""} ${customerInfo.postalCode || ""}`, 140, 73)
      doc.text(`${customerInfo.country || ""}`, 140, 80)
    }

    // Ürün tablosu
    const tableColumn = ["#", "Kurs", "Eğitmen", "Fiyat"]
    const tableRows: any[] = []

    orderDetails.courses?.forEach((course, index) => {
      const courseData = [index + 1, course.title, course.instructor, course.price]
      tableRows.push(courseData)
    })

    // Tablo oluştur
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 90,
      theme: "striped",
      headStyles: { fillColor: [128, 0, 128] },
      margin: { top: 20 },
      styles: { overflow: "linebreak" },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 90 },
        2: { cellWidth: 50 },
        3: { cellWidth: 30 },
      },
    })

    // Toplam
    const finalY = doc.lastAutoTable?.finalY || 120
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text(`Toplam: ${formatPrice(orderDetails.orderTotal || 0)}`, 170, finalY + 15, { align: "right" })

    // QR kod için sipariş bilgilerini hazırla
    const qrCodeData = JSON.stringify({
      invoiceNo: orderDetails.orderNumber,
      date: orderDetails.orderDate || new Date().toLocaleDateString("tr-TR"),
      total: formatPrice(orderDetails.orderTotal || 0),
      customer: customerInfo.name,
      email: customerInfo.email,
      items: orderDetails.courses?.length || 0,
      verifyUrl: `https://artenpreneur.com/verify/${orderDetails.orderNumber}`,
    })

    try {
      // QR kodu oluştur
      const qrCodeDataUrl = await generateQRCodeDataURL(qrCodeData)

      // QR kodu PDF'e ekle
      doc.addImage(qrCodeDataUrl, "PNG", 20, finalY + 25, 40, 40)

      // QR kod açıklaması
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(80, 80, 80)
      doc.text("Fatura doğrulama için QR kodu tarayın", 40, finalY + 70, { align: "center" })
    } catch (error) {
      console.error("QR kod eklenirken hata oluştu:", error)
      // QR kod eklenemese bile faturayı oluşturmaya devam et
    }

    // Altbilgi
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 100, 100)
    doc.text("ARTENPRENEUR - Sanatçılar İçin Girişimcilik Eğitimleri", 105, 280, { align: "center" })
    doc.text("Bu bir elektronik faturadır.", 105, 285, { align: "center" })

    return doc
  } catch (error) {
    console.error("PDF oluşturma hatası:", error)
    throw error
  }
}
