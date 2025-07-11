'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function UserAddPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', role: 'user', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3100/auth/register', form);
      router.push('/admin/kullanicilar');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Bir hata oluştu');
    }
  };

  return (
    <div>
      <h2>Yeni Kullanıcı Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kullanıcı Adı:</label>
          <input name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Şifre:</label>
          <input name="password" value={form.password} onChange={handleChange} type="password" required />
        </div>
        <div>
          <label>Rol:</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">Kullanıcı</option>
            <option value="admin">Admin</option>
            <option value="student">Öğrenci</option>
            <option value="instructor">Eğitmen</option>
            {/* diğer roller... */}
          </select>
        </div>
        <button type="submit">Kaydet</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}
