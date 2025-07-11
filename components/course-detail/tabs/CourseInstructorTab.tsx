// components/course-detail/tabs/CourseInstructorTab.tsx
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Star, Users } from "lucide-react";

// InstructorDetails arayüzü, lib/course-data.ts'den de import edilebilir
interface InstructorDetails {
  name: string;
  title: string;
  bio: string;
  experience: string;
  students: string;
  courses: number;
  rating: number;
  achievements: string[];
  image: string;
}

interface CourseInstructorTabProps {
  instructorDetails: InstructorDetails;
  instructorAvatarImage?: string;
}

export function CourseInstructorTab({ instructorDetails, instructorAvatarImage }: CourseInstructorTabProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-6 w-6 text-purple-600" />
          Eğitmen Hakkında
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage
                src={instructorAvatarImage || "/placeholder.svg"}
                alt={instructorDetails.name}
              />
              <AvatarFallback className="text-2xl font-bold">
                {instructorDetails.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{instructorDetails.name}</h3>
            <p className="text-purple-600 font-medium mb-4">{instructorDetails.title}</p>
            <p className="text-slate-700 mb-6 leading-relaxed">{instructorDetails.bio}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-white/70 rounded-xl">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{instructorDetails.rating}</span>
                </div>
                <p className="text-xs text-slate-600">Eğitmen Puanı</p>
              </div>
              <div className="text-center p-4 bg-white/70 rounded-xl">
                <div className="font-bold mb-2">{instructorDetails.students}</div>
                <p className="text-xs text-slate-600">Öğrenci</p>
              </div>
              <div className="text-center p-4 bg-white/70 rounded-xl">
                <div className="font-bold mb-2">{instructorDetails.courses}</div>
                <p className="text-xs text-slate-600">Kurs</p>
              </div>
              <div className="text-center p-4 bg-white/70 rounded-xl">
                <div className="font-bold mb-2">{instructorDetails.experience}</div>
                <p className="text-xs text-slate-600">Deneyim</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Başarıları</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {instructorDetails.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-white/70 rounded-lg">
                    <Award className="h-4 w-4 text-purple-600 flex-shrink-0" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}