import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';

type Classroom = { id: string; name: string };
type Book = { id: string; title: string };
type Activity = { id: string; title: string; mode: string; rubricFactualWeight: number; rubricCharacterWeight: number; rubricInterpretWeight: number; rubricConsistencyWeight: number; rubricEvidenceWeight: number };

export function ActivitiesPage() {
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const [classroomId, setClassroomId] = useState('');
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState<'INDIVIDUAL' | 'PROJETO_LITERARIO'>('INDIVIDUAL');
  const [examStartAt, setExamStartAt] = useState('');
  const [examEndAt, setExamEndAt] = useState('');
  const [bookIds, setBookIds] = useState<string[]>([]);

  const [rubricFactualWeight, setRubricFactualWeight] = useState(30);
  const [rubricCharacterWeight, setRubricCharacterWeight] = useState(20);
  const [rubricInterpretWeight, setRubricInterpretWeight] = useState(20);
  const [rubricConsistencyWeight, setRubricConsistencyWeight] = useState(15);
  const [rubricEvidenceWeight, setRubricEvidenceWeight] = useState(15);

  const totalWeight = useMemo(
    () => rubricFactualWeight + rubricCharacterWeight + rubricInterpretWeight + rubricConsistencyWeight + rubricEvidenceWeight,
    [rubricFactualWeight, rubricCharacterWeight, rubricInterpretWeight, rubricConsistencyWeight, rubricEvidenceWeight],
  );

  async function load() {
    const [classesResp, booksResp, activitiesResp] = await Promise.all([
      api.get('/classes'),
      api.get('/books'),
      api.get('/activities'),
    ]);
    setClasses(classesResp.data);
    setBooks(booksResp.data);
    setActivities(activitiesResp.data);
    if (!classroomId && classesResp.data.length > 0) {
      setClassroomId(classesResp.data[0].id);
    }
  }

  useEffect(() => { void load(); }, []);

  function toggleBook(bookId: string) {
    setBookIds((prev) => prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (totalWeight !== 100) {
      alert('A soma da rubrica precisa ser 100.');
      return;
    }
    await api.post('/activities', {
      classroomId,
      title,
      mode,
      examStartAt,
      examEndAt,
      bookIds,
      rubricFactualWeight,
      rubricCharacterWeight,
      rubricInterpretWeight,
      rubricConsistencyWeight,
      rubricEvidenceWeight,
    });
    setTitle('');
    setBookIds([]);
    await load();
  }

  return (
    <div className="grid two">
      <form className="card" onSubmit={onSubmit}>
        <h3>Nova Atividade</h3>
        <select value={classroomId} onChange={(e) => setClassroomId(e.target.value)} required>
          {classes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titulo" required />
        <select value={mode} onChange={(e) => setMode(e.target.value as 'INDIVIDUAL' | 'PROJETO_LITERARIO')}>
          <option value="INDIVIDUAL">Individual</option>
          <option value="PROJETO_LITERARIO">Projeto Literario</option>
        </select>
        <label>Inicio do exame</label>
        <input type="datetime-local" value={examStartAt} onChange={(e) => setExamStartAt(e.target.value)} required />
        <label>Fim do exame</label>
        <input type="datetime-local" value={examEndAt} onChange={(e) => setExamEndAt(e.target.value)} required />

        <h4>Pool de livros</h4>
        <div className="check-grid">
          {books.map((book) => (
            <label key={book.id}>
              <input
                type="checkbox"
                checked={bookIds.includes(book.id)}
                onChange={() => toggleBook(book.id)}
              />
              {book.title}
            </label>
          ))}
        </div>

        <h4>Pesos da Rubrica (professor pode alterar)</h4>
        <div className="grid two compact">
          <label>Factual <input type="number" value={rubricFactualWeight} onChange={(e) => setRubricFactualWeight(Number(e.target.value))} /></label>
          <label>Personagens <input type="number" value={rubricCharacterWeight} onChange={(e) => setRubricCharacterWeight(Number(e.target.value))} /></label>
          <label>Interpretacao <input type="number" value={rubricInterpretWeight} onChange={(e) => setRubricInterpretWeight(Number(e.target.value))} /></label>
          <label>Consistencia <input type="number" value={rubricConsistencyWeight} onChange={(e) => setRubricConsistencyWeight(Number(e.target.value))} /></label>
          <label>Evidencias <input type="number" value={rubricEvidenceWeight} onChange={(e) => setRubricEvidenceWeight(Number(e.target.value))} /></label>
        </div>
        <p className={totalWeight === 100 ? 'ok' : 'error'}>Soma dos pesos: {totalWeight}</p>

        <button className="btn primary" type="submit">Salvar atividade</button>
      </form>

      <div className="card">
        <h3>Atividades</h3>
        <ul>
          {activities.map((item) => (
            <li key={item.id}>
              {item.title} ({item.mode})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

