// components/course-detail/tabs/CourseCurriculumTab.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Badge import edildi

// Curriculum arayüzü, lib/course-data.ts'den de import edilebilir
interface CurriculumSection {
  title: string;
  duration: string;
  lessons: { title: string; duration: string; isPreview: boolean; }[];
}

interface CourseCurriculumTabProps {
  curriculum: CurriculumSection[];
  lessonCount: number;
  duration: string;
}

export function CourseCurriculumTab({ curriculum, lessonCount, duration }: CourseCurriculumTabProps) {
  return (
    <Card className="border-0 bg-white/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          Kurs İçeriği
        </CardTitle>
        <p className="text-sm text-slate-600 mt-2">
          {curriculum.length} bölüm • {lessonCount} ders • {duration} toplam süre
        </p>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {curriculum.map((section, index) => (
            <AccordionItem
              key={index}
              value={`section-${index}`}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <AccordionTrigger className="text-left px-6 py-4 hover:no-underline bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="flex justify-between items-center w-full pr-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{section.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {section.lessons.length} ders • {section.duration}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white">
                <div className="space-y-3">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Play className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium">{lesson.title}</span>
                        {lesson.isPreview && (
                          <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                            Önizleme
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}