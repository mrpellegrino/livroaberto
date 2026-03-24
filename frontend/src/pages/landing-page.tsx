import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="landing">
      <header className="hero">
        <h1>LivroAberto</h1>
        <p>Avaliacao literaria com IA para escolas, com evidencias e revisao docente.</p>
        <div className="hero-actions">
          <Link to="/login" className="btn primary">Entrar</Link>
          <a href="#features" className="btn">Ver recursos</a>
        </div>
      </header>

      <section id="features" className="features">
        <article>
          <h3>Projeto Literario por Turma</h3>
          <p>Atividades por turma com periodo de exame e rodizio de livros.</p>
        </article>
        <article>
          <h3>Rubrica Ajustavel</h3>
          <p>Professor define pesos de factual, personagens, interpretacao, consistencia e evidencias.</p>
        </article>
        <article>
          <h3>Chat Avaliativo</h3>
          <p>Sessoes de pergunta e resposta com historico e parecer final.</p>
        </article>
      </section>
    </div>
  );
}
