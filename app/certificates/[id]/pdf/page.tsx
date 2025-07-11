'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CertificatePDFPage() {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    setPdfUrl(`http://localhost:3100/certificates/${id}/pdf`);
  }, [id]);

  return (
    <div>
      <h2>Sertifika PDF</h2>
      <a href={pdfUrl!} target="_blank" rel="noopener noreferrer">
        PDF olarak indir
      </a>
    </div>
  );
}
