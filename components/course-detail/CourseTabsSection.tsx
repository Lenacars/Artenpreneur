// components/course-detail/CourseTabsSection.tsx
"use client"; // Bu bir Client Component olacak

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sekme içerik bileşenlerini import ediyoruz
import { CourseOverviewTab } from "./tabs/CourseOverviewTab";
import { CourseCurriculumTab } from "./tabs/CourseCurriculumTab";
import { CourseInstructorTab } from "./tabs/CourseInstructorTab";
import { CourseReviewsTab } from "./tabs/CourseReviewsTab";
import { CourseBonusTab } from "./tabs/CourseBonusTab";

// Tüm kurs detaylarını içeren CourseDetailData arayüzünü import ediyoruz
import { CourseDetailData } from '@/lib/course-data';

interface CourseTabsSectionProps {
  course: CourseDetailData;
  instructorAvatarImage?: string; // CourseInstructorTab için gerekli
  bonusValue: number; // CourseBonusTab için gerekli
  // Eğer başka sekmeler de course objesinin dışından veri alıyorsa, buraya ekleyin
}

export function CourseTabsSection({
  course,
  instructorAvatarImage,
  bonusValue,
}: CourseTabsSectionProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-slate-100/50 p-1 m-4 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg">Genel Bakış</TabsTrigger>
          <TabsTrigger value="curriculum" className="rounded-lg">Müfredat</TabsTrigger>
          <TabsTrigger value="instructor" className="rounded-lg">Eğitmen</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-lg">Değerlendirmeler</TabsTrigger>
          <TabsTrigger value="bonus" className="rounded-lg">Bonus</TabsTrigger>
        </TabsList>

        <div className="p-6">
          <TabsContent value="overview" className="space-y-8 mt-0">
            <CourseOverviewTab
              whatYouWillLearn={course.whatYouWillLearn}
              longDescription={course.longDescription}
              requirements={course.requirements}
              targetAudience={course.targetAudience}
            />
          </TabsContent>

          <TabsContent value="curriculum" className="mt-0">
            <CourseCurriculumTab
              curriculum={course.curriculum}
              lessonCount={course.lessonCount}
              duration={course.duration}
            />
          </TabsContent>

          <TabsContent value="instructor" className="mt-0">
            <CourseInstructorTab
              instructorDetails={course.instructorDetails}
              instructorAvatarImage={instructorAvatarImage}
            />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6 mt-0">
            <CourseReviewsTab
              rating={course.rating}
              reviewCount={course.reviewCount}
              reviews={course.reviews}
            />
          </TabsContent>

          <TabsContent value="bonus" className="mt-0">
            <CourseBonusTab
              bonusContent={course.bonusContent}
              bonusValue={bonusValue}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}