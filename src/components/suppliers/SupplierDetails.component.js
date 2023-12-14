import React, { useEffect, useState } from "react";
import "./suppliers.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";

export default function SupplierDetails() {

    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";


    const {http, logout} = AuthUser();

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
    const [supplier,setSupplier] = useState([]);
    const [thisMonth,setThisMonth] = useState(1);
    // const [total,setTotal] = useState(0);
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = "العالمية | تفاصيل حساب المورد ";
        setLoading(true);
        fetchSuppliers();
    },[])

    const searchInSuppliers = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchSuppliers();
    }

    const fetchSuppliers = async () => {
        await http.get("suppliers/getOneSupplierWithDetails/"+id).then(({data}) => {
            if(data.data){
                setLoading(false);
                setSupplier(data.data);
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
        
        
        //         <div>
        //             <div className="container">
        //             <div className="details-section">
        //                     <div className="section-header bg-primary text-light">
        //                         <h4>معلومات عن المورد</h4>
        //                     </div>
                            
        //                 </div>
        
        
        //                 <span className="m-5"></span>
        
        // <div className="details-section">
        //     <div className="section-header d-flex justify-content-between  bg-primary text-light">
        //     <h4> الحسابات <span className="text-warning">({supplier.items ? Object.keys(supplier.items).length : 0})</span></h4>
        //     <button className="btn btn-success" onClick={() => navigate('../suppliers/add/item/'+supplier.id)}>أضافة حساب</button>
        //     </div>
        
        //     <div className="section-body row mx-1">
        //         </div>
        //         {
        //             supplier.items ?
        //             <table className="table table-striped text-center my-2 table-responsive">
        //                         <thead className="table-dark">
        //                             <tr>
        //                             <th scope="col">#</th>
        //                             <th scope="col"> تاريخ الشراء</th>
        //                             <th scope="col"> اسم الصنف</th>
        //                             <th scope="col">الكمية</th>
        //                             <th scope="col">سعر شراء الواحدة</th>
        //                             <th scope="col">الاجمالى</th>
        //                             {/* <th scope="col">التفاصيل</th> */}
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                         {
                                    
        //                         supplier.items.map((item,index) => {
        //                                 return(
                                        
        //                                 <tr>
        //                                 <td>{index+1}</td>
        //                                 <td>{item.pivot.start}</td>
        //                                 <td>{item.name}</td>
        //                                 <td>{item.pivot.quantity}</td>
        //                                 <td>{item.pivot.price}</td>
        //                                 <td>{item.total}</td>
        //                                 {/* <td><button className="btn btn-primary" onClick={() => navigate(`../invoice/add/payment/${item.id}`)}> المزيد</button></td> */}
        //                             </tr>)
        //                         })}
        //                         <tr>
        //                             <td colSpan="5" className="bg-dark text-light">الأجمالى</td>
        //                             <td className="bg-danger text-light">{supplier.total}</td>
        //                         </tr>
        //                         </tbody>
        //                     </table>
        //                             :loading ? <>
        //                                 <div className="loading"></div>
        //                                 <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>
        //                             </>:<div className="alert alert-danger text-center">لايوجد حسابات لهذا العميل</div>
                    
        //         }
        //             </div>
        
        
        //             <span className="m-5"></span>
        
        // <div className="details-section">
        //     <div className="section-header d-flex justify-content-between bg-primary text-light">
        //     <h4> دفعات التسديد <span className="text-warning">({supplier.payments ? Object.keys(supplier.payments).length : 0})</span></h4>
        //     <button className="btn btn-success" onClick={() => navigate('../payments/payment/export')}> تسديد دفعة</button>
        //     </div>
        //         {supplier.payments && supplier.payments.length > 0?
        //         <table className="table table-striped text-center my-2 table-responsive">
        //             <thead className="table-dark">
        //                 <tr>
        //                 <th scope="col">#</th>
        //                 <th scope="col"> التاريخ</th>
        //                 {/* <th scope="col"> رقم الفاتورة</th> */}
        //                 <th scope="col">  قيمة الدفع</th>
        //                 <th scope="col">   نوع الدفع</th>
        //                 {/* <th scope="col">المبلغ المتبقى حتى الان</th> */}
        //                 <th scope="col">التفاصيل</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {
        //                     supplier.payments.map((payment,index) => {
        //                         return(
        //                         <tr>
        //                             <td>{index+1}</td>
        //                             <td>{payment.created_at.split('T')[0]}</td>
        //                             {/* <td>{payment.invoice_code}</td> */}
        //                             <td>{payment.payment_value}</td>
        //                             <td><span className={payment.payment_type == "نقدى"?"bg-dark text-light px-5":"bg-success text-light px-5"}>{payment.payment_type}</span></td>
        //                             <td>
        //                                 <button className="btn btn-primary" onClick={() => navigate(`../payments/details/${payment.id}`)}>تفاصيل</button>
        //                             </td>
        //                         </tr>
        //                         )
        //                     })}
        //                     </tbody>
        //         </table>
        //         :!loading && <div className="alert alert-danger text-center w-100">لايوجد مدفوعات لهذا العميل</div>
        //     }
        //             </div>
        
        
        
        
        //             </div>
        //         </div>
        <div>
        <div className="main-section">
        <div className='routes d-flex align-items-center'> 
        <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/suppliers/all-suppliers">كل الموردين</Link>
                <p className='pt-3'>-</p>
                <Link to={"/suppliers/details/"+supplier.id} className='text-secondary link'>تفاصيل المورد</Link>
        </div>

        <div className="options-list">
                    <button onClick={() => setCurrentPage(1)} className={currentPage === 1 ? "option active-btn" : "option"}>معلومات التواصل</button>
                    <button onClick={() => setCurrentPage(2)} className={currentPage === 2 ? "option active-btn" : "option"}> الحسابات والفواتير</button>
                    <button onClick={() => setCurrentPage(3)} className={currentPage === 3 ? "option active-btn" : "option"}> المدفوعات</button>
                </div>

                {currentPage === 1 &&
            <div className="details-section">
                <div className="section-body row">
                    <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="details-item d-flex mb-3">
                                <p className="text-warning" >الاسم : </p>
                                <p>{supplier.name}</p>
                            </div>
                            <table className="table supplier-money">
                                <tbody>
                                    <tr>
                                        <td className="fs-4">اجمالى حساب المورد </td>
                                        <td><p className="bg-primary text-light p-1 text-center rounded">{supplier.total}</p></td>
                                    </tr>
                                    <tr>
                                        <td className="fs-4"> المبلغ المسدد حتى الان  </td>
                                        <td><p className="bg-success text-light p-1 text-center rounded">{supplier.paid}</p></td>
                                    </tr>
                                    <tr>
                                        <td className="fs-4"> المبلغ المتبقى </td>
                                        <td><p className="bg-danger text-light p-1 text-center rounded">{supplier.delayed}</p></td>
                                    </tr>
                                </tbody>
                            </table>
                            {supplier.address && <div className="details-item d-flex">
                                <p className="text-warning" >العنوان : </p>
                                <p> {supplier.address}</p>
                            </div>}
                        </div>

                        <div className="col-lg-8 col-md-8 col-sm-6 social">
                            <div className="details-item row justify-content-center">
                                {supplier.whatsapp && <a target="_blank" className="text-success col-1" href={"https://api.whatsapp.com/send/?phone="+supplier.whatsapp}><ion-icon name="logo-whatsapp"></ion-icon></a>}
                                {supplier.mobile && <a target="_blank" className="text-danger col-1" tel={supplier.mobile}><ion-icon name="call-outline"></ion-icon></a>}
                                {supplier.facebook && <a target="_blank" className="text-primary col-1" href="https://www.facebook.com/"><ion-icon name="logo-facebook"></ion-icon></a>}
                                {supplier.email && <a target="_blank" className="text-secondary col-1" href="https://www.facebook.com/"><ion-icon name="mail-outline"></ion-icon></a>}
                                {supplier.instagram && <a target="_blank" className="text-danger col-1" href="https://www.facebook.com/"><ion-icon name="logo-instagram"></ion-icon></a>}
                                
                            </div>
                        </div>
                    </div>
            </div>}

            <span className="m-5"></span>
            {
                currentPage === 2 &&
            <div className="details-section">
                <div className="details-section">
            <button className="btn btn-success m-3" onClick={() => navigate('../suppliers/add/item/'+supplier.id)}>أضافة حساب</button>
            {/* <div className="section-header d-flex justify-content-between  bg-primary text-light">
            <h4> الحسابات <span className="text-warning">({supplier.items ? Object.keys(supplier.items).length : 0})</span></h4>
            </div> */}
                <div class="table-responsive px-3 mt-1" style={{background:"#fff"}}>
            {
                supplier.items ?
                <table class="table table-bordered table-hover text-center">

                            <thead>
                                    <tr>
                                    <th className="text-danger" scope="col">#</th>
                                    <th className="text-danger" scope="col"> تاريخ الشراء</th>
                                    <th className="text-danger" scope="col"> اسم الصنف</th>
                                    <th className="text-danger" scope="col">الكمية</th>
                                    <th className="text-danger" scope="col">سعر شراء الواحدة</th>
                                    <th className="text-danger" scope="col">الاجمالى</th>
                                    {/* <th scope="col">التفاصيل</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    
                                supplier.items.map((item,index) => {
                                        return(
                                        
                                        <tr>
                                        <td>{index+1}</td>
                                        <td>{item.pivot.start}</td>
                                        <td>{item.name}</td>
                                        <td>{item.pivot.quantity}</td>
                                        <td>{item.pivot.price}</td>
                                        <td>{item.total}</td>
                                        {/* <td><button className="btn btn-primary" onClick={() => navigate(`../invoice/add/payment/${item.id}`)}> المزيد</button></td> */}
                                    </tr>)
                                })}
                                <tr>
                                    <td colSpan="5" className="bg-dark text-light">الأجمالى</td>
                                    <td className="bg-danger text-light">{supplier.total}</td>
                                </tr>
                                </tbody>
                            </table>
                                    :loading ? <>
                                        <div className="loading"></div>
                                        <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>
                                    </>:<div className="alert alert-danger text-center">لايوجد حسابات لهذا العميل</div>
                    
                }
                    </div>
            </div>
            </div>
            }

<span className="m-5"></span>
            {
                currentPage === 3 &&
        
        <div className="details-section">
            <button className="btn btn-success m-3" onClick={() => navigate('../payments/payment/export')}> تسديد دفعة</button>
            {/* <div className="section-header d-flex justify-content-between bg-primary text-light">
            <h4> دفعات التسديد <span className="text-warning">({supplier.payments ? Object.keys(supplier.payments).length : 0})</span></h4>
            </div> */}
            <div class="table-responsive px-3 mt-1" style={{background:"#fff"}}>
            {
                supplier.payments && supplier.payments.length > 0 ?
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
                            supplier.payments.map((payment,index) => {
                                return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{payment.created_at.split('T')[0]}</td>
                                    {/* <td>{payment.invoice_code}</td> */}
                                    <td>{payment.payment_value}</td>
                                    <td><span className={payment.payment_type == "نقدى"?"bg-dark text-light px-5":"bg-success text-light px-5"}>{payment.payment_type}</span></td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => navigate(`../payments/details/${payment.id}`)}>تفاصيل</button>
                                    </td>
                                </tr>
                                )
                            })}
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