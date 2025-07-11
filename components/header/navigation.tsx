"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"

interface NavigationProps {
  isDropdownOpen: boolean
  setIsDropdownOpen: (open: boolean) => void
}

const Navigation = ({ isDropdownOpen, setIsDropdownOpen }: NavigationProps) => {
  const pathname = usePathname()

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <nav className="flex items-center mr-4">
      {navItems.map((item) => (
        <div key={item.name} className="relative group">
          {item.dropdown ? (
            <>
              <button
                onClick={toggleDropdown}
                className={`px-4 py-2 text-base font-medium transition-colors hover:text-primary flex items-center ${
                  pathname.includes("/egitimler") || pathname.includes("/program-listesi")
                    ? "text-primary border-b-2 border-accent"
                    : "text-text-primary"
                }`}
              >
                {item.name}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div
                className={`absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                  isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <div className="py-1">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-primary/10 hover:text-primary"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Link
              href={item.href}
              className={`px-4 py-2 text-base font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary border-b-2 border-accent" : "text-text-primary"
              }`}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Navigation
