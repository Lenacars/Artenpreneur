"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

// Örnek arama sonuçları
const dummyResults = [
  {
    id: 1,
    title: "Sanatçılar İçin Yazılı İletişim",
    type: "Eğitim",
    url: "/egitimler/1",
    description: "Sanatçıların kendilerini yazılı olarak ifade etmelerini sağlayacak kapsamlı bir eğitim.",
  },
  {
    id: 2,
    title: "Kültür Sanat Projeleri İçin Kitlesel Fonlama",
    type: "Eğitim",
    url: "/egitimler/2",
    description: "Sanat projeleriniz için kitlesel fonlama kampanyaları oluşturma stratejileri.",
  },
  {
    id: 3,
    title: "Hakkımızda",
    type: "Sayfa",
    url: "/hakkimizda",
    description: "ARTENPRENEUR – Sanatçılar İçin Girişimcilik Eğitimleri platformu hakkında bilgiler.",
  },
  {
    id: 4,
    title: "Dr. Funda Lena Nazik",
    type: "Kişi",
    url: "/hakkimizda",
    description: "ARTENPRENEUR'ün kurucusu Dr. Funda Lena Nazik hakkında bilgiler.",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (query) {
      // Gerçek bir uygulamada burada API çağrısı yapılır
      // Şimdilik dummy verileri filtreleyerek gösterelim
      const filteredResults = dummyResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filteredResults)
    } else {
      setResults([])
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    // URL'i güncelle
    window.history.pushState({}, "", `/arama?q=${encodeURIComponent(searchQuery)}`)
    // Sonuçları güncelle
    const filteredResults = dummyResults.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setResults(filteredResults)
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Arama Sonuçları</h1>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
          <Input
            type="search"
            placeholder="Arama yapmak için yazın..."
            className="border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="bg-primary hover:bg-primary-dark text-primary-foreground">
            <SearchIcon className="h-4 w-4 mr-2" />
            Ara
          </Button>
        </form>
      </div>

      {query ? (
        <>
          <p className="text-text-secondary mb-6">
            <span className="font-medium">"{query}"</span> için {results.length} sonuç bulundu
          </p>

          <div className="space-y-6">
            {results.length > 0 ? (
              results.map((result) => (
                <div key={result.id} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary-foreground rounded">
                      {result.type}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">
                    <Link href={result.url} className="hover:text-primary">
                      {result.title}
                    </Link>
                  </h2>
                  <p className="text-text-secondary mb-3">{result.description}</p>
                  <Link href={result.url}>
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5">
                      Görüntüle
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-text-secondary mb-4">Aramanızla eşleşen sonuç bulunamadı.</p>
                <p className="text-text-secondary">
                  Farklı anahtar kelimeler deneyebilir veya gezinme menüsünü kullanabilirsiniz.
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-text-secondary">Arama yapmak için yukarıdaki arama kutusunu kullanın.</p>
        </div>
      )}
    </div>
  )
}
