import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from "../authentication/AuthUser";
import LoaderIcon from "react-loader-icon";
// import "./clients.css";



export default function AllPayment(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";

    const {http, logout} = AuthUser();

    const navigation = useNavigate();
    const [noData,setNoData] = useState(false);
    const [payments,setPayments] = useState([]);
    const [searchCode,setSearchCode] = useState('');
    const [loading,setLoading] = useState(false);
    // const [page,setPage] = useState(1);

    useEffect(() => {
        document.title = "العالمية | كل المدفوعات";
        setLoading(true);
        fetchPayments();
    },[])
    const searchInPayment = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchPayments();
    }

    const addPayment = (id, name) => {
        // navigation(-1);
        navigation(`../payments/payment/${id}`, { replace: true });
    }

    const goToPayments = (id) => {
        navigation(`../payment/payments/${id}`);
    }
    const fetchPayments = async () => {
        await http.get("payments").then(({data}) => {
            if(data.data){
                setLoading(false);
                setPayments(data.data);
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
        <>
        <div className="container layout">
            {/* <div className='page-title'>
                <h1>كل المدفوعات</h1>
            </div> */}
            <div className="row px-3">
                <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/clients/client">كل المدفوعات</Link>
            </div>
                <div className="col-10">
                </div>
                <button onClick={() => navigation('../payments/payment/0')} className="col-lg-2 col-md-3 col-sm-4 btn btn-success">أضافة دفع</button>
            </div>
            <div class="table-responsive p-3 mt-4" style={{background:"#fff"}}>
            <form onSubmit={searchInPayment} className="row justify-content-center">
                <div className="col-8">
                    <input type="number" className="form-control" placeholder=" أبحث برقم الفاتورة"
                    value={searchCode}
                    onChange={(e) => {setSearchCode(e.target.value)}}
                    />
                </div>
                <div className="col-4">
                    <button type ="submit" className="btn btn-primary mb-3"> بحث </button>
                </div>
            </form>
            {
                !noData ?
            <table class="table table-bordered table-hover text-center">
                <thead>
                    <tr>
                    <th className="text-danger" scope="col">#</th>
                    <th className="text-danger" scope="col"> التاريخ</th>
                    <th className="text-danger" scope="col"> العميل / المورد</th>
                    <th className="text-danger" scope="col">قيمة المبلغ المدفوع</th>
                    <th className="text-danger" scope="col">   نوع الدفع</th>
                    <th className="text-danger" scope="col">التفاصيل</th>
                    </tr>
                </thead>
                <tbody>
                {
                    payments.map((payment,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{payment.created_at.split("T")[0]}</td>
                                <td>{payment.client?.name?payment.client?.name:payment.supplier?.name?payment.supplier?.name:"-"}</td>
                                <td>{payment.payment_value}</td>
                                <td>{payment.payment_type}</td>
                                <td>
                                    <button onClick={() => goToPayments(payment.id)} className="btn btn-primary col-12">التفاصيل</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد مدفوعات</div>
            }
            {loading && <>
            <div className="loading"></div>
            <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>
        </>}
            </div>

            

        </div>
        </>
    )   
}