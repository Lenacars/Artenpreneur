'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  // Diğer alanlar: password, claims, lastLogin vb. ihtiyaca göre ekleyebilirsin
};

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`http://localhost:3100/users/${id}`)
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Bu kullanıcıyı silmek istediğine emin misiniz?")) return;
    await axios.delete(`http://localhost:3100/users/${id}`);
    router.push('/admin/kullanicilar');
  };

  // (Düzenleme için ayrı bir sayfa ya da modal açabilirsin.)

  if (loading) return <div>Yükleniyor...</div>;
  if (!user) return <div>Kullanıcı bulunamadı!</div>;

  return (
    <div>
      <h2>{user.username} Detayları</h2>
      <div>Email: {user.email}</div>
      <div>Rol: {user.role}</div>
      {/* Ek alanlar: <div>Son Giriş: {user.lastLogin}</div> gibi */}
      <div style={{ marginTop: 24 }}>
        <button
          style={{ marginRight: 12, background: '#e00', color: '#fff', padding: '8px 16px', borderRadius: 4 }}
          onClick={handleDelete}
        >
          Kullanıcıyı Sil
        </button>
        {/* 
        <button
          style={{ background: '#08c', color: '#fff', padding: '8px 16px', borderRadius: 4 }}
          onClick={() => router.push(`/admin/kullanicilar/${id}/edit`)}
        >
          Düzenle
        </button>
        */}
      </div>
    </div>
  );
}
