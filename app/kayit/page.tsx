// app/kayit/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KayitPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    if (res.ok) {
      router.push("/giris");
    } else {
      const data = await res.json();
      setError(data.error || "Kayıt başarısız!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Kayıt Ol</h2>
        <div>
          <label className="block mb-1 text-gray-700">Ad Soyad</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ad Soyad"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="E-posta"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Şifre"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
        >
          Kayıt Ol
        </button>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </form>
    </div>
  );
}