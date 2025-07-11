// components/course-detail/tabs/CourseBonusTab.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Badge import edildi
import { Download, Gift } from "lucide-react";

// BonusContentItem arayüzü, lib/course-data.ts'den de import edilebilir
interface BonusContentItem {
  title: string;
  value: string;
}

interface CourseBonusTabProps {
  bonusContent: BonusContentItem[];
  bonusValue: number;
}

export function CourseBonusTab({ bonusContent, bonusValue }: CourseBonusTabProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-emerald-50 to-teal-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-6 w-6 text-emerald-600" />
          Bonus İçerikler
        </CardTitle>
        <p className="text-emerald-700 font-medium">Toplam ₺{bonusValue} değerinde bonus içerik!</p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {bonusContent.map((bonus, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white/70 rounded-xl border border-emerald-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium">{bonus.title}</span>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                {bonus.value}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}