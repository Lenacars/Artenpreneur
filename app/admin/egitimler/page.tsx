'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Training = {
  id: string;
  title: string;
  instructor: string;
  price: number;
  status: string; // örn: "pending", "approved", "rejected"
  // ... diğer alanlar
};

export default function TrainingListPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    setLoading(true);
    axios.get('http://localhost:3100/trainings')
      .then(res => setTrainings(res.data))
      .catch(() => setTrainings([]))
      .finally(() => setLoading(false));
  };

  // SİLME
  const handleDelete = async (id: string) => {
    if (!confirm("Eğitimi silmek istediğinize emin misiniz?")) return;
    await axios.delete(`http://localhost:3100/trainings/${id}`);
    setTrainings(prev => prev.filter(t => t.id !== id));
  };

  // ONAY
  const handleApprove = async (id: string) => {
    await axios.post(`http://localhost:3100/trainings/${id}/approve`);
    fetchTrainings();
  };

  // REDDET
  const handleReject = async (id: string) => {
    await axios.post(`http://localhost:3100/trainings/${id}/reject`);
    fetchTrainings();
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (!trainings.length) return <div>Eğitim bulunamadı!</div>;

  return (
    <div>
      <h2>Eğitimler</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Başlık</th>
            <th>Eğitmen</th>
            <th>Fiyat</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map(training => (
            <tr key={training.id}>
              <td>{training.id}</td>
              <td>{training.title}</td>
              <td>{training.instructor}</td>
              <td>{training.price}</td>
              <td>{training.status}</td>
              <td>
                <button onClick={() => handleApprove(training.id)} style={{ marginRight: 4 }}>Onayla</button>
                <button onClick={() => handleReject(training.id)} style={{ marginRight: 4 }}>Reddet</button>
                <button onClick={() => handleDelete(training.id)} style={{ background: "#e00", color: "#fff" }}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
