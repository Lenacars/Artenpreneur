// components/course-detail/tabs/CourseOverviewTab.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Zap, Users } from "lucide-react";

interface CourseOverviewTabProps {
  whatYouWillLearn: string[];
  longDescription: string;
  requirements: string[];
  targetAudience: string[];
}

export function CourseOverviewTab({
  whatYouWillLearn,
  longDescription,
  requirements,
  targetAudience,
}: CourseOverviewTabProps) {
  return (
    <>
      <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="h-6 w-6 text-blue-600" />
            Bu Kursta Neler Öğreneceksiniz?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {whatYouWillLearn.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white/50">
        <CardHeader>
          <CardTitle className="text-xl">Kurs Açıklaması</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 leading-relaxed mb-4">{longDescription}</p>
          <p className="text-slate-700 leading-relaxed">
            Sanat dünyasında başarılı olmak sadece yetenekle değil, aynı zamanda etkili iletişim kurabilme
            becerisiyle de ilgilidir. Bu kurs, sanatçıların yazılı iletişim becerilerini geliştirerek,
            sanat kariyerlerinde daha başarılı olmalarını sağlamayı amaçlamaktadır.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              Gereksinimler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Hedef Kitle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {targetAudience.map((audience, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span>{audience}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}