// components/course-detail/SimilarCoursesSection.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// CourseDetailData arayüzünü import ediyoruz
import { CourseDetailData } from '@/lib/course-data';

interface SimilarCoursesSectionProps {
  allCoursesForSimilarSection: CourseDetailData[];
}

export function SimilarCoursesSection({ allCoursesForSimilarSection }: SimilarCoursesSectionProps) {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
        Benzer Kurslar
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCoursesForSimilarSection.map((similarCourse) => (
          <Card
            key={similarCourse.id}
            className="border-0 bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
          >
            {/* Kartın genel tıklanabilir alanı */}
            <Link href={`/egitim-detay/${similarCourse.slug || similarCourse.id}`} passHref> {/* slug kullanmak daha iyi */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={similarCourse.image || "/placeholder.svg"}
                  alt={similarCourse.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </Link>
            <CardContent className="p-6">
              <h3 className="font-bold mb-2 text-lg leading-tight">{similarCourse.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{similarCourse.instructorName}</p> {/* <-- DÜZELTME BURADA */}
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl text-blue-600">₺{similarCourse.price.toFixed(2)}</span>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                    Ayrıntıları Görüntüle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}