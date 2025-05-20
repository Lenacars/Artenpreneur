"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, ShoppingCart, BookOpen, DollarSign, Award, BarChart } from "lucide-react"

// Tip tanımlamalarını ekleyelim
interface RecentUser {
  id: string
  name: string
  email: string
  date: string
}

interface RecentOrder {
  id: string
  user: string
  amount: number
  date: string
  status: string
}

interface PopularCourse {
  id: number
  title: string
  students: number
  revenue: number
}

interface DashboardStats {
  totalUsers: number
  totalCourses: number
  totalOrders: number
  totalRevenue: number
  recentUsers: RecentUser[]
  recentOrders: RecentOrder[]
  popularCourses: PopularCourse[]
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCourses: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentUsers: [],
    recentOrders: [],
    popularCourses: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Örnek istatistik verileri
    const dummyStats = {
      totalUsers: 42,
      totalCourses: 15,
      totalOrders: 78,
      totalRevenue: 45750,
      recentUsers: [
        { id: "1", name: "Selçuk Nazik", email: "selcuk.nazik@gmail.com", date: "2023-05-19" },
        { id: "2", name: "Ahmet Yılmaz", email: "ahmet.yilmaz@example.com", date: "2023-05-18" },
        { id: "3", name: "Ayşe Demir", email: "ayse.demir@example.com", date: "2023-05-17" },
      ],
      recentOrders: [
        { id: "1", user: "Selçuk Nazik", amount: 1250, date: "2023-05-19", status: "completed" },
        { id: "2", user: "Ahmet Yılmaz", amount: 2000, date: "2023-05-18", status: "completed" },
        { id: "3", user: "Ayşe Demir", amount: 750, date: "2023-05-17", status: "processing" },
      ],
      popularCourses: [
        { id: 1, title: "Yaratıcı Girişimcilik", students: 24, revenue: 18000 },
        { id: 3, title: "İletişim 101", students: 32, revenue: 16000 },
        { id: 2, title: "Dijital Pazarlama", students: 18, revenue: 9000 },
      ],
    }

    // Veri yükleme simülasyonu
    setTimeout(() => {
      setStats(dummyStats)
      setLoading(false)
    }, 1000)
  }, [])

  // Sipariş durumuna göre renk belirleme
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "processing":
        return "text-blue-600"
      case "pending":
        return "text-yellow-600"
      case "cancelled":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Yönetim Paneli</h1>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-teal-500 border-r-transparent"></div>
          <p className="mt-2">Veriler yükleniyor...</p>
        </div>
      ) : (
        <>
          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Toplam Kullanıcı</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.totalUsers}</h3>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Toplam Eğitim</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.totalCourses}</h3>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Toplam Sipariş</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Toplam Gelir</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.totalRevenue.toLocaleString("tr-TR")} ₺</h3>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sekmeli İçerik */}
          <Tabs defaultValue="recent" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Son Aktiviteler</TabsTrigger>
              <TabsTrigger value="popular">Popüler Eğitimler</TabsTrigger>
            </TabsList>

            <TabsContent value="recent">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Son Kullanıcılar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Son Kaydolan Kullanıcılar
                    </CardTitle>
                    <CardDescription>Son 7 günde kaydolan kullanıcılar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats.recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                          <div className="text-sm text-gray-500">{user.date}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Son Siparişler */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Son Siparişler
                    </CardTitle>
                    <CardDescription>Son 7 günde alınan siparişler</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats.recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{order.user}</p>
                            <p className="text-sm text-gray-500">{order.amount.toLocaleString("tr-TR")} ₺</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`text-sm ${getStatusColor(order.status)}`}>
                              {order.status === "completed"
                                ? "Tamamlandı"
                                : order.status === "processing"
                                  ? "İşleniyor"
                                  : order.status === "pending"
                                    ? "Beklemede"
                                    : "İptal Edildi"}
                            </span>
                            <span className="text-xs text-gray-500">{order.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="popular">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    En Popüler Eğitimler
                  </CardTitle>
                  <CardDescription>En çok öğrencisi olan eğitimler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {stats.popularCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{course.title}</p>
                          <div className="flex items-center mt-1">
                            <Users className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-500">{course.students} Öğrenci</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{course.revenue.toLocaleString("tr-TR")} ₺</p>
                          <p className="text-sm text-gray-500">Toplam Gelir</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Gelir Grafiği */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Aylık Gelir Grafiği
              </CardTitle>
              <CardDescription>Son 6 ayın gelir dağılımı</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <p className="text-gray-500">Bu bölümde gelir grafiği gösterilecektir.</p>
                <p className="text-gray-500 text-sm">
                  (Grafik için{" "}
                  <a
                    href="https://www.chartjs.org/docs/latest/"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chart.js
                  </a>{" "}
                  veya
                  <a
                    href="https://recharts.org/en-US/"
                    className="text-blue-500 hover:underline ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Recharts
                  </a>{" "}
                  kullanabilirsiniz)
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

export default DashboardPage
