// app/egitimler/page.tsx
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseCard } from "@/components/course-card" // CourseCard import edildi
import { CourseFilters } from "@/components/course-filters"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { X, Filter } from "lucide-react"

// courseData'yı ve CourseDetailData tipini lib/course-data.ts'den import ediyoruz
import { courseData as allCoursesObject, CourseDetailData } from "@/lib/course-data"; // <-- courseData'yı allCoursesObject olarak yeniden adlandırdık

// allCoursesObject'i bir diziye dönüştürüyoruz
const coursesData: CourseDetailData[] = Object.values(allCoursesObject); // <-- Burası değişti!


interface FilterState {
  search: string
  category: string
  priceRange: [number, number]
  level: string
  sort: string
}

const initialFilters: FilterState = {
  search: "",
  category: "",
  priceRange: [0, 300],
  level: "",
  sort: "newest",
}

export default function CoursesPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    const filtered = coursesData.filter((course) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesTitle = course.title.toLowerCase().includes(searchTerm)
        const matchesInstructor = course.instructorName.toLowerCase().includes(searchTerm) // instructorName kullanıldı
        if (!matchesTitle && !matchesInstructor) return false
      }

      // Category filter
      if (filters.category && course.category.toLowerCase() !== filters.category.toLowerCase()) return false // Kategori filtrelemesi küçük harfe duyarlı yapıldı

      // Price range filter
      if (course.price < filters.priceRange[0] || course.price > filters.priceRange[1]) return false

      // Level filter
      if (filters.level && course.level.toLowerCase() !== filters.level.toLowerCase()) return false // Seviye filtrelemesi küçük harfe duyarlı yapıldı

      return true
    })

    // Sort courses
    switch (filters.sort) {
      case "newest":
        filtered.sort((a, b) => { /* Varsayılan sıralama ya da eklendiği tarihe göre */ return 0; }); // Burada gerçek bir 'newest' mantığı eklemelisiniz, şu anki ID'ye göre sıralama string ID'ler için doğru çalışmayabilir.
        break;
      case "oldest":
        filtered.sort((a, b) => { /* Varsayılan sıralama ya da eklendiği tarihe göre */ return 0; });
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => b.studentCount - a.studentCount);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered
  }, [filters])

  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const clearAllFilters = () => {
    setFilters(initialFilters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.category) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 300) count++
    if (filters.level) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tüm Eğitimler</h1>
              <p className="text-gray-600">
                {filteredCourses.length} kurs bulundu{" "}
                {coursesData.length !== filteredCourses.length && `(${coursesData.length} toplam)`}
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="md:hidden bg-transparent"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtreler
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filtreler</h2>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Temizle
                    </Button>
                  )}
                </div>

                <CourseFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  totalCourses={coursesData.length}
                  filteredCount={filteredCourses.length}
                />
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Aktif Filtreler:</span>

                  {filters.search && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Arama: {filters.search}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => handleFiltersChange({ search: "" })}
                      >
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
                        onClick={() => handleFiltersChange({ category: "" })}
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
                        onClick={() => handleFiltersChange({ level: "" })}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {(filters.priceRange[0] > 0 || filters.priceRange[1] < 300) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      ₺{filters.priceRange[0]} - ₺{filters.priceRange[1]}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => handleFiltersChange({ priceRange: [0, 300] })}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Results */}
            {filteredCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <CardContent>
                  <div className="text-gray-500 mb-4">
                    <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Kurs bulunamadı</h3>
                    <p>Arama kriterlerinize uygun kurs bulunmuyor.</p>
                  </div>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Filtreleri Temizle
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}