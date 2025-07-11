'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Order = {
  id: string;
  userId: string;
  trainingId: string;
  amount: number;
  status: string;
  paymentProvider: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3100/orders')
      .then(res => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (!orders.length) return <div>Sipariş bulunamadı!</div>;

  return (
    <div>
      <h2>Siparişler</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı</th>
            <th>Eğitim</th>
            <th>Tutar</th>
            <th>Durum</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>{order.trainingId}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
              <td>{order.createdAt && new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
