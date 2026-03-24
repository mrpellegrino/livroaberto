import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/auth-context';
import './login-page.css';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'aluno' | 'professor' | 'escola'>('aluno');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(undefined);
    try {
      await login(email, password);
      navigate('/app/dashboard');
    } catch {
      setError('Não foi possível autenticar. Verifique email e senha.');
    }
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/" className="login-brand">
          <span className="material-symbols-outlined">lightbulb</span>
          iluminIA
        </Link>
      </header>

      <main className="login-main">
        <div className="login-hero">
          <h1 className="login-title">Bem-vindo ao iluminIA</h1>
          <p className="login-subtitle">Escolha seu perfil para continuar</p>
        </div>

        <div className="role-grid">
          <button 
            type="button"
            className="role-card aluno"
            data-active={selectedRole === 'aluno'}
            onClick={() => setSelectedRole('aluno')}
          >
            <div className="role-icon-wrapper">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h3 className="role-title">Aluno</h3>
            <p className="role-desc">Acesse suas trilhas de aprendizado e avaliações personalizadas.</p>
            <div className="role-indicator"></div>
          </button>

          <button 
            type="button"
            className="role-card professor"
            data-active={selectedRole === 'professor'}
            onClick={() => setSelectedRole('professor')}
          >
            <div className="role-icon-wrapper">
              <span className="material-symbols-outlined">auto_stories</span>
            </div>
            <h3 className="role-title">Professor</h3>
            <p className="role-desc">Gerencie turmas, analise o progresso e receba insights da IA.</p>
            <div className="role-indicator"></div>
          </button>

          <button 
            type="button"
            className="role-card escola"
            data-active={selectedRole === 'escola'}
            onClick={() => setSelectedRole('escola')}
          >
            <div className="role-icon-wrapper">
              <span className="material-symbols-outlined">corporate_fare</span>
            </div>
            <h3 className="role-title">Escola</h3>
            <p className="role-desc">Visão administrativa completa e relatórios de desempenho.</p>
            <div className="role-indicator"></div>
          </button>
        </div>

        <div className="login-form-container">
          <form className="login-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">E-mail</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">mail</span>
                <input 
                  className="login-input" 
                  id="email" 
                  placeholder="nome@escola.com.br" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-group-header">
                <label className="form-label" htmlFor="password">Senha</label>
                <a className="forgot-link" href="#">Esqueceu a senha?</a>
              </div>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">lock</span>
                <input 
                  className="login-input" 
                  id="password" 
                  placeholder="••••••••" 
                  type={isPasswordVisible ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  className="toggle-password" 
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  title={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
                >
                  <span className="material-symbols-outlined">
                    {isPasswordVisible ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button className="submit-btn" type="submit">
              Entrar
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div className="signup-prompt">
            <p>Ainda não tem acesso? <a className="signup-link" href="#">Fale com seu consultor</a></p>
          </div>
        </div>

        <div className="ai-decor">
          <div className="ai-decor-line"></div>
          <div className="ai-decor-text">
            <span 
              className="material-symbols-outlined ai-decor-icon" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              temp_preferences_custom
            </span>
            Inteligência Educacional Guida
          </div>
          <div className="ai-decor-line"></div>
        </div>
      </main>
    </div>
  );
}
