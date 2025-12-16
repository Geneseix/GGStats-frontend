import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthForms({ onLogin }) {
  const [showRegister, setShowRegister] = useState(true);

  return (
    <div style={{
      maxWidth: 350,
      margin: '60px auto',
      padding: 32,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(44, 44, 84, 0.10)',
      color: '#222',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#5f2eea',
        fontWeight: 700,
        fontSize: 28,
        marginBottom: 8,
        letterSpacing: 1,
        textTransform: 'lowercase'
      }}>
        {showRegister ? 'Registrarse' : 'Iniciar sesión'}
      </h2>
      <div style={{
        width: 60,
        height: 3,
        background: '#5f2eea',
        margin: '0 auto 24px auto',
        borderRadius: 2
      }} />
      {showRegister ? <RegisterForm /> : <LoginForm onLogin={onLogin} />}
      <div style={{ display: 'flex', marginTop: 24 }}>
        <button
          onClick={() => setShowRegister(true)}
          style={{
            flex: 1,
            background: showRegister ? '#5f2eea' : '#eee',
            color: showRegister ? '#fff' : '#888',
            border: 'none',
            borderRadius: '24px 0 0 24px',
            padding: '12px 0',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Registrarse
        </button>
        <button
          onClick={() => setShowRegister(false)}
          style={{
            flex: 1,
            background: !showRegister ? '#5f2eea' : '#eee',
            color: !showRegister ? '#fff' : '#888',
            border: 'none',
            borderRadius: '0 24px 24px 0',
            padding: '12px 0',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

function RegisterForm() {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    const res = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const text = await res.text();
    setMsg(text);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 8 }}>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <span style={{
          position: 'absolute', left: 14, top: 13, color: '#aaa', fontSize: 18
        }}>
          <i className="fa fa-user" />
        </span>
        <input
          name="username"
          placeholder="Nombre"
          value={form.username}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px 12px 12px 40px',
            border: 'none',
            borderRadius: 8,
            background: '#f3f3f3',
            fontSize: 15,
            marginBottom: 0
          }}
        />
      </div>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <span style={{
          position: 'absolute', left: 14, top: 13, color: '#aaa', fontSize: 18
        }}>
          <i className="fa fa-envelope" />
        </span>
        <input
          name="email"
          placeholder="Correo electrónico"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px 12px 12px 40px',
            border: 'none',
            borderRadius: 8,
            background: '#f3f3f3',
            fontSize: 15,
            marginBottom: 0
          }}
        />
      </div>
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <span style={{
          position: 'absolute', left: 14, top: 13, color: '#aaa', fontSize: 18
        }}>
          <i className="fa fa-lock" />
        </span>
        <input
          name="password"
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px 12px 12px 40px',
            border: 'none',
            borderRadius: 8,
            background: '#f3f3f3',
            fontSize: 15,
            marginBottom: 0
          }}
        />
      </div>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>
        ¿Olvidaste tu contraseña? <a href="#" style={{ color: '#5f2eea', textDecoration: 'underline' }}>Haz clic aquí</a>
      </div>
      <button type="submit" style={{
        width: '100%',
        background: '#5f2eea',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '12px 0',
        fontWeight: 600,
        fontSize: 16,
        marginBottom: 4,
        cursor: 'pointer'
      }}>
        Registrarse
      </button>
      {msg && <div style={{ marginTop: 8, color: '#e84057', textAlign: 'center' }}>{msg}</div>}
    </form>
  );
}

function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      setMsg(text);

      if (res.ok) {
        navigate('/search');
      }
    } catch (err) {
      console.error("Error de fetch:", err);
      setMsg("Error de conexión");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 8 }}>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <span style={{ position: 'absolute', left: 14, top: 13, color: '#aaa', fontSize: 18 }}>
          <i className="fa fa-user" />
        </span>
        <input
          name="username"
          placeholder="Nombre"
          value={form.username}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px 12px 12px 40px',
            border: 'none',
            borderRadius: 8,
            background: '#f3f3f3',
            fontSize: 15,
            marginBottom: 0
          }}
        />
      </div>
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <span style={{ position: 'absolute', left: 14, top: 13, color: '#aaa', fontSize: 18 }}>
          <i className="fa fa-lock" />
        </span>
        <input
          name="password"
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px 12px 12px 40px',
            border: 'none',
            borderRadius: 8,
            background: '#f3f3f3',
            fontSize: 15,
            marginBottom: 0
          }}
        />
      </div>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>
        ¿Olvidaste tu contraseña? <a href="#" style={{ color: '#5f2eea', textDecoration: 'underline' }}>Haz clic aquí</a>
      </div>
      <button type="submit" style={{
        width: '100%',
        background: '#5f2eea',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '12px 0',
        fontWeight: 600,
        fontSize: 16,
        marginBottom: 4,
        cursor: 'pointer'
      }}>
        Iniciar sesión
      </button>
      {msg && <div style={{ marginTop: 8, color: '#e84057', textAlign: 'center' }}>{msg}</div>}
    </form>
  );
}
