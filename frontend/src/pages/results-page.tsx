import type { FormEvent } from 'react';
import { useState } from 'react';
import { api } from '../api/client';

type Result = {
  id: string;
  finalScore: number;
  confidence: number;
  summary: string;
  session: {
    student: { name: string };
    book: { title: string };
  };
};

export function ResultsPage() {
  const [activityId, setActivityId] = useState('');
  const [results, setResults] = useState<Result[]>([]);

  async function onSearch(event: FormEvent) {
    event.preventDefault();
    const response = await api.get('/evaluations/results', {
      params: activityId ? { activityId } : undefined,
    });
    setResults(response.data);
  }

  return (
    <div className="card">
      <h3>Resultados</h3>
      <form onSubmit={onSearch} className="inline-form">
        <input value={activityId} onChange={(e) => setActivityId(e.target.value)} placeholder="Filtrar por ID da atividade" />
        <button className="btn" type="submit">Buscar</button>
      </form>
      <ul>
        {results.map((item) => (
          <li key={item.id}>
            {item.session.student.name} - {item.session.book.title} | Nota {item.finalScore} | Confianca {item.confidence}%
            <br />
            <small>{item.summary}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

