import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Index } from './pages/Index';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Forum from './pages/Forum';
import Post from './pages/Post';
import PostDetail from './pages/PostDetail';
import Social from './pages/Social';
import Auth from './pages/Auth';
import Market from './pages/Marketplace';
import { ColorProvider } from './context/ColorContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LandingPage2 from './pages/LandingPage2';

function App() {
  return (
    <Router>
      <ColorProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/social" element={<Social />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/market" element={<Market />} />
            <Route path="/landing_page" element={<LandingPage />} />
            <Route path="/landing_page_2" element={<LandingPage2 />} />
            <Route path="/forum/communities/:communityId" element={<Post />} />
            <Route path="/forum/communities/:communityId/posts/:postId" element={<PostDetail />} />
          </Routes>
        </Layout>
      </ColorProvider>
    </Router>
  );
}

export default App;
