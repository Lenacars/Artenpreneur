"use client"

import { useState, useCallback } from "react" // useCallback eklendi
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

export interface FilterState {
  search: string
  category: string
  priceRange: [number, number]
  level: string
  sort: string
}

interface CourseFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: Partial<FilterState>) => void
  totalCourses: number
  filteredCount: number
}

const categories = [
  "Tümü",
  "Edebiyat",
  "Pazarlama",
  "Girişimcilik",
  "İletişim",
  "Müzik",
  "Sinema",
  "Görsel Sanatlar",
  "Tiyatro",
  "Yazılım",
]

const levels = ["Tümü", "Başlangıç", "Orta", "İleri"]

const sortOptions = [
  { value: "newest", label: "En Yeni" },
  { value: "oldest", label: "En Eski" },
  { value: "price-low", label: "Fiyat: Düşük → Yüksek" },
  { value: "price-high", label: "Fiyat: Yüksek → Düşük" },
  { value: "popular", label: "En Popüler" },
  { value: "rating", label: "En Yüksek Puan" },
]

export function CourseFilters({ filters, onFiltersChange, totalCourses, filteredCount }: CourseFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange)

  // Tüm filtre değişim fonksiyonlarını useCallback ile sarmalıyoruz
  // onFiltersChange prop'u bir bağımlılık olarak eklenmeli
  const handleSearchChange = useCallback((value: string) => {
    onFiltersChange({ search: value })
  }, [onFiltersChange])

  const handleCategoryChange = useCallback((value: string) => {
    onFiltersChange({ category: value === "Tümü" ? "" : value })
  }, [onFiltersChange])

  const handleLevelChange = useCallback((value: string) => {
    onFiltersChange({ level: value === "Tümü" ? "" : value })
  }, [onFiltersChange])

  const handleSortChange = useCallback((value: string) => {
    onFiltersChange({ sort: value })
  }, [onFiltersChange])

  const handlePriceRangeChange = useCallback((value: [number, number]) => {
    setLocalPriceRange(value)
    // onFiltersChange'i doğrudan çağırmak yerine, bir sonraki render'da güncellenmesi için
    // useEffect veya başka bir mekanizma kullanmak daha iyi olabilir
    // Ancak bu örnekte doğrudan çağırıyoruz ve useCallback ile stabil hale getiriyoruz.
    onFiltersChange({ priceRange: value })
  }, [onFiltersChange])

  const clearAllFilters = useCallback(() => {
    onFiltersChange({
      search: "",
      category: "",
      priceRange: [0, 300],
      level: "",
      sort: "newest",
    })
    setLocalPriceRange([0, 300])
  }, [onFiltersChange])

  const hasActiveFilters =
    filters.search || filters.category || filters.level || filters.priceRange[0] > 0 || filters.priceRange[1] < 300

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filtreler</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Temizle
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredCount} / {totalCourses} kurs gösteriliyor
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Arama</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Kurs veya eğitmen ara..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Kategori</Label>
          <Select value={filters.category || "Tümü"} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Level */}
        <div className="space-y-2">
          <Label>Seviye</Label>
          <Select value={filters.level || "Tümü"} onValueChange={handleLevelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seviye seçin" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Fiyat Aralığı</Label>
          <div className="px-2">
            <Slider
              value={localPriceRange}
              onValueChange={handlePriceRangeChange}
              max={300}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>₺{localPriceRange[0]}</span>
            <span>₺{localPriceRange[1]}</span>
          </div>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <Label>Sıralama</Label>
          <Select value={filters.sort} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sıralama seçin" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <Label>Aktif Filtreler</Label>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Arama: {filters.search}
                  <Button variant="ghost" size="sm" className="h-auto p-0 ml-1" onClick={() => handleSearchChange("")}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleCategoryChange("Tümü")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {filters.level && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.level}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleLevelChange("Tümü")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 300) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  ₺{localPriceRange[0]} - ₺{localPriceRange[1]} {/* Burada localPriceRange kullanıldı */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handlePriceRangeChange([0, 300])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CourseFilters
