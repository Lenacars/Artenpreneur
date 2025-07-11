'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  // diğer alanlar...
};

export default function UserEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ username: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Kullanıcıyı getir
  useEffect(() => {
    axios.get(`http://localhost:3100/users/${id}`)
      .then(res => {
        setUser(res.data);
        setForm({
          username: res.data.username,
          email: res.data.email,
          role: res.data.role
        });
      })
      .catch(() => setError('Kullanıcı bulunamadı!'))
      .finally(() => setLoading(false));
  }, [id]);

  // Form değişikliği
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`http://localhost:3100/users/${id}`, form);
      router.push('/admin/kullanicilar');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Bir hata oluştu');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Kullanıcıyı Düzenle</h2>
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
