// app/hesabim/egitimler/page.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function MyCoursesPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <span>Eğitimlerim</span>
        </CardTitle>
        <CardDescription>Satın aldığınız eğitimleri görüntüleyin ve devam edin</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Henüz eğitim satın almadınız</h3>
          <p className="text-slate-600 mb-4">
            Eğitim kataloğumuzu inceleyin ve size uygun eğitimleri keşfedin
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700">Eğitimleri İncele</Button>
        </div>
      </CardContent>
    </Card>
  )
}