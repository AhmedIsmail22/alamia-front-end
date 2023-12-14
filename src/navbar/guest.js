import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from '../components/authentication/home';
import Register from '../components/authentication/register';
import "./guest.css"
import Login from '../components/authentication/Login';
import { useEffect } from 'react';
function Guest() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/login");
    },[]);
    return (
        <>
            <nav className="guest navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="btn btn-warning mx-1" to="/login">تسجيل  دخول</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-warning mx-1" to="/register">تسجيل حساب جديد</Link>
                    </li>

                </ul>

            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>

            {/* <Login /> */}
        </>
    );
}

export default Guest;
