// app/egitim-detay/[slug]/page.tsx
// Bu bir Server Component'tir. Client Component'leri burada import edip kullanabiliriz.
// Client Component'ler kendi içlerinde 'use client' direktifine sahip olmalıdır.

import { notFound } from "next/navigation";

// VERİLERİ lib/course-data.ts'den import ediyoruz
import { instructorImages, getInstructorImage, courseData, allCoursesForSimilarSection } from "@/lib/course-data";

// Ana Client Component'imizi import ediyoruz
import { CourseDetailClient } from "@/components/course-detail/CourseDetailClient";

interface CourseDetailPageProps {
  params: {
    slug: string;
  };
}

// Bu bir Async Server Component'tir, bu sayede veri çekme işlemlerini doğrudan içinde yapabiliriz.
export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = params;

  const course = courseData[slug as keyof typeof courseData];

  if (!course) {
    notFound();
  }

  // Eğitmen avatar görselini ve kurs önizleme görselini belirliyoruz
  const instructorAvatarImage = course.instructorDetails.image || getInstructorImage(course.instructorDetails.name);
  const coursePreviewImage = course.coursePreviewImage || "/placeholder.svg";

  // İndirim yüzdesini hesaplıyoruz
  const discountPercentage = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  // Bonus içeriğin toplam değerini hesaplıyoruz
  const bonusValue = course.bonusContent.reduce(
    (total, item) => total + Number.parseInt(item.value.replace("₺", "")),
    0,
  );

  return (
    <CourseDetailClient
      course={course}
      instructorAvatarImage={instructorAvatarImage}
      coursePreviewImage={coursePreviewImage}
      discountPercentage={discountPercentage}
      bonusValue={bonusValue}
      allCoursesForSimilarSection={allCoursesForSimilarSection}
    />
  );
}