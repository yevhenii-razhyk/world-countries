import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage';
import Country from './pages/Country/Country';
import Layout from './components/Layout/Layout';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='country/:cod' element={<Country />} />
            </Route>
        </Routes>
    );
}

export default App;
