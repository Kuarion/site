import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Index } from './pages/Index';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Forum from './pages/Forum'; // Importando o componente Fórum
import Post from './pages/Post'; // Para a listagem de posts por comunidade
import PostDetail from './pages/PostDetail'; // Detalhes do post

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/communities/:communityId" element={<Post />} /> {/* Rota para listar posts da comunidade */}
        <Route path="/forum/communities/:communityId/posts/:postId" element={<PostDetail />} /> {/* Rota para o detalhe do post */}
      </Routes>
    </Router>
  );
}

export default App;
