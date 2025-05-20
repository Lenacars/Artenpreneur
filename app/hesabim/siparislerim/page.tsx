"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatPrice } from "@/lib/coupons"
import { generateInvoicePDF } from "@/lib/invoice-generator"
import { toast } from "sonner"
import { Eye, Search, Calendar, ArrowUpDown, Download } from "lucide-react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

// Sipariş tipi
type Order = {
  id: string
  orderNumber: string
  orderDate: string
  paymentMethod: string
  status: "completed" | "processing" | "cancelled"
  total: number
  courses: Array<{
    id: string
    title: string
    instructor: string
    price: string
    originalPrice?: string
    image?: string
  }>
  customerInfo?: {
    name?: string
    email?: string
    address?: string
    city?: string
    country?: string
    postalCode?: string
  }
}

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  // Siparişleri yükle
  useEffect(() => {
    const loadOrders = () => {
      setIsLoading(true)

      try {
        // localStorage'dan siparişleri al
        const storedOrders = localStorage.getItem("orders")
        const lastOrder = localStorage.getItem("lastOrder")

        let ordersArray: Order[] = []

        // Kayıtlı siparişler varsa ekle
        if (storedOrders) {
          ordersArray = JSON.parse(storedOrders)
        }

        // Son sipariş varsa ve listede yoksa ekle
        if (lastOrder) {
          const parsedLastOrder = JSON.parse(lastOrder)

          // Sipariş numarasına göre kontrol et
          if (!ordersArray.some((order) => order.orderNumber === parsedLastOrder.orderNumber)) {
            // Yeni sipariş oluştur
            const newOrder: Order = {
              id: crypto.randomUUID(),
              orderNumber: parsedLastOrder.orderNumber,
              orderDate: parsedLastOrder.orderDate || new Date().toISOString(),
              paymentMethod: parsedLastOrder.paymentMethod || "Kredi Kartı",
              status: "completed",
              total: parsedLastOrder.orderTotal || 0,
              courses: parsedLastOrder.courses || [],
              customerInfo: parsedLastOrder.customerInfo || {},
            }

            // Siparişler listesine ekle
            ordersArray = [newOrder, ...ordersArray]

            // Güncellenmiş listeyi localStorage'a kaydet
            localStorage.setItem("orders", JSON.stringify(ordersArray))
          }
        }

        // Örnek sipariş yoksa demo siparişler ekle
        if (ordersArray.length === 0) {
          ordersArray = generateDemoOrders()
          localStorage.setItem("orders", JSON.stringify(ordersArray))
        }

        setOrders(ordersArray)
        setFilteredOrders(ordersArray)
      } catch (error) {
        console.error("Siparişler yüklenirken hata oluştu:", error)
        toast.error("Siparişleriniz yüklenirken bir hata oluştu.")
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [])

  // Filtreleme ve sıralama
  useEffect(() => {
    let result = [...orders]

    // Durum filtreleme
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter)
    }

    // Arama filtreleme
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase()
      result = result.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(lowerSearchTerm) ||
          order.courses.some(
            (course) =>
              course.title.toLowerCase().includes(lowerSearchTerm) ||
              course.instructor.toLowerCase().includes(lowerSearchTerm),
          ),
      )
    }

    // Sıralama
    switch (sortBy) {
      case "date-desc":
        result.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
        break
      case "date-asc":
        result.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime())
        break
      case "total-desc":
        result.sort((a, b) => b.total - a.total)
        break
      case "total-asc":
        result.sort((a, b) => a.total - b.total)
        break
    }

    setFilteredOrders(result)
  }, [orders, searchTerm, statusFilter, sortBy])

  // Fatura oluştur ve indir
  const downloadInvoice = async (order: Order) => {
    try {
      setIsGeneratingPdf(true)
      toast.loading("Fatura oluşturuluyor...")

      // PDF oluştur
      const doc = await generateInvoicePDF({
        orderNumber: order.orderNumber,
        orderDate: order.orderDate,
        orderTotal: order.total,
        paymentMethod: order.paymentMethod,
        courses: order.courses,
        customerInfo: order.customerInfo,
      })

      // PDF'i indir
      doc.save(`ARTENPRENEUR-Fatura-${order.orderNumber}.pdf`)

      toast.dismiss()
      toast.success("Fatura başarıyla oluşturuldu")
    } catch (error) {
      console.error("PDF oluşturma hatası:", error)
      toast.dismiss()
      toast.error("Fatura oluşturulurken bir hata oluştu")
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  // Sipariş detaylarını görüntüle
  const viewOrderDetails = (orderId: string) => {
    router.push(`/hesabim/siparislerim/${orderId}`)
  }

  // Durum badge'i
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Tamamlandı</Badge>
      case "processing":
        return <Badge className="bg-blue-500">İşleniyor</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">İptal Edildi</Badge>
      default:
        return <Badge className="bg-gray-500">Bilinmiyor</Badge>
    }
  }

  // Tarih formatla
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMMM yyyy", { locale: tr })
    } catch (e) {
      return dateString
    }
  }

  // Demo siparişler oluştur
  function generateDemoOrders(): Order[] {
    return [
      {
        id: "order-1",
        orderNumber: "SP-2023-001",
        orderDate: "2023-11-15T14:30:00Z",
        paymentMethod: "Kredi Kartı",
        status: "completed",
        total: 1299,
        courses: [
          {
            id: "course-1",
            title: "Dijital Sanat Temelleri",
            instructor: "Ayşe Yılmaz",
            price: "₺799",
            originalPrice: "₺999",
          },
          {
            id: "course-2",
            title: "Sanat Pazarlama Stratejileri",
            instructor: "Mehmet Demir",
            price: "₺500",
          },
        ],
        customerInfo: {
          name: "Kullanıcı Adı",
          email: "kullanici@ornek.com",
        },
      },
      {
        id: "order-2",
        orderNumber: "SP-2023-002",
        orderDate: "2023-12-05T09:15:00Z",
        paymentMethod: "Havale/EFT",
        status: "completed",
        total: 1499,
        courses: [
          {
            id: "course-3",
            title: "Sanatçılar için İş Planı Hazırlama",
            instructor: "Zeynep Kaya",
            price: "₺1499",
            originalPrice: "₺1999",
          },
        ],
        customerInfo: {
          name: "Kullanıcı Adı",
          email: "kullanici@ornek.com",
        },
      },
      {
        id: "order-3",
        orderNumber: "SP-2024-001",
        orderDate: "2024-01-20T16:45:00Z",
        paymentMethod: "Kredi Kartı",
        status: "processing",
        total: 2499,
        courses: [
          {
            id: "course-4",
            title: "Sanat Galerisi Yönetimi",
            instructor: "Ali Yıldız",
            price: "₺1299",
          },
          {
            id: "course-5",
            title: "Sanatçılar için Sosyal Medya",
            instructor: "Selin Ak",
            price: "₺1200",
          },
        ],
        customerInfo: {
          name: "Kullanıcı Adı",
          email: "kullanici@ornek.com",
        },
      },
    ]
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Siparişlerim</h1>
          <p className="text-gray-500 mt-1">Tüm siparişlerinizi görüntüleyin ve yönetin</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/kurslarim")}>
            Kurslarıma Git
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
              Tümü
            </TabsTrigger>
            <TabsTrigger value="completed" onClick={() => setStatusFilter("completed")}>
              Tamamlanan
            </TabsTrigger>
            <TabsTrigger value="processing" onClick={() => setStatusFilter("processing")}>
              İşleniyor
            </TabsTrigger>
            <TabsTrigger value="cancelled" onClick={() => setStatusFilter("cancelled")}>
              İptal Edilen
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Sipariş ara..."
                className="pl-9 w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sıralama" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">En Yeni</SelectItem>
                <SelectItem value="date-asc">En Eski</SelectItem>
                <SelectItem value="total-desc">Fiyat: Yüksek-Düşük</SelectItem>
                <SelectItem value="total-asc">Fiyat: Düşük-Yüksek</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          {isLoading ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
                </div>
              </CardContent>
            </Card>
          ) : filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <Alert>
                  <AlertDescription>Aradığınız kriterlere uygun sipariş bulunamadı.</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Sipariş No</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Tarih
                          </div>
                        </TableHead>
                        <TableHead>Kurslar</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            <ArrowUpDown className="h-4 w-4" />
                            Tutar
                          </div>
                        </TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{formatDate(order.orderDate)}</TableCell>
                          <TableCell>
                            <div className="max-w-[250px]">
                              {order.courses.map((course, index) => (
                                <div key={course.id} className={index > 0 ? "mt-1" : ""}>
                                  <span className="text-sm font-medium line-clamp-1">{course.title}</span>
                                  {index < order.courses.length - 1 && <Separator className="my-1" />}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{formatPrice(order.total)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => downloadInvoice(order)}
                                disabled={isGeneratingPdf || order.status !== "completed"}
                                title="Fatura İndir"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => viewOrderDetails(order.id)}
                                title="Detayları Görüntüle"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
