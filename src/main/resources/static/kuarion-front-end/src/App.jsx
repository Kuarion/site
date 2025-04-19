import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Index } from './pages/Index';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Forum from './pages/Forum'; // novo nome
import ForumDetail from './pages/ForumDetail'; // novo nome

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<ForumDetail />} /> {/* cuidado aqui */}
      </Routes>
    </Router>
  );
}

export default App;
