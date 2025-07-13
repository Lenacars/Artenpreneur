// app/api/auth/register/route.ts

import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Tüm alanlar gereklidir" }, { status: 400 });
    }

    // Email kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Bu email adresi zaten kullanılıyor" }, { status: 400 });
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 12);

    // Kullanıcıyı oluştur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
      select: { id: true, name: true, email: true },
    });

    // Rol tablosuna ekle (isteğe bağlı)
    await prisma.userRole.create({
      data: {
        userId: user.id,
        role: "USER",
      },
    });

    return NextResponse.json(
      {
        message: "Kullanıcı başarıyla oluşturuldu",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
