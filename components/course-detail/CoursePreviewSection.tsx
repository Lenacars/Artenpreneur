// components/course-detail/CoursePreviewSection.tsx
"use client"; // Bu bir Client Component olacak çünkü etkileşimli elemanlar içeriyor (Play butonu)

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

interface CoursePreviewSectionProps {
  coursePreviewImage: string;
}

export function CoursePreviewSection({ coursePreviewImage }: CoursePreviewSectionProps) {
  return (
    <Card className="overflow-hidden shadow-xl border-0 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden">
          <Image
            src={coursePreviewImage}
            alt="Kurs Önizleme"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 600px"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button
              size="lg"
              className="rounded-full w-20 h-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/30"
              // Burada bir video oynatma işlevi tetiklenebilir
              onClick={() => console.log('Video Oynatıldı!')}
            >
              <Play className="h-8 w-8 ml-1 text-white" />
            </Button>
          </div>
          <div className="absolute top-4 left-4">
            <Badge className="bg-black/70 text-white backdrop-blur-sm">
              <Play className="w-3 h-3 mr-1" />
              Ücretsiz Önizleme
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/70 backdrop-blur-sm text-white p-3 rounded-lg">
              <p className="font-medium">Bu kursu önizle</p>
              <p className="text-sm opacity-90">İlk dersi ücretsiz izleyebilirsiniz</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}