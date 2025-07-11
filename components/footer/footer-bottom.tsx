import Link from "next/link"

const FooterBottom = () => {
  const currentYear = new Date().getFullYear()

  const legalLinks = [
    { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
    { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
  ]

  return (
    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-text-secondary text-sm mb-4 md:mb-0">
        &copy; {currentYear} ARTENPRENEUR. Tüm hakları saklıdır.
      </p>
      <div className="flex space-x-6">
        {legalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-text-secondary hover:text-primary text-sm transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FooterBottom
