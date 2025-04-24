import { Routes, Route } from 'react-router-dom';

import { Index } from './pages/Index/Index';
import { Login } from './pages/Login/Login';
import { NotFound } from './pages/NotFound/NotFound';
import { Auth } from './pages/Auth';

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<Login />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}