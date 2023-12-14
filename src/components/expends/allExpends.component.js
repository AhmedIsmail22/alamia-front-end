import React, { useEffect, useState } from 'react'
import "./expends.css";
import AuthUser from '../authentication/AuthUser';
import { Link, useNavigate } from 'react-router-dom';
import LoaderIcon from "react-loader-icon";
import defaultImg from "../../images/no_image.jpg";
import Swal from "sweetalert2";
export default function Expends(){

        const {http, logout, checkLogin, imgPath} = AuthUser();
        const [noData,setNoData] = useState(false);
        const [searchName, setSearchName] = useState('');
        const [loading,setLoading] = useState(false);
        const [btnLoading,setBtnLoading] = useState(false);
        const [expends, setExpends] = useState([]);
        const [item, setItem] = useState();
        const [addItem, setAddItem] = useState(false);
        const [amount, setAmount] = useState();
        const [details, setDetails] = useState();
        const [id, setId] = useState();
        const [errors,setErrors] = useState(null);

        const navigation = useNavigate();


useEffect(() => {
    document.title = "العالمية | ايرادات أخرى ";
  setLoading(true);
        checkLogin();
        fetchExpends();
},[]);

const addPaid = (e,data) => {
  setAddItem(true);
  setId(data.id);
  data.amount ? setAmount(data.amount):setAmount(null)
  e.preventDefault();
  setItem(data);
}

const savePaid = async(e) => {
    e.preventDefault();
    setBtnLoading(true);
    // console.log(clientImg.name);
    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('details', details);
    formData.append('expends_id', id);

    await http.post("paids/add",formData,{
    }).then(({data}) => {
        if(data.success){
            if(data.data){
                Swal.fire(
                    'حسنا',
                    'لقد تم  الدفع بنجاح',
                    'success'
                  )
                console.log(data.data);
                setBtnLoading(false);
                setAddItem(false);
                setAmount('');
                setDetails('');
                setId('');
                setErrors(null);
                // navigate('/');
            }
        }else if(data.errors){
            Swal.fire(
                'خطأ',
                'للأسف حث شئ خطأ أثناء تخزين البيانات حاول مرة أخرى',
                'error'
              )
            setBtnLoading(false);
            setAddItem(false);
            setErrors(data.errors)
        }    
    console.log(data.success);
}).catch(({response}) => {
    Swal.fire(
        'خطأ',
        'للأسف حث شئ خطأ أثناء تخزين البيانات حاول مرة أخرى',
        'error'
      )
    setBtnLoading(false);
    setAddItem(false);
    if(response.status === 422){
        setErrors(response.data.errors);
        }
    }) 
}
const searchInExpends = (e) => {
    e.preventDefault();
    fetchExpends();
    setLoading(false);
}
const fetchExpends = async () => {
    await http.get("expends?searchName="+searchName).then(({data}) => {
        if(data.data){
          setLoading(false);
            setExpends(data.data);
            if(data.data.length === 0){
              setNoData(true);
          }else{
              setLoading(false);
                  setNoData(false);
              }
          }else{
              console.log(data.message);
              if(data.message === "Unauthorized"){
                  logout();
              }
              setLoading(false);
              setNoData(true);
          }
      }).catch(({response}) => {
          if(response.status === 401){
              logout();
          }if(response.status === 405 && !response.data.permission){
              console.log(response.data.permission);
              setLoading(false);
          }
          setLoading(false);
          setNoData(true);
      })
}
  return (
        <>
                {/* <div className='page-title'>
                <h1>ايرادات أخرى </h1>
            </div> */}
            <div className="row px-3">
                <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/expends/all-expends">ايرادات أخرى </Link>
            </div>
                <div className="col-10">
                </div>
                <button onClick={() => navigation('../expends/expend')} className="col-lg-2 col-md-3 col-sm-4 btn btn-success">أضافة بند</button>
            </div>

        {
        //   !loading ?
        //   <div className="card-list">
        //   {
        //     !noData &&
        //     expends.map((expend, index) =>{
        //       return  (
        //         <div className="expends-card" key={index} >
        //         <img src={expend.img?imgPath+expend.img:defaultImg} width={"100%"} height={"50%"} />
        //           <h5>{expend.name}</h5>
        //           {expend.amount?<p className={'bg-warning p-1'}>{expend.amount}</p>
        //           :<p className={'bg-danger p-1'}>غير محدد</p>}
        //         <a onClick={(e) => addPaid(e,expend)} className="bg-primary text-light btn">دفع</a>
        //         </div>
        //         )
        //       })
        //   }       
        //       <Link to="/expends/expend" className="expends-card other bg-warning" >
        //       <h5 className='add-card'> <ion-icon name="add-outline"></ion-icon> أضف بند </h5>
        //     </Link>
        // </div>
        //   :<>
        //   <div className="loading"></div>
        //   <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p></>
           
        }
        
        <div class="table-responsive p-3 mt-4" style={{background:"#fff"}}>
        <form onSubmit={searchInExpends} className="row justify-content-center">
        <div className="col-8">
            <input type="text" className="form-control" placeholder=" أبحث بالأسم "
            value={searchName}
            onChange={(e) => {setSearchName(e.target.value)}}
            />
        </div>
        <div className="col-4">
            <button type ="submit" className="btn btn-success mb-3"> بحث </button>
        </div>
    </form>
        {
                !loading?
                !noData ?
                <table class="table table-bordered table-hover text-center">
                <thead >
                    <tr>
                    <th className="text-danger"  scope="col">#</th>
                    {/* <th className="text-danger"  scope="col"><ion-icon name="image-outline"></ion-icon></th> */}
                    <th  className="text-danger" scope="col">عنوان البند</th>
                    <th className="text-danger"  scope="col">المبلغ </th>
                    <th className="text-danger"  scope="col"> دفع</th>
                    </tr>
                </thead>
                <tbody>
                {
                    expends.map((expend,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                {/* <td><img src={imgPath+expend.img} width={20} height={20} className="img-cycle"/></td> */}
                                {/* <td>{expend.img}</td> */}
                                <td>{expend.name}</td>
                                <td>{expend.amount?expend.amount:<span className="text-danger">غير محدد</span>}</td>
                                <td className="">
                                {
                                  expend.amount ? <a onClick={(e) => addPaid(e,expend)} className="bg-success text-light btn">تجديد</a>
                                  :<a onClick={(e) => addPaid(e,expend)} className="bg-primary text-light btn">دفع</a>
                                }
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد بنود</div>
            :<>
            <div className="loading"></div>
            <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>
        </>
        }
        </div>









        {
          addItem &&<div className='abs-body'> <form onSubmit={savePaid} className='card-paid'>
            
            <input type="hidden" value={id} onChange={(e) => {setId(e.target.value)}}
                        />
            <div className='close' onClick={(e) => setAddItem(false)}><ion-icon name="close-outline"></ion-icon></div>
          <img src={item.img?imgPath+item.img:defaultImg}/>
          <h3 className='text-light bg-danger px-5  mt-3 rounded'>{item.name}</h3>
          <div className='col-12 my-1 px-3'>
                        <label  className="form-label">{
                          item.amount ?<>القيمة  <span className="text-danger">(مطلوب)</span></>
                          :" المحددة القيمة"
                        }</label>
                       {
                        item.amount?  
                        <input type="number" className="form-control" value={item.amount}readonly/>
                        : <input type="number" className="form-control" placeholder="أدخل  القيمة " 
                        value={amount}
                        onChange={(e) => {setAmount(e.target.value)}}
                        />
                      }
                      <p className="error">{errors&&errors.amount?errors.amount[0]:""}</p> 
                      </div>

                      <div className='col-12 my-1 px-3'>
                        <label  className="form-label">تفاصيل</label>
                        <textarea className="form-control" value={details}
                        onChange={(e) => {setDetails(e.target.value)}}></textarea>
                      </div>
                      <p className="error">{errors&&errors.details?errors.details[0]:""}</p> 
                      <button type ="submit" className="col-md-6 col-sm-12 justify-content-center btn btn-primary m-3 d-flex align-items-center" disabled={btnLoading}>
                      {!item.amount? <span>حفظ البيانات </span>  : <span>تجديد  </span>  }
                              {btnLoading && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
                          </button>
        </form>
        </div>
        }
        </>
  )   
}