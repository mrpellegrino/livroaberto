import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { api } from '../api/client';

type School = { id: string; name: string };
type Classroom = { id: string; name: string; schoolId: string };

export function ClassesPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [schoolId, setSchoolId] = useState('');
  const [name, setName] = useState('');

  async function load() {
    const [schoolsResp, classesResp] = await Promise.all([
      api.get('/schools'),
      api.get('/classes'),
    ]);
    setSchools(schoolsResp.data);
    setClasses(classesResp.data);
    if (!schoolId && schoolsResp.data.length > 0) {
      setSchoolId(schoolsResp.data[0].id);
    }
  }

  useEffect(() => { void load(); }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await api.post('/classes', { schoolId, name });
    setName('');
    await load();
  }

  return (
    <div className="grid two">
      <form className="card" onSubmit={onSubmit}>
        <h3>Nova Turma</h3>
        <select value={schoolId} onChange={(e) => setSchoolId(e.target.value)} required>
          {schools.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da turma" required />
        <button className="btn primary" type="submit">Salvar</button>
      </form>
      <div className="card">
        <h3>Turmas</h3>
        <ul>{classes.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
      </div>
    </div>
  );
}

