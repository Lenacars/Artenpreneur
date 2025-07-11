'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddTrainingPage() {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post('http://localhost:3100/trainings', {
      title,
      instructor,
      price: Number(price),
      status: 'pending', // veya onaylı ise 'approved'
    });
    router.push('/admin/egitimler');
  };

  return (
    <div>
      <h2>Yeni Eğitim Ekle</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Eğitim Başlığı" required />
        <input value={instructor} onChange={e => setInstructor(e.target.value)} placeholder="Eğitmen" required />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Fiyat" type="number" required />
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}
