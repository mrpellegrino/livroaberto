import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { api } from '../api/client';

type Book = { id: string; title: string; author?: string | null };

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  async function load() {
    const response = await api.get('/books');
    setBooks(response.data);
  }

  useEffect(() => { void load(); }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await api.post('/books', { title, author });
    setTitle('');
    setAuthor('');
    await load();
  }

  return (
    <div className="grid two">
      <form className="card" onSubmit={onSubmit}>
        <h3>Novo Livro</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titulo" required />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Autor" />
        <button className="btn primary" type="submit">Salvar</button>
      </form>
      <div className="card">
        <h3>Livros</h3>
        <ul>{books.map((item) => <li key={item.id}>{item.title} {item.author ? `- ${item.author}` : ''}</li>)}</ul>
      </div>
    </div>
  );
}

