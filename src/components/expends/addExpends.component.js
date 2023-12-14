import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";

export default function AddExpend(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";

    const {http, logout} = AuthUser();

    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [img,setImg] = useState('');
    const [limited,setLimited] = useState('');
    const [amount,setAmount] = useState('');
    const [details,setDetails] = useState('');
    const [errors,setErrors] = useState(null);
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    

    useEffect(() => {
        document.title = "العالمية | اضافة مورد";
    })
    
    const createExpend= async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('img', img);
        formData.append('limited', limited);
        formData.append('amount', amount);
        formData.append('details', details);

        await http.post("expends/add",formData,{
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
                    setImg('');
                    setLimited('');
                    setAmount('');
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
        <div>
        <div className='main-section'>
          <div className='main-header py-3 d-flex justify-content-between align-items-center'>
              <div className='routes d-flex align-items-center'>
              <Link className='link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                  <p className='pt-3'>-</p>
                  <Link className='link' to="/expends/all-expends">ايرادات أخرى </Link>
                  <p className='pt-3'>-</p>
                  <Link to="/expends/expend" className='link'>أضافة بند للايرادات الأخرى</Link>
              </div>
          </div>
              <form onSubmit={createExpend} className='main-section-body'>
                  <div className='right py-3  inputs-box'>
                      <div className="main-section-body-title pb-3 px-3">
                          أضافة بند
                      </div>
                      <div className='col-12 my-3 px-3'>
                        <label  className="form-label">عنوان البند  <span className="text-danger px-2">(مطلوب)</span></label>
                        <input type="text" className="form-control" placeholder="أدخل أسم البند"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                        />
                        <p className="error">{errors&&errors.name?errors.name[0]:""}</p>
                      </div>

                      <div className='col-12 my-3 px-3'>
                        <input name="limited" type="radio" className="mx-2"
                        value={limited}
                        onChange={(e) => {setLimited(1)}}
                        />
                        <label  className="form-label">محدود</label>
                        <input name="limited" type="radio"  className="mx-2"
                        value={limited}
                        onChange={(e) => {setLimited()}}
                        />
                        <label  className="form-label">غير محدود </label>
                        {/* <span class></span> */}
                        <label  className="form-label"> <span className="text-danger px-2">(مطلوب)</span></label>
                        
                        <p className="error">{errors&&errors.limited?errors.limited[0]:""}</p>
                      </div>


                      {
                        limited && <div className='col-12 my-3 px-3'>
                        <label  className="form-label">القيمة <span className="text-danger">(مطلوب)</span></label>
                        <input type="number" className="form-control" placeholder="أدخل  القيمة المحددة"
                        value={amount}
                        onChange={(e) => {setAmount(e.target.value)}}
                        />
                        <p className="error">{errors&&errors.amount?errors.amount[0]:""}</p>
                      </div>
                      }

                      <div className='col-12 my-3 px-3'>
                        <label  className="form-label">تفاصيل</label>
                        <textarea className="form-control"
                        value={details}
                        onChange={(e) => {setDetails(e.target.value)}}
                        >أكتب تفصيلا أذا أردت</textarea>
                        <p className="error">{errors&&errors.details?errors.details[0]:""}</p>
                      </div>
  
                  </div>
                  <div className='left d-flex flex-column'>
                      <div className='d-flex flex-column inputs-box'>
                          <div className='img-title py-3 px-3'>
                              الصورة
                          </div>
                          <div className="input-img-box">
                              <input type='file' className='input-img' 
                              onChange={(e)=> setImg(e.target.files[0])}/>
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
