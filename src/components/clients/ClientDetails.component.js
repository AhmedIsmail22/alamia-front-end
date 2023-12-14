import React, { useEffect, useState } from "react";
import "./clients.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import axois from "../../API/axois";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";

export default function ClientDetails() {

    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";
    const {http, logout} = AuthUser();

    // const months = [
    //   "يناير",
    //    "فبراير",
    //    "مارس",
    //    "إبريل",
    //    "مايو",
    //    "يونيو",
    //    "يوليو",
    //    "أغسطس",
    //    "سبتمبر",
    //     "أكتوبر",
    //     "نوفمبر",
    //     "ديسمبر"
    // ]
    const months = {
        1:"يناير",
        2:"فبراير",
        3:"مارس",
        4:"إبريل",
        5:"مايو",
        6:"يونيو",
        7:"يوليو",
        8:"أغسطس",
        9:"سبتمبر",
        10:"أكتوبر",
        11:"نوفمبر",
        12:"ديسمبر"
    }
    const  { id } = useParams();
    const navigate = useNavigate();
    const array = [];
    var total = 0;
    const [noData,setNoData] = useState(false);
    const [client,setClient] = useState([]);
    const [thisMonth,setThisMonth] = useState(1);
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);

    const [currentPage,setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = "العالمية | تفاصيل العميل";
        setLoading(true);
        fetchClients();
    },[])

    const searchInClients = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchClients();
    }

    const downloadPDF = (e) => {
        e.preventDefault();
        window.open("http://localhost/alamia/public/clients/downloadPDF/2");
        // await http.get("clients/downloadPDF/"+id).then(({data}) => {
        //         if(data){
        //         }
        // })
      }
    const fetchClients = async () => {
        await http.get("clients/getOneClient/"+id).then(({data}) => {
            if(data.data){
                setLoading(false);
                setClient(data.data);
                setThisMonth(data.data.items[0].month);
                if(data.data.length === 0){
                setNoData(true);
            }else{
                setLoading(false);
                    setNoData(false);
                }
            }else{
                setLoading(false);
                setNoData(true);
            }
        }).catch(({response}) => {
            if(response.status === 401){
                logout();
            }
            setLoading(false);
            setNoData(true);
        })
    }

    return (
        <div>
            <div className="main-section">
            <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/clients/all-clients">كل العملاء</Link>
                <p className='pt-3'>-</p>
                <Link to="/clients/details/" className='text-secondary link'>تفاصيل العميل</Link>
            </div>
                <div className="options-list">
                    <button onClick={() => setCurrentPage(1)} className={currentPage === 1 ? "option active-btn" : "option"}>معلومات التواصل</button>
                    <button onClick={() => setCurrentPage(2)} className={currentPage === 2 ? "option active-btn" : "option"}> الحسابات</button>
                    <button onClick={() => setCurrentPage(3)} className={currentPage === 3 ? "option active-btn" : "option"}> المدفوعات</button>
                </div>
            {
            currentPage === 1 &&
            <div className="details-section">
                    {/* <div className="section-header bg-primary text-light">
                        <h4>معلومات  التواصل</h4>
                    </div> */}
                    {   !loading ?
                    <div className="details-block">
                        <table className="details-block-table">
                        <tr>
                                <td>الأسم</td>
                                <td>  </td>
                                <td className="td-data"> {client.name}</td>
                            </tr>
                            <tr>
                                <td className="py-3"></td>
                                {/* <td className="py-3"></td> */}
                            </tr>
                            {/* <tr>
                                <td>الوظيفة</td>
                                <td>  </td>
                                <td className="td-data">{client.job_type}</td>
                            </tr>
                            <tr>
                                <td className="py-3"></td>
                            </tr>
                            <tr>
                                <td>تاريخ التوظيف</td>
                                <td>  </td>
                                <td className="td-data"> {client.start} </td>
                            </tr>
                            <tr>
                                <td className="py-3"></td>
                            </tr>
                            <tr>
                                <td> المرتب</td>
                                <td>  </td>
                                <td className="td-data"> {client.salary} </td>
                            </tr> */}

                        </table>
                        <div className="details-contacts">
                            <a href="#" className="whats-icon icon"> <ion-icon name="logo-whatsapp" ></ion-icon> </a>
                            <a href="#" className="facebook-icon icon"> <ion-icon name="logo-facebook" ></ion-icon> </a>
                            <a href="#"> <ion-icon name="logo-whatsapp" className="whats-icon"></ion-icon> </a>
                            <a href="#"> <ion-icon name="logo-whatsapp" className="whats-icon"></ion-icon> </a>
                            <a href="#"> <ion-icon name="logo-whatsapp" className="whats-icon"></ion-icon> </a>
                            <a href="#"> <ion-icon name="logo-whatsapp" className="whats-icon"></ion-icon> </a>
                        </div> 
                    </div>
                    :<p className="mx-5"><LoaderIcon color={"orange"} size={120} /></p>
                    }
            </div>
            }


                <span className="m-5"></span>
            {
                currentPage === 2 &&
            <div className="details-section">
    <div className="section-body row mx-1">
        {
            client.items ?client.items.map((item,index) => {
                if(!array.includes(item.month)){
                    array.push(item.month);
                    return(
                            <button className="btn btn-primary col-sm-2 m-1" onClick={(e) => setThisMonth(item.month)} key={index} >{months[item.month]}</button>
                            )
                }
            }):null

        }
        </div>
        <div class="table-responsive p-3 mt-4" style={{background:"#fff"}}>
            {
                client.items ?
                <table class="table table-bordered table-hover text-center">

                            <thead>
                                <tr>
                                <th className="text-danger" scope="col">#</th>
                                <th className="text-danger" scope="col"> من</th>
                                <th className="text-danger" scope="col"> الى</th>
                                <th className="text-danger" scope="col"> اسم الصنف</th>
                                <th className="text-danger" scope="col"> عدد الأيام</th>
                                <th className="text-danger" scope="col">الكمية</th>
                                <th className="text-danger" scope="col">سعر الايجار فى اليوم الواحد</th>
                                <th className="text-danger" scope="col">الاجمالى</th>
                                {/* <th scope="col">التفاصيل</th> */}
                                </tr>
                            </thead>
                            <tbody>
                            {
                            !loading ?
                            client.items.map((item,index) => {
                                if(item.month === thisMonth){
                                    total += item.total
                                    return(
                                    
                                    <tr>
                                    <td>{index+1    }</td>
                                    <td><p>{item.start}</p></td>
                                    <td><p>{item.end}</p></td>
                                    <td><p>{item.item_name}</p></td>
                                    <td><p >{item.days}</p></td>
                                    <td><p>{item.quantity}</p></td>
                                    <td><p>{item.rental_price > 0?item.rental_price:item.selling_price}</p></td>
                                    <td><p>{item.total}</p></td>
                                    {/* <td><button className="btn btn-primary" onClick={() => navigate(`../invoice/add/payment/${item.id}`)}> المزيد</button></td> */}
                                </tr>)
                                }
                            }):
                            <p className="mx-5"><LoaderIcon color={"orange"} size={120} /></p>
                            
                            }
                            <tr>
                                <td colSpan="7" className="bg-secondary text-light">اجمالى حساب هذا الشهر</td>
                                <td className="bg-danger text-light">{total}</td>
                            </tr>

                            </tbody>
                </table>
                :!loading && <div className="alert alert-danger text-center">لايوجد فواتير لهذا العميل</div> 
            }
        </div>
        <button onClick={(e) => downloadPDF(e)}>تحميل PDF</button>
            </div>
            }


            <span className="m-5"></span>
            {
                currentPage === 3 &&
            <div className="details-section">
    <div className="section-header d-flex justify-content-between bg-primary text-light">
    <h4> المدفوعات <span className="text-warning">({client.payments ? Object.keys(client.payments).length : 0})</span></h4>
    <button className="btn btn-success" onClick={() => navigate('../payments/payment/import')}>أضافة دفع</button>
    </div>
    <div class="table-responsive p-3 mt-4" style={{background:"#fff"}}>
            {
                client.payments && client.payments.length > 0 ?
                <table class="table table-bordered table-hover text-center">
            <thead>
                <tr>
                <th className="text-danger" scope="col">#</th>
                <th className="text-danger" scope="col"> التاريخ</th>
                {/* <th scope="col"> رقم الفاتورة</th> */}
                <th className="text-danger" scope="col">  قيمة الدفع</th>
                <th className="text-danger" scope="col">   نوع الدفع</th>
                {/* <th scope="col">المبلغ المتبقى حتى الان</th> */}
                <th className="text-danger" scope="col">التفاصيل</th>
                </tr>
            </thead>
            <tbody>
                {
                    !loading?
                    client.payments.map((payment,index) => {
                        return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{payment.created_at.split('T')[0]}</td>
                            {/* <td>{payment.invoice_code}</td> */}
                            <td>{payment.payment_value}</td>
                            <td><span className={payment.payment_type == "نقدى"?"bg-dark text-light px-5":"bg-success text-light px-5"}>{payment.payment_type}</span></td>
                            <td>
                                <button className="btn btn-primary">تفاصيل</button>
                            </td>
                        </tr>
                        )
                    }):
                    <p className="mx-5"><LoaderIcon color={"orange"} size={120} /></p>
                    }
                    </tbody>
        </table>
        :!loading && <div className="alert alert-danger text-center w-100">لايوجد مدفوعات لهذا العميل</div>
    }
    </div>
            </div>
            }
            </div>
        </div>
    );
}