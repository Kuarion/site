import { Routes, Route } from 'react-router-dom';

import { Index } from './pages/Index/Index';
import { Login } from './pages/Login/Login';
import { NotFound } from './pages/NotFound/NotFound';
import { Auth } from './pages/Auth';
import LandingPage from './pages/LandingPage';

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<Login />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='*' element={<NotFound />} />
            <Route path="/landing_page" element={<LandingPage />} />
        
        </Routes>
    );
}