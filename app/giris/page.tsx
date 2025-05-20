"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GirisPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
    if (res?.error) setError("Giriş başarısız!");
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">Giriş Yap</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Giriş Yap
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>

        {/* Google ile Giriş Yap butonu */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">veya</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 17.1 19.4 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3 15.6 3 8.1 8.5 6.3 14.7z"/><path fill="#FBBC05" d="M24 44c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.2C29.5 36.1 26.9 37 24 37c-5.5 0-10.1-3.7-11.7-8.7l-7 5.4C8.1 39.5 15.6 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-4.6 0-8.4-3.8-8.4-8.5s3.8-8.5 8.4-8.5c2.3 0 4.4.8 6 2.3l6.4-6.4C34.1 5.1 29.3 3 24 3c-6.6 0-12 5.4-12 12s5.4 12 12 12c2.7 0 5.2-.9 7.2-2.4l6.4 6.4C34.1 42.9 29.3 45 24 45c-10.6 0-19.2-8.6-19.2-19.2S13.4 6.6 24 6.6c5.3 0 10.1 1.8 13.8 4.9l-6.4 6.4C29.5 11.9 26.9 11 24 11c-5.5 0-10.1 3.7-11.7 8.7l-7-5.4C8.1 8.5 15.6 3 24 3c10.5 0 20 7.5 20 21 0 1.3-.1-2.7-.3-4z"/></g></svg>
          Google ile Giriş Yap
        </button>
      </div>
    </div>
  );
}