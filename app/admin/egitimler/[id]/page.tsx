'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function TrainingDetailPage() {
  const { id } = useParams();
  const [training, setTraining] = useState<any>(null);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3100/trainings/${id}/preview`)
      .then(res => setTraining(res.data));
    // Kullanıcı bu eğitimi almış mı kontrolü için
    axios.get(`http://localhost:3100/trainings/${id}/content`)
      .then(() => setPurchased(true))
      .catch(() => setPurchased(false));
  }, [id]);

  const handlePurchase = () => {
    axios.post(`http://localhost:3100/trainings/${id}/purchase`)
      .then(() => setPurchased(true));
  };

  if (!training) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h2>{training.title}</h2>
      <div>{training.description}</div>
      {!purchased ? (
        <button onClick={handlePurchase}>Satın Al</button>
      ) : (
        <div>
          <h3>Eğitim İçeriği:</h3>
          {/* İçeriği burada gösterebilirsin */}
        </div>
      )}
    </div>
  );
}
