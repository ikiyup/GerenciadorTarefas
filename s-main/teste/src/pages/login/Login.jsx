import './Login.css';
import { useState } from 'react';
import api from '../../api';

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function login(e) {
    e.preventDefault();

    const data = {
      username,
      senha: password
    }

    try {
      const response = await api.post('login', data)

      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
        window.location.href = '/app/home'
      }
    } catch (err) {
      alert('Erro ao realizar login, tente novamente.')
    }
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login form" onSubmit={login}>
            <span className="login-form-title"> Olá! Bem-vindo novamente.</span>

            <div className="wrap-input">
              <input className={username !== "" ? 'has-val input' : 'input'} type="text" value={username}
                onChange={e => setUsername(e.target.value)} />
              <span className="focus-input" data-placeholder='Usuário'></span>
            </div>

            <div className="wrap-input">
              <input className={password !== "" ? 'has-val input' : 'input'} type="password" value={password}
                onChange={e => setPassword(e.target.value)} />
              <span className="focus-input" data-placeholder='Senha'></span>
            </div>
            <div className="container-login-form-btn">
              <button className="login-form-btn"> Iniciar sessão </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

