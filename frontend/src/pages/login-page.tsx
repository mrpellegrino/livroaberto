import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth-context';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(undefined);
    try {
      await login(email, password);
      navigate('/app/dashboard');
    } catch {
      setError('Nao foi possivel autenticar. Verifique email e senha.');
    }
  }

  return (
    <div className="auth-page">
      <form className="card" onSubmit={onSubmit}>
        <h2>Login</h2>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label>Senha</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        {error ? <p className="error">{error}</p> : null}
        <button className="btn primary" type="submit">Entrar</button>
      </form>
    </div>
  );
}

