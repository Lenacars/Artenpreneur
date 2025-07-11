// components/course-detail/CourseDetailClient.tsx
"use client" // Bu, bir Client Component olduğunu belirtir

import { useState, useEffect } from "react"
// import Image from "next/image" // Artık SimilarCoursesSection'da kullanılacak
import Link from "next/link"
import { Button } from "@/components/ui/button" // Artık SimilarCoursesSection'da kullanılacak
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Artık SimilarCoursesSection'da kullanılacak
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Clock,
  Users,
  Star,
  Play,
  Share2,
  Heart,
  Gift,
  CheckCircle,
  Globe,
  BookOpen,
  Target,
  Award,
  Download,
  Smartphone,
  Monitor,
  Shield,
  TrendingUp,
  Calendar,
  MessageCircle,
  ThumbsUp,
  Zap,
  Crown,
  Timer,
  ShoppingCart
} from "lucide-react"

// Daha önce lib/course-data.ts'ye taşıdığımız arayüzü ve varsa diğer utility'leri import etmeliyiz
import { CourseDetailData } from "@/lib/course-data";

// YENİ OLUŞTURDUĞUMUZ BİLEŞENLERİ İMPORT EDİYORUZ
import { CourseHeader } from "@/components/course-detail/CourseHeader";
import { CoursePreviewSection } from "@/components/course-detail/CoursePreviewSection";
import { CourseTabsSection } from "@/components/course-detail/CourseTabsSection";
import { CourseSidebar } from "@/components/course-detail/CourseSidebar";
import { SimilarCoursesSection } from "@/components/course-detail/SimilarCoursesSection"; // <-- YENİ İMPORT


interface CourseDetailClientProps {
  course: CourseDetailData;
  instructorAvatarImage: string | undefined;
  coursePreviewImage: string;
  discountPercentage: number;
  bonusValue: number;
  allCoursesForSimilarSection: CourseDetailData[];
}

export function CourseDetailClient({
  course,
  instructorAvatarImage,
  coursePreviewImage,
  discountPercentage,
  bonusValue,
  allCoursesForSimilarSection,
}: CourseDetailClientProps) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Breadcrumb - Burası ayrı bir bileşen olabilir */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-slate-600 hover:text-slate-900">
                  Ana Sayfa
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/egitimler" className="text-slate-600 hover:text-slate-900">
                  Eğitimler
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-slate-900">{course.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <CourseHeader
              title={course.title}
              subtitle={course.subtitle}
              category={course.category}
              level={course.level}
              isBestseller={course.isBestseller}
              price={course.price}
              originalPrice={course.originalPrice}
              rating={course.rating}
              reviewCount={course.reviewCount}
              studentCount={course.studentCount}
              completionRate={course.completionRate}
              duration={course.duration}
              lessonCount={course.lessonCount}
              language={course.language}
              lastUpdated={course.lastUpdated}
            />

            {/* Course Preview Section */}
            <CoursePreviewSection coursePreviewImage={coursePreviewImage} />

            {/* Course Tabs Section */}
            <CourseTabsSection
              course={course}
              instructorAvatarImage={instructorAvatarImage}
              bonusValue={bonusValue}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CourseSidebar
              course={course}
              discountPercentage={discountPercentage}
              bonusValue={bonusValue}
              instructorAvatarImage={instructorAvatarImage}
            />
          </div>
        </div>

        {/* Similar Courses - ARTIK YENİ BİLEŞENİMİZ */}
        <SimilarCoursesSection allCoursesForSimilarSection={allCoursesForSimilarSection} />
      </div>
    </div>
  )
}