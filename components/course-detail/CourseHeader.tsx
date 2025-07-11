// components/course-detail/CourseHeader.tsx
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp, Clock, BookOpen, Globe, Calendar, Crown } from "lucide-react";

// Bu bileşen, course objesinin ilgili kısımlarını doğrudan prop olarak alacak.
interface CourseHeaderProps {
  title: string;
  subtitle: string;
  category: string;
  level: string;
  isBestseller: boolean;
  price: number;
  originalPrice?: number; // Opsiyonel
  rating: number;
  reviewCount: number;
  studentCount: number;
  completionRate: number;
  duration: string;
  lessonCount: number;
  language: string;
  lastUpdated: string;
}

export function CourseHeader({
  title,
  subtitle,
  category,
  level,
  isBestseller,
  price,
  originalPrice,
  rating,
  reviewCount,
  studentCount,
  completionRate,
  duration,
  lessonCount,
  language,
  lastUpdated,
}: CourseHeaderProps) {
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {isBestseller && (
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-sm font-semibold">
            <Crown className="w-4 h-4 mr-1" />
            Bestseller
          </Badge>
        )}
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {category}
        </Badge>
        <Badge variant="outline" className="border-green-200 text-green-700">
          {level}
        </Badge>
        {discountPercentage > 0 && (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            %{discountPercentage} İndirim
          </Badge>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-slate-600 mb-6 leading-relaxed">{subtitle}</p>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-lg">{rating}</span>
          </div>
          <p className="text-sm text-slate-600">{reviewCount} değerlendirme</p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-lg">{studentCount.toLocaleString()}</span>
          </div>
          <p className="text-sm text-slate-600">öğrenci</p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <div className="flex items-center justify-center gap-1 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="font-bold text-lg">%{completionRate}</span>
          </div>
          <p className="text-sm text-slate-600">tamamlama</p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Clock className="h-5 w-5 text-purple-600" />
            <span className="font-bold text-lg">{duration}</span>
          </div>
          <p className="text-sm text-slate-600">video içerik</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>{lessonCount} ders</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{language}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Son güncelleme: {lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}