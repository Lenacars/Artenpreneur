import { Card, CardContent } from "@/components/ui/card"

export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Yükleniyor...</h2>
          <p className="text-slate-600">Giriş sayfası hazırlanıyor.</p>
        </CardContent>
      </Card>
    </div>
  )
}
