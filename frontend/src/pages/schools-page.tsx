import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { api } from '../api/client';

type School = { id: string; name: string };

export function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [name, setName] = useState('');

  async function load() {
    const response = await api.get('/schools');
    setSchools(response.data);
  }

  useEffect(() => { void load(); }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await api.post('/schools', { name });
    setName('');
    await load();
  }

  return (
    <div className="grid two">
      <form className="card" onSubmit={onSubmit}>
        <h3>Nova Escola</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da escola" required />
        <button className="btn primary" type="submit">Salvar</button>
      </form>
      <div className="card">
        <h3>Escolas</h3>
        <ul>{schools.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
      </div>
    </div>
  );
}

