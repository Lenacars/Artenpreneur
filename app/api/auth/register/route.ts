import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import bcrypt from "bcryptjs"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Tüm alanlar gereklidir" }, { status: 400 })
    }

    // Email kontrolü
    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single()

    if (existingUser) {
      return NextResponse.json({ error: "Bu email adresi zaten kullanılıyor" }, { status: 400 })
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 12)

    // Supabase Auth ile kullanıcı oluştur
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
      },
    })

    if (authError) {
      console.error("Supabase auth error:", authError)
      return NextResponse.json({ error: "Kullanıcı oluşturulamadı" }, { status: 500 })
    }

    // Users tablosuna kullanıcı bilgilerini ekle
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert({
        id: authUser.user.id,
        name,
        email,
        password: hashedPassword,
        role: "USER",
      })
      .select()
      .single()

    if (userError) {
      console.error("User insert error:", userError)
      return NextResponse.json({ error: "Kullanıcı profili oluşturulamadı" }, { status: 500 })
    }

    // User roles tablosuna rol ekle
    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: authUser.user.id,
      role: "USER",
    })

    if (roleError) {
      console.error("Role insert error:", roleError)
    }

    return NextResponse.json(
      {
        message: "Kullanıcı başarıyla oluşturuldu",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
