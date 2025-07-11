import FooterLogo from "./footer/footer-logo"
import FooterLinks from "./footer/footer-links"
import FooterContact from "./footer/footer-contact"
import FooterBottom from "./footer/footer-bottom"

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo ve Açıklama */}
          <FooterLogo />

          {/* Hızlı Bağlantılar */}
          <FooterLinks />

          {/* İletişim */}
          <FooterContact />
        </div>

        {/* Alt Kısım */}
        <FooterBottom />
      </div>
    </footer>
  )
}

export default Footer
