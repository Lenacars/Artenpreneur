"use client"

import type React from "react"

import { useState } from "react"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada arama işlemi gerçekleştirilecek
    console.log("Arama yapılıyor:", searchQuery)
    // Gerçek uygulamada burada bir arama sayfasına yönlendirme yapılabilir
    // window.location.href = `/arama?q=${encodeURIComponent(searchQuery)}`
  }

  return (
    <div className="relative">
      {!isSearchOpen ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSearchOpen(true)}
          className="text-text-primary hover:text-primary hover:bg-transparent"
          aria-label="Aramayı aç"
        >
          <SearchIcon className="h-5 w-5" />
        </Button>
      ) : (
        <div className="absolute right-0 top-0 z-50 flex items-center bg-white shadow-md rounded-md overflow-hidden">
          <form onSubmit={handleSearch} className="flex items-center">
            <Input
              type="search"
              placeholder="Ara..."
              className="border-none focus-visible:ring-0 w-[200px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button type="submit" variant="ghost" size="icon" className="text-primary">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </form>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(false)}
            className="text-text-secondary hover:text-primary"
            aria-label="Aramayı kapat"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
