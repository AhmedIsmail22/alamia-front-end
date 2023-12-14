import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import "./comp.css";
import LoaderIcon from "react-loader-icon";

export default function Register() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [img,setImg] = useState('');
    const [password,setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);
    
    useEffect(() => {
        document.title = "العالمية | تسجيل حساب جديد  ";
    })

    const submitForm = async () =>{
        console.log(img);
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        formData.append("img", img);
        setLoading(true);

       
        // api call
        await http.post('/register',formData).then((res)=>{
            if(res){
                setLoading(false);
                navigate("/login");
            }else{
                setLoading(false);
            }
            // setToken(res.data.user,res.data.access_token);
        }).catch(({response})=>{
            setLoading(false);
            if(response.status === 401){
                setLoading(false);
            }if(response.status === 422){
                setError(response.data.errors);
            }
        });
    }

    return(
        <div className="body">
        <div className="box-container">
            <div className="top-container">
                <div className="back-drop"></div>
                    <div className="header-container">
                        <h1 className="header-text">تسجيل حساب جديد</h1>
                        <h1 className="small-text"> من فضلك قم بتسجيل حساب الان</h1>
                    
                </div>
            </div> 
                    <div className="inner-text">
                        <div className="form-container">
                        <input type="text" className="input" placeholder="أدخل  الأسم"
                            onChange={e=>setName(e.target.value)}
                        id="name" />
                        {error.name && <p className="text-danger">{error.name[0]}</p>}
                        <input type="email" className="input" placeholder="أدخل البريد الالكترونى"
                            onChange={e=>setEmail(e.target.value)}
                            id="email" />
                        {error.email && <p className="text-danger">{error.email[0]}</p>}

                        <input type="password" className="input" placeholder="أدخل كلمة المرور"
                            onChange={e => setPassword(e.target.value)}
                            id="pwd" />
                        {error.password && <p className="text-danger">{error.password[0]}</p>}
                        </div>
                            <label style={{textAlign:"right !important"}}>أختر الصورة الشخصية</label>
                        <input type="file" className="form-control" placeholder="الصورة الشخصية"
                            onChange={e=>setImg(e.target.files[0])}
                        id="file" />
                        {error.img && <p className="text-danger">{error.img[0]}</p>}

                        <button type="button" onClick={submitForm} className="submit-button mt-4 d-flex justify-content-center">
                            
                            <span>تسجيل حساب</span>
                            {
                                loading ?  <p><LoaderIcon color={"black"} type={"spokes"} size={25} style={{marginRight:"10px"}} /></p>: ""
                            }</button>
                    </div>
        </div>
        </div>
    )
}