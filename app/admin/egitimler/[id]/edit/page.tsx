'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditTrainingPage() {
  const { id } = useParams();
  const [training, setTraining] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios.get(`http://localhost:3100/trainings/${id}`)
      .then(res => setTraining(res.data))
      .catch(() => setTraining(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.put(`http://localhost:3100/trainings/${id}`, training);
    router.push('/admin/egitimler');
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (!training) return <div>Eğitim bulunamadı!</div>;

  return (
    <div>
      <h2>Eğitim Düzenle</h2>
      <form onSubmit={handleSubmit}>
        <input value={training.title} onChange={e => setTraining({ ...training, title: e.target.value })} required />
        <input value={training.instructor} onChange={e => setTraining({ ...training, instructor: e.target.value })} required />
        <input value={training.price} onChange={e => setTraining({ ...training, price: e.target.value })} required />
        <select value={training.status} onChange={e => setTraining({ ...training, status: e.target.value })}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}
