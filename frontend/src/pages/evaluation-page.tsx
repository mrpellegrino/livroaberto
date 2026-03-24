import type { FormEvent } from 'react';
import { useState } from 'react';
import { api } from '../api/client';

type Message = { id: string; role: string; content: string };

export function EvaluationPage() {
  const [activityId, setActivityId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  async function startSession(event: FormEvent) {
    event.preventDefault();
    const response = await api.post('/evaluations/sessions/start', { activityId });
    setSessionId(response.data.id);
    setMessages([]);
  }

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const response = await api.post(`/evaluations/sessions/${sessionId}/messages`, { content: message });
    setMessages(response.data);
    setMessage('');
  }

  async function finishSession() {
    await api.post(`/evaluations/sessions/${sessionId}/complete`);
    alert('Sessao finalizada e parecer inicial gerado.');
  }

  return (
    <div className="card">
      <h3>Sessao de Avaliacao</h3>
      <form onSubmit={startSession} className="inline-form">
        <input value={activityId} onChange={(e) => setActivityId(e.target.value)} placeholder="ID da atividade" required />
        <button className="btn" type="submit">Iniciar</button>
      </form>

      {sessionId ? (
        <>
          <p>Sessao: {sessionId}</p>
          <form onSubmit={sendMessage} className="inline-form">
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite a resposta do aluno" required />
            <button className="btn primary" type="submit">Enviar</button>
          </form>
          <div className="chat-box">
            {messages.map((item) => (
              <div key={item.id} className={`chat-${item.role}`}>
                <strong>{item.role}:</strong> {item.content}
              </div>
            ))}
          </div>
          <button className="btn" onClick={finishSession}>Encerrar sessao</button>
        </>
      ) : null}
    </div>
  );
}

