'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
};

export default function QuizPage() {
  const params = useParams(); // { id: ... }
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!params.id) return;
    axios.get(`http://localhost:3100/quizzes/${params.id}`)
      .then(res => setQuestions(res.data));
  }, [params.id]);

  const handleSelect = (qIdx: number, optIdx: number) => {
    const next = [...answers];
    next[qIdx] = optIdx;
    setAnswers(next);
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctOption) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  if (!questions.length) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h2>Sınav</h2>
      {questions.map((q, i) => (
        <div key={q.id} style={{ marginBottom: 16 }}>
          <b>{q.question}</b>
          <div>
            {q.options.map((opt, j) => (
              <label key={j} style={{ marginRight: 8 }}>
                <input
                  type="radio"
                  checked={answers[i] === j}
                  onChange={() => handleSelect(i, j)}
                  disabled={submitted}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit}>Sınavı Bitir</button>
      )}
      {submitted && (
        <div>
          <b>Puan: {score} / {questions.length}</b>
        </div>
      )}
    </div>
  );
}
