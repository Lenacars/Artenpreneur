import Link from "next/link"

const FooterLinks = () => {
  const quickLinks = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/egitimler", label: "Eğitimler" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/iletisim", label: "İletişim" },
  ]

  const courseLinks = [
    { href: "/egitimler", label: "Tüm Eğitimler" },
    { href: "/program-listesi", label: "Program Listesi" },
    { href: "/yuz-yuze-egitimler", label: "Yüz Yüze Eğitimler" },
  ]

  return (
    <>
      <div>
        <h3 className="text-text-primary font-semibold mb-4">Hızlı Bağlantılar</h3>
        <ul className="space-y-2">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-text-secondary hover:text-primary transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-text-primary font-semibold mb-4">Eğitimler</h3>
        <ul className="space-y-2">
          {courseLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-text-secondary hover:text-primary transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default FooterLinks
