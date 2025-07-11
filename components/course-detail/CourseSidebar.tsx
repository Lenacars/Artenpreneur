// components/course-detail/CourseSidebar.tsx
"use client"; // Bu bir Client Component olacak çünkü etkileşimli elemanlar içeriyor (countdown, favori, sepete ekle)

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";

// Gerekli tipleri ve utility fonksiyonlarını import ediyoruz
import { CourseDetailData } from "@/lib/course-data";
import { isFavorite as checkIsFavorite, addToFavorites, removeFromFavorites, favoritesEmitter } from "@/lib/favorites";
import { addToCart as clientAddToCart, isInCart as clientIsInCart, cartEmitter } from "@/lib/cart";
import { toast } from "sonner"; // Bildirimler için

interface CourseSidebarProps {
  course: CourseDetailData;
  discountPercentage: number;
  bonusValue: number;
  instructorAvatarImage?: string; // Favorilere eklerken kullanılabilecek
}

export function CourseSidebar({
  course,
  discountPercentage,
  bonusValue,
  instructorAvatarImage,
}: CourseSidebarProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [cartState, setCartState] = useState(false); // Sepette olup olmadığını tutar

  // Favori ve Sepet durumunu kontrol etmek için useEffect
  useEffect(() => {
    setIsFavorite(checkIsFavorite(course.id));
    setCartState(clientIsInCart(course.id));

    // Event listener'ları burada kaydolmalı
    const handleFavoritesChange = () => setIsFavorite(checkIsFavorite(course.id));
    const handleCartChange = () => setCartState(clientIsInCart(course.id));

    favoritesEmitter.on("favoritesChanged", handleFavoritesChange);
    cartEmitter.on("cartChanged", handleCartChange);

    return () => {
      favoritesEmitter.off("favoritesChanged", handleFavoritesChange);
      cartEmitter.off("cartChanged", handleCartChange);
    };
  }, [course.id]);


  // Countdown timer effect
  useEffect(() => {
    if (course.offerEndsAt) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = course.offerEndsAt!.getTime() - now; // offerEndsAt'in var olduğunu garanti ediyoruz

        if (distance > 0) {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeLeft({ hours, minutes, seconds });
        } else {
          clearInterval(timer);
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [course.offerEndsAt]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      if (removeFromFavorites(course.id)) {
        toast.success("Favorilerden kaldırıldı");
      }
    } else {
      if (addToFavorites({
        id: course.id,
        title: course.title,
        instructor: course.instructorName,
        price: course.price,
        image: course.coursePreviewImage || course.image || "/placeholder.svg",
        instructorImage: instructorAvatarImage,
      })) {
        toast.success("Favorilere eklendi");
      }
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Eğer sepetteyse, "Sepette" yazısını gösteriyor ve tıklayınca bir şey yapmıyoruz.
    // Kullanıcı sepete gitmek isterse ayrı bir buton veya link olmalı.
    if (cartState) {
      toast.info("Bu kurs zaten sepetinizde.");
      return;
    }

    if (clientAddToCart({
      id: course.id,
      title: course.title,
      instructor: course.instructorName,
      price: course.price,
      image: course.coursePreviewImage || course.image || "/placeholder.svg",
      instructorImage: instructorAvatarImage,
    })) {
      toast.success("Sepete eklendi!");
    } else {
      toast.error("Sepete eklenirken bir sorun oluştu.");
    }
  };

  return (
    <div className="sticky top-8 space-y-6">
      {/* Limited Time Offer */}
      {course.offerEndsAt && (timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0) ? (
        <Card className="border-0 bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Timer className="h-5 w-5" />
              <span className="font-bold">Sınırlı Süre Teklifi!</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
                <div className="text-xs">Saat</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                <div className="text-xs">Dakika</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                <div className="text-xs">Saniye</div>
              </div>
            </div>
            <p className="text-sm opacity-90">Bu fiyat sadece bugün geçerli!</p>
          </CardContent>
        </Card>
      ) : null}

      {/* Purchase Card */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              {course.originalPrice && (
                <span className="text-2xl text-slate-500 line-through">₺{course.originalPrice.toFixed(2)}</span>
              )}
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ₺{course.price.toFixed(2)}
              </span>
            </div>
            {discountPercentage > 0 && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg px-4 py-2 mb-4">
                %{discountPercentage} Tasarruf Edin!
              </Badge>
            )}
            <p className="text-sm text-slate-600">+ ₺{bonusValue} değerinde bonus içerik</p>
          </div>

          <div className="space-y-3 mb-6">
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 text-lg shadow-xl"
              size="lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Hemen Satın Al
            </Button>
            <Button
              variant="outline"
              className="w-full border-2 border-slate-300 hover:bg-slate-50 py-4 font-semibold bg-transparent"
              onClick={handleAddToCartClick}
              disabled={cartState} // Sepetteyse butonu devre dışı bırak
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {cartState ? "Sepette" : "Sepete Ekle"}
            </Button>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              className="hover:bg-red-50"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-600"}`} />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
              <Share2 className="h-4 w-4 text-slate-600" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-green-50">
              <Gift className="h-4 w-4 text-slate-600" />
            </Button>
          </div>

          <div className="text-center space-y-2 mb-6">
            <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium">
              <Shield className="h-4 w-4" />
              30 gün para iade garantisi
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600 font-medium">
              <Crown className="h-4 w-4" />
              Yaşam boyu erişim
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h4 className="font-bold text-lg">Bu kurs şunları içerir:</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-blue-600" />
                <span className="text-sm">{course.duration} video içerik</span>
              </div>
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-green-600" />
                <span className="text-sm">İndirilebilir kaynaklar</span>
              </div>
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-purple-600" />
                <span className="text-sm">Mobil ve TV erişimi</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-orange-600" />
                <span className="text-sm">Tamamlama sertifikası</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-indigo-600" />
                <span className="text-sm">Topluluk erişimi</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm">Para iade garantisi</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Info */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Kurs Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Seviye:</span>
            <Badge variant="outline" className="border-green-200 text-green-700">
              {course.level}
            </Badge>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Süre:</span>
            <span className="font-medium">{course.duration}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Ders Sayısı:</span>
            <span className="font-medium">{course.lessonCount}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Dil:</span>
            <span className="font-medium">{course.language}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-600">Son Güncelleme:</span>
            <span className="font-medium">{course.lastUpdated}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}