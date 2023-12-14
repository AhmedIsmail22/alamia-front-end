import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function AuthUser(){




    const theUrl = "https://quotation-system.net/API/public/api/";
    const imgPath = "https://quotation-system.net/API/public/storage/";

    // const theUrl = "http://localhost/alamia/public/api/";
    // const imgPath = "http://localhost/alamia/public/storage/";
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]); 
    const getToken = () =>{
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = localStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }



    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        localStorage.setItem('token',JSON.stringify(token));
        localStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/');
    }

    const checkLogin = async() => {
        await http.get(theUrl + "getUserInfo").then((data) => {
            if(data.data){
                setUserInfo(data.data);
            }
        }).catch((response) => {
            if(response.response.status === 401){
                logout();
            }
        })
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    const http = axios.create({
        baseURL:theUrl,
        headers:{
            "Accept" : "application/json",
             "Content-Type": "multipart/form-data",
            "Authorization" : `Bearer ${token}`
        }
    });

    return {
        setToken:saveToken,
        token,
        user,
        imgPath,
        getToken,
        http,
        logout,
        checkLogin
    }
}






