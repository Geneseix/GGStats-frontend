import React, { useState } from 'react';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();

  setMsg('');
  try {
    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    console.log("📡 fetch() finished with status:", res.status);
    
    const text = await res.text();
    console.log("📨 response text:", text);

    setMsg(text);
  } catch (err) {
    console.error("❌ fetch error:", err);
    setMsg("Error de conexión");
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input name="username" placeholder="Usuario" value={form.username} onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
      <input name="password" placeholder="Contraseña" type="password" value={form.password} onChange={handleChange} required />
      <button type="submit">Registrarse</button>
      {msg && <div>{msg}</div>}
    </form>
  );
}