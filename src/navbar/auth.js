import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/authentication/home';
import Dashboard from '../components/authentication/dashboard';
import AuthUser from '../components/authentication/AuthUser';
import User from "../images/user.jpg";
import "./auth.css";
import { useState } from 'react';
function Auth() {
    const {token, imgPath, user, logout} = AuthUser();
    // console.log(user.name);
    const [profileForm, setProfileForm] = useState(false);
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }
    return (
        <>
                <div>
                    <p>الخيارات</p>
                </div>
                <div>
                    <img onClick={() => setProfileForm(!profileForm)}  className='profile-img rounded-circle mx-3' width="40px" height="40px" src={user.img?imgPath+user.img:User} alt="logo" />

                    {profileForm && 
                        <div style={{display : profileForm ? "block" : "none"}} className="profile-form bg-warning rounded d-flex flex-column">
                            <div className="profile-form-header row justify-content-between align-items-center">
                            <img className='col-4 rounded-circle' height={100}  src={user.img?imgPath+user.img:User} alt="logo" />   
                            <div className='col-8 d-flex flex-column'>
                                <h5>{user.name}</h5>
                                <p className='text-secondary'>{user.email}</p>
                            </div>                             
                            </div>
                            <div className='d-flex flex-column profile-form-body bg-light'>
                            <div className='d-flex align-items-center text-secondary fs-5'> 
                                    <ion-icon name="person"></ion-icon>
                                    <Link to="/" className='m-2 link'>الصفحة الشخصية</Link>
                                </div>
                                <div className='d-flex align-items-center text-secondary fs-5'>
                                <ion-icon name="create-outline"></ion-icon>
                                    <Link to="/" className='m-2 link'> تعديل بيانات الصفحة الشخصية </Link>
                                </div>
                            </div>
                            <div className='logout-btn bg-light'>
                                <button onClick={logoutUser} className='btn btn-danger px-5'>تسجيل خروج</button>
                            </div>
                    </div>
                    }
                </div>


                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
        </>
    );
}

export default Auth;
