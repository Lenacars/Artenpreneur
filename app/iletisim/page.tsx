import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">İletişim</h1>
            <p className="text-lg md:text-xl mb-8">
              Sorularınız, önerileriniz veya işbirliği talepleriniz için bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Bize Ulaşın</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Adres</h3>
                    <p className="text-text-secondary">
                      Crea Center - Merkez, Çavuşbaşı Cd. 105/1-2, 34782 Çekmeköy/İstanbul
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Telefon</h3>
                    <p className="text-text-secondary">
                      <Link href="tel:+908505327929" className="hover:text-secondary transition-colors">
                        +90 850 532 79 29
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 text-primary mr-4 mt-1 shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div>
                    <h3 className="font-bold mb-1">WhatsApp</h3>
                    <p className="text-text-secondary">
                      <Link href="https://wa.me/905377778281" className="hover:text-secondary transition-colors">
                        +90 537 777 82 81
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">E-posta</h3>
                    <p className="text-text-secondary">
                      <Link href="mailto:info@artenpreneur.com" className="hover:text-secondary transition-colors">
                        info@artenpreneur.com
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Çalışma Saatleri</h3>
                    <p className="text-text-secondary">Pazartesi - Cuma: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Bizi Takip Edin</h3>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.linkedin.com/company/artenpreneur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.instagram.com/artenpreneur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.facebook.com/artenpreneur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.tiktok.com/artenpreneur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">İletişim Formu</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Adınız Soyadınız</Label>
                        <Input id="name" placeholder="Adınız Soyadınız" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta Adresiniz</Label>
                        <Input id="email" type="email" placeholder="E-posta Adresiniz" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Konu</Label>
                      <Input id="subject" placeholder="Konu" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mesajınız</Label>
                      <Textarea id="message" placeholder="Mesajınız" rows={5} required />
                    </div>
                    <Button type="submit" className="w-full">
                      Gönder
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Bizi Ziyaret Edin</h2>
            <p className="text-text-secondary">Ofisimize nasıl ulaşacağınızı görmek için haritayı kullanabilirsiniz.</p>
          </div>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.2587800548354!2d29.1336!3d41.0297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac8a8a8f8f8f8%3A0x8f8f8f8f8f8f8f8f!2sCrea%20Center!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ARTENPRENEUR Ofis Konumu"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
