import Link from "next/link"

const FooterContact = () => {
  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: "E-posta",
      value: "info@artenpreneur.com",
      href: "mailto:info@artenpreneur.com",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      label: "Telefon",
      value: "+90 (212) 555 0123",
      href: "tel:+902125550123",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Adres",
      value: "İstanbul, Türkiye",
      href: null,
    },
  ]

  return (
    <div>
      <h3 className="text-text-primary font-semibold mb-4">İletişim</h3>
      <ul className="space-y-3">
        {contactInfo.map((item, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="text-primary mt-0.5">{item.icon}</div>
            <div>
              <p className="text-text-secondary text-sm font-medium">{item.label}</p>
              {item.href ? (
                <Link href={item.href} className="text-text-secondary hover:text-primary transition-colors">
                  {item.value}
                </Link>
              ) : (
                <p className="text-text-secondary">{item.value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterContact
