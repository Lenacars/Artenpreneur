"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import Search from "./search"
import TopBar from "./header/top-bar"
import Navigation from "./header/navigation"
import UserMenu from "./header/user-menu"
import CartButton from "./header/cart-button"
import MobileMenu from "./header/mobile-menu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Client tarafında localStorage'dan sepet öğelerini al
    const items = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(items)

    // localStorage değişikliklerini dinle
    const handleStorageChange = () => {
      const updatedItems = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartItems(updatedItems)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-3"
      }`}
    >
      {/* İletişim ve Sosyal Medya Çubuğu */}
      <TopBar />

      {/* Ana Menü */}
      <div className="container-custom flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artenpreneur%20Logo%20PNG%20%281%29-LDpQslivMoLmYgWJVTV30XTdiGEUQI.png"
            alt="Artenpreneur Logo"
            width={200}
            height={66}
            priority
            className="h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <Navigation isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
          <Search />
          <div className="flex items-center ml-4 space-x-2">
            <CartButton />
            <UserMenu />
          </div>
        </div>

        {/* Mobile Menu Button and Search */}
        <div className="flex items-center space-x-2 md:hidden">
          <Search />
          <button
            className="text-text-primary p-2"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} cartItems={cartItems} />}
    </header>
  )
}

export default Header
