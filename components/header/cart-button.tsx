"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const CartButton = () => {
  const [cartItems, setCartItems] = useState<any[]>([])

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

  return (
    <Link href="/sepet" className="relative mr-2">
      <Button variant="ghost" size="sm" className="text-text-primary hover:text-primary hover:bg-primary/10 p-2">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-cart"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
      </Button>
    </Link>
  )
}

export default CartButton
