import { useState, useEffect } from "react"
import AuthUser from './AuthUser';
import "./comp.css";
import LoaderIcon from "react-loader-icon";
export default function Login() {
    const {http,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        document.title = "العالمية | تسجيل دخول  ";
    })
    const submitForm = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        setLoading(true);
        // api call
        await http.post('/login',formData).then((res)=>{
            if(res.data.user){
                setLoading(false);
                setToken(res.data.user,res.data.access_token);
                setErrors(false)
            }else{
                setLoading(false);
                setErrors(true)
            }
            // setToken(res.data.user,res.data.access_token);
        }).catch(({response})=>{
            setLoading(false);
            if(response.status === 401){
                setLoading(false);
                setErrors(true)
            }
        });

    }

    return(
        <div className="body">
        <div className="box-container">
            <div className="top-container">
                <div className="back-drop"></div>
                    <div className="header-container">
                        <h1 className="header-text">تسجيل دخول</h1>
                        <h1 className="small-text"> من فضلك قم بتسجيل الدخول الان</h1>
                    
                </div>
            </div> 
                    <div className="inner-text">
                        <form onSubmit={submitForm} className="form-container">
                        {errors && <input className="input text-center text-danger"  type="text" value={" بريد الكترونى او كلمة مرور غير صالحين"} readOnly/>
                        }<input type="email" className="input" placeholder="أدخل البريد الالكترونى"
                            onChange={e=>setEmail(e.target.value)}
                        id="email" />
                        <input type="password" className="input" placeholder="أدخل كلمة المرور"
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                        <button type="submit" className="submit-button mt-4 d-flex justify-content-center">
                            
                            <span>تسجيل دخول</span>
                            {
                                loading ?  <p><LoaderIcon color={"black"} type={"spokes"} size={25} style={{marginRight:"10px"}} /></p>: ""
                            }</button>
                        </form>
                    </div>
        </div>
        </div>
    )
}