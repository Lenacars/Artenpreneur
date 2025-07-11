"use client"

import Link from "next/link"
import { ChevronDown, Phone, Mail, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

interface MobileMenuProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  cartItems: any[]
}

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, cartItems }: MobileMenuProps) => {
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const navItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    {
      name: "Eğitimlerimiz",
      href: "#",
      dropdown: true,
      items: [
        { name: "Eğitimler", href: "/egitimler" },
        { name: "Program Listesi", href: "/program-listesi" },
        { name: "Yüz Yüze Eğitimler", href: "/yuz-yuze-egitimler" },
      ],
    },
    { name: "İletişim", href: "/iletisim" },
  ]

  if (!isMenuOpen) return null

  return (
    <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
      <div className="container-custom py-4">
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.name} className="space-y-1">
                <button
                  onClick={() => {
                    const element = document.getElementById(`dropdown-${item.name}`)
                    if (element) {
                      element.classList.toggle("hidden")
                    }
                  }}
                  className="flex justify-between items-center w-full px-4 py-3 text-base font-medium text-text-primary hover:bg-primary/10 rounded-md"
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div id={`dropdown-${item.name}`} className="pl-4 hidden">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-primary/10 hover:text-primary rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-3 text-base font-medium transition-colors hover:bg-primary/10 rounded-md ${
                  pathname === item.href ? "text-primary border-l-4 border-primary" : "text-text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ),
          )}
        </nav>

        {/* Mobil İletişim ve Sosyal Medya */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <a
              href="tel:+908505327929"
              className="text-primary-foreground hover:text-primary transition-colors"
              aria-label="Telefon"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href="mailto:info@artenpreneur.com"
              className="text-primary-foreground hover:text-primary transition-colors"
              aria-label="E-posta"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/905377778281"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-primary transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/artenpreneur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-primary-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/artenpreneur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-primary-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/artenpreneur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-primary-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile User Actions */}
        <div className="flex flex-col space-y-2 mt-4">
          <Link href="/sepet" onClick={() => setIsMenuOpen(false)}>
            <Button variant="outline" className="w-full justify-center bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart mr-2"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Sepetim
              {cartItems.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>

          {session?.user ? (
            <>
              <Link href="/hesabim" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center bg-transparent">
                  <User className="mr-2 h-4 w-4" />
                  Hesabım
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full justify-center text-red-600 hover:text-red-600 bg-transparent"
                onClick={() => {
                  setIsMenuOpen(false)
                  handleSignOut()
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Çıkış Yap
              </Button>
            </>
          ) : (
            <>
              <Link href="/giris" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center bg-transparent">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/kayit" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground justify-center">
                  Kayıt Ol
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
