import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/auth-context';

export function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/app/dashboard" className="logo">LivroAberto</Link>
        <nav>
          <NavLink to="/app/dashboard">Dashboard</NavLink>
          <NavLink to="/app/schools">Escolas</NavLink>
          <NavLink to="/app/classes">Turmas</NavLink>
          <NavLink to="/app/books">Livros</NavLink>
          <NavLink to="/app/activities">Atividades</NavLink>
          <NavLink to="/app/evaluation">Avaliacao</NavLink>
          <NavLink to="/app/results">Resultados</NavLink>
        </nav>
      </aside>
      <main>
        <header className="topbar">
          <span>{user?.email} ({user?.role})</span>
          <button className="btn" onClick={logout}>Sair</button>
        </header>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
