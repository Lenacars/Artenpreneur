import Link from "next/link"
import { Linkedin, Instagram, Facebook } from "lucide-react"

const SocialIcons = () => {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="https://www.instagram.com/artenpreneur"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-600 transition-colors"
        aria-label="Instagram"
      >
        <Instagram size={20} />
      </Link>
      <Link
        href="https://www.facebook.com/artenpreneur"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 transition-colors"
        aria-label="Facebook"
      >
        <Facebook size={20} />
      </Link>
      <Link
        href="https://www.linkedin.com/company/artenpreneur"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-800 transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} />
      </Link>
    </div>
  )
}

export default SocialIcons
