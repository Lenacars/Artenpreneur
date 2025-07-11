'use client';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function CertificateRequestPage() {
  const { id } = useParams();
  const [result, setResult] = useState<string | null>(null);

  const handleCreateCertificate = () => {
    axios.post(`http://localhost:3100/certificates/${id}/certificate`)
      .then(res => setResult('Sertifika oluşturuldu!'))
      .catch(() => setResult('Sertifika oluşturulamadı!'));
  };

  return (
    <div>
      <h2>Sertifika Oluştur</h2>
      <button onClick={handleCreateCertificate}>Sertifika Al</button>
      {result && <div>{result}</div>}
    </div>
  );
}
