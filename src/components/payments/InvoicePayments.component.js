import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthUser from "../authentication/AuthUser";

export default function InvoicePayments(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";

    const {http, logout} = AuthUser();
    const navigate = useNavigate();

    const { id } = useParams();

    const [noData,setNoData] = useState(false);
    const [invoice,setInvoice] = useState([]);
    const [payments,setPayments] = useState([]);
    const [stores,setStores] = useState([]);
    const [clientName,setClientName] = useState('');
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);


    useEffect(() => {
        document.title = "العالمية | الفواتير";
        setLoading(true);
        fetchDetails();
    },[]);

    const searchInInvoices = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchDetails();
    }

    const goToDetails = (id) => {
        navigate(`../clients/invoice/${id}`);
    }

    const fetchDetails = async () => {
        await http.get("invoices/invoice/details/"+id).then(({data}) => {
            if(data.data){
                setLoading(false);
                setInvoice(data.data);
                setPayments(data.data.payments);
                setStores(data.data.stores);
                // setClientName(data.data.client_name)
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

    return(
        <>
            <div className="container layout">
            {/* <div className='page-title'>
                <h1>تفاصيل  فاتورة رقم : <span className="text-danger">{invoice.code}</span></h1>
            </div> */}
            {/* <div className="row text-center justify-content-center">
                <button onClick={(e) => setPage(page - 1)} className="btn btn-danger col-2 mx-2">السابق</button>
                <button onClick={(e) => setPage(page + 1)} className="btn btn-success col-2 mx-2">التالى</button>
            </div> */}
            <div className="row px-3">
                <div className="col-10"></div>
                <button onClick={() => navigate('../invoices/add/payment/'+invoice.code)} className="col-lg-2 col-md-3 col-sm-4 btn btn-success">أضافة فاتورة</button>
            </div>
            {
                !noData ?
            <table class="table table-striped text-center my-2">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col"> رقم الفاتورة</th>
                    <th scope="col">أجمالى حساب الفاتورة</th> */}
                    <th scope="col">قيمة المبلغ المدفوع</th>
                    <th scope="col">نوع الدفع</th>
                    <th scope="col">فى يوم</th>
                    <th scope="col">تفاصيل</th>
                    </tr>
                </thead>
                <tbody>
                {
                    payments.map((payment,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                {/* <td> {invoice.code} </td>
                                <td>{invoice.total}</td> */}
                                <td>{payment.payment_value}</td>
                                <td>{payment.payment_type}</td>
                                <td>{payment.created_at.split("T")[0]}</td>
                                <td className="">
                                {
                                    payment.payment_type === 'بنكى' ? <button onClick={() => goToDetails(payment.id)} className="btn btn-primary col-12"> التفاصيل </button>:"نقدى"
                                }
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد فواتير لهذا العميل</div>
            }
            {loading && <div className="loading">
            <p>برجاء الأنتظار...</p>
            </div>}

        </div>
        </>
    )
}