import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";
import no_img from "../../images/no_img.png"
import USER from "../../images/user.png"

export default function Client(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";


    const {http, checkLogin} = AuthUser();

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
    const [clientImg,setClientImg] = useState();

    
    useEffect(() => {
        document.title = "العالمية | أضافة عميل";
        checkLogin();
    },[]);
    const createClient= async(e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(clientImg.name);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('whatsapp', whatsapp);
        formData.append('mobile', mobile);
        formData.append('address', address);
        formData.append('facebook', facebook);
        formData.append('email', email);
        formData.append('instagram', instagram);

        await http.post("clients/add",formData,{
        }).then(({data}) => {
            if(data.success){
                if(data.data){
                    Swal.fire(
                        'حسنا',
                        'لقد تم أضافة العميل',
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
        }) 
    }

    return(
        <div>
      <div className='main-section'>
        <div className='main-header py-3 d-flex justify-content-between align-items-center'>
            <div className='routes d-flex align-items-center'>
            <Link className='link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='link' to="/clients/all-clients">كل العملاء</Link>
                <p className='pt-3'>-</p>
                <Link to="/clients/client" className='link'>أضافة عميل</Link>
            </div>
        </div>
            <form onSubmit={createClient} className='main-section-body'>
                <div className='right py-3  inputs-box'>
                    <div className="main-section-body-title pb-3 px-3">
                        أضافة عميل
                    </div>
                    <div className='col-12 my-3 px-3'>
                        <label>أسم العميل</label>
                        <input type='text' className='form-control' placeholder="أدخل اسم العميل"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}} />
                        <p className="error">{errors&&errors.name?errors.name[0]:""}</p>
                    </div>

                    <div className='col-12 px-3'>
                    <label  className="form-label">الموبايل</label>
                    <input type="number" className="form-control" placeholder="أدخل موبايل العميل"
                    value={mobile}
                    onChange={(e) => {setMobile(e.target.value)}}
                    />
                    <p className="error">{errors&&errors.mobile?errors.mobile[0]:""}</p>
                    </div>
                    <div className='col-12 px-3'>
                        <label  className="form-label">واتساب</label>
                        <input type="number" className="form-control" placeholder="أدخل واتساب العميل"
                        value={whatsapp}
                        onChange={(e) => {setWhatsapp(e.target.value)}}
                        />
                        <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
                    </div>
                    <div className='col-12 px-3'>
                        <label  className="form-label">العنوان</label>
                        <input type="text" className="form-control" placeholder="أدخل عنوان العميل"
                        value={address}
                        onChange={(e) => {setAddress(e.target.value)}}
                        />
                        <p className="error">{errors&&errors.address?errors.address[0]:""}</p>
                    </div>

                    <div className='col-12 px-3'>
                        <label  className="form-label">فيسبوك</label>
                        <input type="text" className="form-control" placeholder="أدخل فيسبوك العميل"
                        value={facebook}
                        onChange={(e) => {setFacebook(e.target.value)}}
                        />
                        <p className="error">{errors&&errors.facebook?errors.facebook[0]:""}</p>
                    </div>

                    <div className='col-12 px-3'>
                        <label  className="form-label">فيسبوك</label>
                        <input type="text" className="form-control" placeholder="أدخل فيسبوك العميل"
                        value={facebook}
                        onChange={(e) => {setFacebook(e.target.value)}}
                        />
                        <p className="error">{errors&&errors.facebook?errors.facebook[0]:""}</p>
                    </div>
                </div>
                <div className='left d-flex flex-column'>
                    <div className='d-flex flex-column inputs-box'>
                        <div className='img-title py-3 px-3'>
                            الصورة
                        </div>
                        <div className="input-img-box">
                            <input type='file' className='input-img' 
                            onChange={(e)=> setClientImg(e.target.files[0])}/>
                            {/* <img className="default-img" src={clientImg?`${clientImg.name}`:no_img} alt="" /> */}
                        </div>
                    </div>

                    <div className='d-flex flex-column'>
                    <div className='d-flex flex-column inputs-box'>
                        <div className='img-title px-3 py-3'>
                            حفظ البيانات
                        </div>
                        <button type ="submit" className="col-md-6 col-sm-12 justify-content-center btn btn-primary m-3 d-flex align-items-center" disabled={loading}>
                            <span>حفظ البيانات </span>  
                            {loading && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
                        </button>
                    </div>
                </div>
                </div>
            </form>
      </div>
    </div>
    )
}