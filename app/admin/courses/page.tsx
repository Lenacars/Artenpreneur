// app/admin/courses/page.tsx
import { CourseForm } from '@/components/admin/course-form';
import { VideoUploader } from '@/components/admin/video-uploader';

export default function AdminCoursesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Kurs Yönetimi</h1>
      
      <div className="grid gap-8">
        <CourseForm />
        <VideoUploader />
      </div>
    </div>
  );
}