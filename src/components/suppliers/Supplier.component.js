import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";

export default function Supplier(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";

    const {http, logout} = AuthUser();

    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [mobile,setMobile] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [address,setAddress] = useState('');
    const [facebook,setFacebook] = useState('');
    const [email,setEmail] = useState('');
    const [instagram,setInstagram] = useState('');
    const [errors,setErrors] = useState(null);
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        document.title = "العالمية | أضاقة مورد ";
    })
    const createSupplier= async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('whatsapp', whatsapp);
        formData.append('mobile', mobile);
        formData.append('address', address);
        formData.append('facebook', facebook);
        formData.append('email', email);
        formData.append('instagram', instagram);

        await http.post("suppliers/add",formData,{
        }).then(({data}) => {
            if(data.success){
                if(data.data){
                    Swal.fire(
                        'حسنا',
                        'لقد تم أضافة المورد',
                        'success'
                      )
                    console.log(data.data);
                    setLoading(false);
                    setName('');
                    setMobile('');
                    setWhatsapp('');
                    setAddress('');
                    setEmail('');
                    setInstagram('');
                    setFacebook('');
                    setErrors(null);
                    // navigate('/');
                }
            }else if(data.errors){
                Swal.fire(
                    'خطأ',
                    'للأسف حث شئ خطأ أثناء تخزين البيانات حاول مرة أخرى',
                    'error'
                  )
                setLoading(false);
                setErrors(data.errors)
            }    
        console.log(data.success);
    }).catch(({response}) => {
        Swal.fire(
            'خطأ',
            'للأسف حث شئ خطأ أثناء تخزين البيانات حاول مرة أخرى',
            'error'
          )
        setLoading(false);
        if(response.status === 422){
            setErrors(response.data.errors);
        }
        if(response.status === 401){
            logout();
        }
        }) 
    }

    return(
        <>
        <div className="container layout">
        {/* <div className='page-title'>
            <h1>أضافة مورد جديد</h1>
        </div> */}
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                أضافة مورد
                                <hr></hr>
                                <div clasName="form-wrapper">
                                    <form onSubmit={createSupplier} className="row"> 
                                        <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">الأسم</label>
                                        <input type="text" className="form-control" placeholder="أدخل أسم المورد"
                                        value={name}
                                        onChange={(e) => {setName(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.name?errors.name[0]:""}</p>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">الموبايل</label>
                                        <input type="number" className="form-control" placeholder="أدخل موبايل المورد"
                                        value={mobile}
                                        onChange={(e) => {setMobile(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.mobile?errors.mobile[0]:""}</p>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">واتساب</label>
                                        <input type="number" className="form-control" placeholder="أدخل واتساب المورد"
                                        value={whatsapp}
                                        onChange={(e) => {setWhatsapp(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">العنوان</label>
                                        <input type="text" className="form-control" placeholder="أدخل عنوان المورد"
                                        value={address}
                                        onChange={(e) => {setAddress(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.address?errors.address[0]:""}</p>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">فيسبوك</label>
                                        <input type="text" className="form-control" placeholder="أدخل فيسبوك المورد"
                                        value={facebook}
                                        onChange={(e) => {setFacebook(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.facebook?errors.facebook[0]:""}</p>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">البريد الألكترونى</label>
                                        <input type="email" className="form-control" placeholder="أدخل البريد الألكترونى للمورد"
                                        value={email}
                                        onChange={(e) => {setEmail(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.email?errors.email[0]:""}</p>
                                    </div>

                                    <div className="col-12">
                                        <button type ="submit" className="btn btn-primary mb-3 d-flex align-items-center" disabled={loading}>
                                            <span>حفظ البيانات </span>  
                                            {loading && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
                                        </button>
                                    </div> 
                                    
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}