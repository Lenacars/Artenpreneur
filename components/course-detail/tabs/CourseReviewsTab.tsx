// components/course-detail/tabs/CourseReviewsTab.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Button import edildi
import { MessageCircle, Star, ThumbsUp } from "lucide-react";

// Review arayüzü, lib/course-data.ts'den de import edilebilir
interface Review {
  id: number;
  name: string;
  title: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface CourseReviewsTabProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export function CourseReviewsTab({ rating, reviewCount, reviews }: CourseReviewsTabProps) {
  return (
    <>
      <Card className="border-0 bg-white/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            Öğrenci Değerlendirmeleri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                {rating}
              </div>
              <div className="flex justify-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600 font-medium">{reviewCount} değerlendirme</p>
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((r) => {
                const percentage = r === 5 ? 70 : r === 4 ? 25 : 5 // Bu değerler gerçek veriye göre hesaplanmalı
                return (
                  <div key={r} className="flex items-center gap-3 mb-3">
                    <span className="text-sm w-8 font-medium">{r} ⭐</span>
                    <Progress value={percentage} className="flex-1 h-2" />
                    <span className="text-sm text-slate-600 w-12 font-medium">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="border-2 border-white shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-slate-600">{review.title}</p>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-500">{review.date}</span>
                  </div>
                  <p className="text-slate-700 mb-3 leading-relaxed">{review.comment}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Faydalı ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}