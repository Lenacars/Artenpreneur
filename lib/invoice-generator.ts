// lib/invoice-generator.ts
// Bu dosya, jsPDF kullanarak fatura PDF'i oluşturma mantığını içerir.
// Eğer jsPDF ve jsPDF-AutoTable yüklü değilse, yüklemeniz gerekebilir:
// pnpm add jspdf jspdf-autotable

import { jsPDF } from "jspdf";
import "jspdf-autotable"; // jspdf-autotable'ı import ettiğinizden emin olun

// Fatura oluşturmak için beklenen veri tipi
export interface OrderDetails {
  orderNumber: string;
  orderDate: string;
  orderTotal: number;
  paymentMethod: string;
  courses: Array<{
    id: string;
    title: string;
    instructor: string;
    price: number; // <-- String yerine NUMBER olarak düzeltildi
    originalPrice?: number; // <-- String yerine NUMBER olarak düzeltildi
    image?: string; // Görsel yolu opsiyonel olabilir
  }>;
  customerInfo?: {
    name?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  };
}

// Fiyatları formatlama (örneğin 1234.56 -> "₺1.234,56")
const formatCurrency = (amount: number): string => {
  return `₺${amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Tarih formatlama (örneğin 2024-07-04T10:00:00Z -> "4 Temmuz 2024")
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Fatura PDF'i oluşturan ana fonksiyon
export const generateInvoicePDF = async (orderDetails: OrderDetails) => {
  const doc = new jsPDF();

  // Font ekleme (Türkçe karakterler için önemlidir)
  // Eğer özel bir font kullanmıyorsanız, varsayılan fontta Türkçe karakter sorunu yaşanabilir.
  // Varsayılan fontlar için jspdf ayarları veya font ekleme gerekli olabilir.
  // Örneğin: doc.addFont("font-ismi.ttf", "FontAdı", "normal");
  // doc.setFont("FontAdı");

  // Header
  doc.setFontSize(22);
  doc.text("Fatura", 105, 20, { align: 'center' }); // Sayfanın ortasında başlık

  doc.setFontSize(10);
  doc.text("ARTENPRENEUR", 10, 10);
  doc.text("Fatura Tarihi: " + formatDate(new Date().toISOString()), 10, 15);

  doc.setFontSize(12);
  doc.text(`Sipariş No: ${orderDetails.orderNumber}`, 10, 30);
  doc.text(`Sipariş Tarihi: ${formatDate(orderDetails.orderDate)}`, 10, 37);

  // Müşteri Bilgileri
  doc.setFontSize(10);
  doc.text("Müşteri Bilgileri:", 10, 50);
  doc.text(`Adı: ${orderDetails.customerInfo?.name || 'Belirtilmemiş'}`, 10, 55);
  doc.text(`E-posta: ${orderDetails.customerInfo?.email || 'Belirtilmemiş'}`, 10, 60);
  // Adres vb. bilgiler de eklenebilir

  // Kurslar Tablosu
  const tableColumn = ["Ürün", "Eğitmen", "Birim Fiyat", "Adet", "Toplam"];
  const tableRows: (string | number)[][] = [];

  orderDetails.courses.forEach(course => {
    tableRows.push([
      course.title,
      course.instructor,
      formatCurrency(course.price),
      1, // Kurslar genellikle 1 adet alınır
      formatCurrency(course.price),
    ]);
  });

  (doc as any).autoTable({
    startY: 70, // Tablonun başlangıç pozisyonu
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [68, 100, 246] }, // Mavi renk tonu
    styles: { font: "Helvetica", textColor: [50, 50, 50] }, // Yazı tipi ve rengi
    columnStyles: {
      0: { cellWidth: 70 }, // Ürün başlığı geniş
      1: { cellWidth: 40 },
      2: { cellWidth: 25, halign: 'right' }, // Sağ hizalı
      3: { cellWidth: 15, halign: 'center' }, // Ortalı
      4: { cellWidth: 30, halign: 'right' }, // Sağ hizalı
    },
  });

  const finalY = (doc as any).autoTable.previous.finalY; // Tablonun bittiği yer

  // Toplamlar
  doc.setFontSize(12);
  doc.text(`Ara Toplam: ${formatCurrency(orderDetails.orderTotal - (orderDetails.orderTotal * 0.18))}`, 150, finalY + 10, { align: 'right' }); // %18 KDV çıkarılarak ara toplam
  doc.text(`KDV (%18): ${formatCurrency(orderDetails.orderTotal * 0.18)}`, 150, finalY + 17, { align: 'right' });
  doc.setFontSize(14);
  doc.text(`Toplam Tutar: ${formatCurrency(orderDetails.orderTotal)}`, 150, finalY + 27, { align: 'right' });

  // Ödeme Yöntemi
  doc.setFontSize(10);
  doc.text(`Ödeme Yöntemi: ${orderDetails.paymentMethod}`, 10, finalY + 10);

  // Footer
  doc.setFontSize(8);
  doc.text("Bu sertifika ARTENPRENEUR tarafından düzenlenmiş ve dijital imza ile güvence altına alınmıştır.", 105, doc.internal.pageSize.height - 10, { align: 'center' });

  return doc;
};