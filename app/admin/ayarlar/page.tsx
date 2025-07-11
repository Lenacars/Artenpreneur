'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    axios.get('http://localhost:3100/settings')
      .then(res => setSettings(res.data))
      .catch(() => setSettings(null));
  }, []);

  if (!settings) return <div>Ayarlar yükleniyor...</div>;

  return (
    <div>
      <h2>Site Ayarları</h2>
      <div>Site Başlığı: {settings.title}</div>
      {/* Diğer ayarlar */}
    </div>
  );
}
