// Düzeltme: CourseListLoading componentinin doğru yolunu belirtiyoruz.
// components/course dizini altında olduğu için yolu güncelledik.
import CourseListLoading from "@/components/course/course-list-loading"

export default function EgitimlerLoading() {
  return <CourseListLoading count={9} title="Eğitimler Yükleniyor..." />
}
