'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function CertificatePage() {
  const params = useParams();
  const [cert, setCert] = useState<any>(null);
  const userId = "mevcutKullaniciId"; // Auth ile alınmalı. Şimdilik statik test için yazabilirsin.

  useEffect(() => {
    if (!params.id) return;
    axios.get(`http://localhost:3100/certificates/${userId}/${params.id}`)
      .then(res => setCert(res.data));
  }, [params.id, userId]);

  if (!cert) return <div>Sertifika bulunamadı veya yükleniyor.</div>;

  return (
    <div>
      <h2>Sertifika</h2>
      <div>Sertifika ID: {cert.id}</div>
      <div>Eğitim ID: {cert.trainingId}</div>
      <div>Tarih: {new Date(cert.issuedAt).toLocaleString()}</div>
      {/* PDF/indir linki ekleyebilirsin */}
    </div>
  );
}
