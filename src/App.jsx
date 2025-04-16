import { useState } from 'react'
import './App.css'
import githubCatLogo from './assets/githubCatLogo.svg'
import './assets/githubNameLogo.svg'
import githubNameLogo from './assets/githubNameLogo.svg'


function App() {

  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarUsuario = async () => {
    if (username === '') return;

    setLoading(true);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();


      if (data.message === 'Not Found') {
        setErro('Nenhum perfil foi encontrado com esse nome de usuário.Tente novamente');
        setUserData(null);
        return;
      }


      setUserData(data);
      setErro('');
    } catch (error) {
      setErro('Erro ao buscar usuário');
    } finally {
      setLoading(false);
    }
  };


  return (
    
    <div className="Pai">
      <div className = "Filho" >
        {/* Aqui é o titulo */ }
        <div className="Titulo">
          <img src={githubCatLogo} alt="GitHub Cat Logo" />
          <h1>Perfil</h1>
          <img src={githubNameLogo} />
        </div>

        {/* Aqui é a barra de pesquisa */ }
        <div className="container mt-5" id='search-bar'>
          <div className="input-group" style={{ width: '503px', height: '62px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Digite um usuário do Github"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  buscarUsuario();
                }
              }
              }
            />
            <button className="btn btn-primary" type="button" onClick={buscarUsuario}>
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {/*Loading */ }
        {loading && (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

        {/* Card com os dados do GitHub */}
        {userData && (
          <div className="card mt-5"  id='user-card'>
            <img src={userData.avatar_url} className="card-img-top" style={{ width: '220px', height: '220pxpx' }} alt="Avatar" />
            <div className="card-body" id='card-right'>
              <h2>{userData.login}</h2>
              <p className="card-text">{userData.bio || 'Não possui bio.'}</p>
            </div>
          </div>
        )}

        {/* Card de erro */}
        {erro && (
          <div className="card mt-5" id="error-card" style={{ width: '710px', padding: '20px', textAlign: 'center', backgroundColor: '#D9D9D9;' }}>
            <p className="ErrorMessage">Nenhum perfil foi encontrado com esse nome de usuário.<br/>Tente novamente</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App
