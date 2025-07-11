'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer?: string; // Kullanıcı cevabı için
};

export default function QuizPage() {
  const { trainingId } = useParams();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3100/quiz/${trainingId}`)
      .then(res => setQuestions(res.data))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, [trainingId]);

  if (loading) return <div>Yükleniyor...</div>;
  if (!questions.length) return <div>Quiz bulunamadı!</div>;

  // Basit bir quiz gösterimi
  return (
    <div>
      <h2>Quiz</h2>
      {questions.map((q, i) => (
        <div key={q.id}>
          <div>{i + 1}. {q.question}</div>
          <ul>
            {q.options.map(opt => (
              <li key={opt}>
                <input type="radio" name={`q${i}`} value={opt} /> {opt}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/* Buraya quiz cevaplarını gönderme işlemi de eklenebilir */}
    </div>
  );
}
