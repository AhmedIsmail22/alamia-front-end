import React, { useEffect, useState } from "react";
import "./employees.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import axois from "../../API/axois";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";

export default function EmployeeDetails() {

    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";
    const {http, logout, imgPath} = AuthUser();

    total = 0;
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
    const [employee,setEmployee] = useState([]);
    const [thisMonth,setThisMonth] = useState(11);
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);

    const [currentPage,setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = "العالمية | تفاصيل الموظف";
        setLoading(true);
        fetchEmployees();
    },[])

    const searchInEmployees = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchEmployees();
    }

    const fetchEmployees = async () => {
        await http.get("employees/getOne/"+id).then(({data}) => {
            if(data.data){
                setLoading(false);
                setEmployee(data.data);
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
            console.log(response)
            // if(response.status === 401){
            //     logout();
            // }
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
                <Link className='text-secondary link' to="/employees/all-employees">كل الموظفين</Link>
                <p className='pt-3'>-</p>
                <Link to="/employees/details/" className='text-secondary link'>تفاصيل الموظف</Link>
            </div>
                <div className="options-list">
                    <button onClick={() => setCurrentPage(1)} className={currentPage === 1 ? "option active-btn" : "option"}> بيانات الموظف</button>
                    <button onClick={() => setCurrentPage(2)} className={currentPage === 2 ? "option active-btn" : "option"}> الخصومات</button>
                    <button onClick={() => setCurrentPage(3)} className={currentPage === 3 ? "option active-btn" : "option"}> الزيادات</button>
                </div>
            {
            currentPage === 1 &&
            <div className="details-section">
                    {   !loading ?
                    <div className="details-block">
                        <table className="details-block-table">
                        <tr>
                                <td>الأسم</td>
                                <td>  </td>
                                <td className="td-data"> {employee.name}</td>
                            </tr>
                            <tr>
                                <td className="py-3"></td>
                                {/* <td className="py-3"></td> */}
                            </tr>
                            <tr>
                                <td>الوظيفة</td>
                                <td>  </td>
                                <td className="td-data">{employee.job_type}</td>
                            </tr>
                            <tr>
                                {/* <td className="py-3"></td> */}
                                <td className="py-3"></td>
                            </tr>
                            <tr>
                                <td>تاريخ التوظيف</td>
                                <td>  </td>
                                <td className="td-data"> {employee.start} </td>
                            </tr>
                            <tr>
                                {/* <td className="py-3"></td> */}
                                <td className="py-3"></td>
                            </tr>
                            <tr>
                                <td> المرتب</td>
                                <td>  </td>
                                <td className="td-data"> {employee.salary} </td>
                            </tr>

                        </table>
                        {/* <div className="employee-contacts">

                        </div>  */}
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
            employee.deductions.length > 0 ?employee.deductions.map((item,index) => {
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
                // total = 0
                employee.deductions.length > 0 ?
                <table class="table table-bordered table-hover text-center">

                            <thead>
                                <tr>
                                <th className="text-danger" scope="col">#</th>
                                <th className="text-danger" scope="col"> التاريخ</th>
                                <th className="text-danger" scope="col"> قيمة الخصم</th>
                                <th className="text-danger" scope="col">  السبب</th>
                                <th className="text-danger" scope="col">الشخص الذى قام باجراء الخصم</th>
                               </tr>
                            </thead>
                            <tbody>
                            {
                                
                            !loading ?
                            employee.deductions.map((item,index) => {
                                if(item.month === thisMonth){
                                    total+=(+item.amount)
                                    return(
                                    
                                    <tr>
                                    <td>{index+1}</td>
                                    <td><p>{item.date}</p></td>
                                    <td><p>{item.amount}</p></td>
                                    <td><p>{item.details?item.details:"-"}</p></td>
                                    <td><p >{item.user}</p></td>
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
                :!loading && <div className="alert alert-danger text-center">لايوجد خصومات لهذا الموظف</div> 
            }
        </div>
            </div>
            }


            <span className="m-5"></span>
            {
                currentPage === 3 &&
            <div className="details-section">
    <div className="section-body row mx-1">
        {
            employee.awards.length > 0 ?employee.awards.map((item,index) => {
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
                // total = 0
                employee.awards.length > 0 ?
                <table class="table table-bordered table-hover text-center">

                            <thead>
                                <tr>
                                <th className="text-danger" scope="col">#</th>
                                <th className="text-danger" scope="col"> التاريخ</th>
                                <th className="text-danger" scope="col"> قيمة الخصم</th>
                                <th className="text-danger" scope="col">  السبب</th>
                                <th className="text-danger" scope="col">الشخص الذى قام باجراء الخصم</th>
                               </tr>
                            </thead>
                            <tbody>
                            {
                                
                            !loading ?
                            employee.awards.map((item,index) => {
                                if(item.month === thisMonth){
                                    total+=(+item.amount)
                                    return(
                                    
                                    <tr>
                                    <td>{index+1}</td>
                                    <td><p>{item.date}</p></td>
                                    <td><p>{item.amount}</p></td>
                                    <td><p>{item.details?item.details:"-"}</p></td>
                                    <td><p >{item.user}</p></td>
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
                :!loading && <div className="alert alert-danger text-center">لايوجد خصومات لهذا الموظف</div> 
            }
        </div>
            </div>
            }
            </div>
        </div>
    );
}