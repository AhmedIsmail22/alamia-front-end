import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./payments.css";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";

export default function AddPayment(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";


    const {http, logout} = AuthUser();

    const navigate = useNavigate();

    const { type } = useParams();

    const [invoiceId, setInvoiceId] = useState('');
    const [clients, setClients] = useState(0);
    const [suppliers, setSuppliers] = useState(0);
    const [invoice, setInvoice] = useState({});
    const [name, setName] = useState('');
    const [errors,setErrors] = useState(null);
    const [loading,setLoading] = useState(false);
    const [clientId, setClientId] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [typePayment, setTypePayment] = useState('');
    const [paymentValue, setPaymentValue] = useState('');
    const [checkNumber, setCheckNumber] = useState('');
    const [checkDate, setCheckDate] = useState('');
    const [checkImage, setCheckImage] = useState('');
    const [banks, setBanks] = useState('');
    const [bankId, setBankId] = useState('');
    const [payType, setPayType] = useState('');
    
    

    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        document.title = "العالمية | اضافة مدفوع";
        fetchAllBanks();
        fetchAllClients();
        fetchAllSuppliers();
        // fetchInvoiceData();
    },[]);

    useEffect(() => {
        setPayType(type);
    },[type]);

    

    const fetchAllBanks = async() => {
        await http.get("banks").then(({data}) => {
            if(data.data){
                setBanks(data.data);
            }
        })
    }

    const fetchAllClients = async() => {
        await http.get("clients?searchName="+searchName).then(({data}) => {
            if(data.data){
                setClients(data.data);
            }
        }).catch(({response}) => {
            if(response.status === 401){
                logout();
            }
        })
    }

    const fetchAllSuppliers = async() => {
        await http.get("suppliers?searchName="+searchName).then(({data}) => {
            if(data.data){
                setSuppliers(data.data);
            }
        }).catch(({response}) => {
            if(response.status === 401){
                logout();
            }
        })
    }
    // const fetchInvoiceData = async() => {
    //     await https.get("invoices/invoice/"+code+"").then(({data}) => {
    //         if(data.data){
    //             setInvoice(data.data);
    //             setInvoiceId(data.data.id);
    //         }
    //     })
    // }
    const savePayment = async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        if((typePayment === "check" && paymentValue && !checkNumber && !checkDate)
            || (typePayment === "cash" && !paymentValue) || !typePayment){
             Swal.fire(
                'خطأ',
                'من فضلك ادخل كل البيانات',
                'error'
              )
              setLoading(false);
              return false;
        }else{
            formData.append('client_id', clientId);
            formData.append('supplier_id', supplierId);
            formData.append('type', payType);
            formData.append('paymentType', typePayment);
            formData.append('paid', paymentValue);
            formData.append('check_number', checkNumber);
            formData.append('check_date', checkDate);
            formData.append('bank_id', bankId);
            formData.append('check_image', checkImage);
        }

        await http.post((payType === "import" ?"payments/client/add":"payments/supplier/add"),formData).then(({data}) => {
            if(data.success){
                if(data.data){
                    Swal.fire(
                        'حسنا',
                        'لقد تم أضافة المدفوعات',
                        'success'
                      )
                    console.log(data.data);
                    setLoading(false);
                    setName('');
                    setErrors(null);
                    // navigate('/');
                }
            }else if(data.errors){
                Swal.fire(
                    'خطأ',
                    'للأسف حدث شئ خطأ أثناء تخزين البيانات حاول مرة أخرى',
                    'error'
                  )
                setLoading(false);
                setErrors(data.errors)
            }else if(data.overPay){
                Swal.fire(
                    'خطأ',
                    data.message,
                    'error'
                  )
                setLoading(false);
                setErrors(data.errors)
            }    
        console.log(data.success);
    }).catch(({response}) => {
        Swal.fire(
            'خطأ',
            'للأسف حدث شئ خطأ أثناء تخزين البيانات حاول مرة أخرى',
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
      <div className='main-section'>
        <div className='main-header py-3 d-flex justify-content-between align-items-center'>
            <div className='routes d-flex align-items-center'>
                {payType === "import" && <>
                <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/clients/all-clients">كل العملاء</Link>
                <p className='pt-3'>-</p>
                <Link to={"/clients/details/" + clientId} className='text-secondary link'>تفاصيل العميل</Link>
                <p className='pt-3'>-</p>
                <Link to="/payments/payment/import" className='text-secondary link'> تحصيل دفعة من العميل</Link>
            
                </>}
                {payType === "export" && <>
                <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/suppliers/all-suppliers">كل الموردين</Link>
                <p className='pt-3'>-</p>
                <Link to={"/suppliers/details/" + supplierId} className='text-secondary link'>تفاصيل المورد</Link>
                <p className='pt-3'>-</p>
                <Link to="/payments/payment/import" className='text-secondary link'> تسديد دفعة  للمورد</Link>
            </>}
            </div>
        </div>
        <form onSubmit={savePayment} className='main-section-body'>
                <div className='right py-3  inputs-box'>
                  {
                    payType === "import" &&<>
                    <div className="main-section-body-title pb-3 px-3">
                        تحصيل دفعة من العميل
                    </div>
                    <div className='col-12 my-3 px-3'>
                        <label>أسم العميل</label>
                        <select className="form-select" onChange={(e) => setClientId(e.target.value)}>
                          <option value="0" selected>اختر  ألعميل</option>
                          {
                              clients && clients.map((client,index) => {
                                  return (
                                      <option key={index} value={client.id}>{client.name}</option>
                                  )
                              })
                          }
                        </select>
                        <p className="error">{errors&&errors.name?errors.name[0]:""}</p>
                    </div>
                    </>
                  }
                  {
                    payType === "export" &&<>
                    <div className="main-section-body-title pb-3 px-3">
                       تسديد دفعة للمورد
                    </div>
                    <div className='col-12 my-3 px-3'>
                        <label>أختر المورد</label>
                    <select className="form-select" onChange={(e) => setSupplierId(e.target.value)}>
                        <option value="0" selected>اختر  المورد</option>
                        {
                          suppliers && suppliers.map((supplier,index) => {
                              return (
                                  <option key={index} value={supplier.id}>{supplier.name}</option>
                              )
                          })
                        }
                    </select>
                    <p className="error">{errors&&errors.name?errors.name[0]:""}</p>
                    </div>
                    </>
                  }
                    

                    <div className='col-12 px-3'>
                    <label  className="form-label">اختر طريقة الدفع</label>
                    <select className="form-select" onChange={(e) => setTypePayment(e.target.value)}>
                      <option value="0" selected>اختر طريقة الدفع</option>
                      <option value="cash">نقدا</option>
                      <option value="check">شيك بنكى</option>
                    </select>
                    <p className="error">{errors&&errors.mobile?errors.mobile[0]:""}</p>
                    </div>
                    {
                                typePayment === "cash" ? 
                                
                                <div className='col-12 px-3'>
                        <label  className="form-label">قيمة المبلغ</label>
                                    <input type="number" className="form-control" placeholder="المبلغ" 
                                    value={paymentValue}
                                    onChange={(e) => setPaymentValue(e.target.value)}
                                    />
                                     <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
                                </div>:
                                typePayment === "check" ? <>
                                    <div className='col-12 px-3'>
                        <label  className="form-label">أختر البنك</label>
                                    <select className="form-select w-100" onChange={(e) => setBankId(e.target.value)}>
                                        <option value="0" selected>اختر  البنك</option>
                                        {
                                            banks && banks.map((bank,index) => {
                                                return (
                                                    <option key={index} value={bank.id}>{bank.name}</option>
                                                )
                                            })
                                        }
                                </select>
                            </div >
                            <div className='col-12 px-3'>
                        <label  className="form-label">قيمة الشيك</label>
                                <input type="number" className="form-control" placeholder="قيمة الشيك"
                                value={paymentValue}
                                onChange={(e) => setPaymentValue(e.target.value)}
                                />
                                 <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
                            </div>
                            <div className='col-12 px-3'>
                        <label  className="form-label">رقم الشيك</label>
                                <input type="number" className="form-control" placeholder="رقم الشيك" 
                                value={checkNumber}
                                onChange={(e) => setCheckNumber(e.target.value)}
                                />
                                 <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
                            </div>
                            <div className='col-12 px-3'>
                        <label  className="form-label">تاريخ الشيك</label>
                                <input type="date" className="form-control" placeholder="تاريخ الشيك" 
                                value={checkDate}
                                onChange={(e) => setCheckDate(e.target.value)}
                                />
                                 <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
                            </div>
                            </>:<></> 
                            }
                            </div>
                            <div className='left d-flex flex-column'>
                {typePayment === "check" &&<div className='d-flex flex-column inputs-box'>
                        <div className='img-title py-3 px-3'>
                            صورة الشيك
                            
                        </div>
                        <div className="input-img-box">
                            <input type='file'  placeholder="صورة الشيك"
                             onChange={(e) => setCheckImage(e.target.files[0])} />
                                     <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
                        </div>
                    </div>
                }

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
    </>
    )
}