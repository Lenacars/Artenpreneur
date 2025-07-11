"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogIn, UserPlus, User, Settings, Heart, ShoppingCart, LogOut } from "lucide-react"

export default function UserMenu() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
    )
  }

  if (session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
              <AvatarFallback>{session.user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/hesabim" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Hesabım</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/hesabim/favorilerim" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              <span>Favorilerim</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/sepet" className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Sepetim</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/hesabim/ayarlar" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Ayarlar</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Çıkış Yap</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/giris">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          Giriş Yap
        </Button>
      </Link>
      <Link href="/kayit">
        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
          <UserPlus className="h-4 w-4" />
          Kayıt Ol
        </Button>
      </Link>
    </div>
  )
}
