import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";

export default function AddEmployee(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";

    const jobs = ["مدير", "موظف", "محاسب", "أمين مخزن", "سواق"];
    const {http, logout} = AuthUser();

    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [img,setImg] = useState('');
    const [limited,setLimited] = useState('');
    const [salary,setSalary] = useState('');
    const [job,setJob] = useState('');
    const [errors,setErrors] = useState(null);
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    
    useEffect(() => {
        document.title = "العالمية | أضافة موظف";
    })
    
    const createEmployee= async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('img', img);
        formData.append('limited', limited);
        formData.append('salary', salary);
        formData.append('job_type', job);

        await http.post("employees/add",formData,{
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
                    setSalary('');
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
                  <Link className='link' to="/employees/all-employees"> كافة الموظفين </Link>
                  <p className='pt-3'>-</p>
                  <Link to="/employees/employee" className='link'>أضافة موضف  </Link>
              </div>
          </div>
              <form onSubmit={createEmployee} className='main-section-body'>
                  <div className='right py-3  inputs-box'>
                      <div className="main-section-body-title pb-3 px-3">
                          أضافة موضف
                      </div>
                      <div className='col-12 my-3 px-3'>
                        <label  className="form-label">اسم الموضف  <span className="text-danger px-2">(مطلوب)</span></label>
                        <input type="text" className="form-control" placeholder="أدخل أسم الموضف"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                        />
                        <p className="error">{errors&&errors.name?errors.name[0]:""}</p>
                      </div>

                      <div className='col-12 my-3 px-3'>
                        <label  className="form-label">المرتب <span className="text-danger">(مطلوب)</span></label>
                        <input type="number" className="form-control" placeholder="أدخل  المرتب المحددة"
                        value={salary}
                        onChange={(e) => {setSalary(e.target.value)}}
                        />
                        <p className="error">{errors&&errors.salary?errors.salary[0]:""}</p>
                      </div>

                      <div className='col-12 my-3 px-3'>
                        <label  className="form-label">نوع الوظيفة <span className="text-danger">(مطلوب)</span></label>
                        <select className="form-select" value={job} onChange={(e) => {setJob(e.target.value)}} aria-label="Default select example">
                            <option selected>اختر نوع الوظيفة</option>
                            {
                                jobs.map((job, index) => {
                                    return <option key={index} value={job}>{job}</option>
                                })
                            }
                        </select>
                        <p className="error">{errors&&errors.salary?errors.salary[0]:""}</p>
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
