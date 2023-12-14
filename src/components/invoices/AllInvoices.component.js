import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from "../authentication/AuthUser";
// import "./clients.css";



export default function AllInvoices(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";

    const {http, logout} = AuthUser();

    const navigation = useNavigate();
    const [noData,setNoData] = useState(false);
    const [invoices,setInvoices] = useState([]);
    const [searchCode,setSearchCode] = useState('');
    const [loading,setLoading] = useState(false);
    // const [page,setPage] = useState(1);

    useEffect(() => {
        document.title = "العالمية | كل الفواتير";
        setLoading(true);
        fetchInvoices();
    },[])
    const searchInInvoices = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchInvoices();
    }

    const addInvoice = (id, name) => {
        // navigation(-1);
        navigation(`../invoices/invoice/${id}/${name}`, { replace: true });
    }

    const goToInvoices = (id) => {
        navigation(`../invoice/payments/${id}`);
    }
    const fetchInvoices = async () => {
        await http.get("invoices/searchCode="+searchCode).then(({data}) => {
            if(data.data){
                setLoading(false);
                setInvoices(data.data);
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
                <h1>كل الفواتير</h1>
            </div> */}
            <form onSubmit={searchInInvoices} className="row justify-content-center">
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

            <div className="row px-3">
                <div className="col-10"></div>
                <button onClick={() => navigation('../invoices/invoice/0')} className="col-lg-2 col-md-3 col-sm-4 btn btn-success">أضافة فاتورة</button>
            </div>
            {/* <div className="row text-center justify-content-center">
                <button onClick={(e) => setPage(page - 1)} className="btn btn-danger col-2 mx-2">السابق</button>
                <button onClick={(e) => setPage(page + 1)} className="btn btn-success col-2 mx-2">التالى</button>
            </div> */}
            {
                !noData ?
            <table class="table table-striped text-center my-2">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col"> التاريخ</th>
                    <th scope="col"> رقم الفاتورة</th>
                    <th scope="col">أجمالى حساب الفاتورة</th>
                    <th scope="col">المبلغ المدفوع حتى الان</th>
                    <th scope="col">المبلغ المتبقى حتى الان</th>
                    <th scope="col">التفاصيل</th>
                    </tr>
                </thead>
                <tbody>
                {
                    invoices.map((invoice,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{invoice.created_at.split("T")[0]}</td>
                                <td>{invoice.code}</td>
                                <td>{invoice.total}</td>
                                <td>{invoice.paid}</td>
                                <td>{invoice.delayed}</td>
                                <td>
                                    <button onClick={() => goToInvoices(invoice.id)} className="btn btn-primary col-12">التفاصيل</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد فواتير</div>
            }

            
            {loading && <div className="loading">
                <p>برجاء الأنتظار...</p>
            </div>}

        </div>
        </>
    )   
}