"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

// Client-side only import
const CartWidgetClient = dynamic(() => import("./cart-widget"), { ssr: false })

export default function CartWidgetWrapper() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sepet sayfasında veya ödeme sayfasında widget'ı gösterme
  const hideOnPaths = ["/sepet", "/odeme/checkout", "/odeme/tesekkurler"]
  const shouldHideWidget = hideOnPaths.some((path) => pathname?.startsWith(path))

  // Client tarafında render edilene kadar veya belirli sayfalarda gösterme
  if (!isMounted || shouldHideWidget) {
    return null
  }

  return <CartWidgetClient />
}
