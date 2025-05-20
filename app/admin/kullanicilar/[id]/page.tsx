"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, Mail, Calendar, ShoppingCart, Edit, Save, XCircle } from "lucide-react"

export default function KullaniciDetayPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    active: true,
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)

        // Örnek kullanıcı verisi
        const dummyUser = {
          id: params.id,
          name: "Selçuk Nazik",
          email: "selcuk.nazik@gmail.com",
          phone: "+90 555 123 4567",
          role: "admin",
          active: true,
          created_at: "2023-05-19T15:53:19.23019+00",
          orders: [
            { id: "1", date: "2023-05-19", total: 1250, status: "completed" },
            { id: "2", date: "2023-04-10", total: 750, status: "completed" },
          ],
          courses: [
            { id: 1, title: "Yaratıcı Girişimcilik", instructor: "Begüm Meriç", completed: true },
            { id: 2, title: "Dijital Pazarlama", instructor: "Ceylan Karaca", completed: false },
          ],
        }

        // Veri yükleme simülasyonu
        setTimeout(() => {
          setUser(dummyUser)
          setFormData({
            name: dummyUser.name,
            email: dummyUser.email,
            phone: dummyUser.phone || "",
            role: dummyUser.role,
            active: dummyUser.active,
          })
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error("Kullanıcı detayları getirilirken hata:", err)
        setError("Kullanıcı detayları yüklenirken bir hata oluştu.")
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
  }

  const handleSave = async () => {
    try {
      // Burada gerçek bir API çağrısı yapılacak
      // Şimdilik sadece simülasyon yapıyoruz
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Kullanıcı verisini güncelle
      setUser({
        ...user,
        ...formData,
      })

      setEditing(false)
    } catch (err) {
      console.error("Kullanıcı güncellenirken hata:", err)
      setError("Kullanıcı güncellenirken bir hata oluştu.")
    }
  }

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
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-2" onClick={() => router.push("/admin/kullanicilar")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri
        </Button>
        <h1 className="text-2xl font-bold">Kullanıcı Detayları</h1>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-teal-500 border-r-transparent"></div>
          <p className="mt-2">Kullanıcı detayları yükleniyor...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : user ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sol Sütun - Kullanıcı Bilgileri */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Kullanıcı Bilgileri</CardTitle>
                  <CardDescription>
                    Kayıt Tarihi: {new Date(user.created_at).toLocaleDateString("tr-TR")}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setEditing(!editing)}>
                  {editing ? (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      İptal
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Düzenle
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {editing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input id="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Rol</Label>
                      <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Rol seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">Kullanıcı</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) => handleSwitchChange("active", checked)}
                      />
                      <Label htmlFor="active">Aktif</Label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.role === "admin" ? "Admin" : "Kullanıcı"}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 mr-3" />
                      <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                        {user.email}
                      </a>
                    </div>

                    {user.phone && (
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-gray-500 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span>{user.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                      <span>
                        {new Date(user.created_at).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${user.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {user.active ? "Aktif" : "Pasif"}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
              {editing && (
                <CardFooter>
                  <Button onClick={handleSave} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Değişiklikleri Kaydet
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>

          {/* Sağ Sütun - Sekmeli İçerik */}
          <div className="md:col-span-2">
            <Tabs defaultValue="orders">
              <TabsList className="mb-4">
                <TabsTrigger value="orders">Siparişler</TabsTrigger>
                <TabsTrigger value="courses">Eğitimler</TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Kullanıcının Siparişleri
                    </CardTitle>
                    <CardDescription>Toplam {user.orders.length} sipariş</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.orders.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Sipariş No</TableHead>
                            <TableHead>Tarih</TableHead>
                            <TableHead>Tutar</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead>İşlemler</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {user.orders.map((order: any) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">#{order.id}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>{order.total.toLocaleString("tr-TR")} ₺</TableCell>
                              <TableCell>
                                <span className={getStatusColor(order.status)}>
                                  {order.status === "completed"
                                    ? "Tamamlandı"
                                    : order.status === "processing"
                                      ? "İşleniyor"
                                      : order.status === "pending"
                                        ? "Beklemede"
                                        : "İptal Edildi"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => router.push(`/admin/siparisler/${order.id}`)}
                                >
                                  Detaylar
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Henüz sipariş bulunmuyor.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Kullanıcının Eğitimleri
                    </CardTitle>
                    <CardDescription>Toplam {user.courses.length} eğitim</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.courses.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Eğitim Adı</TableHead>
                            <TableHead>Eğitmen</TableHead>
                            <TableHead>Durum</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {user.courses.map((course: any) => (
                            <TableRow key={course.id}>
                              <TableCell className="font-medium">{course.title}</TableCell>
                              <TableCell>{course.instructor}</TableCell>
                              <TableCell>
                                <span className={course.completed ? "text-green-600" : "text-blue-600"}>
                                  {course.completed ? "Tamamlandı" : "Devam Ediyor"}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Henüz eğitim bulunmuyor.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p>Kullanıcı bulunamadı.</p>
        </div>
      )}
    </div>
  )
}
