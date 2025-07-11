'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios.get('http://localhost:3100/users')
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) return;
    await axios.delete(`http://localhost:3100/users/${userId}`);
    // Silindikten sonra listeyi güncelle
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (!users.length) return <div>Kullanıcı bulunamadı!</div>;

  return (
    <div>
      <h2>Kullanıcılar</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı Adı</th>
            <th>Email</th>
            <th>Rol</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  style={{ marginRight: 8, background: '#08c', color: '#fff', borderRadius: 4, padding: '4px 8px' }}
                  onClick={() => router.push(`/admin/kullanicilar/${user.id}`)}
                >
                  Düzenle
                </button>
                <button
                  style={{ background: '#e00', color: '#fff', borderRadius: 4, padding: '4px 8px' }}
                  onClick={() => handleDelete(user.id)}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
