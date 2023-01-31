import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegistrationForm from './pages/RegistrationForm';
import NotFound from './pages/NotFound';
import SettingsForm from './pages/SettingsForm';
import NewsPreferences from './pages/NewsPreferences';

function App() {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const location = useLocation();

    const tokenHandler = (token: string) => {
        setToken(token);
        localStorage.setItem('token', JSON.stringify(token));
        navigate("/dashboard");
    }

    useEffect(() => {
        // eslint-disable-next-line
        if (token) {
          //  navigate("/dashboard");
        } else if (location.pathname === "/dashboard" || location.pathname === "/news-preferences" || location.pathname === "/settings") {
            navigate("/");
        }
        // eslint-disable-next-line
    }, [token]);

    return (
        <div className="App">
            <Routes>
                {token ?
                <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/news-preferences" element={<NewsPreferences/>} />
                    <Route path="/settings" element={<SettingsForm/>} />
                    </>
                    :
                    <>
                        <Route path="/" element={<Login tokenHandler={tokenHandler} />} />
                        <Route path="/register" element={<RegistrationForm />} />
                    </>
                }
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
